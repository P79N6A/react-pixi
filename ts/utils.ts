function isNil(value: any) {
  return value == null;
}

function isFunction(fn: any): fn is (...args: any[]) => void {
  return typeof fn === "function";
}
