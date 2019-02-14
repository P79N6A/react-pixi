import render, { Sprite, List, Container } from "../ts";
import React from "react";
import { times } from "lodash-es";

class App extends React.Component {
  state = {
    num: 30
  };

  public render() {
    return (
      <List
        data={times(1000)}
        height={600}
        width={300}
        keyExtractor={(item) => item}
        getItemLayout={(item, index) => ({
          length: 100,
          offset: 100 * index,
          index
        })}
        renderItem={() => {
          return (
            <Container>
              <Sprite
                source="https://avatars2.githubusercontent.com/u/12208108?s=200&v=4"
                width={100}
                height={100}
                position={{ x: 0, y: 0 }}
              />

              <Sprite
                source="https://avatars2.githubusercontent.com/u/12208108?s=200&v=4"
                width={100}
                height={100}
                position={{ x: 200, y: 0 }}
              />
            </Container>
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
