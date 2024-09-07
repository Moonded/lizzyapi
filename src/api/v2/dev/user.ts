import express from "express";
import jwt from "jsonwebtoken";
import { prisma, bigintReplacer, log } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await prisma.userV2.findMany({
    include: {
      connection: true,
      keys: true,
      linkedroles: true,
      webinterface: true,
    },
  });

  if (users.length === 0) {
    return res.status(404).send("No users found");
  }

  const info = users.map((user) => {
    return user.keys.map((key) => {
      return key.permission;
    });
  });

  const permission = 0x800;

  // Permissions Check Example
  console.log((Number(info) & permission) == permission);
  return res.send(JSON.parse(JSON.stringify(users, bigintReplacer)));
});

router.delete("/", async (req, res) => {
  try {
    const query = req.query.id;

    if (!query) {
      return res.status(400).send("No id provided");
    }

    const connections = prisma.connection.deleteMany({
      where: {
        userv2id: parseInt(query as string),
      },
    });

    const webinterface = prisma.webInterface.deleteMany({
      where: {
        userv2id: parseInt(query as string),
      },
    });

    const keys = prisma.aPIKeys.deleteMany({
      where: {
        userv2id: parseInt(query as string),
      },
    });

    const users = prisma.userV2.delete({
      where: {
        id: parseInt(query as string),
      },
    });

    await prisma.$transaction([connections, webinterface, keys, users]);

    return res.sendStatus(200);
  } catch (e) {
    log(e);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    enum Service {
      discord = "discord",
      nexusmods = "nexusmods",
      github = "github",
    }

    const body = req.body as {
      username: string;
      connections?: [
        {
          service: Service | undefined;
          username: string;
          serviceid?: string;
        }
      ];
    };

    if (!body.username) {
      return res.status(400).send("No username provided");
    }

    if (!body.connections) {
      return res.status(400).send("No connections provided");
    }

    const user = await prisma.userV2.create({
      data: {
        username: body.username,
        connection: {
          create: body.connections,
        },
      },
    });

    const permission =
      0x1 |
      0x2 |
      0x4 |
      0x8 |
      0x10 |
      0x20 |
      0x40 |
      0x80 |
      0x100 |
      0x200 |
      0x400 |
      0x800 |
      0x1000 |
      0x2000;

    const payload = {
      keyName: "Default",
      username: body.username,
      permission: permission,
      user: user.id,
    };

    const key = jwt.sign(payload, process.env.API_TOKEN as string);

    const createKey = await prisma.aPIKeys.create({
      data: {
        name: payload.keyName,
        permission: payload.permission,
        key: key,
        userv2id: user.id,
      },
    });

    // Key Creation Example Logging
    console.log(createKey);

    return res.send(JSON.parse(JSON.stringify(user, bigintReplacer)));
  } catch (e) {
    log(e);
    return res.status(500).send("Internal server error");
  }
});

export default router;
