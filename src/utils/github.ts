import { prisma } from "utils";
import { App } from "octokit";
import fs from "fs";

const key = fs.readFileSync(
  `./src/keys/github/${process.env.GITHUB_APP_KEY_FILE!}`,
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

export async function Updater() {
  const GraphData: GraphData = await octokit.graphql(
    `
    query {
red4ext: repository(owner: "WopsS", name: "RED4ext") {
    latestRelease {
      tagName
      updatedAt
      url
    }
  }
  archivexl: repository(owner: "psiberx", name: "cp2077-archive-xl") {
    latestRelease {
      tagName
      updatedAt
      url
    }
  }
  tweakxl: repository(owner: "psiberx", name: "cp2077-tweak-xl") {
    latestRelease {
      tagName
      updatedAt
      url
    }
  }
  codeware: repository(owner: "psiberx", name: "cp2077-codeware") {
    latestRelease {
      tagName
      updatedAt
      url
    }
  }
  cet: repository(owner: "maximegmd", name: "CyberEngineTweaks") {
    latestRelease {
      tagName
      updatedAt
      url
    }
  }
  redscript: repository(owner: "jac3km4", name: "redscript") {
    latestRelease {
      tagName
      updatedAt
      url
    }
  }
}
    `
  );

  const data = await prisma.github.upsert({
    where: {
      id: "1",
    },
    update: {
      red4ext: GraphData.red4ext,
      archivexl: GraphData.archivexl,
      tweakxl: GraphData.tweakxl,
      codeware: GraphData.codeware,
      cet: GraphData.cet,
      redscript: GraphData.redscript,
      updated: new Date(),
    },
    create: {
      id: "1",
      red4ext: GraphData.red4ext,
      archivexl: GraphData.archivexl,
      tweakxl: GraphData.tweakxl,
      codeware: GraphData.codeware,
      cet: GraphData.cet,
      redscript: GraphData.redscript,
      created: new Date(),
      updated: new Date(),
    },
  });

  return data;
}