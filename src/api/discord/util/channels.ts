import express from "express";
import { log, client } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.server || typeof req.query.server !== "string") {
      return res.status(400).send("Invalid query");
    }

    const channels = await client.guilds.cache
      .get(req.query.server)
      ?.channels.fetch();

    log("Roles sent");
    return res.send(channels);
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
