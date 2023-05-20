export default class Confetti {
  x: number;
  y: number;

  rotationX: number;
  rotationY: number;
  rotationZ: number;

  width: number;
  height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;

    this.height = 10;
    this.width = 10;
  }

  update(deltaTime: number, devicePixelRatio: number) {
    this.rotationX += 0.1 * deltaTime;
    this.rotationY += 0.1 * deltaTime;
    this.rotationZ += 0.1 * deltaTime;
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
        .translateSelf(this.x + rotationPointX, this.y + rotationPointY)
        .rotateSelf(this.rotationX, this.rotationY, this.rotationZ)
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

  shouldDestroy(canvas: HTMLCanvasElement) {
    return false;
  }
}
