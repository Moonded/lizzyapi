import { octokit, prisma } from "utils";

async function getLatestRelease(manuelUpdate: boolean) {
  const RED4ext = await octokit.request(
    "GET /repos/WopsS/RED4ext/releases/latest"
  );
  const ArchiveXL = await octokit.request(
    "GET /repos/psiberx/cp2077-archive-xl/releases/latest"
  );
  const TweakXL = await octokit.request(
    "GET /repos/psiberx/cp2077-tweak-xl/releases/latest"
  );
  const Codeware = await octokit.request(
    "GET /repos/psiberx/cp2077-codeware/releases/latest"
  );
  const cet = await octokit.request(
    "GET /repos/maximegmd/CyberEngineTweaks/releases/latest"
  );
  const redscript = await octokit.request(
    "GET /repos/jac3km4/redscript/releases/latest"
  );

  const data = await prisma.github.upsert({
    where: {
      id: "1",
    },
    update: {
      red4ext: RED4ext.data,
      archivexl: ArchiveXL.data,
      tweakxl: TweakXL.data,
      codeware: Codeware.data,
      cet: cet.data,
      redscript: redscript.data,
      updated: new Date(),
      lastupdatemanuel: manuelUpdate,
    },
    create: {
      id: "1",
      red4ext: RED4ext.data,
      archivexl: ArchiveXL.data,
      tweakxl: TweakXL.data,
      codeware: Codeware.data,
      cet: cet.data,
      redscript: redscript.data,
      created: new Date(),
      updated: new Date(),
      lastupdatemanuel: manuelUpdate,
    },
  });

  return data;
}

export { getLatestRelease };
