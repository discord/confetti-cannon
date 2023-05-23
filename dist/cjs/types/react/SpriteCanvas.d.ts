import * as React from "react";
type SpriteProp = {
    src: string;
    colorize: boolean;
} | string;
interface SpriteCanvasProps {
    sprites: SpriteProp[];
    colors: string[];
    spriteWidth: number;
    spriteHeight: number;
}
export default function SpriteCanvas({ sprites: spriteProps, colors, spriteWidth: spriteWidth, spriteHeight: spriteHeight, }: SpriteCanvasProps): React.JSX.Element;
export {};
