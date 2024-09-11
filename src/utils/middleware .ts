import { Request, Response } from "express";
import { prisma, log } from "utils";
import jwt from "jsonwebtoken";

export function apiToken(req: Request, res: Response, next: any) {
  const headers = req.headers["authorization"];
  const route = req.originalUrl.split("?")[0];
  const method = req.method;
  
  log(`Route ${route} | Method ${method}`);

  if (!headers) {
    return res.status(401).send("Unauthorized");
  }

  const code = headers.split(" ")[1];

  try {
    const decode = jwt.verify(code, process.env.API_TOKEN!);

    if (decode) {
      return next();
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
}

export async function apiTokenV2(req: Request, res: Response, next: any) {
  const headers = req.headers["authorization"];
  const route = req.originalUrl.split("?")[0];
  const method = req.method;

  const routePermission = await prisma.permissions.findFirst({
    where: {
      route,
      method,
    },
  });

  if (!routePermission) {
    log(`Route not found / Open Route | Route ${route} | Method ${method}`);
    return next();
  }

  if (!headers) {
    return res.status(401).send("Unauthorized");
  }

  const code = headers.split(" ")[1];

  interface Decode {
    keyName: string;
    username: string;
    permission: bigint;
    user: number;
    iat: number;
  }

  const decode = jwt.verify(code, process.env.API_TOKEN!) as Decode;

  const user = await prisma.userV2.findUnique({
    where: {
      id: decode.user,
    },
    include: {
      keys: true,
    },
  });

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const permission = routePermission.permission;
  const thisKey = user.keys.find((key) => key.name === decode.keyName);

  if (!thisKey) {
    return res.status(401).send("Unauthorized");
  }

  if ((thisKey?.permission & permission) !== permission) {
    log(
      `Permission Denied | Username ${user.username} | Route ${route} | Method ${method}`
    );
    return res.status(401).send("Unauthorized");
  }

  return next();
}
