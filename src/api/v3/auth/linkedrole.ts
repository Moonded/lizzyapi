import express from "express";
import { log } from "utils";
const router = express.Router();

router.get("/", (req, res) => {
  const state = crypto.randomUUID();

  res.cookie("clientState", state, {
    maxAge: 1000 * 60 * 5,
    signed: true,
  });

  const url = new URL("https://discord.com/api/oauth2/authorize");
  url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID!);
  url.searchParams.set("redirect_uri", process.env.DISCORD_REDIRECT_URI!);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);
  url.searchParams.set("scope", "role_connections.write identify");
  url.searchParams.set("prompt", "consent");

  res.redirect(url.toString());
});

export default router;
