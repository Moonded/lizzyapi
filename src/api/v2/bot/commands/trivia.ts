import express from "express";
import { errorLog, prisma } from "utils";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body as {
      question: string;
      answer: string;
    };

    try {
      const newTrivia = await prisma.trivia.create({
        data: {
          question: data.question,
          answer: data.answer,
        },
      });
      return res.send(newTrivia);
    } catch (e) {
      errorLog(e);
      return res.sendStatus(500);
    }
  } catch (e) {
    errorLog(e);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const Trivias = await prisma.trivia.findMany();

    const randomTrivia = Trivias[Math.floor(Math.random() * Trivias.length)];

    return res.send(randomTrivia);
  } catch (e) {
    errorLog(e);
    return res.sendStatus(500);
  }
});

export default router;
