import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "utils";
import { sha512 } from "js-sha512";
import crypto from "node:crypto";

const router = express.Router();

router.post("/create", async (req, res) => {
  const data = req.body as {
    username: string;
    password: string;
    discord: string;
  };

  const salt = crypto.randomBytes(16).toString("base64");
  const tokens = sha512(data.password + salt);

  const token = jwt.sign(data, process.env.API_TOKEN as string);

  const user = await prisma.pass.findUnique({
    where: {
      username: data.username,
    },
  });

  if (user) {
    return res.status(403).send("User already exists");
  }

  const pass = await prisma.pass.create({
    data: {
      username: data.username,
      discord: data.discord,
      token: tokens,
      salt: salt,
      jwt: token,
    },
  });

  return res.send(token);
});

router.post("/key", async (req, res) => {
  const data = req.body as {
    username?: string;
    password: string;
    discord?: string;
  };

  try {
    const user = await prisma.pass.findUnique({
      where: {
        username: data.username,
        discord: data.discord,
      },
    });

    if (!user) {
      return res.status(403).send("User not found");
    }

    const tokens = sha512(data.password + user.salt);

    if (tokens !== user.token) {
      return res.status(403).send("Invalid password");
    }

    return res.send(user.jwt);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/update", async (req, res) => {
  const data = req.body as {
    username?: string;
    password: string;
    discord?: string;
  };

  console.log(data)

  const user = await prisma.pass.findUnique({
    where: {
      username: data.username,
      discord: data.discord,
    },
  });


  if (!user) {
    return res.status(403).send("User not found");
  }

  const tokens = sha512(data.password + user.salt);

  if (tokens !== user.token) {
    return res.status(403).send("Invalid password");
  }

  const salt = crypto.randomBytes(16).toString("base64");
  const newTokens = sha512(data.password + salt);

  const token = jwt.sign(data, process.env.API_TOKEN as string);

  const updated = await prisma.pass.update({
    where: {
      username: data.username,
      discord: data.discord,
    },
    data: {
      token: newTokens,
      salt: salt,
      jwt: token,
    },
  });


  return res.send(token);
});

export default router;
