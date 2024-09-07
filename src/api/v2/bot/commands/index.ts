import express from "express";
const router = express.Router();

import core_versions from "./core-versions";
import respond from "./respond";
import trivia from "./trivia";
import quotes from "./quotes";
import link from "./link";
import auth from "./auth";
import key from "./key";

router.use("/core-versions", core_versions);
router.use("/respond", respond);
router.use("/trivia", trivia);
router.use("/quotes", quotes);
router.use("/link", link);
router.use("/auth", auth);
router.use("/key", key);

export default router;
