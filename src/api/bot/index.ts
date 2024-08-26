import express from "express";
const router = express.Router();

import commands from "./commands";
import dev from "./dev";
import team from "./team";

router.use("/commands", commands);
router.use("/dev", dev);
router.use("/team", team);

export default router;
