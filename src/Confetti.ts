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

export default class Confetti {
  position: UpdatableVector2Value;
  velocity: UpdatableVector2Value;
  rotation: UpdatableVector3Value;
  width: UpdatableValue;
  height: UpdatableValue;

  _lastUpdatedAt: number;

  constructor(x: number, y: number) {
    this.position = new UpdatableVector2Value(
      new StaticUpdatableValue(x),
      new StaticUpdatableValue(y)
    );
    this.velocity = new UpdatableVector2Value(
      new LinearUpdatableValue(0, 5),
      new StaticUpdatableValue(0)
    );
    this.rotation = new UpdatableVector3Value(
      new LinearUpdatableValue(0, 10),
      new LinearUpdatableValue(0, 25),
      new LinearUpdatableValue(0, 5)
    );

    this.height = new StaticUpdatableValue(10);
    this.width = new StaticUpdatableValue(10);

    this._lastUpdatedAt = Date.now();
  }

  update(environment: Environment, devicePixelRatio: number) {
    const newUpdateTime = Date.now();
    const deltaTime = (newUpdateTime - this._lastUpdatedAt) / 100;

    this.rotation.update(deltaTime);

    const gravityForce = -environment.gravity * deltaTime;

    this.velocity.update(deltaTime);
    this.velocity.y += gravityForce;

    this.position.update(deltaTime);
    this.position.y += (this.velocity.y / devicePixelRatio) * deltaTime;
    this.position.x += (this.velocity.x / devicePixelRatio) * deltaTime;

    this.width.update(deltaTime);
    this.height.update(deltaTime);

    this._lastUpdatedAt = newUpdateTime;
  }

  draw(
    spriteCanvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    devicePixelRatio: number
  ) {
    context.save();

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
