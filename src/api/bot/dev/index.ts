import express from "express";
const router = express.Router();

import users from "./users";

router.use("/users", users);

export default router;
