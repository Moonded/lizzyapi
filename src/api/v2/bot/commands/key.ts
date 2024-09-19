import express from "express";
import { prisma, createKey, bigintReplacer, log } from "utils";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const body = req.body;

    const User = await prisma.userV2.findUnique({
      where: {
        username: body.user.toLowerCase(),
        connection: {
          some: {
            service: "discord",
            serviceid: body.id,
          },
        },
      },
      include: {
        keys: true,
      },
    });

    if (!User) return res.status(404).send("User not found");

    if (User.keys.length >= User.maxkeys)
      return res
        .status(400)
        .send(
          `User already has ${User.keys.length} keys of ${User.maxkeys} max`
        );

    const Key = createKey(body.user.toLowerCase(), body.id, body.name);

    const newKey = await prisma.aPIKeys.create({
      data: {
        UserV2: {
          connect: {
            id: User.id,
          },
        },
        key: Key.key,
        name: Key.name,
        permission: Key.permissionSet,
      },
    });

    return res.send(newKey.key);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const body = req.body;

    const User = await prisma.userV2.findUnique({
      where: {
        username: body.user.toLowerCase(),
        connection: {
          some: {
            service: "discord",
            serviceid: body.id,
          },
        },
      },
      include: {
        keys: true,
      },
    });

    if (!User) return res.status(404).send("User not found");


    const Key =
      User.keys.find((key) => key.key === body.key) ||
      User.keys.find((key) => key.name === body.name);

    if (!Key) return res.status(404).send("Key not found");

    await prisma.aPIKeys.delete({
      where: {
        id: Key.id,
      },
    });

    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/list", async (req, res) => {
  try {
    const body = req.body;

    const User = await prisma.userV2.findUnique({
      where: {
        username: body.user.toLowerCase(),
        connection: {
          some: {
            service: "discord",
            serviceid: body.id,
          },
        },
      },
      include: {
        keys: true,
      },
    });

    log(User);

    if (!User) return res.status(404).send("User not found");

    return res.send(JSON.stringify(User.keys, bigintReplacer));
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
