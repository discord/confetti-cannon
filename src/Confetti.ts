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
  width: UpdatableValue;
  height: UpdatableValue;
  dragCoefficient: UpdatableValue;
  opacity: UpdatableValue;

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
  width: UpdatableValue;
  height: UpdatableValue;
  dragCoefficient: UpdatableValue;
  opacity: UpdatableValue;

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

    this.width = args.width;
    this.height = args.height;

    this.opacity = args.opacity;

    this.spriteX = args.spriteX;
    this.spriteY = args.spriteY;
    this.spriteWidth = args.spriteWidth;
    this.spriteHeight = args.spriteHeight;

    this._lastUpdatedAt = Date.now();
  }

  update(environment: Environment) {
    const newUpdateTime = Date.now();
    const deltaTime = (newUpdateTime - this._lastUpdatedAt) / 100;

    this.rotation.update(deltaTime);

    this.dragCoefficient.update(deltaTime);

    const gravityForce = -environment.gravity * deltaTime;
    const windForce = environment.wind * deltaTime;

    const airResistanceMultiplierY = this.velocity.y > 0 ? -1 : 1;
    const airResistanceForceY = calculateAirResistance(
      gravityForce,
      this.dragCoefficient.value,
      this.velocity.y,
      airResistanceMultiplierY
    );

    const airResistanceMultiplierX = this.velocity.x > 0 ? -1 : 1;
    const airResistanceForceX = calculateAirResistance(
      windForce,
      this.dragCoefficient.value,
      this.velocity.x,
      airResistanceMultiplierX
    );

    this.velocity.update(deltaTime);
    this.velocity.y += gravityForce + airResistanceForceY;
    this.velocity.x += windForce + airResistanceForceX;

    this.position.update(deltaTime);
    this.position.y += this.velocity.y * deltaTime;
    this.position.x += this.velocity.x * deltaTime;

    this.width.update(deltaTime);
    this.height.update(deltaTime);

    this.opacity.update(deltaTime);

    this._lastUpdatedAt = newUpdateTime;
  }

  draw(spriteCanvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.save();

    context.globalAlpha = this.opacity.value;

    context.setTransform(
      new DOMMatrix()
        .translateSelf(this.position.x, this.position.y)
        .rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
    );

    context.drawImage(
      spriteCanvas,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight,
      -this.width.value / 2,
      -this.height.value / 2,
      this.width.value,
      this.height.value
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
        this.position.y + this.height.value < 0) ||
      // bottom
      (environment.gravity <= 0 &&
        this.velocity.y > 0 &&
        this.position.y - this.height.value > canvas.height) ||
      // left
      (environment.wind >= 0 &&
        this.velocity.x > 0 &&
        this.position.x - this.width.value > canvas.width) ||
      // right
      (environment.wind <= 0 &&
        this.velocity.x < 0 &&
        this.position.x + this.width.value < 0)
    );
  }

  addForce(force: Vector2) {
    this.velocity.x += force.x;
    this.velocity.y += force.y;
  }
}
