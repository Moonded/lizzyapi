import express from "express";
import { prisma, getLatestRelease } from "utils";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body as { quote: string; responder: string };

    try {
      const quote = await prisma.quotes.create({
        data: {
          quote: data.quote,
          responder: data.responder,
        },
      });
      return res.send(quote);
    } catch (e) {
      return res.sendStatus(500);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
