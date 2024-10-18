import Environment from "./Environment";
import { Vector2 } from "./Types";
import { UpdatableValue, UpdatableVector2Value, UpdatableVector3Value } from "./UpdatableValue";
type ConfettiArgs = {
    id: string;
    position: UpdatableVector2Value;
    velocity: UpdatableVector2Value;
    rotation: UpdatableVector3Value;
    size: UpdatableVector2Value;
    dragCoefficient: UpdatableVector2Value;
    opacity: UpdatableValue;
    airResistanceArea: UpdatableVector2Value;
    spriteX: number;
    spriteY: number;
    spriteWidth: number;
    spriteHeight: number;
};
export default class Confetti {
    id: string;
    position: UpdatableVector2Value;
    velocity: UpdatableVector2Value;
    rotation: UpdatableVector3Value;
    size: UpdatableVector2Value;
    dragCoefficient: UpdatableVector2Value;
    opacity: UpdatableValue;
    airResistanceArea: UpdatableVector2Value;
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
export {};
