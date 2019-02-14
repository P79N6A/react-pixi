/// <reference path="../typings/index.d.ts" />

import { pkg } from "./utils";

export { default } from "./render";
export * from "./elements/types";
export * from "./components";

console.log(`${pkg.name}: ${pkg.version}`.toUpperCase());
