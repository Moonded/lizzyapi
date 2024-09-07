import { log, prisma } from "utils";

interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export async function getAccessToken(userId: string, tokens: Tokens) {
  if (Date.now() > tokens.expires_at) {
    const url = "https://discord.com/api/v10/oauth2/token";
    const body = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    });
    const response = await fetch(url, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.ok) {
      const tokens = await response.json();
      tokens.expires_at = Date.now() + tokens.expires_in * 1000;
      //   await storage.storeDiscordTokens(userId, tokens);
      const dat = await prisma.discordAuth.upsert({
        where: {
          userid: userId,
        },
        create: {
          userid: userId,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expires_at,
        },
        update: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expires_at,
        },
      });

      log(dat);

      return tokens.access_token;
    } else {
      throw new Error(
        `Error refreshing access token: [${response.status}] ${response.statusText}`
      );
    }
  }
  return tokens.access_token;
}

export async function getOAuthTokens(code: any) {
  const url = "https://discord.com/api/v10/oauth2/token";
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
  });

  const response = await fetch(url, {
    body,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Error fetching OAuth tokens: [${response.status}] ${response.statusText}`
    );
  }
}

export async function getUserData(tokens: Tokens) {
  const url = "https://discord.com/api/v10/oauth2/@me";
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Error fetching user data: [${response.status}] ${response.statusText}`
    );
  }
}

export async function pushMetadata(
  userId: string,
  tokens: Tokens,
  metadata: any
) {
  // PUT /users/@me/applications/:id/role-connection
  const url = `https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_CLIENT_ID}/role-connection`;
  const accessToken = await getAccessToken(userId, tokens);
  const body = {
    platform_name: "Example Linked Role Discord Bot",
    metadata,
  };
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Error pushing discord metadata: [${response.status}] ${response.statusText}`
    );
  }
}

export async function getMetadata(userId: string, tokens: Tokens) {
  // GET /users/@me/applications/:id/role-connection
  const url = `https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_CLIENT_ID}/role-connection`;
  const accessToken = await getAccessToken(userId, tokens);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(
      `Error getting discord metadata: [${response.status}] ${response.statusText}`
    );
  }
}

export async function updateMetadata(userId: string) {
  // Fetch the Discord tokens from storage
  //   const tokens = await storage.getDiscordTokens(userId);

  const tokens = await prisma.discordAuth.findUnique({
    where: {
      userid: userId,
    },
  });

  if (!tokens) {
    throw new Error("No discord tokens found for user");
  }

  try {
    const userData = await prisma.userV2.findMany({
      where: {
        connection: {
          some: {
            service: "discord",
            serviceid: userId,
          },
        },
      },
      include: {
        linkedroles: true,
      },
    });

    console.log(userData);
  } catch (e) {
    log(e);
  }

  //   const metadata = {
  //     linkedroles: userData,
  //   };

  //   //   let metadata = {};
  //   //   try {
  //   //     metadata = {
  //   //       cookieseaten: 1483,
  //   //       allergictonuts: 0, // 0 for false, 1 for true
  //   //       firstcookiebaked: "2003-12-20",
  //   //     };
  //   //   } catch (e) {
  //   //     log(e);
  //   //   }

  //   // Push the data to Discord.
  //   await pushMetadata(userId, tokens, metadata);
}
