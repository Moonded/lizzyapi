import express from "express";
import { prisma } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = req.query.q as {
      id: string;
    };

    console.log(data);

    if (!data) {
      // FIND ALL USERS
      const User = await prisma.user.findMany();

      return res.send(User);
    } else {
      // FIND USER BY ID
      try {
        const User = await prisma.user.findUnique({
          where: {
            userid: data.id,
          },
        });
        return res.send(User);
      } catch (e) {
        return res.sendStatus(500);
      }
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
