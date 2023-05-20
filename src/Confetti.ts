export default class Confetti {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(devicePixelRatio: number) {}

  draw(
    spriteCanvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    devicePixelRatio: number
  ) {
    context.beginPath();
    context.rect(this.x, this.y, 10 * devicePixelRatio, 10 * devicePixelRatio);
    context.stroke();
  }

  shouldDestroy(canvas: HTMLCanvasElement) {
    return false;
  }
}
