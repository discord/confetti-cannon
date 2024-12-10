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
type ConfigNumberInput = ConfigNumber;
type ConfigVector2Input = (ConfigVector2 | ConfigNumber) & {
    uniformVectorValues?: boolean;
};
type ConfigVector3Input = (ConfigVector3 | ConfigNumber) & {
    uniformVectorValues?: boolean;
};
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
export declare function getUpdatableValueNumber(config: ConfigNumber): StaticUpdatableValue | LinearUpdatableValue | OscillatingUpdatableValue;
export declare function getUpdatableValueVector2(config: ConfigVector2Input): UpdatableVector2Value;
export declare function getUpdatableValueVector3(config: ConfigVector3Input): UpdatableVector3Value;
export default function createConfetti(id: string, rawArgs: CreateConfettiArgs, spriteCanvasData: SpriteCanvasData, requestedSprite?: SpriteProp, requestedColor?: string | null): Confetti;
export {};
