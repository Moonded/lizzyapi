import express from "express";
import { prisma, log } from "utils";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body as {
      User: string;
      Id: string;
      NexusMods: string;
      Github: string;
      Theme: string;
      Description: string;
      Style: string;
      Timezone: string;
      Country: string;
    };

    // console.log(data);

    const user = await prisma.user.upsert({
      where: {
        userid: data.Id,
      },
      update: {
        userid: data.Id,
        user: data.User,
        nexusmods: data.NexusMods,
        github: data.Github,
        theme: data.Theme,
        description: data.Description,
        style: data.Style,
        timezone: data.Timezone,
        country: data.Country,
      },
      create: {
        userid: data.Id,
        user: data.User,
        nexusmods: data.NexusMods,
        github: data.Github,
        theme: data.Theme,
        description: data.Description,
        style: data.Style,
        timezone: data.Timezone,
        country: data.Country,
      },
    });
    return res.send(user);
  } catch (e) {
    log(e)
    return res.sendStatus(500);
  }
});

export default router;
