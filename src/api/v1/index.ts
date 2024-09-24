import express from "express";
const router = express.Router();

import { apiToken, readFile } from "src/utils";

import discord from "./discord";
import bot from "./bot";

router.use("/discord", apiToken, discord);
router.use("/bot", apiToken, bot);
router.use("/docs", (req, res) => {
  const docs = readFile("docs/v1.json");
  res.json(JSON.parse(docs));
});
router.get("/", (req, res) => {
  res.sendStatus(200);
});
export default router;
