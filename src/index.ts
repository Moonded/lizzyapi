import { checkENVS, log, Updater } from "utils";

import express from "express";
import api from "src/api";
import http from "http";
import https from "https";
import rateLimit from "express-rate-limit";
import fs from "fs";
import cookieParser from "cookie-parser";

export const app = express();

checkENVS() === true ? log("All Environment Variables are set.") : log("Environment Variables are not set.");

process.env.NODE_ENV === "development" ?  log("Development Mode.") : log("Production Mode.");

const privateKey = fs.readFileSync("./src/keys/privkey.pem", "utf-8");
const certificate = fs.readFileSync("./src/keys/fullchain.pem", "utf-8");

const credentials = { key: privateKey, cert: certificate };

const windowMS = Number(process.env.API_RATE_WINDOW) * 1000 || 60 * 1000;
const requests = Number(process.env.API_MAX_REQUESTS) || 10;

const limit = rateLimit({
  windowMs: windowMS, // 1 minute
  max: requests, // 10 requests,
  message: "You are being rate limited",
});

if (process.env.NODE_ENV !== "development") app.use(limit);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.disable("x-powered-by");
app.use("/api", api);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
  log("Port 8080 Pupulated.");
});

httpsServer.listen(8443, () => {
  log("Port 8443 Pupulated.");
});

// Update the latest release data on start
await Updater() === true ? log(`Latest Release Data Updated.`) : log("Error Updating Github Data.");

// Update the latest release data every 24 hours
setInterval(async () => {
  await Updater() === true ? log(`Latest Release Data Updated.}.`) : log("Error Updating Github Data.");
}, 1000 * 60 * 60 * 24);
