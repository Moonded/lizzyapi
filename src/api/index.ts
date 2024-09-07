import express from "express";
import { apiTokenV2 } from "src/utils";
const router = express.Router();
import v1 from "./v1";
import v2 from "./v2";
import docs from "./docs";

router.use("/docs", docs);
router.use("/v1", v1);
router.use("/v2", apiTokenV2, v2);

// Default to v1
router.use("/", v1);

export default router;
