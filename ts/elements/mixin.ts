import { keys } from "../utils";
import { isNil } from "lodash-es";

const POINT_KEYS_MAP = {
  pivot: "pivot",
  scale: "scale",
  skew: "skew",
  position: "position"
};

const EVENT_KEY_MAP = {
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

export function applyBaseProps(
  this: RP.BaseElement,
  oldProps: RP.BaseProps = {},
  newProps: RP.BaseProps
) {
  // common
  this.mask = newProps.mask || null;
  this.alpha = isNil(newProps.alpha) ? 1 : newProps.alpha;

  if (newProps.hitArea) {
    this.hitArea = newProps.hitArea;
  }

  // point
  keys(POINT_KEYS_MAP).forEach((key) => {
    const point = newProps[key];
    if (point) this[key].set(point.x, point.y);
  });

  this.interactive = newProps.interactive || false;

  // event
  keys(EVENT_KEY_MAP).forEach((key) => {
    const newHandler = newProps[key];
    const oldHandler = oldProps[key];
    if (newHandler === oldHandler) return;
    const eventName = EVENT_KEY_MAP[key];
    if (oldHandler) this.off(eventName, oldHandler);
    if (newHandler) this.on(eventName, newHandler);
  });
}
