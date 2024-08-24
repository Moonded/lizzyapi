import express from "express";
import { prisma } from "utils";

const router = express.Router();

router.put("/", async (req, res) => {
  const data = req.body as {
    user: string;
    id: string;
    nexusmods: string;
    github: string;
    theme: string;
    description: string;
    style: string;
    timezone: string;
    country: string;
  };

  try {
    const user = await prisma.user.upsert({
      where: {
        userid: data.id,
      },
      update: {
        userid: data.id,
        user: data.user,
        nexusmods: data.nexusmods,
        github: data.github,
        theme: data.theme,
        description: data.description,
        style: data.style,
        timezone: data.timezone,
        country: data.country,
      },
      create: {
        userid: data.id,
        user: data.user,
        nexusmods: data.nexusmods,
        github: data.github,
        theme: data.theme,
        description: data.description,
        style: data.style,
        timezone: data.timezone, 
        country: data.country,
      },
    });
    return res.send(user);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default router;
