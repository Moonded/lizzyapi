import express from "express";
const router = express.Router();

import web from "./web";

router.use("/web", web);


export default router;
