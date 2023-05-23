import { Vector2 } from "./Types";

export function setCanvasSize(canvas: HTMLCanvasElement | null) {
  if (canvas != null) {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * global.devicePixelRatio;
    canvas.height = height * global.devicePixelRatio;
  }
}

export function hexToRgb(hex: string) {
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export function mapFind<K, T>(
  map: Map<K, T>,
  predicate: (item: T) => boolean
): T | null {
  for (const entry of Array.from(map.values())) {
    if (entry != null && predicate(entry)) {
      return entry;
    }
  }
  return null;
}

export function isInRect(
  { x, y }: Vector2,
  rect: { x: number; y: number; width: number; height: number }
) {
  return (
    x > rect.x &&
    x < rect.x + rect.width &&
    y > rect.y &&
    y < rect.y + rect.height
  );
}

export function getClickPosition(
  e: React.MouseEvent,
  element: HTMLElement | null | undefined
) {
  if (element == null) {
    throw new Error("element should not be null");
  }

  const rect = element.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export function calculateAirResistance(
  dragCoefficient: number,
  velocity: number
) {
  const directionMultiplier = velocity > 0 ? -1 : 1;
  return dragCoefficient * velocity * velocity * directionMultiplier;
}
