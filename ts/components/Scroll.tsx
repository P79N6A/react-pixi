import React from "react";

interface Props extends RP.ContainerProps {}

class Scroll extends React.PureComponent<Props> {
  private wrapper = React.createRef<PIXI.Container>();
  private inner = React.createRef<PIXI.Container>();

  private stop = true;

  public componentDidMount() {
  }

  touchStart = () => {
    this.stop = false;
    console.log("1");
  };
  touchMove = () => {
    if (this.stop) return;
    console.log("2");
  };
  touchEnd = () => {
    this.stop = true;
    console.log("3");
  };

  render() {
    return (
      <container
        ref={this.wrapper}
        interactive
        height={100}
        width={100}
        onPointerDown={this.touchStart}
        onPointerMove={this.touchMove}
        onPointerUp={this.touchEnd}
        onPointerUpOutside={this.touchEnd}
      >
        <container ref={this.inner}>{this.props.children}</container>
      </container>
    );
  }
}

export default Scroll;
