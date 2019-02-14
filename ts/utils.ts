export const pkg = require("../package.json");

export function isNil<T>(
  value: T | undefined | null
): value is undefined | null {
  return value == null;
}

export function isFunction(fn: any): fn is (...args: any[]) => void {
  return typeof fn === "function";
}

export function keys<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function map<T extends Array<any>>(
  arr: T,
  handler: (item: keyof T, index: number) => void
) {
  return arr.forEach(handler);
}

export function isPointType(
  value: any
): value is PIXI.Point | PIXI.ObservablePoint {
  return value instanceof PIXI.Point || value instanceof PIXI.ObservablePoint;
}

export function parsePoint(value: any): number[] {
  let arr: any[] = [];

  if (typeof value === "undefined") {
    return arr;
  } else if (typeof value === "string") {
    arr = value.split(",").map(Number);
  } else if (typeof value === "number") {
    arr = [value];
  } else if (Array.isArray(value)) {
    arr = [...value];
  } else if (value !== null && typeof value === "object") {
    const x = (value && value.x) || 0;
    const y = (value && value.y) || 0;
    arr = [x, y];
  } else {
    return arr;
  }

  return arr.filter((p) => !isNil(p) && !isNaN(p)).map(Number);
}

export function setValue(
  instance: RP.BaseElement,
  prop: keyof RP.BaseElement,
  value: any
) {
  const instanceProp = instance[prop];
  if (isPointType(instanceProp)) {
    if (isPointType(value)) {
      // copy value
      instanceProp.copy(value);
    } else {
      // parse value if a non-Point type is being assigned to a Point type
      const coordinates = parsePoint(value);
      instanceProp.set(coordinates.shift(), coordinates.shift());
    }
  } else {
    // just hard assign value
    instance[prop] = value;
  }
}

export function inRange(value: number, min: number, max: number) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}
