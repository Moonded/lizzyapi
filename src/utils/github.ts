import { App } from "octokit";
import fs from "fs";

const key = fs.readFileSync(
  `./src/keys/${process.env.GITHUB_APP_KEY_FILE!}`,
  "utf-8"
);

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: key,
  auth: {
    id: process.env.GITHUB_APP_ID!,
    privateKey: key,
    installationId: process.env.GITHUB_INSTALLATION_ID!,
  },
  installationId: process.env.GITHUB_INSTALLATION_ID!,
});

export const octokit = await app.getInstallationOctokit(
  Number(process.env.GITHUB_INSTALLATION_ID!)
);
