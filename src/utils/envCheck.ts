function envCheck(env: string) {
  if (process.env[env] !== undefined && process.env[env] !== null && Object.keys(process.env["DISCORD_CLIENT_SECRET"] as string).length !== 0) {
    return true;
  } else {
    return false;
  }
}

export function checkENVS() {
  const envs = [
    "API_TOKEN",
    "API_RATE_WINDOW",
    "API_MAX_REQUESTS",
    "CLIENT_TOKEN",
    "GITHUB_APP_KEY_FILE",
    "GITHUB_APP_ID",
    "GITHUB_INSTALLATION_ID",
    "DISCORD_CLIENT_ID",
    "DISCORD_CLIENT_SECRET",
    "DISCORD_REDIRECT_URI",
    "GITHUB_CLIENT_ID",
    "GITHUB_REDIRECT_URI",
    "GITHUB_CLIENT_SECRET",
    "NODE_ENV",
  ];

  envs.forEach((element) => {
    if (envCheck(element) === false) {
      throw new Error(`Environment Variable: ${element} is not set.`);
    }
  });
}
