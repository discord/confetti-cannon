/// <reference types="react" />
import { Vector2 } from "./Types";
export declare function setCanvasSize(canvas: HTMLCanvasElement | null): void;
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
};
export declare function mapFind<K, T>(map: Map<K, T>, predicate: (item: T) => boolean): T | null;
export declare function isInRect({ x, y }: Vector2, rect: {
    x: number;
    y: number;
    width: number;
    height: number;
}): boolean;
export declare function getClickPosition(e: React.MouseEvent | MouseEvent, element: HTMLElement | null | undefined): {
    x: number;
    y: number;
};
export declare function calculateAirResistance(dragCoefficient: number, velocity: number): number;
