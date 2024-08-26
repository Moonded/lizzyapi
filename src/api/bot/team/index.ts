import express from "express";
const router = express.Router();

import pass from "./pass";

router.use("/pass", pass);

export default router;
