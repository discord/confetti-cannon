import invariant from "invariant";
import Confetti from "./Confetti";
import { CREATE_CONFETTI_DEFAULTS } from "./Constants";
import { SPRITE_SPACING } from "./ConstantsInternal";
import { Vector2, Vector3 } from "./Types";
import { UpdatableVector2Value, UpdatableVector3Value } from "./UpdatableValue";
import {
  LinearUpdatableValue,
  OscillatingUpdatableValue,
  StaticUpdatableValue,
} from "./UpdatableValueImplementations";
import {
  Sprite,
  SpriteCanvasData,
  SpriteProp,
} from "./components/SpriteCanvas";
import { EasingFunction } from "./easing";

interface StaticConfigConstant<T> {
  type: "static";
  value: T;
}

interface StaticConfigRandom<T> {
  type: "static-random";
  minValue: T;
  maxValue: T;
}

type StaticConfig<T> = StaticConfigConstant<T> | StaticConfigRandom<T>;

interface LinearConfigConstant<T> {
  type: "linear";
  value: T;
  addValue: T;
}

interface LinearConfigRandom<T> {
  type: "linear-random";
  minValue: T;
  maxValue: T;
  minAddValue: T;
  maxAddValue: T;
}

type LinearConfig<T> = LinearConfigConstant<T> | LinearConfigRandom<T>;

interface OscillatingConfigConstant<T, Direction> {
  type: "oscillating";
  value: T;
  start: T;
  final: T;
  duration: T;
  direction: Direction;
  easingFunction: EasingFunction;
}

interface OscillatingConfigRandom<T, Direction> {
  type: "oscillating-random";
  minValue: T;
  maxValue: T;
  minStart: T;
  maxStart: T;
  minFinal: T;
  maxFinal: T;
  minDuration: T;
  maxDuration: T;
  minDirection: Direction;
  maxDirection: Direction;
  easingFunctions: EasingFunction[];
}

type OscillatingConfig<T, Direction> =
  | OscillatingConfigConstant<T, Direction>
  | OscillatingConfigRandom<T, Direction>;

type StaticConfigNumber = StaticConfig<number>;
type StaticConfigVector2 = StaticConfig<Vector2>;
type StaticConfigVector3 = StaticConfig<Vector3>;

type LinearConfigNumber = LinearConfig<number>;
type LinearConfigVector2 = LinearConfig<Vector2>;
type LinearConfigVector3 = LinearConfig<Vector3>;

type Direction = 1 | -1;
type OscillatingNumber = OscillatingConfig<number, Direction>;
type OscillatingVector2 = OscillatingConfig<
  Vector2,
  { x: Direction; y: Direction }
>;
type OscillatingVector3 = OscillatingConfig<
  Vector3,
  { x: Direction; y: Direction; z: Direction }
>;

type UpdatableValueConfigNumber =
  | StaticConfigNumber
  | LinearConfigNumber
  | OscillatingNumber;
type UpdatableValueConfigVector2 =
  | StaticConfigVector2
  | LinearConfigVector2
  | OscillatingVector2;
type UpdatableValueConfigVector3 =
  | StaticConfigVector3
  | LinearConfigVector3
  | OscillatingVector3;

export interface CreateConfettiArgsFull {
  id?: string;
  position: UpdatableValueConfigVector2;
  velocity: UpdatableValueConfigVector2;
  rotation: UpdatableValueConfigVector3;
  dragCoefficient: UpdatableValueConfigVector2;
  width?: UpdatableValueConfigNumber;
  height?: UpdatableValueConfigNumber;
  size?: UpdatableValueConfigNumber;
  opacity: UpdatableValueConfigNumber;
}

export type CreateConfettiArgsDefaults = Pick<
  CreateConfettiArgsFull,
  "velocity" | "rotation" | "dragCoefficient" | "opacity"
>;

export type CreateConfettiArgs = Partial<CreateConfettiArgsFull> &
  Pick<CreateConfettiArgsFull, "position">;

