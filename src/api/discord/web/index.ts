import express from "express";
import { prisma, log, client } from "utils";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.query.q || typeof req.query.q !== "string") {
      return res.status(400).send("Invalid query");
    }

    const Members = await client.guilds.cache
      .get(req.query.q.trim())
      ?.members.fetch();

    const Users = await prisma.user.findMany();

    const data = Members?.reduce(
      (
        acc: {
          Username: string;
          Nickname: string | null;
          Image: string;
          ID: string;
          Bot: boolean;
          Roles: {
            Role: string;
            ID: string;
            Icon: string | null;
            Position: number;
          }[];
          CustomData: {} | null;
        }[],
        member
      ) => {
        acc.push({
          Username: member.user.username,
          Nickname: member.nickname,
          Image: member.user.displayAvatarURL(),
          ID: member.user.id,
          Bot: member.user.bot,
          Roles: member.roles.cache.map((role) => {
            return {
              Role: role.name,
              ID: role.id,
              Icon: role.iconURL(),
              Position: role.position,
            };
          }),
          CustomData: Users.find((a) => a.userid === member.user.id) || null,
        });
        return acc;
      }
    );

    log("Experimental Roles sent");
    return res.send(data);
  } catch (e) {
    log(e);
    return res.sendStatus(500);
  }
});

export default router;
