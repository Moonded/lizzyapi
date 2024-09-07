import express from "express";
import { prisma } from "utils";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await prisma.quotes.findMany();
    return res.send(data);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
