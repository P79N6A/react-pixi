import Reconciler from "react-reconciler";
import createInstance from "./createInstance";

type Type = keyof RP.IntrinsicElements;
type Props = RP.BaseProps;
type Container = PIXI.Container;
type Instance = RP.BaseElement;
type TextInstance = string;
type HydratableInstance = any;
type PublicInstance = Instance | string;
type HostContext = object;
type UpdatePayload = object;
type ChildSet = Instance[];
type TimeoutHandle = number;
type NoTimeout = undefined;

const reconciler = Reconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>({
  now: Date.now,

  setTimeout,

  clearTimeout,

  noTimeout: undefined,

  supportsMutation: true,

  supportsHydration: false,

  supportsPersistence: false,

  isPrimaryRenderer: true,

  createInstance,

  appendInitialChild(parent, child) {
    if (typeof child === "string") {
      //
    } else {
      parent.addChild(child);
    }
  },

  appendChildToContainer(parent, child) {
    if (typeof child === "string") {
      //
    } else {
      parent.addChild(child);
    }
  },

  removeChild(parent, child) {
    if (typeof child === "string") {
      //
    } else {
      child.removeAllListeners();
      parent.removeChild(child);
    }
  },

  removeChildFromContainer(parent, child) {
    if (typeof child === "string") {
      //
    } else {
      child.removeAllListeners();
      parent.removeChild(child);
    }
  },

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  createTextInstance(text, rootInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(instance, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // noop
  },

  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
  ) {
    instance.applyProps(oldProps, newProps);
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return {};
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(instance) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // You can use this 'rootInstance' to pass data from the roots.
    return {};
  },

  getChildHostContext() {
    // return emptyObject;
    return {};
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  scheduleDeferredCallback(callback, options) {
    console.log("scheduleDeferredCallback", arguments);
  },

  cancelDeferredCallback(callbackID) {
    console.log("cancelDeferredCallback", arguments);
  }
});

export default reconciler;
