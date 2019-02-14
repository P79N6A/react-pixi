import { Graphics } from "pixi.js";
import { applyBaseProps } from "./mixin";

class GraphicsElement extends Graphics implements RP.BaseElement {
  constructor(public root: PIXI.Container, props: RP.BaseProps) {
    super();
    this.applyProps(undefined, props);
  }

  applyProps(oldProps: RP.BaseProps | undefined, newProps: RP.BaseProps) {
    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default GraphicsElement;
