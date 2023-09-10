import Confetti from "../Confetti";
import { SpriteProp } from "../Types";
import { CreateConfettiArgs } from "../createConfetti";
import { ConfettiCanvasHandle } from "./ConfettiCanvas";
import { SpriteCanvasHandle } from "./SpriteCanvas";
export interface CreateConfettiRequestedOptions {
    sprite?: SpriteProp;
    color?: string;
}
export interface ConfettiCannon {
    createConfetti: (createConfettiArgs: CreateConfettiArgs, createConfettiRequestedOptions?: CreateConfettiRequestedOptions) => Confetti | undefined;
    createMultipleConfetti: (createConfettiArgs: CreateConfettiArgs, numberToFire: number, createConfettiRequestedOptions?: CreateConfettiRequestedOptions) => Confetti[];
    addConfetti: (confetti: Confetti) => void;
    deleteConfetti: (id: string) => void;
    clearConfetti: () => void;
    isReady: boolean;
}
export default function useConfettiCannon(confettiCanvas: ConfettiCanvasHandle | null, spriteCanvas: SpriteCanvasHandle | null): ConfettiCannon;
