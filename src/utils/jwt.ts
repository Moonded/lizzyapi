import jwt from "jsonwebtoken";

export function createKey(
  username: string,
  user: number,
  permissions?: number,
  keyname?: string
): { key: string; permissionSet: number; name: string } {
  const permissionSet =
    0x1 |
    0x2 |
    0x4 |
    0x8 |
    0x10 |
    0x20 |
    0x40 |
    0x80 |
    0x100 |
    0x200 |
    0x400 |
    0x800 |
    0x1000 |
    0x2000;

  const name = keyname || "default";

  const key = jwt.sign(
    {
      keyName: name,
      username: username,
      permission: permissions || permissionSet,
      user: user,
    },
    process.env.API_TOKEN!
  );

  return { key, permissionSet, name };
}

export function validateKey(key: string) {
  try {
    const decode = jwt.verify(key, process.env.API_TOKEN!);
    return decode;
  } catch (e) {
    return false;
  }
}

export function decodeKey(key: string) {
  return jwt.decode(key, { complete: true });
}
