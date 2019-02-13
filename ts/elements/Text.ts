import { Text, Container } from "pixi.js";

class SpriteElement extends Text implements RP.BaseElement {
  constructor(public root: Container, props: RP.TextProps) {
    super();
    this.applyProps(undefined, props);
  }

  applyProps(oldProps: RP.TextProps | undefined, newProps: RP.TextProps) {
    if (!oldProps || newProps.children !== oldProps.children) {
      let str = newProps.children;
      if (Array.isArray(str)) {
        str = str.join("\n");
      }
      this.text = str;
    }
  }
}

export default SpriteElement;
