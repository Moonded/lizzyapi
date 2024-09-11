import express from "express";
import { prisma, Updater } from "utils";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await prisma.github.findUnique({
      where: {
        id: "1",
      },
    });
    return res.send(data);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.get("/update", async (req, res) => {
  try {
    const data = await Updater();
    return res.send(data);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
