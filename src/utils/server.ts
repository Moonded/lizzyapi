import fs from "node:fs";

export const readFile = (path: string) => {
  return fs.readFileSync("src/public/" + path, "utf-8");
};
