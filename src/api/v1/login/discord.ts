import express from "express";
import { log } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

router.get("/redirect", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code || typeof code !== "string")
      return res.status(400).send("Invalid query");

    const data = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID as string,
        client_secret: process.env.DISCORD_CLIENT_SECRET as string,
        code: code as string,
        grant_type: "authorization_code",
        redirect_uri: process.env.DISCORD_REDIRECT_URI as string,
      }),
    }).then((res) => res.json());

    if (!data.access_token) {
      log(data);
      return res.status(500).send("Invalid data");
    }

    const user = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }).then((res) => res.json());

    if (!user.id) {
      log(user);
      return res.status(500).send("Invalid user data");
    }

    const guild = await fetch(`https://discord.com/api/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }).then((res) => res.json());

    var dev = false;
    var normal = false;

    guild.map((g: any) => {
      if (g.id === "717692382849663036") {
        dev = true;
      }
      if (g.id === "1278051511087399114") {
        normal = true;
      }
    });

    console.log(dev, normal);

    // guild.map((g: any) => g.id === "717692382849663036") ? true : false,
    //   guild.map((g: any) => g.id === "1278051511087399114") ? true : false

    console.log(user);
    // return res.send(user);

    return res.redirect("/");
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
