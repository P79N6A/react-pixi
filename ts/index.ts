/// <reference path="../typings/index.d.ts" />

import { WebGLRenderer, Container } from "pixi.js";
import reconciler from "./reconciler";

interface Options {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  resolution: number;
  antialias?: boolean;
}

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
  const root = reconciler.createContainer(container, false, false);
  reconciler.updateContainer(element, root, undefined, callback);

  return function animation() {
    renderer.render(container);
  };
}

export default render;
