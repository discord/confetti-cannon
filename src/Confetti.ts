import Environment from "./Environment";
import { Vector2, Vector3 } from "./Types";

export default class Confetti {
  position: Vector2;
  velocity: Vector2;
  rotation: Vector3;

  width: number;
  height: number;

  _lastUpdatedAt: number;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };

    this.height = 10;
    this.width = 10;

    this._lastUpdatedAt = Date.now();
  }

  update(environment: Environment, devicePixelRatio: number) {
    const newUpdateTime = Date.now();
    const deltaTime = (newUpdateTime - this._lastUpdatedAt) / 100;

    this.rotation.x += 25 * deltaTime;
    this.rotation.y += 25 * deltaTime;
    this.rotation.z += 25 * deltaTime;

    const gravityForce = -environment.gravity * deltaTime;

    this.velocity.y += gravityForce;

    this.position.y += (this.velocity.y / devicePixelRatio) * deltaTime;

    this._lastUpdatedAt = newUpdateTime;
  }

  draw(
    spriteCanvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    devicePixelRatio: number
  ) {
    context.save();

    const rotationPointX = this.width / 2;
    const rotationPointY = this.width / 2;

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
      -this.width,
      -this.height,
      this.width * devicePixelRatio,
      this.height * devicePixelRatio
    );
    context.fill();

    context.restore();
  }

  shouldDestroy(canvas: HTMLCanvasElement, devicePixelRatio: number) {
    return (
      // top
      (this.velocity.y < 0 &&
        this.position.y + this.height * devicePixelRatio < 0) ||
      // bottom
      (this.velocity.y > 0 &&
        this.position.y - this.height * devicePixelRatio > canvas.height) ||
      // left
      (this.velocity.x > 0 &&
        this.position.x - this.width * devicePixelRatio > canvas.width) ||
      // right
      (this.velocity.x < 0 &&
        this.position.x + this.width * devicePixelRatio < 0)
    );
  }
}
