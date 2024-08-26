import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function apiToken(req: Request, res: Response, next: any) {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res.status(401).send("Unauthorized");
  }

  const code = headers.split(" ")[1];

  try {
    const decode = jwt.verify(code, process.env.API_TOKEN as string);

    if (decode) {
      return next();
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
}
