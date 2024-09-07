import express from "express";
const router = express.Router();
import bitfield from "./bitfield";
import user from "./user";
import perms from "./perms";

router.use("/bitfield", bitfield);
router.use("/user", user);
router.use("/perms", perms);

export default router;
