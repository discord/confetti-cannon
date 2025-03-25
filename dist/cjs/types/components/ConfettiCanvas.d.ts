import * as React from "react";
import Confetti from "../Confetti";
import Environment from "../Environment";
import { SpriteProp } from "../Types";
import { CreateConfettiArgs } from "../createConfetti";
import { SpriteCanvasData } from "./SpriteCanvas";
type ClickListener = (e: MouseEvent, confetti: Confetti | null) => void;
type MouseListener = (e: MouseEvent) => void;
interface ConfettiCanvasProps extends Omit<React.HTMLAttributes<HTMLCanvasElement>, "onClick" | "onMouseDown" | "onMouseMove" | "onMouseUp"> {
    className?: string;
    environment: Environment;
    onClick?: ClickListener;
    onMouseDown?: ClickListener;
    onMouseMove?: MouseListener;
    onMouseUp?: MouseListener;
    requestAnimationFrame?: (handler: FrameRequestCallback) => number;
    cancelAnimationFrame?: (id: number) => void;
    onBeforeRender?: (context: CanvasRenderingContext2D) => void;
    onAfterRender?: (context: CanvasRenderingContext2D) => void;
}
export interface ConfettiCanvasHandle {
    createConfetti: (args: CreateConfettiArgs, spriteCanvas: HTMLCanvasElement, SpriteCanvasData: SpriteCanvasData, sprite?: SpriteProp, color?: string | null) => Confetti;
    addConfetti: (confetti: Confetti, spriteCanvas: HTMLCanvasElement) => void;
    deleteConfetti: (id: string) => void;
    clearConfetti: () => void;
    getCanvas: () => HTMLCanvasElement | null;
}
declare const _default: React.ForwardRefExoticComponent<ConfettiCanvasProps & React.RefAttributes<ConfettiCanvasHandle>>;
export default _default;
