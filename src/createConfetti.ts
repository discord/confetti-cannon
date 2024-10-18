import Confetti from "./Confetti";
import { CREATE_CONFETTI_DEFAULTS } from "./Constants";
import { SPRITE_SPACING } from "./ConstantsInternal";
import {
  SpriteProp,
  Vector2,
  Vector2Template,
  Vector3,
  Vector3Template,
} from "./Types";
import { UpdatableVector2Value, UpdatableVector3Value } from "./UpdatableValue";
import {
  LinearUpdatableValue,
  OscillatingUpdatableValue,
  StaticUpdatableValue,
} from "./UpdatableValueImplementations";
import { Sprite, SpriteCanvasData } from "./components/SpriteCanvas";
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

type Direction = 1 | -1;
type DirectionVector2 = { x: Direction; y: Direction };
type DirectionVector3 = DirectionVector2 & { z: Direction };

interface OscillatingConfigConstant<T, TDirection> {
  type: "oscillating";
  value: T;
  start: T;
  final: T;
  duration: T;
  direction: TDirection;
  easingFunction: EasingFunction;
}

interface OscillatingConfigRandom<T, TDirection> {
  type: "oscillating-random";
  minValue: T;
  maxValue: T;
  minStart: T;
  maxStart: T;
  minFinal: T;
  maxFinal: T;
  minDuration: T;
  maxDuration: T;
  minDirection: TDirection;
  maxDirection: TDirection;
  easingFunctions: EasingFunction[];
}

type OscillatingConfig<T, TDirection> =
  | OscillatingConfigConstant<T, TDirection>
  | OscillatingConfigRandom<T, TDirection>;

type Config<T, TDirection> =
  | StaticConfig<T>
  | LinearConfig<T>
  | OscillatingConfig<T, TDirection>;

type ConfigNumber = Config<number, Direction>;
type ConfigVector2 = Config<Vector2, DirectionVector2>;
type ConfigVector3 = Config<Vector3, DirectionVector3>;

type ConfigNumberInput = ConfigNumber;
type ConfigVector2Input = ConfigVector2 | ConfigNumber;
type ConfigVector3Input = ConfigVector3 | ConfigNumber;

export interface CreateConfettiArgsFull {
  id?: string;
  position: ConfigVector2;
  velocity: ConfigVector2;
  rotation: ConfigVector3;
  dragCoefficient: ConfigVector2;
  airResistanceArea?: ConfigVector2Input;
  size: ConfigNumber;
  opacity: ConfigNumber;
}

export type CreateConfettiArgs = {
  id?: string;
  position: ConfigVector2Input;
  velocity?: ConfigVector2Input;
  rotation?: ConfigVector3Input;
  dragCoefficient?: ConfigVector2Input;
  airResistanceArea?: ConfigVector2Input;
  size: ConfigVector2Input;
  opacity?: ConfigNumberInput;
};

type CreateConfettiArgsFullInput = Required<CreateConfettiArgs>;

type ConfigNumberAnnotated = ConfigNumberInput & {
  valueType: "number";
};
type ConfigVector2Annotated = ConfigVector2Input & {
  valueType: "Vector2";
};
type ConfigVector3Annotated = ConfigVector3Input & {
  valueType: "Vector3";
};

function getRandomValue(min: number, max: number) {
  if (min === max) {
    return min;
  }
  return Math.random() * (max - min + 1) + min;
}

function getRandomFromList<T>(list: T[]): [T, number] {
  const index = Math.floor(getRandomValue(0, list.length - 1));
  const value = list[index];
  return [value, index];
}

function getRandomDirection(min: Direction, max: Direction): Direction {
  return getRandomFromList([min, max])[0];
}

function getVector2<T extends number>(input: Vector2Template<T> | T) {
  if (typeof input === "number") {
    return { x: input, y: input };
  }
  return input;
}

function getVector3<T extends number>(input: Vector3Template<T> | T) {
  if (typeof input === "number") {
    return { x: input, y: input, z: input };
  }
  return input;
}

