import * as React from 'react';

declare class Environment {
    gravity: number;
    wind: number;
    constructor({ gravity, wind }?: {
        gravity?: number;
        wind?: number;
    });
}

interface Vector2 {
    x: number;
    y: number;
}
interface Vector3 extends Vector2 {
    z: number;
}
type SpriteProp = {
    src: string;
    colorize: boolean;
} | string;

declare abstract class UpdatableValue {
    value: number;
    constructor(value: number);
    abstract update(deltaTime: number): void;
    abstract previewUpdate(deltaTime: number): number;
}
declare class UpdatableVector2Value {
    _x: UpdatableValue;
    _y: UpdatableValue;
    constructor(x: UpdatableValue, y: UpdatableValue);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): {
        x: number;
        y: number;
    };
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
}
declare class UpdatableVector3Value extends UpdatableVector2Value {
    _z: UpdatableValue;
    constructor(x: UpdatableValue, y: UpdatableValue, z: UpdatableValue);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): {
        z: number;
        x: number;
        y: number;
    };
    get z(): number;
    set z(z: number);
}

type ConfettiArgs = {
    id: string;
    position: UpdatableVector2Value;
    velocity: UpdatableVector2Value;
    rotation: UpdatableVector3Value;
    width: UpdatableValue;
    height: UpdatableValue;
    dragCoefficient: UpdatableVector2Value;
    opacity: UpdatableValue;
    spriteX: number;
    spriteY: number;
    spriteWidth: number;
    spriteHeight: number;
};
declare class Confetti {
    id: string;
    position: UpdatableVector2Value;
    velocity: UpdatableVector2Value;
    rotation: UpdatableVector3Value;
    width: UpdatableValue;
    height: UpdatableValue;
    dragCoefficient: UpdatableVector2Value;
    opacity: UpdatableValue;
    spriteX: number;
    spriteY: number;
    spriteWidth: number;
    spriteHeight: number;
    _lastUpdatedAt: number;
    constructor(args: ConfettiArgs);
    getNewForces(environment: Environment, deltaTime: number): {
        x: number;
        y: number;
    };
    update(environment: Environment): void;
    previewPositionUpdate(environment: Environment, deltaTimeMS: number): {
        x: number;
        y: number;
    };
    draw(spriteCanvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
    shouldDestroy(canvas: HTMLCanvasElement, environment: Environment): boolean;
    addForce(force: Vector2): void;
}

type EasingFunction = (timePassed: number, startValue: number, changeInValue: number, totalDuration: number) => number;
declare const easeInOutQuad: EasingFunction;

declare class StaticUpdatableValue extends UpdatableValue {
    update(): void;
    previewUpdate(): number;
}
declare class LinearUpdatableValue extends UpdatableValue {
    addValue: number;
    constructor(value: number, addValue: number);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): number;
}
type Direction$1 = 1 | -1;
declare class OscillatingUpdatableValue extends UpdatableValue {
    min: number;
    max: number;
    duration: number;
    timePassed: number;
    directionMultiplier: Direction$1;
    easingFunction: EasingFunction;
    constructor(value: number, min: number, max: number, duration: number, directionMultiplier: Direction$1, easingFunction: EasingFunction);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): number;
    doUpdate(deltaTime: number): [number, number, Direction$1];
}

interface Sprite {
    image: HTMLImageElement;
    colorize: boolean;
    src: string;
}
interface SpriteCanvasProps {
    className?: string;
    visible?: boolean;
    sprites: SpriteProp[];
    colors: string[];
    spriteWidth: number;
    spriteHeight: number;
}
interface SpriteCanvasData {
    sprites: Sprite[];
    colors: string[];
    spriteWidth: number;
    spriteHeight: number;
}
interface SpriteCanvasHandle {
    getCanvas: () => HTMLCanvasElement | null;
    getCreateData: () => SpriteCanvasData;
}
declare const _default$1: React.ForwardRefExoticComponent<SpriteCanvasProps & React.RefAttributes<SpriteCanvasHandle>>;

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
interface CreateConfettiArgsFull {
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
type CreateConfettiArgsDefaults = Pick<CreateConfettiArgsFull, "velocity" | "rotation" | "dragCoefficient" | "opacity">;
type CreateConfettiArgs = Partial<CreateConfettiArgsFull> & Pick<CreateConfettiArgsFull, "position">;
declare function getUpdatableValueNumber(config: UpdatableValueConfigNumber): StaticUpdatableValue | LinearUpdatableValue | OscillatingUpdatableValue;
declare function getUpdatableValueVector2(config: UpdatableValueConfigVector2): UpdatableVector2Value;
declare function getUpdatableValueVector3(config: UpdatableValueConfigVector3): UpdatableVector3Value;
declare function createConfetti(id: string, rawArgs: CreateConfettiArgs, spriteCanvasData: SpriteCanvasData, requestedSprite?: SpriteProp, requestedColor?: string | null): Confetti;

declare const CREATE_CONFETTI_DEFAULTS: CreateConfettiArgsDefaults;

interface ConfettiCanvasProps extends Omit<React.HTMLAttributes<HTMLCanvasElement>, "onClick" | "onMouseDown"> {
    className?: string;
    environment: Environment;
    onClick?: (e: React.MouseEvent, confetti: Confetti | null) => void;
    onMouseDown?: (e: React.MouseEvent, confetti: Confetti | null) => void;
    onBeforeRender?: (context: CanvasRenderingContext2D) => void;
    onAfterRender?: (context: CanvasRenderingContext2D) => void;
}
interface ConfettiCanvasHandle {
    createConfetti: (args: CreateConfettiArgs, spriteCanvas: HTMLCanvasElement, SpriteCanvasData: SpriteCanvasData, sprite?: SpriteProp, color?: string | null) => Confetti;
    addConfetti: (confetti: Confetti, spriteCanvas: HTMLCanvasElement) => void;
    deleteConfetti: (id: string) => void;
    clearConfetti: () => void;
    getCanvas: () => HTMLCanvasElement | null;
}
declare const _default: React.ForwardRefExoticComponent<ConfettiCanvasProps & React.RefAttributes<ConfettiCanvasHandle>>;

interface CreateConfettiRequestedOptions {
    sprite?: SpriteProp;
    color?: string;
}
interface ConfettiCannon {
    createConfetti: (createConfettiArgs: CreateConfettiArgs, createConfettiRequestedOptions?: CreateConfettiRequestedOptions) => Confetti | undefined;
    createMultipleConfetti: (createConfettiArgs: CreateConfettiArgs, numberToFire: number) => Confetti[];
    addConfetti: (confetti: Confetti) => void;
    deleteConfetti: (id: string) => void;
    clearConfetti: () => void;
}
declare function useConfettiCannon(confettiCanvas: React.RefObject<ConfettiCanvasHandle>, spriteCanvas: React.RefObject<SpriteCanvasHandle>): ConfettiCannon;

export { CREATE_CONFETTI_DEFAULTS, Confetti, ConfettiCannon, _default as ConfettiCanvas, CreateConfettiArgs, Direction$1 as Direction, EasingFunction, Environment, LinearUpdatableValue, OscillatingUpdatableValue, _default$1 as SpriteCanvas, SpriteProp, StaticUpdatableValue, Vector2, Vector3, createConfetti, easeInOutQuad, getUpdatableValueNumber, getUpdatableValueVector2, getUpdatableValueVector3, useConfettiCannon };
