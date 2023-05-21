import Environment from "./Environment";
import {
  UpdatableValue,
  UpdatableVector2Value,
  UpdatableVector3Value,
} from "./UpdatableValue";

function calculateAirResistance(
  externalForce: number,
  dragCoefficient: number,
  velocity: number,
  directionMultiplier: 1 | -1
) {
  return (
    Math.min(externalForce, dragCoefficient * velocity * velocity) *
    directionMultiplier
  );
}

type ConfettiArgs = {
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

  update(environment: Environment, devicePixelRatio: number) {
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
    this.position.y += (this.velocity.y / devicePixelRatio) * deltaTime;
    this.position.x += (this.velocity.x / devicePixelRatio) * deltaTime;

    this.width.update(deltaTime);
    this.height.update(deltaTime);

    this.opacity.update(deltaTime);

    this._lastUpdatedAt = newUpdateTime;
  }

  draw(
    spriteCanvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    devicePixelRatio: number
  ) {
    context.save();

    context.globalAlpha = this.opacity.value;

    context.setTransform(
      new DOMMatrix()
        .translateSelf(this.position.x, this.position.y)
        .rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
    );

    context.beginPath();
    context.drawImage(
      spriteCanvas,
      this.spriteX * devicePixelRatio,
      this.spriteY * devicePixelRatio,
      this.spriteWidth * devicePixelRatio,
      this.spriteHeight * devicePixelRatio,
      0,
      0,
      this.width.value * devicePixelRatio,
      this.height.value * devicePixelRatio
    );

    context.restore();
  }

  shouldDestroy(
    canvas: HTMLCanvasElement,
    environment: Environment,
    devicePixelRatio: number
  ) {
    return (
      // opacity
      this.opacity.value < 0 ||
      // top
      (environment.gravity >= 0 &&
        this.velocity.y < 0 &&
        this.position.y + this.height.value * devicePixelRatio < 0) ||
      // bottom
      (environment.gravity <= 0 &&
        this.velocity.y > 0 &&
        this.position.y - this.height.value * devicePixelRatio >
          canvas.height) ||
      // left
      (environment.wind >= 0 &&
        this.velocity.x > 0 &&
        this.position.x - this.width.value * devicePixelRatio > canvas.width) ||
      // right
      (environment.wind <= 0 &&
        this.velocity.x < 0 &&
        this.position.x + this.width.value * devicePixelRatio < 0)
    );
  }
}