type UpdatableValueConfigNumberAnnotated = UpdatableValueConfigNumber & {
  valueType: "number";
};
type UpdatableValueConfigVector2Annotated = UpdatableValueConfigVector2 & {
  valueType: "Vector2";
};
type UpdatableValueConfigVector3Annotated = UpdatableValueConfigVector3 & {
  valueType: "Vector3";
};

interface CreateConfettiArgsAnnotated extends CreateConfettiArgsFull {
  position: UpdatableValueConfigVector2Annotated;
  velocity: UpdatableValueConfigVector2Annotated;
  rotation: UpdatableValueConfigVector3Annotated;
  dragCoefficient: UpdatableValueConfigVector2Annotated;
  width?: UpdatableValueConfigNumberAnnotated;
  height?: UpdatableValueConfigNumberAnnotated;
  size?: UpdatableValueConfigNumberAnnotated;
  opacity: UpdatableValueConfigNumberAnnotated;
}

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFromList<T>(list: T[]): [T, number] {
  const index = getRandomValue(0, list.length - 1);
  const value = list[index];
  return [value, index];
}

function getRandomDirection(min: Direction, max: Direction): Direction {
  return getRandomFromList([min, max])[0];
}

function getValueNumber(config: UpdatableValueConfigNumberAnnotated) {
  switch (config.type) {
    case "static":
      return new StaticUpdatableValue(config.value);
    case "static-random":
      return new StaticUpdatableValue(
        getRandomValue(config.minValue, config.maxValue)
      );
    case "linear":
      return new LinearUpdatableValue(config.value, config.addValue);
    case "linear-random":
      return new LinearUpdatableValue(
        getRandomValue(config.minValue, config.maxValue),
        getRandomValue(config.minAddValue, config.maxAddValue)
      );
    case "oscillating":
      return new OscillatingUpdatableValue(
        config.value,
        config.start,
        config.final,
        config.duration,
        config.direction,
        config.easingFunction
      );
    case "oscillating-random":
      return new OscillatingUpdatableValue(
        getRandomValue(config.minValue, config.maxValue),
        getRandomValue(config.minStart, config.maxStart),
        getRandomValue(config.minFinal, config.maxFinal),
        getRandomValue(config.minDuration, config.maxDuration),
        getRandomDirection(config.minDirection, config.maxDirection),
        getRandomFromList(config.easingFunctions)[0]
      );
  }
}

function getValueVector2(config: UpdatableValueConfigVector2Annotated) {
  switch (config.type) {
    case "static":
      return new UpdatableVector2Value(
        new StaticUpdatableValue(config.value.x),
        new StaticUpdatableValue(config.value.y)
      );
    case "static-random":
      return new UpdatableVector2Value(
        new StaticUpdatableValue(
          getRandomValue(config.minValue.x, config.maxValue.x)
        ),
        new StaticUpdatableValue(
          getRandomValue(config.minValue.y, config.maxValue.y)
        )
      );
    case "linear":
      return new UpdatableVector2Value(
        new LinearUpdatableValue(config.value.x, config.addValue.x),
        new LinearUpdatableValue(config.value.y, config.addValue.y)
      );
    case "linear-random":
      return new UpdatableVector2Value(
        new LinearUpdatableValue(
          getRandomValue(config.minValue.x, config.maxValue.x),
          getRandomValue(config.minAddValue.x, config.maxAddValue.x)
        ),
        new LinearUpdatableValue(
          getRandomValue(config.minValue.y, config.maxValue.y),
          getRandomValue(config.minAddValue.x, config.maxAddValue.x)
        )
      );
    case "oscillating":
      return new UpdatableVector2Value(
        new OscillatingUpdatableValue(
          config.value.x,
          config.start.x,
          config.final.x,
          config.duration.x,
          config.direction.x,
          config.easingFunction
        ),
        new OscillatingUpdatableValue(
          config.value.y,
          config.start.y,
          config.final.y,
          config.duration.x,
          config.direction.y,
          config.easingFunction
        )
      );
    case "oscillating-random":
      return new UpdatableVector2Value(
        new OscillatingUpdatableValue(
          getRandomValue(config.minValue.x, config.maxValue.x),
          getRandomValue(config.minStart.x, config.maxStart.x),
          getRandomValue(config.minFinal.x, config.maxFinal.x),
          getRandomValue(config.minDuration.x, config.maxDuration.x),
          getRandomDirection(config.minDirection.x, config.maxDirection.x),
          getRandomFromList(config.easingFunctions)[0]
        ),
        new OscillatingUpdatableValue(
          getRandomValue(config.minValue.y, config.maxValue.y),
          getRandomValue(config.minStart.y, config.maxStart.y),
          getRandomValue(config.minFinal.y, config.maxFinal.y),
          getRandomValue(config.minDuration.y, config.maxDuration.y),
          getRandomDirection(config.minDirection.y, config.maxDirection.y),
          getRandomFromList(config.easingFunctions)[0]
        )
      );
  }
}

