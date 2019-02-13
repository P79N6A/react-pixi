import { isFunction } from "../utils";

// const DEFAULT_PROPS = {
//   alpha: 1,
//   buttonMode: false,
//   cacheAsBitmap: false,
//   cursor: null,
//   filterArea: null,
//   filters: null,
//   hitArea: null,
//   interactive: false,
//   mask: null,
//   pivot: 0,
//   position: 0,
//   renderable: true,
//   rotation: 0,
//   scale: 1,
//   skew: 0,
//   transform: null,
//   visible: true,
//   x: 0,
//   y: 0
// };

const EVENT_HANDLER_MAP: Record<
  string,
  PIXI.interaction.InteractionEventTypes
> = {
  onClick: "click",
  onMouseDown: "mousedown",
  onMouseMove: "mousemove",
  onMouseOut: "mouseout",
  onMouseOver: "mouseover",
  onMouseUp: "mouseup",
  onMouseUpOutside: "mouseupoutside",
  onTap: "tap",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend",
  onTouchendOutside: "touchendoutside",
  onTouchCancel: "touchcancel",
  onPointerCancel: "pointercancel",
  onPointerOut: "pointerout",
  onPointerOver: "pointerover",
  onPointerTap: "pointertap",
  onPointerDown: "pointerdown",
  onPointerUp: "pointerup",
  onPointerUpOutside: "pointerupoutside",
  onPointerMove: "pointermove",
  onRightClick: "rightclick",
  onRightDown: "rightdown",
  onRightUp: "rightup",
  onRightUpOutside: "rightupoutside"
};

const PROPS_RESERVED = [
  "children",
  "parent",
  "worldAlpha",
  "worldTransform",
  "worldVisible"
];

export function applyBaseProps(
  this: RP.BaseElement,
  oldProps: RP.BaseProps | undefined,
  newProps: RP.BaseProps
) {
  // update event handlers

  this.removeAllListeners();
  Object.keys(newProps)
    .filter((key) => !PROPS_RESERVED.includes(key))
    .forEach((key) => {
      const propKey = key as keyof RP.BaseProps;
      const newProp = newProps[propKey];
      const eventKey = EVENT_HANDLER_MAP[key];
      if (eventKey) {
        if (isFunction(newProp)) {
          this.on(eventKey, newProp);
        }
      } else {
        (this as any)[propKey] = newProp;
      }
    });
}
