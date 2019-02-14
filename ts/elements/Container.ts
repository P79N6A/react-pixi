import { Container } from "pixi.js";
import { applyBaseProps } from "./mixin";

class ContainerElement extends Container implements RP.BaseElement {
  constructor(public root: PIXI.Container, props: RP.SpriteProps) {
    super();
    this.applyProps(undefined, props);
  }

  applyProps(oldProps: RP.SpriteProps | undefined, newProps: RP.SpriteProps) {
    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default ContainerElement;
