import express from "express";
const router = express.Router();

import user from "./user";
import perms from "./perms";


router.use("/user", user);
router.use("/perms", perms);

export default router;
