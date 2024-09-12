import fs from "node:fs";

// Read filed from the public folder for hosting on the server via the api.
// Static files that do not have to be modified should be hosted via cache hosting on Digital Ocean.
export const readFile = (path: string) => {
  return fs.readFileSync("src/public/" + path, "utf-8");
};
