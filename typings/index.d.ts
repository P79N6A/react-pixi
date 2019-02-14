declare module RP {
  interface Point {
    x: number;
    y: number;
  }

  interface BaseProps<T = any> extends React.Props<T> {
    alpha?: number;
    angle?: number;
    rotation?: number;
    position?: Point;
    pivot?: Point;
    scale?: Point;
    mask?: PIXI.Graphics | PIXI.Sprite;
    renderable?: boolean;
    interactive?: boolean;
    visible?: boolean;
    // buttonMode?: boolean;
    sortableChildren?: boolean;
    sortDirty?: boolean;
    filterArea?: PIXI.Rectangle;
    filters?: PIXI.Filter<any>[];
    hitArea?:
      | PIXI.Rectangle
      | PIXI.Circle
      | PIXI.Ellipse
      | PIXI.Polygon
      | PIXI.RoundedRectangle;

    skew?: Point;

    ignoreEvents?: boolean;

    onClick?(event: PIXI.interaction.InteractionEvent): void;
    onMouseDown?(event: PIXI.interaction.InteractionEvent): void;
    onMouseMove?(event: PIXI.interaction.InteractionEvent): void;
    onMouseOut?(event: PIXI.interaction.InteractionEvent): void;
    onMouseOver?(event: PIXI.interaction.InteractionEvent): void;
    onMouseUp?(event: PIXI.interaction.InteractionEvent): void;
    onMouseUpOutside?(event: PIXI.interaction.InteractionEvent): void;
    onTap?(event: PIXI.interaction.InteractionEvent): void;
    onTouchStart?(event: PIXI.interaction.InteractionEvent): void;
    onTouchMove?(event: PIXI.interaction.InteractionEvent): void;
    onTouchEnd?(event: PIXI.interaction.InteractionEvent): void;
    onTouchendOutside?(event: PIXI.interaction.InteractionEvent): void;
    onTouchCancel?(event: PIXI.interaction.InteractionEvent): void;
    onPointerCancel?(event: PIXI.interaction.InteractionEvent): void;
    onPointerOut?(event: PIXI.interaction.InteractionEvent): void;
    onPointerOver?(event: PIXI.interaction.InteractionEvent): void;
    onPointerTap?(event: PIXI.interaction.InteractionEvent): void;
    onPointerDown?(event: PIXI.interaction.InteractionEvent): void;
    onPointerUp?(event: PIXI.interaction.InteractionEvent): void;
    onPointerUpOutside?(event: PIXI.interaction.InteractionEvent): void;
    onPointerMove?(event: PIXI.interaction.InteractionEvent): void;
    onRightClick?(event: PIXI.interaction.InteractionEvent): void;
    onRightDown?(event: PIXI.interaction.InteractionEvent): void;
    onRightUp?(event: PIXI.interaction.InteractionEvent): void;
    onRightUpOutside?(event: PIXI.interaction.InteractionEvent): void;
  }

  interface BaseElement extends PIXI.Container {
    applyProps(oldProps: BaseProps | undefined, newProps: BaseProps): void;
  }

  interface TextProps extends BaseProps {
    children: string | string[];
    align?: "left" | "right" | "center";
    breakWords?: boolean;
    dropShadow?: boolean;
    dropShadowAlpha?: number;
    dropShadowAngle?: number;
    dropShadowBlur?: number;
    dropShadowColor?: string | number;
    dropShadowDistance?: number;
    fill?:
      | string
      | string[]
      | number
      | number[]
      | CanvasGradient
      | CanvasPattern;

    fillGradientType?: number;
    fillGradientStops?: number[];
    fontFamily?: string | string[];
    fontSize?: number | string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    leading?: number;
    letterSpacing?: number;
    lineHeight?: number;
    lineJoin?: string;
    miterLimit?: number;
    padding?: number;
    stroke?: string | number;
    strokeThickness?: number;
    textBaseline?: string;
    trim?: boolean;
    whiteSpace?: string;
    wordWrap?: boolean;
    wordWrapWidth?: number;
  }

  interface ContainerProps extends BaseProps {}

  interface GraphicsProps extends BaseProps {
    blendMode?: number;
    cacheAsBitmap?: boolean;
    boundsPadding?: number;
    fillAlpha?: number;
    fill?:
      | string
      | string[]
      | number
      | number[]
      | CanvasGradient
      | CanvasPattern;
    lineAlignment?: number;
    lineColor?: number;
    lineWidth?: number;
    nativeLines?: boolean;
    tint?: number;

    currentPath?: GraphicsData;
    isMask?: boolean;
    dirty?: number;
    canvasTintDirty?: number;
    fastRectDirty?: number;
    clearDirty?: number;
    boundsDirty?: number;
  }

  interface SpriteProps extends BaseProps {
    width?: number;
    height?: number;
    // texture: Texture; read from source
    source: string | PIXI.Texture;
    tint?: number;
    anchor?: Point;
    transform?: PIXI.TransformBase;
    blendMode?: number;
    pluginName?: string;
    vertexData?: Float32Array;
  }

  interface TilingSpriteProps extends SpriteProps {
    tileTransform?: TransformStatic;
    uvTransform?: TextureMatrix;
    uvRespectAnchor?: boolean;
    clampMargin?: number;
    tileScale?: Point;
    tilePosition?: Point;
  }

  interface MeshProps extends BaseProps {}

  interface RopeProps extends BaseProps {}

  interface NineSlicePlaneProps extends SpriteProps {
    leftWidth?: number;
    topHeight?: number;
    rightWidth?: number;
    bottomHeight?: number;
    blendMode?: number;
    autoUpdate?: boolean;
    cacheAsBitmap?: boolean;
    canvasPadding?: number;
    dirty?: number;
    indexDirty?: number;
    localTransform?: PIXI.Matrix;
    pluginName?: string;
    shader?: PIXI.Shader;
    tint?: number;
    tintRgb?: [number, number, number];
    transform?: PIXI.TransformBase;
    uploadUvTransform?: boolean;
    uvs?: Float32Array;
    vertexDirty?: number;
    vertices?: Float32Array;
  }

  interface ParticleContainerProps extends BaseProps {}

  interface BitmapTextProps extends BaseProps {
    align?: "left" | "middle" | "right";
    dirty?: boolean;
    font?: string;
    tint?: number;
  }

  interface IntrinsicElements {
    text: TextProps;
    container: ContainerProps;
    graphics: GraphicsProps;
    sprite: SpriteProps;
    // mesh: MeshProps;
    // rope: RopeProps;
    // "tiling-sprite": TilingSpriteProps;
    // "nine-slice-plane": NineSlicePlaneProps;
    // "particle-container": ParticleContainerProps;
    // "bitmap-text": BitmapTextProps;
  }
}

declare module JSX {
  interface IntrinsicElements {
    text: RP.TextProps;
    container: RP.ContainerProps;
    graphics: RP.GraphicsProps;
    sprite: RP.SpriteProps;
    mesh: RP.MeshProps;
    rope: RP.RopeProps;
    "tiling-sprite": RP.TilingSpriteProps;
    "nine-slice-plane": RP.NineSlicePlaneProps;
    "particle-container": RP.ParticleContainerProps;
    "bitmap-text": RP.BitmapTextProps;
  }
}
