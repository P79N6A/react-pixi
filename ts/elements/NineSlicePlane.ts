import { mesh, Texture } from "pixi.js";
import { applyBaseProps } from "./mixin";
import { isNil } from "lodash-es";
import { getTexture } from "../utils";

class NineSlicePlaneElement extends mesh.NineSlicePlane
  implements RP.BaseElement {
  constructor(public root: PIXI.Container, props: RP.NineSlicePlaneProps) {
    super(getTexture(props));
    this.applyProps(undefined, props);
  }

  applyProps(
    oldProps: RP.NineSlicePlaneProps | undefined,
    newProps: RP.NineSlicePlaneProps
  ) {
    if (!isNil(newProps.topHeight)) {
      this.topHeight = newProps.topHeight;
    }
    if (!isNil(newProps.bottomHeight)) {
      this.bottomHeight = newProps.bottomHeight;
    }
    if (!isNil(newProps.leftWidth)) {
      this.leftWidth = newProps.leftWidth;
    }
    if (!isNil(newProps.rightWidth)) {
      this.rightWidth = newProps.rightWidth;
    }

    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default NineSlicePlaneElement;
