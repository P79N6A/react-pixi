import { Container, Graphics } from "pixi.js";
import { applyBaseProps } from "./mixin";

class GraphicsElement extends Graphics implements RP.BaseElement {
  constructor(public root: Container, props: RP.SpriteProps) {
    super();
    this.applyProps(undefined, props);
  }

  applyProps(oldProps: RP.SpriteProps | undefined, newProps: RP.SpriteProps) {
    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default GraphicsElement;
