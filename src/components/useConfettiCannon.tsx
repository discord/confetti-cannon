import * as React from "react";
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
  createConfetti: (
    createConfettiArgs: CreateConfettiArgs,
    createConfettiRequestedOptions?: CreateConfettiRequestedOptions
  ) => Confetti | undefined;
  createMultipleConfetti: (
    createConfettiArgs: CreateConfettiArgs,
    numberToFire: number,
    createConfettiRequestedOptions?: CreateConfettiRequestedOptions
  ) => Confetti[];
  addConfetti: (confetti: Confetti) => void;
  deleteConfetti: (id: string) => void;
  clearConfetti: () => void;
}

export default function useConfettiCannon(
  confettiCanvas: React.RefObject<ConfettiCanvasHandle>,
  spriteCanvas: React.RefObject<SpriteCanvasHandle>
): ConfettiCannon {
  const createConfetti = React.useCallback(
    (
      createConfettiArgs: CreateConfettiArgs,
      { sprite, color }: CreateConfettiRequestedOptions = {}
    ) => {
      const spriteData = spriteCanvas.current?.getCreateData();
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();

      if (spriteCanvasRef == null || spriteData == null) {
        return;
      }

      return confettiCanvas.current?.createConfetti(
        createConfettiArgs,
        spriteCanvasRef,
        spriteData,
        sprite,
        color
      );
    },
    [confettiCanvas, spriteCanvas]
  );
  const createMultipleConfetti = React.useCallback(
    (
      createConfettiArgs: CreateConfettiArgs,
      numConfetti: number,
      createConfettiRequestedOptions?: CreateConfettiRequestedOptions
    ) => {
      const createdConfetti: Confetti[] = [];

      for (let i = 0; i < numConfetti; i++) {
        const confetti = createConfetti(
          createConfettiArgs,
          createConfettiRequestedOptions
        );
        if (confetti) {
          createdConfetti.push(confetti);
        }
      }

      return createdConfetti;
    },
    [createConfetti]
  );

  const addConfetti = React.useCallback(
    (confetti: Confetti) => {
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();
      if (spriteCanvasRef != null) {
        confettiCanvas.current?.addConfetti(confetti, spriteCanvasRef);
      }
    },
    [confettiCanvas, spriteCanvas]
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

  return {
    createConfetti,
    createMultipleConfetti,
    addConfetti,
    clearConfetti,
    deleteConfetti,
  };
}
