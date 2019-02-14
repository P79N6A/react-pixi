import { WebGLRenderer, Container } from "pixi.js";
import reconciler from "./reconciler";
import { pkg } from "./utils";

interface Options {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  resolution: number;
  antialias?: boolean;
}

reconciler.injectIntoDevTools({
  bundleType: 0,
  version: pkg.version,
  rendererPackageName: pkg.name
});

function render(
  element: React.ReactNode,
  options: Options,
  callback: () => void = () => null
) {
  const renderer = new WebGLRenderer({
    view: options.canvas,
    width: options.width,
    height: options.height,
    resolution: options.resolution,
    antialias: options.antialias,
    clearBeforeRender: false,
    transparent: true,
    autoResize: false
  });

  const container = new Container();
  container.width = options.width;
  container.height = options.height;

  const root = reconciler.createContainer(container, false, false);
  reconciler.updateContainer(element, root, undefined, callback);

  return function animation() {
    renderer.render(container);
  };
}

export default render;
