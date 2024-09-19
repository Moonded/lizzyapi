// import express from "express";
// import { log, discord, prisma } from "utils";
// const router = express.Router();

// router.get("/", (req, res) => {
//   const state = crypto.randomUUID();

//   res.cookie("clientState", state, {
//     maxAge: 1000 * 60 * 5,
//     signed: true,
//   });

//   const url = new URL("https://discord.com/api/oauth2/authorize");
//   url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID!);
//   url.searchParams.set("redirect_uri", process.env.DISCORD_REDIRECT_URI!);
//   url.searchParams.set("response_type", "code");
//   url.searchParams.set("state", state);
//   url.searchParams.set("scope", "role_connections.write identify");
//   url.searchParams.set("prompt", "consent");

//   res.redirect(url.toString());
// });

// router.get("/redirect", async (req, res) => {
//   const code = req.query["code"];
//   const discordState = req.query["state"];

//   // make sure the state parameter exists
//   const { clientState } = req.signedCookies;
//   if (clientState !== discordState) {
//     console.error("State verification failed.");
//     return res.sendStatus(403);
//   }

//   const tokens = await discord.getOAuthTokens(code);
//   const meData = await discord.getUserData(tokens);

//   res.cookie("discordUserData", meData.user, {
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//     signed: true,
//   });

//   const user = await prisma.userV2.findUnique({
//     where: {
//       username: meData.user.username.toLowerCase(), // Add the username property
//       connection: {
//         some: {
//           service: "discord",
//           serviceid: meData.user.id,
//         },
//       },
//     },
//     include: {
//       keys: true,
//     },
//   });

//   if (!user) {
//     return res.redirect("/api/v2/auth?error=notfound");
//   }

//   res.cookie("bearerKey", user?.keys[0].key, {
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//     signed: true,
//   });

//   res.redirect("/api/v2/auth");
// });

// export default router;