function getValueVector3(config: UpdatableValueConfigVector3Annotated) {
  switch (config.type) {
    case "static":
      return new UpdatableVector3Value(
        new StaticUpdatableValue(config.value.x),
        new StaticUpdatableValue(config.value.y),
        new StaticUpdatableValue(config.value.z)
      );
    case "static-random":
      return new UpdatableVector3Value(
        new StaticUpdatableValue(
          getRandomValue(config.minValue.x, config.maxValue.x)
        ),
        new StaticUpdatableValue(
          getRandomValue(config.minValue.y, config.maxValue.y)
        ),
        new StaticUpdatableValue(
          getRandomValue(config.minValue.z, config.maxValue.z)
        )
      );
    case "linear":
      return new UpdatableVector3Value(
        new LinearUpdatableValue(config.value.x, config.addValue.x),
        new LinearUpdatableValue(config.value.y, config.addValue.y),
        new LinearUpdatableValue(config.value.z, config.addValue.z)
      );
    case "linear-random":
      return new UpdatableVector3Value(
        new LinearUpdatableValue(
          getRandomValue(config.minValue.x, config.maxValue.x),
          getRandomValue(config.minAddValue.x, config.maxAddValue.x)
        ),
        new LinearUpdatableValue(
          getRandomValue(config.minValue.y, config.maxValue.y),
          getRandomValue(config.minAddValue.y, config.maxAddValue.y)
        ),
        new LinearUpdatableValue(
          getRandomValue(config.minValue.z, config.maxValue.z),
          getRandomValue(config.minAddValue.z, config.maxAddValue.z)
        )
      );
    case "oscillating":
      return new UpdatableVector3Value(
        new OscillatingUpdatableValue(
          config.value.x,
          config.start.x,
          config.final.x,
          config.duration.x,
          config.direction.x,
          config.easingFunction
        ),
        new OscillatingUpdatableValue(
          config.value.y,
          config.start.y,
          config.final.y,
          config.duration.z,
          config.direction.y,
          config.easingFunction
        ),
        new OscillatingUpdatableValue(
          config.value.z,
          config.start.z,
          config.final.z,
          config.duration.z,
          config.direction.z,
          config.easingFunction
        )
      );
    case "oscillating-random":
      return new UpdatableVector3Value(
        new OscillatingUpdatableValue(
          getRandomValue(config.minValue.x, config.maxValue.x),
          getRandomValue(config.minStart.x, config.maxStart.x),
          getRandomValue(config.minFinal.x, config.maxFinal.x),
          getRandomValue(config.minDuration.x, config.maxDuration.x),
          getRandomDirection(config.minDirection.x, config.maxDirection.x),
          getRandomFromList(config.easingFunctions)[0]
        ),
        new OscillatingUpdatableValue(
          getRandomValue(config.minValue.y, config.maxValue.y),
          getRandomValue(config.minStart.y, config.maxStart.y),
          getRandomValue(config.minFinal.y, config.maxFinal.y),
          getRandomValue(config.minDuration.y, config.maxDuration.y),
          getRandomDirection(config.minDirection.y, config.maxDirection.y),
          getRandomFromList(config.easingFunctions)[0]
        ),
        new OscillatingUpdatableValue(
          getRandomValue(config.minValue.z, config.maxValue.z),
          getRandomValue(config.minStart.z, config.maxStart.z),
          getRandomValue(config.minFinal.z, config.maxFinal.z),
          getRandomValue(config.minDuration.z, config.maxDuration.z),
          getRandomDirection(config.minDirection.z, config.maxDirection.z),
          getRandomFromList(config.easingFunctions)[0]
        )
      );
  }
}

