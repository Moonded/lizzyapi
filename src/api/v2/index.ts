import express from "express";
const router = express.Router();

import web from "./web";
import bot from "./bot";
import dev from "./dev";

router.use("/web", web);
router.use("/dev", dev);
router.use("/bot", bot);
router.get("/", (req, res) => {
  res.sendStatus(200);
});
export default router;
