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
  addConfetti: (
    createConfettiArgs: CreateConfettiArgs,
    createConfettiRequestedOptions?: CreateConfettiRequestedOptions
  ) => Confetti | undefined;
  addMultipleConfetti: (
    createConfettiArgs: CreateConfettiArgs,
    numberToFire: number
  ) => Confetti[];
  deleteConfetti: (id: string) => void;
  clearConfetti: () => void;
}

export default function useConfettiCannon(
  confettiCanvas: React.RefObject<ConfettiCanvasHandle>,
  spriteCanvas: React.RefObject<SpriteCanvasHandle>
): ConfettiCannon {
  const addConfetti = React.useCallback(
    (
      createConfettiArgs: CreateConfettiArgs,
      { sprite, color }: CreateConfettiRequestedOptions = {}
    ) => {
      const spriteData = spriteCanvas.current?.getCreateData();
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();

      if (spriteCanvasRef == null || spriteData == null) {
        return;
      }

      return confettiCanvas.current?.addConfetti(
        createConfettiArgs,
        spriteCanvasRef,
        spriteData,
        sprite,
        color
      );
    },
    [confettiCanvas, spriteCanvas]
  );
  const addMultipleConfetti = React.useCallback(
    (createConfettiArgs: CreateConfettiArgs, numConfetti: number) => {
      const createdConfetti: Confetti[] = [];

      for (let i = 0; i < numConfetti; i++) {
        const confetti = addConfetti(createConfettiArgs);
        if (confetti) {
          createdConfetti.push(confetti);
        }
      }

      return createdConfetti;
    },
    [addConfetti]
  );

  const deleteConfetti = React.useCallback(
    (id: string) => {
      confettiCanvas.current?.deleteConfetti(id);
    },
    [confettiCanvas]
  );

  const clearConfetti = React.useCallback(
    () => confettiCanvas.current?.clearConfetti(),
    [confettiCanvas]
  );

  return { addConfetti, addMultipleConfetti, clearConfetti, deleteConfetti };
}
