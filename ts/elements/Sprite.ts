import { Sprite, Texture } from "pixi.js";
import { applyBaseProps } from "./mixin";
import { isNil } from "lodash-es";

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

    if (!isNil(newProps.width)) {
      this.width = newProps.width;
    }
    if (!isNil(newProps.height)) {
      this.height = newProps.height;
    }
    if (!isNil(newProps.tint)) {
      this.tint = newProps.tint;
    }

    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default SpriteElement;
