import express from "express";
import { log, client } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.q || typeof req.query.q !== "string") {
      return res.status(400).send("Invalid query");
    }

    const servers = await client.guilds.fetch(req.query.q);

    log("Server sent");
    return res.send(servers);
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
