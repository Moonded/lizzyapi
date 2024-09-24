import express from "express";
import { log, prisma, octokit } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  const state = crypto.randomUUID();

  res.cookie("clientStateGithub", state, {
    maxAge: 1000 * 60 * 5,
    signed: true,
  });

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("scope", "read:user");
  url.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  url.searchParams.set("redirect_uri", process.env.GITHUB_REDIRECT_URI!);
  url.searchParams.set("state", state);

  res.redirect(url.toString());
});

router.get("/redirect", async (req, res) => {
  const { code, state } = req.query;
  const cookies = req.signedCookies;

  if (!code || !state) return res.sendStatus(400);

  const clientState = req.signedCookies.clientStateGithub;

  if (clientState !== state) return res.sendStatus(400);

  const userAccessToken = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const responseText = (await userAccessToken.text())
    .split("&")
    .reduce((acc: { [key: string]: string }, curr) => {
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {}) as { access_token: string; scope: string; token_type: string };

  const user = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${responseText.access_token}`,
    },
  });

  const userData = await user.json();

  res.cookie("githubUserData", userData, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true,
  });

  const DiscordData = req.signedCookies.discordUserData;

  log(DiscordData);

  const userV2 = await prisma.userV2.findUnique({
    where: {
      username: DiscordData.username.toLowerCase(),
      connection: {
        some: {
          service: "discord",
          serviceid: DiscordData.id,
        },
      },
    },
  });

  if (!userV2) return res.redirect("/api/v2/auth?error=notfound");

  const Connection = await prisma.connection.create({
    data: {
      UserV2: {
        connect: {
          id: userV2.id,
        },
      },
      service: "github",
      username: userData.login,
      serviceid: userData.id.toString(),
    },
  });

  if (!Connection) return res.sendStatus(500);

  res.redirect("/api/v2/auth");
  // res.sendStatus(200);
});

export default router;
