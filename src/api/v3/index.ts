import express from "express";
const router = express.Router();

import auth from "./auth";

router.use("/auth", auth);
router.get("/", (req, res) => {
  res.sendStatus(200);
});
export default router;
