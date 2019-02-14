import { extras, Texture } from "pixi.js";
import { applyBaseProps } from "./mixin";
import { isNil } from "lodash-es";
import { getTexture } from "../utils";

class TilingSpriteElement extends extras.TilingSprite
  implements RP.BaseElement {
  constructor(public root: PIXI.Container, props: RP.TilingSpriteProps) {
    super(getTexture(props));
    this.applyProps(undefined, props);
  }

  applyProps(
    oldProps: RP.TilingSpriteProps | undefined,
    newProps: RP.TilingSpriteProps
  ) {
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
    if (!isNil(newProps.tileTransform)) {
      this.tileTransform = newProps.tileTransform;
    }
    if (!isNil(newProps.uvTransform)) {
      this.uvTransform = newProps.uvTransform;
    }
    if (!isNil(newProps.uvRespectAnchor)) {
      this.uvRespectAnchor = newProps.uvRespectAnchor;
    }
    if (!isNil(newProps.clampMargin)) {
      this.clampMargin = newProps.clampMargin;
    }
    if (!isNil(newProps.tileScale)) {
      this.tileScale.set(newProps.tileScale.x, newProps.tileScale.y);
    }
    if (!isNil(newProps.tilePosition)) {
      this.tilePosition.set(newProps.tilePosition.x, newProps.tilePosition.y);
    }
    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default TilingSpriteElement;
