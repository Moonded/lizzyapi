import express from "express";
const router = express.Router();

import commands from "./commands";

router.use("/commands", commands);

export default router;
