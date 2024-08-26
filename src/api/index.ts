import express from "express";
const router = express.Router();

import { apiToken } from "src/utils";

import discord from "./discord";
import metrics from "./metrics";
import experimental from "./experimental";
import endpoint from "./endpoint";
import auth from "./auth";
import bot from "./bot";
import dev from "./dev";

router.use("/metrics", metrics);
router.use("/discord", apiToken, discord);
router.use("/experimental", apiToken, experimental);
router.use("/endpoint", apiToken, endpoint);
router.use("/bot", apiToken, bot);
// router.use("/dev", apiToken, dev);
// router.use("/auth", apiToken, auth);

router.get("/", (req, res) => {
  res.sendStatus(200);
});

export default router;
