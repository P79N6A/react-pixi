import * as ELEMENTS from "./elements";

function createInstance<T extends keyof RP.IntrinsicElements>(
  type: T,
  props: RP.IntrinsicElements[T],
  root: PIXI.Container
) {
  const Element = (ELEMENTS as any)[type];
  return new Element(root, props);
}

export default createInstance;
