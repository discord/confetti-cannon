export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 extends Vector2 {
  z: number;
}

export type SpriteProp =
  | {
      src: string;
      colorize: boolean;
    }
  | string;
