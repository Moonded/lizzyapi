import express from "express";
import { prisma, errorLog, createKey } from "utils";
const router = express.Router();

router.post("/", async (req, res) => {
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
    });

    if (!User) {
      const Key = createKey(body.user.toLowerCase(), body.id);

      const User = await prisma.userV2.create({
        data: {
          username: body.user.toLowerCase(),
          connection: {
            create: {
              service: "discord",
              username: body.user.toLowerCase(),
              serviceid: body.id,
            },
          },
          keys: {
            create: {
              key: Key.key,
              name: Key.name,
              permission: Key.permissionSet,
            },
          },
        },
      });

      return res.status(201).send(User);
    }

    return res.status(200).send("User already exists");
  } catch (e) {
    errorLog(e);
    return res.status(500).send("Internal server error");
  }
});

export default router;
