import render from "../ts";
import Scroll from "../ts/components/Scroll";
import React from "react";

class App extends React.Component {
  state = {
    num: 1
  };
  public componentDidMount() {
    setInterval(() => {
      this.setState((state) => {
        return {
          num: state.num + 1
        };
      });
    }, 2000);
  }
  public render() {
    return (
      <Scroll width={400} height={300} backgroundColor={0xff3300}>
        {Array(this.state.num)
          .fill("")
          .map((_, i) => (
            <sprite
              key={i}
              source="https://avatars2.githubusercontent.com/u/12208108?s=100&v=4"
              y={600 * i}
              x={0}
              width={600}
              height={600}
              tint={0x33ff00}
            />
          ))}
      </Scroll>
    );
  }
}

const animate = render(<App />, {
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  resolution: window.devicePixelRatio,
  canvas: (window as any).canvas
});

(function loop() {
  animate();
  requestAnimationFrame(loop);
})();
