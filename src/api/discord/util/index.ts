import express from "express";
const router = express.Router();

import bans from "./bans";
import channels from "./channels";
import roles from "./roles";
import server from "./server";
import user from "./user";

router.use("/bans", bans);
router.use("/channels", channels);
router.use("/roles", roles);
router.use("/server", server);
router.use("/user", user);

export default router;
