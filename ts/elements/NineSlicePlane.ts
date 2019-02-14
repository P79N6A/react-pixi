import { mesh, Texture } from "pixi.js";
import { applyBaseProps } from "./mixin";

function getTexture(props: RP.NineSlicePlaneProps) {
  if (props.source instanceof Texture) {
    return props.source;
  } else {
    return Texture.from(props.source);
  }
}

class NineSlicePlaneElement extends mesh.NineSlicePlane
  implements RP.BaseElement {
  constructor(public root: PIXI.Container, props: RP.NineSlicePlaneProps) {
    super(
      getTexture(props),
      props.topHeight,
      props.bottomHeight,
      props.leftWidth,
      props.rightWidth
    );
  }

  applyProps(
    oldProps: RP.NineSlicePlaneProps | undefined,
    newProps: RP.NineSlicePlaneProps
  ) {
    this.topHeight = newProps.topHeight || 10;
    this.bottomHeight = newProps.bottomHeight || 10;
    this.leftWidth = newProps.leftWidth || 10;
    this.rightWidth = newProps.rightWidth || 10;

    applyBaseProps.call(this, oldProps, newProps);
  }
}

export default NineSlicePlaneElement;
