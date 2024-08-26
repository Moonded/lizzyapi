import express from "express";

const router = express.Router();

router.get("/users", async (req, res) => {
  res.sendStatus(410);
});

router.get("/roles", async (req, res) => {
  res.sendStatus(410);
});

router.get("/web", async (req, res) => {
  res.sendStatus(410);
});

export default router;
