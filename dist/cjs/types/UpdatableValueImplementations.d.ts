import { UpdatableValue } from "./UpdatableValue";
import { EasingFunction } from "./easing";
export declare class StaticUpdatableValue extends UpdatableValue {
    update(): void;
    previewUpdate(): number;
}
export declare class LinearUpdatableValue extends UpdatableValue {
    addValue: number;
    constructor(value: number, addValue: number);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): number;
}
export type Direction = 1 | -1;
export declare class OscillatingUpdatableValue extends UpdatableValue {
    min: number;
    max: number;
    duration: number;
    timePassed: number;
    directionMultiplier: Direction;
    easingFunction: EasingFunction;
    constructor(value: number, min: number, max: number, duration: number, directionMultiplier: Direction, easingFunction: EasingFunction);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): number;
    doUpdate(deltaTime: number): [number, number, Direction];
}
