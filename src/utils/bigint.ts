export function bigintReplacer(key: string, value: number | bigint) {
  if (typeof value === "bigint") {
    return BigInt(value).toString();
  } else {
    return value;
  }
}