function getValueNumberAnnotated(config: ConfigNumberAnnotated) {
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

function getValueVector2Annotated(config: ConfigVector2Annotated) {
  switch (config.type) {
    case "static": {
      const value = getVector2(config.value);
      return new UpdatableVector2Value(
        new StaticUpdatableValue(value.x),
        new StaticUpdatableValue(value.y)
      );
    }
    case "static-random": {
      const minValue = getVector2(config.minValue);
      const maxValue = getVector2(config.maxValue);
      return new UpdatableVector2Value(
        new StaticUpdatableValue(getRandomValue(minValue.x, maxValue.x)),
        new StaticUpdatableValue(getRandomValue(minValue.y, maxValue.y))
      );
    }
    case "linear": {
      const value = getVector2(config.value);
      const addValue = getVector2(config.addValue);
      return new UpdatableVector2Value(
        new LinearUpdatableValue(value.x, addValue.x),
        new LinearUpdatableValue(value.y, addValue.y)
      );
    }
    case "linear-random": {
      const minValue = getVector2(config.minValue);
      const maxValue = getVector2(config.maxValue);
      const minAddValue = getVector2(config.minAddValue);
      const maxAddValue = getVector2(config.maxAddValue);
      return new UpdatableVector2Value(
        new LinearUpdatableValue(
          getRandomValue(minValue.x, maxValue.x),
          getRandomValue(minAddValue.x, maxAddValue.x)
        ),
        new LinearUpdatableValue(
          getRandomValue(minValue.y, maxValue.y),
          getRandomValue(minAddValue.x, maxAddValue.x)
        )
      );
    }
    case "oscillating": {
      const value = getVector2(config.value);
      const start = getVector2(config.start);
      const final = getVector2(config.final);
      const duration = getVector2(config.duration);
      const direction = getVector2(config.direction);
      return new UpdatableVector2Value(
        new OscillatingUpdatableValue(
          value.x,
          start.x,
          final.x,
          duration.x,
          direction.x,
          config.easingFunction
        ),
        new OscillatingUpdatableValue(
          value.y,
          start.y,
          final.y,
          duration.x,
          direction.y,
          config.easingFunction
        )
      );
    }
    case "oscillating-random": {
      const minValue = getVector2(config.minValue);
      const maxValue = getVector2(config.maxValue);
      const minStart = getVector2(config.minStart);
      const maxStart = getVector2(config.maxStart);
      const minFinal = getVector2(config.minFinal);
      const maxFinal = getVector2(config.maxFinal);
      const minDuration = getVector2(config.minDuration);
      const maxDuration = getVector2(config.maxDuration);
      const minDirection = getVector2(config.minDirection);
      const maxDirection = getVector2(config.maxDirection);
      return new UpdatableVector2Value(
        new OscillatingUpdatableValue(
          getRandomValue(minValue.x, maxValue.x),
          getRandomValue(minStart.x, maxStart.x),
          getRandomValue(minFinal.x, maxFinal.x),
          getRandomValue(minDuration.x, maxDuration.x),
          getRandomDirection(minDirection.x, maxDirection.x),
          getRandomFromList(config.easingFunctions)[0]
        ),
        new OscillatingUpdatableValue(
          getRandomValue(minValue.y, maxValue.y),
          getRandomValue(minStart.y, maxStart.y),
          getRandomValue(minFinal.y, maxFinal.y),
          getRandomValue(minDuration.y, maxDuration.y),
          getRandomDirection(minDirection.y, maxDirection.y),
          getRandomFromList(config.easingFunctions)[0]
        )
      );
    }
  }
}

function getValueVector3Annotated(config: ConfigVector3Annotated) {
  switch (config.type) {
    case "static": {
      const value = getVector3(config.value);
      return new UpdatableVector3Value(
        new StaticUpdatableValue(value.x),
        new StaticUpdatableValue(value.y),
        new StaticUpdatableValue(value.z)
      );
    }
    case "static-random": {
      const minValue = getVector3(config.minValue);
      const maxValue = getVector3(config.maxValue);
      return new UpdatableVector3Value(
        new StaticUpdatableValue(getRandomValue(minValue.x, maxValue.x)),
        new StaticUpdatableValue(getRandomValue(minValue.y, maxValue.y)),
        new StaticUpdatableValue(getRandomValue(minValue.z, maxValue.z))
      );
    }
    case "linear": {
      const value = getVector3(config.value);
      const addValue = getVector3(config.addValue);
      return new UpdatableVector3Value(
        new LinearUpdatableValue(value.x, addValue.x),
        new LinearUpdatableValue(value.y, addValue.y),
        new LinearUpdatableValue(value.z, addValue.z)
      );
    }
    case "linear-random": {
      const minValue = getVector3(config.minValue);
      const maxValue = getVector3(config.maxValue);
      const minAddValue = getVector3(config.minAddValue);
      const maxAddValue = getVector3(config.maxAddValue);
      return new UpdatableVector3Value(
        new LinearUpdatableValue(
          getRandomValue(minValue.x, maxValue.x),
          getRandomValue(minAddValue.x, maxAddValue.x)
        ),
        new LinearUpdatableValue(
          getRandomValue(minValue.y, maxValue.y),
          getRandomValue(minAddValue.y, maxAddValue.y)
        ),
        new LinearUpdatableValue(
          getRandomValue(minValue.z, maxValue.z),
          getRandomValue(minAddValue.z, maxAddValue.z)
        )
      );
    }
    case "oscillating": {
      const value = getVector3(config.value);
      const start = getVector3(config.start);
      const final = getVector3(config.final);
      const duration = getVector3(config.duration);
      const direction = getVector3(config.direction);
      return new UpdatableVector3Value(
        new OscillatingUpdatableValue(
          value.x,
          start.x,
          final.x,
          duration.x,
          direction.x,
          config.easingFunction
        ),
        new OscillatingUpdatableValue(
          value.y,
          start.y,
          final.y,
          duration.z,
          direction.y,
          config.easingFunction
        ),
        new OscillatingUpdatableValue(
          value.z,
          start.z,
          final.z,
          duration.z,
          direction.z,
          config.easingFunction
        )
      );
    }
    case "oscillating-random": {
      const minValue = getVector3(config.minValue);
      const maxValue = getVector3(config.maxValue);
      const minStart = getVector3(config.minStart);
      const maxStart = getVector3(config.maxStart);
      const minFinal = getVector3(config.minFinal);
      const maxFinal = getVector3(config.maxFinal);
      const minDuration = getVector3(config.minDuration);
      const maxDuration = getVector3(config.maxDuration);
      const minDirection = getVector3(config.minDirection);
      const maxDirection = getVector3(config.maxDirection);
      return new UpdatableVector3Value(
        new OscillatingUpdatableValue(
          getRandomValue(minValue.x, maxValue.x),
          getRandomValue(minStart.x, maxStart.x),
          getRandomValue(minFinal.x, maxFinal.x),
          getRandomValue(minDuration.x, maxDuration.x),
          getRandomDirection(minDirection.x, maxDirection.x),
          getRandomFromList(config.easingFunctions)[0]
        ),
        new OscillatingUpdatableValue(
          getRandomValue(minValue.y, maxValue.y),
          getRandomValue(minStart.y, maxStart.y),
          getRandomValue(minFinal.y, maxFinal.y),
          getRandomValue(minDuration.y, maxDuration.y),
          getRandomDirection(minDirection.y, maxDirection.y),
          getRandomFromList(config.easingFunctions)[0]
        ),
        new OscillatingUpdatableValue(
          getRandomValue(minValue.z, maxValue.z),
          getRandomValue(minStart.z, maxStart.z),
          getRandomValue(minFinal.z, maxFinal.z),
          getRandomValue(minDuration.z, maxDuration.z),
          getRandomDirection(minDirection.z, maxDirection.z),
          getRandomFromList(config.easingFunctions)[0]
        )
      );
    }
  }
}

function provideDefaults(
  args: CreateConfettiArgs,
  id: string
): CreateConfettiArgsFullInput {
  return {
    id,
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
    : Math.floor(getRandomValue(0, spriteCanvasData.colors.length - 1));
}

export function getUpdatableValueNumber(config: ConfigNumber) {
  return getValueNumberAnnotated({ ...config, valueType: "number" });
}

export function getUpdatableValueVector2(config: ConfigVector2Input) {
  return getValueVector2Annotated({ ...config, valueType: "Vector2" });
}

export function getUpdatableValueVector3(config: ConfigVector3Input) {
  return getValueVector3Annotated({ ...config, valueType: "Vector3" });
}

export default function createConfetti(
  id: string,
  rawArgs: CreateConfettiArgs,
  spriteCanvasData: SpriteCanvasData,
  requestedSprite?: SpriteProp,
  requestedColor?: string | null
) {
  const args = provideDefaults(rawArgs, id);

  const size = getUpdatableValueVector2(args.size);

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
    position: getUpdatableValueVector2(args.position),
    velocity: getUpdatableValueVector2(args.velocity),
    rotation: getUpdatableValueVector3(args.rotation),
    dragCoefficient: getUpdatableValueVector2(args.dragCoefficient),
    size,
    opacity: getUpdatableValueNumber(args.opacity),
    airResistanceArea: getUpdatableValueVector2(args.airResistanceArea),
    spriteX:
      colorIndex * spriteCanvasData.spriteWidth + colorIndex * SPRITE_SPACING,
    spriteY:
      spriteIndex * spriteCanvasData.spriteHeight +
      spriteIndex * SPRITE_SPACING,
    spriteWidth: spriteCanvasData.spriteWidth,
    spriteHeight: spriteCanvasData.spriteHeight,
  });
}
