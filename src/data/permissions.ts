export default [
  {
    path: "/api/v2/bot/commands/core-commands",
    method: ["GET"],
    bitfield: BigInt(1),
  },
  {
    path: "/api/v2/bot/commands/core-commands/update",
    method: ["GET"],
    bitfield: BigInt(2),
  },
  {
    path: "/api/v2/bot/commands/quotes",
    method: ["GET", "POST", "PUT", "PATCH"],
    bitfield: BigInt(4),
  },
  {
    path: "/api/v2/bot/commands/trivia",
    method: ["GET", "POST"],
    bitfield: BigInt(8),
  },
  {
    path: "/api/v2/bot/commands/user",
    method: ["POST"],
    bitfield: BigInt(16),
  },
  {
    path: "/api/v2/bot/team/pass/create",
    method: ["POST"],
    bitfield: BigInt(32),
  },
  {
    path: "/api/v2/bot/team/pass/key",
    method: ["POST"],
    bitfield: BigInt(64),
  },
  {
    path: "/api/v2/bot/team/pass/update",
    method: ["POST"],
    bitfield: BigInt(128),
  },
  {
    path: "/api/v2/discord/web",
    method: ["GET"],
    bitfield: BigInt(256),
  },
  {
    path: "/api/v2/bot/commands/respond",
    method: ["GET"],
    bitfield: BigInt(512),
  },
];
