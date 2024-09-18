import express from "express";
import { prisma, log, client, NexusModsQuery } from "utils";
const router = express.Router();

type acc = {
  Username: string;
  GlobalName: string | null;
  Image: string;
  Banner: string | null | undefined;
  ID: string;
  Roles:
    | ({
        Role: string;
        ID: string;
        Icon: string | null;
        Position: number;
      } | null)[]
    | null
    | undefined;
  CustomData: {}[] | null;
  NexusData: {} | null;
  GithubData: any;
}[];

router.get("/", async (req, res) => {
  const serverquery = req.query.q;
  const rolequery = req.query.r;

  if (!serverquery || typeof serverquery !== "string") {
    return res.status(400).send("Invalid query");
  }

  if (
    typeof rolequery !== "string" ||
    typeof JSON.parse(rolequery) !== "object"
  ) {
    return res.status(400).send("Invalid query");
  }

  try {
    let RolesID: string[] = [];

    rolequery
      ? (RolesID = JSON.parse(rolequery))
      : (RolesID = [
          "717719048514699264", // Moderator
          "811909247125159987", // Team-REDCore
          "811690894221639691", // Team-CET
          "803628105087713290", // Team-Wkit
          "803647729905172521", // Team-Website
          "790814286519468072", // Team-Wiki
          "1278051511087399114", // Dev Server Everyone
        ]);

    const Guild = await client.guilds.fetch(serverquery.trim());

    if (!Guild) return res.status(404).send("Guild(s) not found");

    const Members = await Guild?.members.fetch();

    if (!Members) return res.status(404).send("Member(s) not found");

    const MembersByRole = Members?.filter((member) => {
      return member.roles.cache.some((role) => RolesID.includes(role.id));
    });

    if (!MembersByRole) return res.status(404).send("Role(s) not found");

    const Users = await prisma.userV2.findMany({
      where: {
        connection: {
          some: {
            service: "discord",
            serviceid: {
              in: MembersByRole.map((a) => a.user.id),
            },
          },
        },
      },
      include: {
        connection: true,
        keys: false,
        linkedroles: false,
        webinterface: {
          select: {
            theme: true,
            style: true,
            country: false,
            nexusmods: true,
            nexusmodsVerified: true,
            github: true,
            githubVerified: true,
            description: true,
          },
        },
      },
    });

    const data = MembersByRole.reduce(async (acc: Promise<acc>, member) => {
      if (member.user.bot) return acc;
    
      const UserData =
        Users.find(
          (a) =>
            a.connection[a.connection.findIndex((a) => a.service === "discord")]
              .serviceid === member.user.id || null
        )?.webinterface || null;
    
      const NexusName = UserData?.find((a) => a.nexusmods)?.nexusmods;
      const NexusData = NexusName ? await NexusModsQuery(NexusName!) : null;

      const GithubName = UserData?.find((a) => a.github)?.github;
      const GithubData = GithubName ? GithubName : null;
    
      const RoleData = member.roles.cache
        .map((role) => {
          return {
            Role: role.name,
            ID: role.id,
            Icon: role.iconURL(),
            Position: role.position,
          };
        })
        .filter((role) => role.Role !== "@everyone")
        .sort((a, b) => a.Position - b.Position);
    
      (await acc).push({
        Username: member.user.username,
        GlobalName: member.user.globalName,
        Image: member.user.displayAvatarURL(),
        Banner: member.user.bannerURL(),
        ID: member.user.id,
        Roles: RoleData,
        CustomData: UserData,
        NexusData: NexusData,
        GithubData: GithubData,
      });
      return acc;
    }, Promise.resolve([] as acc));

    log("Experimental Roles sent");
    return res.send(data);
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
