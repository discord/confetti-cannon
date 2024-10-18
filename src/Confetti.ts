import Environment from "./Environment";
import { Vector2 } from "./Types";
import {
  UpdatableValue,
  UpdatableVector2Value,
  UpdatableVector3Value,
} from "./UpdatableValue";
import { calculateAirResistance } from "./Utils";

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

  constructor(args: ConfettiArgs) {
    this.id = args.id;

    this.position = args.position;
    this.velocity = args.velocity;
    this.rotation = args.rotation;
    this.dragCoefficient = args.dragCoefficient;
    this.airResistanceArea = args.airResistanceArea;

    this.size = args.size;

    this.opacity = args.opacity;

    this.spriteX = args.spriteX;
    this.spriteY = args.spriteY;
    this.spriteWidth = args.spriteWidth;
    this.spriteHeight = args.spriteHeight;

    this._lastUpdatedAt = Date.now();
  }

  getNewForces(environment: Environment, deltaTime: number) {
    const windForce = environment.wind * deltaTime;
    const gravityForce = -environment.gravity * deltaTime;

    const airResistanceForceX = calculateAirResistance(
      this.dragCoefficient.x,
      this.velocity.x,
      this.airResistanceArea.x,
      environment.density
    );

    const airResistanceForceY = calculateAirResistance(
      this.dragCoefficient.y,
      this.velocity.y,
      this.airResistanceArea.y,
      environment.density
    );

    return {
      x: windForce + airResistanceForceX,
      y: gravityForce + airResistanceForceY,
    };
  }

  update(environment: Environment) {
    const newUpdateTime = Date.now();
    const deltaTime = (newUpdateTime - this._lastUpdatedAt) / 100;

    this.rotation.update(deltaTime);

    this.dragCoefficient.update(deltaTime);

    const { x: forceX, y: forceY } = this.getNewForces(environment, deltaTime);

    this.velocity.update(deltaTime);
    this.velocity.x += forceX;
    this.velocity.y += forceY;

    this.position.update(deltaTime);
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    this.size.update(deltaTime);

    this.opacity.update(deltaTime);

    this._lastUpdatedAt = newUpdateTime;
  }

  previewPositionUpdate(environment: Environment, deltaTimeMS: number) {
    const deltaTime = deltaTimeMS / 100;
    const velocity = this.velocity.previewUpdate(deltaTime);
    const { x: forceX, y: forceY } = this.getNewForces(environment, deltaTime);
    velocity.x += forceX;
    velocity.y += forceY;

    const position = this.position.previewUpdate(deltaTime);
    position.x += velocity.x * deltaTime;
    position.y += velocity.y * deltaTime;

    return position;
  }

  draw(spriteCanvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.save();

    context.globalAlpha = this.opacity.value;

    context.setTransform(
      new DOMMatrix()
        .translateSelf(
          this.position.x * global.devicePixelRatio,
          this.position.y * global.devicePixelRatio
        )
        .rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
    );

    context.drawImage(
      spriteCanvas,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      (-this.width / 2) * global.devicePixelRatio,
      (-this.height / 2) * global.devicePixelRatio,
      this.width * global.devicePixelRatio,
      this.height * global.devicePixelRatio
    );

    context.restore();
  }

  shouldDestroy(canvas: HTMLCanvasElement, environment: Environment) {
    return (
      // opacity
      this.opacity.value < 0 ||
      // top
      (environment.gravity >= 0 &&
        this.velocity.y < 0 &&
        this.position.y + this.height < 0) ||
      // bottom
      (environment.gravity <= 0 &&
        this.velocity.y > 0 &&
        this.position.y - this.height > canvas.height) ||
      // left
      (environment.wind >= 0 &&
        this.velocity.x > 0 &&
        this.position.x - this.width > canvas.width) ||
      // right
      (environment.wind <= 0 &&
        this.velocity.x < 0 &&
        this.position.x + this.width < 0)
    );
  }

  get width() {
    return this.size.x;
  }

  get height() {
    return this.size.y;
  }

  addForce(force: Vector2) {
    this.velocity.x += force.x;
    this.velocity.y += force.y;
  }
}
