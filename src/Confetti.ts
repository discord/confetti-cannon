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
    console.log("drawing");
    context.beginPath();
    context.rect(this.x, this.y, 100, 100);
    context.stroke();
  }

  shouldDestroy(canvas: HTMLCanvasElement) {
    return false;
  }
}
