import { Texture } from "pixi.js";

export function keys<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export const pkg = require("../package.json");

export function getTexture(props: { source: string | Texture }) {
  if (props.source instanceof Texture) {
    return props.source;
  } else {
    return Texture.from(props.source);
  }
}
