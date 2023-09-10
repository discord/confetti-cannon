import * as React from 'react';

declare class Environment {
    gravity: number;
    wind: number;
    constructor({ gravity, wind }?: {
        gravity?: number;
        wind?: number;
    });
}

interface Vector2Template<T> {
    x: T;
    y: T;
}
interface Vector3Template<T> extends Vector2Template<T> {
    z: T;
}
type Vector2 = Vector2Template<number>;
type Vector3 = Vector3Template<number>;
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
    size: UpdatableVector2Value;
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
    size: UpdatableVector2Value;
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
    get width(): number;
    get height(): number;
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
    onReady: (listener: (isReady: boolean) => void) => void;
    isReady: boolean;
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
type ConfigVector2Input = ConfigVector2 | ConfigNumber;
type ConfigVector3Input = ConfigVector3 | ConfigNumber;
type CreateConfettiArgs = {
    id?: string;
    position: ConfigVector2Input;
    velocity?: ConfigVector2Input;
    rotation?: ConfigVector3Input;
    dragCoefficient?: ConfigVector2Input;
    size: ConfigVector2Input;
    opacity?: ConfigNumberInput;
};
declare function getUpdatableValueNumber(config: ConfigNumber): StaticUpdatableValue | LinearUpdatableValue | OscillatingUpdatableValue;
declare function getUpdatableValueVector2(config: ConfigVector2Input): UpdatableVector2Value;
declare function getUpdatableValueVector3(config: ConfigVector3Input): UpdatableVector3Value;
declare function createConfetti(id: string, rawArgs: CreateConfettiArgs, spriteCanvasData: SpriteCanvasData, requestedSprite?: SpriteProp, requestedColor?: string | null): Confetti;

type CreateConfettiArgsDefaults = Pick<Required<CreateConfettiArgs>, "velocity" | "rotation" | "dragCoefficient" | "opacity">;
declare const CREATE_CONFETTI_DEFAULTS: CreateConfettiArgsDefaults;

type ClickListener = (e: MouseEvent, confetti: Confetti | null) => void;
type MouseListener = (e: MouseEvent) => void;
interface ConfettiCanvasProps extends Omit<React.HTMLAttributes<HTMLCanvasElement>, "onClick" | "onMouseDown" | "onMouseMove" | "onMouseUp"> {
    className?: string;
    environment: Environment;
    onClick?: ClickListener;
    onMouseDown?: ClickListener;
    onMouseMove?: MouseListener;
    onMouseUp?: MouseListener;
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
    createMultipleConfetti: (createConfettiArgs: CreateConfettiArgs, numberToFire: number, createConfettiRequestedOptions?: CreateConfettiRequestedOptions) => Confetti[];
    addConfetti: (confetti: Confetti) => void;
    deleteConfetti: (id: string) => void;
    clearConfetti: () => void;
    isReady: boolean;
}
declare function useConfettiCannon(confettiCanvas: ConfettiCanvasHandle | null, spriteCanvas: SpriteCanvasHandle | null): ConfettiCannon;

export { CREATE_CONFETTI_DEFAULTS, Confetti, ConfettiCannon, _default as ConfettiCanvas, ConfettiCanvasHandle, CreateConfettiArgs, CreateConfettiArgsDefaults, CreateConfettiRequestedOptions, Direction$1 as Direction, EasingFunction, Environment, LinearUpdatableValue, OscillatingUpdatableValue, _default$1 as SpriteCanvas, SpriteCanvasHandle, SpriteProp, StaticUpdatableValue, Vector2, Vector2Template, Vector3, Vector3Template, createConfetti, easeInOutQuad, getUpdatableValueNumber, getUpdatableValueVector2, getUpdatableValueVector3, useConfettiCannon };