function annotateArgs({
  position,
  velocity,
  rotation,
  dragCoefficient,
  width,
  height,
  size,
  opacity,
  ...args
}: CreateConfettiArgsFull): CreateConfettiArgsAnnotated {
  return {
    ...args,
    position: { ...position, valueType: "Vector2" },
    velocity: { ...velocity, valueType: "Vector2" },
    rotation: { ...rotation, valueType: "Vector3" },
    dragCoefficient: { ...dragCoefficient, valueType: "Vector2" },
    width: width != null ? { ...width, valueType: "number" } : undefined,
    height: height != null ? { ...height, valueType: "number" } : undefined,
    size: size != null ? { ...size, valueType: "number" } : undefined,
    opacity: { ...opacity, valueType: "number" },
  };
}

function provideDefaults(args: CreateConfettiArgs): CreateConfettiArgsFull {
  return {
    ...CREATE_CONFETTI_DEFAULTS,
    ...args,
  };
}

function shouldColorizeSprite(sprite: SpriteProp) {
  if (typeof sprite === "string") {
    return true;
  }
  return sprite.colorize;
}

function spriteEquals(spriteA: Sprite, spriteB: SpriteProp) {
  if (typeof spriteB === "string") {
    return spriteA.src === spriteB && spriteA.colorize;
  }
  return spriteA.src === spriteB.src && spriteA.colorize === spriteB.colorize;
}

function getSpriteWithIndex(
  requestedSprite: SpriteProp | undefined,
  spriteCanvasData: SpriteCanvasData
): [SpriteProp, number] {
  if (requestedSprite != null) {
    const index = spriteCanvasData.sprites.findIndex((sprite) =>
      spriteEquals(sprite, requestedSprite)
    );
    if (index !== -1) {
      return [requestedSprite, index];
    }
  }
  return getRandomFromList(spriteCanvasData.sprites);
}

function getColorIndex(
  sprite: SpriteProp,
  requestedColor: string | undefined | null,
  spriteCanvasData: SpriteCanvasData
) {
  if (!shouldColorizeSprite(sprite)) {
    return 0;
  }
  const index =
    requestedColor != null
      ? spriteCanvasData.colors.findIndex((color) => color === requestedColor)
      : -1;
  return index !== -1
    ? index
    : getRandomValue(0, spriteCanvasData.colors.length - 1);
}

export default function createConfetti(
  id: string,
  rawArgs: CreateConfettiArgs,
  spriteCanvasData: SpriteCanvasData,
  requestedSprite?: SpriteProp,
  requestedColor?: string | null
) {
  const fullRawArgs = provideDefaults(rawArgs);
  const args = annotateArgs(fullRawArgs);

  const size = args.size != null ? getValueNumber(args.size) : null;
  const width = args.width != null ? getValueNumber(args.width) : size;
  const height = args.height != null ? getValueNumber(args.height) : size;

  invariant(width != null, "width or size is required");
  invariant(height != null, "height or size is required");

  const [sprite, spriteIndex] = getSpriteWithIndex(
    requestedSprite,
    spriteCanvasData
  );
  const colorIndex = getColorIndex(
    requestedSprite ?? sprite,
    requestedColor,
    spriteCanvasData
  );

  return new Confetti({
    id,
    position: getValueVector2(args.position),
    velocity: getValueVector2(args.velocity),
    rotation: getValueVector3(args.rotation),
    dragCoefficient: getValueVector2(args.dragCoefficient),
    width,
    height,
    opacity: getValueNumber(args.opacity),
    spriteX:
      colorIndex * spriteCanvasData.spriteWidth + colorIndex * SPRITE_SPACING,
    spriteY:
      spriteIndex * spriteCanvasData.spriteHeight +
      spriteIndex * SPRITE_SPACING,
    spriteWidth: spriteCanvasData.spriteWidth,
    spriteHeight: spriteCanvasData.spriteHeight,
  });
}
