export function keys<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export const pkg = require("../package.json");
