export interface Vector2Template<T> {
  x: T;
  y: T;
}

export interface Vector3Template<T> extends Vector2Template<T> {
  z: T;
}

export type Vector2 = Vector2Template<number>;
export type Vector3 = Vector3Template<number>;

export type SpriteProp =
  | {
      src: string;
      colorize: boolean;
    }
  | string;
