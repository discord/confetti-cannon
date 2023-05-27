import Confetti from "./Confetti";
import { SpriteProp, Vector2, Vector3 } from "./Types";
import { UpdatableVector2Value, UpdatableVector3Value } from "./UpdatableValue";
import { LinearUpdatableValue, OscillatingUpdatableValue, StaticUpdatableValue } from "./UpdatableValueImplementations";
import { SpriteCanvasData } from "./components/SpriteCanvas";
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
type DirectionVector2 = {
    x: Direction;
    y: Direction;
};
type DirectionVector3 = DirectionVector2 & {
    z: Direction;
};
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
type OscillatingConfig<T, TDirection> = OscillatingConfigConstant<T, TDirection> | OscillatingConfigRandom<T, TDirection>;
type Config<T, TDirection> = StaticConfig<T> | LinearConfig<T> | OscillatingConfig<T, TDirection>;
type ConfigNumber = Config<number, Direction>;
type ConfigVector2 = Config<Vector2, DirectionVector2>;
type ConfigVector3 = Config<Vector3, DirectionVector3>;
type UpdatableValueConfigNumber = ConfigNumber;
type UpdatableValueConfigVector2 = ConfigVector2;
type UpdatableValueConfigVector3 = ConfigVector3;
type UpdatableValueConfigNumberInput = ConfigNumber;
type UpdatableValueConfigVector2Input = ConfigNumber | ConfigVector2;
type UpdatableValueConfigVector3Input = ConfigNumber | ConfigVector3;
export interface CreateConfettiArgsFull {
    id?: string;
    position: UpdatableValueConfigVector2;
    velocity: UpdatableValueConfigVector2;
    rotation: UpdatableValueConfigVector3;
    dragCoefficient: UpdatableValueConfigVector2;
    size: UpdatableValueConfigNumber;
    opacity: UpdatableValueConfigNumber;
}
export type CreateConfettiArgs = {
    id?: string;
    position: UpdatableValueConfigVector2Input;
    velocity?: UpdatableValueConfigVector2Input;
    rotation?: UpdatableValueConfigVector3Input;
    dragCoefficient?: UpdatableValueConfigVector2Input;
    size: UpdatableValueConfigVector2Input;
    opacity?: UpdatableValueConfigNumberInput;
};
export declare function getUpdatableValueNumber(config: UpdatableValueConfigNumber): StaticUpdatableValue | LinearUpdatableValue | OscillatingUpdatableValue;
export declare function getUpdatableValueVector2(config: UpdatableValueConfigVector2Input): UpdatableVector2Value;
export declare function getUpdatableValueVector3(config: UpdatableValueConfigVector3Input): UpdatableVector3Value;
export default function createConfetti(id: string, rawArgs: CreateConfettiArgs, spriteCanvasData: SpriteCanvasData, requestedSprite?: SpriteProp, requestedColor?: string | null): Confetti;
export {};
