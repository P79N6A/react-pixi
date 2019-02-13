import render from "../ts";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <sprite
        source="https://avatars2.githubusercontent.com/u/12208108?s=100&v=4"
        width={100}
        height={100}
        tint={0x33ff00}
      />
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
