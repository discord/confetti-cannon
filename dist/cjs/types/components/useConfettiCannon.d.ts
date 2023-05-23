import * as React from "react";
import Confetti from "../Confetti";
import { SpriteProp } from "../Types";
import { CreateConfettiArgs } from "../createConfetti";
import { ConfettiCanvasHandle } from "./ConfettiCanvas";
import { SpriteCanvasHandle } from "./SpriteCanvas";
interface CreateConfettiRequestedOptions {
    sprite?: SpriteProp;
    color?: string;
}
export interface ConfettiCannon {
    createConfetti: (createConfettiArgs: CreateConfettiArgs, createConfettiRequestedOptions?: CreateConfettiRequestedOptions) => Confetti | undefined;
    createMultipleConfetti: (createConfettiArgs: CreateConfettiArgs, numberToFire: number) => Confetti[];
    addConfetti: (confetti: Confetti) => void;
    deleteConfetti: (id: string) => void;
    clearConfetti: () => void;
}
export default function useConfettiCannon(confettiCanvas: React.RefObject<ConfettiCanvasHandle>, spriteCanvas: React.RefObject<SpriteCanvasHandle>): ConfettiCannon;
export {};
