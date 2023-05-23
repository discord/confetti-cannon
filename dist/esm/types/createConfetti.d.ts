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
type OscillatingConfig<T, Direction> = OscillatingConfigConstant<T, Direction> | OscillatingConfigRandom<T, Direction>;
type StaticConfigNumber = StaticConfig<number>;
type StaticConfigVector2 = StaticConfig<Vector2>;
type StaticConfigVector3 = StaticConfig<Vector3>;
type LinearConfigNumber = LinearConfig<number>;
type LinearConfigVector2 = LinearConfig<Vector2>;
type LinearConfigVector3 = LinearConfig<Vector3>;
type Direction = 1 | -1;
type OscillatingNumber = OscillatingConfig<number, Direction>;
type OscillatingVector2 = OscillatingConfig<Vector2, {
    x: Direction;
    y: Direction;
}>;
type OscillatingVector3 = OscillatingConfig<Vector3, {
    x: Direction;
    y: Direction;
    z: Direction;
}>;
type UpdatableValueConfigNumber = StaticConfigNumber | LinearConfigNumber | OscillatingNumber;
type UpdatableValueConfigVector2 = StaticConfigVector2 | LinearConfigVector2 | OscillatingVector2;
type UpdatableValueConfigVector3 = StaticConfigVector3 | LinearConfigVector3 | OscillatingVector3;
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
export type CreateConfettiArgsDefaults = Pick<CreateConfettiArgsFull, "velocity" | "rotation" | "dragCoefficient" | "opacity">;
export type CreateConfettiArgs = Partial<CreateConfettiArgsFull> & Pick<CreateConfettiArgsFull, "position">;
export declare function getUpdatableValueNumber(config: UpdatableValueConfigNumber): StaticUpdatableValue | LinearUpdatableValue | OscillatingUpdatableValue;
export declare function getUpdatableValueVector2(config: UpdatableValueConfigVector2): UpdatableVector2Value;
export declare function getUpdatableValueVector3(config: UpdatableValueConfigVector3): UpdatableVector3Value;
export default function createConfetti(id: string, rawArgs: CreateConfettiArgs, spriteCanvasData: SpriteCanvasData, requestedSprite?: SpriteProp, requestedColor?: string | null): Confetti;
export {};
