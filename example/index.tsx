import render, { Sprite, Scroll, List } from "../ts";
import React from "react";

class App extends React.Component {
  state = {
    num: 30
  };

  public render() {
    return (
      <List
        data={Array(100)
          .fill(0)
          .map((_, i) => i)}
        height={300}
        width={300}
        keys={(item) => item}
        getItemLayout={(item, index) => ({
          length: 100,
          offset: 100 * index,
          index
        })}
        renderItem={(item) => {
          return (
            <Sprite
              source="https://avatars2.githubusercontent.com/u/12208108?s=100&v=4"
              width={100}
              height={100}
            />
          );
        }}
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
