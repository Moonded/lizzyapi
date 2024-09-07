import express from "express";
const router = express.Router();

import commands from "./commands";
import team from "./team";

router.use("/commands", commands);
router.use("/team", team);

export default router;
