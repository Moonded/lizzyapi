export function log(message: any, ...args: any[]) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    timeStyle: "medium",
  });

  console.log(`[${time}] `, message, ...args);
}

export function error(message: any, ...args: any[]) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    timeStyle: "medium",
  });

  console.error(`[${time}] `, message, ...args);
}
