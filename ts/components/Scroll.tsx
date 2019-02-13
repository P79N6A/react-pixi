import React from "react";
import { Graphics } from "pixi.js";

interface Props extends RP.ContainerProps {
  width: number;
  height: number;
  backgroundColor: number;
}

class Scroll extends React.PureComponent<Props> {
  private minY = 0;
  private maxY = 0;
  private minX = 0;
  private maxX = 0;
  private startX = 0;
  private startY = 0;
  private beginX = 0;
  private beginY = 0;

  private wrapper = React.createRef<PIXI.Graphics>();
  private hitArea = new PIXI.Rectangle(
    0,
    0,
    this.props.width,
    this.props.height
  );

  private inner = React.createRef<PIXI.Container>();
  private isScrolling = false;

  public componentDidMount() {
    const wrapper = this.wrapper.current!;
    wrapper.beginFill(this.props.backgroundColor, 1);
    wrapper.drawRect(0, 0, this.props.width, this.props.height);
    wrapper.endFill();
  }

  private mask = (() => {
    const mask = new Graphics();
    mask.beginFill(0, 1);
    mask.drawRect(0, 0, this.props.width, this.props.height);
    mask.endFill();
    return mask;
  })();

  touchStart = (event: PIXI.interaction.InteractionEvent) => {
    this.isScrolling = true;
    const inner = this.inner.current!;
    const { x, y, width, height } = inner.getBounds();
    this.minY = Math.min(0, this.props.height - height);
    this.maxY = 0;
    this.minX = Math.min(0, this.props.width - width);
    this.maxX = 0;
    this.startX = event.data.global.x;
    this.startY = event.data.global.y;
    this.beginX = x;
    this.beginY = y;
  };

  touchMove = (event: PIXI.interaction.InteractionEvent) => {
    if (!this.isScrolling) return;
    const inner = this.inner.current!;
    const diffX = event.data.global.x - this.startX;
    const diffY = event.data.global.y - this.startY;

    const moveX = Math.min(Math.max(this.minX, this.beginX + diffX), this.maxX);
    const moveY = Math.min(Math.max(this.minY, this.beginY + diffY), this.maxY);

    inner.x = moveX;
    inner.y = moveY;
  };

  touchEnd = () => {
    this.isScrolling = false;
    // TODO
  };

  render() {
    return (
      <graphics
        interactive
        ref={this.wrapper}
        mask={this.mask}
        width={this.props.width}
        height={this.props.height}
        hitArea={this.hitArea}
        onPointerDown={this.touchStart}
        onPointerMove={this.touchMove}
        onPointerUp={this.touchEnd}
        onPointerUpOutside={this.touchEnd}
      >
        <container ref={this.inner}>{this.props.children}</container>
      </graphics>
    );
  }
}

export default Scroll;
