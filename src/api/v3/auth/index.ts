import express from "express";
import { readFile } from "utils";
const router = express.Router();

import linkedrole from "./linkedrole";
import discord from "./discord";
import github from "./github";

router.use("/linkedrole", linkedrole);
router.use("/discord", discord);
router.use("/github", github);

router.get("/", (req, res) => {
  const index = readFile("index.html");
  res.send(index);
});

export default router;
