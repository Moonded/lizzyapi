import express from "express";
import { prisma, log, bigintReplacer } from "utils";
const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const body = req.body as {
      permission: bigint;
      route: string;
      method: string;
    };

    if (!body) {
      return res.status(400).send("Missing permission or role");
    }

    const data = await prisma.permissions.createManyAndReturn({
      data: body,
    });

    return res.send(JSON.parse(JSON.stringify(data, bigintReplacer)));
  } catch (e) {
    log(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await prisma.permissions.findMany();

    return res.json(JSON.parse(JSON.stringify(data, bigintReplacer)));
  } catch (e) {
    log(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const query = req.query.id;

    if (!query) {
      const data = await prisma.permissions.deleteMany();

      return res.sendStatus(200);
    }

    const data = prisma.permissions.delete({
      where: {
        id: parseInt(query as string),
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.dir(error, { depth: null });
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body as {
      permission: bigint;
      route: string;
      method: string;
    };

    if (!body) {
      return res.status(400).send("Missing permission or role");
    }

    const data = await prisma.permissions.createMany({
      data: body,
    });

    return res.send(JSON.parse(JSON.stringify(data, bigintReplacer)));
  } catch (e) {
    log(e);
    return res.status(500).send("Internal Server Error");
  }
});
export default router;
