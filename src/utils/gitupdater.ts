import { octokit, prisma } from "utils";

type latestRelease = {
  tagName: string;
  updatedAt: string;
  url: string;
};

type GraphData = {
  red4ext: {
    latestRelease: latestRelease;
  };
  archivexl: {
    latestRelease: latestRelease;
  };
  tweakxl: {
    latestRelease: latestRelease;
  };
  codeware: {
    latestRelease: latestRelease;
  };
  cet: {
    latestRelease: latestRelease;
  };
  redscript: {
    latestRelease: latestRelease;
  };
};

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