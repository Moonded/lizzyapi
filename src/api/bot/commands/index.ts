import express from "express";
const router = express.Router();

import core_versions from "./core-versions";
import respond from "./respond";
import trivia from "./trivia";
import user from "./user";
import quotes from "./quotes";

router.use("/core-versions", core_versions);
router.use("/respond", respond);
router.use("/trivia", trivia);
router.use("/user", user);
router.use("/quotes", quotes);

export default router;
