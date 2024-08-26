import express from "express";
const router = express.Router();

import util from "./util";
import web from "./web";

router.use("/util", util);
router.use("/web", web);

export default router;
