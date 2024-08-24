import express from "express";
const router = express.Router();

import user from "./user";

router.use("/user", user);

export default router;
