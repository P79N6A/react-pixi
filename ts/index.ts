/// <reference path="../typings/index.d.ts" />

import { pkg } from "./utils";

export { default } from "./render";

export const Sprite = "sprite";
export const Container = "container";
export const Graphics = "container";

console.log(`${pkg.name}: ${pkg.version}`.toUpperCase());
