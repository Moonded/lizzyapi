import express from "express";
const router = express.Router();

import user from "./user";
import perms from "./perms";
import github_contribs from "./github_contribs";

router.use("/git", github_contribs)
router.use("/user", user);
router.use("/perms", perms);

export default router;
