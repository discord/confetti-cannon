import * as React from "react";
import { SpriteProp } from "../Types";
export interface Sprite {
    image: HTMLImageElement;
    colorize: boolean;
    src: string;
}
export interface SpriteCanvasProps {
    className?: string;
    visible?: boolean;
    sprites: SpriteProp[];
    colors: string[];
    spriteWidth: number;
    spriteHeight: number;
}
export interface SpriteCanvasData {
    sprites: Sprite[];
    colors: string[];
    spriteWidth: number;
    spriteHeight: number;
}
export interface SpriteCanvasHandle {
    getCanvas: () => HTMLCanvasElement | null;
    getCreateData: () => SpriteCanvasData;
}
declare const _default: React.ForwardRefExoticComponent<SpriteCanvasProps & React.RefAttributes<SpriteCanvasHandle>>;
export default _default;
