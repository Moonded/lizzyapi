import express from "express";
import { log, client } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.server || typeof req.query.server !== "string") {
      return res.status(400).send("Invalid query");
    }

    const bans = await client.guilds.cache.get(req.query.server)?.bans.fetch();

    log("Roles sent");
    return res.send(bans);
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
