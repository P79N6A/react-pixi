import { Sprite, Texture } from "pixi.js";
import { applyBaseProps } from "./mixin";

class SpriteElement extends Sprite implements RP.BaseElement {
  constructor(public root: PIXI.Container, props: RP.SpriteProps) {
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

    this.width = newProps.width || 0;
    this.height = newProps.height || 0;
    this.tint = newProps.tint || 0xffffff;

    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default SpriteElement;
