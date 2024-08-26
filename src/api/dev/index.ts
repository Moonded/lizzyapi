import express from "express";
const router = express.Router();

import { apiToken } from "src/utils";

import responses from "./responses";


router.use("/responses", responses);

export default router;
