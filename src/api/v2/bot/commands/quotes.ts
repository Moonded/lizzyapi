import express from "express";
import { prisma } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = (await prisma.quotes.findMany()) || [
      { error: "No data found" },
    ];

    return res.send(data);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body as { quote: string; responder: string };

    if (!data.responder) {
      return res.status(400).send("No responder provided");
    }

    if (!data) {
      return res.status(400).send("No data provided");
    }

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
});

router.put("/", async (req, res) => {
  try {
    const data = req.body as [{ quote: string; responder: string }];

    if (!data) {
      return res.status(400).send("No data provided");
    }

    const quote = await prisma.quotes.createMany({
      data: data,
    });

    return res.send(quote);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.patch("/", async (req, res) => {
  try {
    const data = req.body as { id: string; quote: string; responder: string };

    if (!data.id) {
      return res.status(400).send("No id provided");
    }

    const quote = await prisma.quotes.update({
      where: { id: data.id },
      data: {
        quote: data.quote,
        responder: data.responder,
      },
    });

    return res.send(quote);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
