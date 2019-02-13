import { Sprite, Texture, Container } from "pixi.js";
import { applyBaseProps } from "./mixin";

class SpriteElement extends Sprite implements RP.BaseElement {
  constructor(public root: Container, props: RP.SpriteProps) {
    super();
    this.applyProps(undefined, props);
  }

  applyProps(oldProps: RP.SpriteProps | undefined, newProps: RP.SpriteProps) {
    if (!oldProps || newProps.source !== oldProps.source) {
      if (newProps.source instanceof Texture) {
        this.texture = newProps.source;
      } else {
        this.texture = Texture.from(newProps.source);
      }
    }

    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default SpriteElement;
