import React from "react";
import { Graphics } from "pixi.js";
import { inRange } from "../utils";

interface Props extends RP.ContainerProps {
  width: number;
  height: number;
  direction?: "vertical" | "horizontal" | "both";
  contentHeight?: number;
  contentWidth?: number;
  onScroll?(x: number, y: number): void;
}

class Scroll extends React.PureComponent<Props> {
  static defaultProps = {
    direction: "vertical"
  };

  private readonly maxY = 0;
  private readonly maxX = 0;
  private minY = 0;
  private minX = 0;
  private diffX = 0;
  private diffY = 0;
  private startX = 0;
  private startY = 0;
  private beginX = 0;
  private beginY = 0;
  private startT = 0;
  private frame = 0;

  private wrapper = React.createRef<PIXI.Graphics>();
  private inner = React.createRef<PIXI.Container>();

  public componentDidMount() {
    const wrapper = this.wrapper.current!;
    wrapper.drawRect(0, 0, this.props.width, this.props.height);
    wrapper.endFill();
  }

  public render() {
    return (
      <graphics
        interactive
        ref={this.wrapper}
        mask={this.mask}
        width={this.props.width}
        height={this.props.height}
        hitArea={this.hitArea}
        onPointerDown={this.touchStart}
        onPointerUp={this.touchEnd}
        onPointerUpOutside={this.touchEnd}
      >
        <container ref={this.inner}>{this.props.children}</container>
      </graphics>
    );
  }

  private get mask() {
    const mask = new Graphics();
    mask.beginFill(0, 1);
    mask.drawRect(0, 0, this.props.width, this.props.height);
    mask.endFill();
    return mask;
  }

  private get hitArea() {
    return new PIXI.Rectangle(0, 0, this.props.width, this.props.height);
  }

  private touchStart = (event: PIXI.interaction.InteractionEvent) => {
    cancelAnimationFrame(this.frame);
    const wrapper = this.wrapper.current!;
    const inner = this.inner.current!;

    let contentHeight = 0;
    let contentWidth = 0;

    if (this.props.contentWidth) {
      contentWidth = this.props.contentWidth;
    } else {
      const { x, width } = inner.getBounds();
      contentWidth = x + width;
    }

    if (this.props.contentHeight) {
      contentHeight = this.props.contentHeight;
    } else {
      const { y, height } = inner.getBounds();
      contentHeight = y + height;
    }

    this.startT = Date.now();
    if (this.props.direction !== "vertical") {
      this.minX = Math.min(0, this.props.width - contentWidth);
    }
    if (this.props.direction !== "horizontal") {
      this.minY = Math.min(0, this.props.height - contentHeight);
    }
    this.startX = event.data.global.x;
    this.startY = event.data.global.y;
    this.beginX = inner.x;
    this.beginY = inner.y;
    wrapper.on("pointermove", this.touchMove);
  };

  private touchMove = (event: PIXI.interaction.InteractionEvent) => {
    const inner = this.inner.current!;
    this.diffX = event.data.global.x - this.startX;
    this.diffY = event.data.global.y - this.startY;
    let x = inner.x;
    let y = inner.y;
    if (this.props.direction !== "vertical") {
      x = inRange(this.beginX + this.diffX, this.minX, this.maxX);
    }
    if (this.props.direction !== "horizontal") {
      y = inRange(this.beginY + this.diffY, this.minY, this.maxY);
    }

    inner.position.set(x, y);
    this.emitScroll();
    if (Date.now() - this.startT > 300) {
      this.touchStart(event);
    }
  };

  private touchEnd = () => {
    const wrapper = this.wrapper.current!;
    const diffT = Date.now() - this.startT;
    if (diffT <= 300) {
      const speedX = this.diffX / diffT;
      const speedY = this.diffY / diffT;
      this.ease("x", speedX);
      this.ease("y", speedY);
    }
    this.diffX = 0;
    this.diffY = 0;
    this.startT = Date.now();
    wrapper.off("pointermove", this.touchMove);
  };

  ease = (direction: "x" | "y", speed: number) => {
    if (speed === 0) return;
    const inner = this.inner.current!;
    const f = Math.min(Math.abs(speed) / 32, 0.5);
    const max = direction === "x" ? this.maxX : this.maxY;
    const min = direction === "x" ? this.minX : this.minY;
    if (speed > 0.01) {
      speed -= f;
    } else if (speed < -0.01) {
      speed += f;
    } else {
      return;
    }
    const v = inner[direction] + speed * 24;
    inner[direction] = inRange(v, min, max);
    this.frame = requestAnimationFrame(() => this.ease(direction, speed));
    this.emitScroll();
  };

  private emitScroll() {
    if (this.props.onScroll) {
      const inner = this.inner.current!;
      this.props.onScroll(inner.position.x, inner.position.y);
    }
  }
}

export default Scroll;
