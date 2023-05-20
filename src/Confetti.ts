import Environment from "./Environment";
import {
  UpdatableValue,
  UpdatableVector2Value,
  UpdatableVector3Value,
} from "./UpdatableValue";
import {
  LinearUpdatableValue,
  StaticUpdatableValue,
} from "./UpdatableValueImplementations";

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

export default class Confetti {
  position: UpdatableVector2Value;
  velocity: UpdatableVector2Value;
  rotation: UpdatableVector3Value;
  width: UpdatableValue;
  height: UpdatableValue;
  dragCoefficient: UpdatableValue;
  opacity: UpdatableValue;

  _lastUpdatedAt: number;

  constructor(x: number, y: number) {
    this.position = new UpdatableVector2Value(
      new StaticUpdatableValue(x),
      new StaticUpdatableValue(y)
    );
    this.velocity = new UpdatableVector2Value(
      new StaticUpdatableValue(0),
      new StaticUpdatableValue(0)
    );
    this.rotation = new UpdatableVector3Value(
      new LinearUpdatableValue(0, 10),
      new LinearUpdatableValue(0, 25),
      new LinearUpdatableValue(0, 5)
    );
    this.dragCoefficient = new StaticUpdatableValue(0.001);

    this.height = new StaticUpdatableValue(10);
    this.width = new StaticUpdatableValue(10);

    this.opacity = new StaticUpdatableValue(1);

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

    const rotationPointX = this.width.value / 2;
    const rotationPointY = this.height.value / 2;

    context.setTransform(
      new DOMMatrix()
        .translateSelf(
          this.position.x + rotationPointX,
          this.position.y + rotationPointY
        )
        .rotateSelf(this.rotation.x, this.rotation.y, this.rotation.z)
    );

    context.beginPath();
    context.rect(
      -this.width.value * 1.5,
      -this.height.value * 1.5,
      this.width.value * devicePixelRatio,
      this.height.value * devicePixelRatio
    );
    context.fill();

    context.restore();
  }

  shouldDestroy(canvas: HTMLCanvasElement, devicePixelRatio: number) {
    return (
      // opacity
      this.opacity.value < 0 ||
      // top
      (this.velocity.y < 0 &&
        this.position.y + this.height.value * devicePixelRatio < 0) ||
      // bottom
      (this.velocity.y > 0 &&
        this.position.y - this.height.value * devicePixelRatio >
          canvas.height) ||
      // left
      (this.velocity.x > 0 &&
        this.position.x - this.width.value * devicePixelRatio > canvas.width) ||
      // right
      (this.velocity.x < 0 &&
        this.position.x + this.width.value * devicePixelRatio < 0)
    );
  }
}
