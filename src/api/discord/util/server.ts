import express from "express";
import { log, client } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.query.q || typeof req.query.q !== "string") {
    return res.status(400).send("Invalid query");
  }

  const servers = await client.guilds.fetch(req.query.q);

  res.send(servers);

  log("Server sent");
});

export default router;
