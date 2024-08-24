import { Client } from "discord.js";

export const client = new Client({
  intents: [
    "Guilds",
    "GuildMembers",
    "GuildBans",
    "GuildEmojisAndStickers",
    "GuildIntegrations",
    "GuildWebhooks",
    "GuildInvites",
    "GuildVoiceStates",
    "GuildPresences",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildMessageTyping",
    "DirectMessages",
    "DirectMessageReactions",
    "DirectMessageTyping",
    "MessageContent",
    "GuildScheduledEvents",
    "AutoModerationConfiguration",
    "AutoModerationExecution",
  ],
});

client.login(process.env.CLIENT_TOKEN).catch((err) => {
  console.error("[Login Error]", err);
  process.exit(1);
});
