import * as React from "react";
import { ConfettiCanvasHandle } from "./ConfettiCanvas";
import { SpriteCanvasHandle } from "./SpriteCanvas";
import { CreateConfettiArgs } from "../createConfetti";
import Confetti from "../Confetti";

export default function useConfettiCannon(
  confettiCanvas: React.RefObject<ConfettiCanvasHandle>,
  spriteCanvas: React.RefObject<SpriteCanvasHandle>
) {
  const addConfetti = React.useCallback(
    (createConfettiArgs: CreateConfettiArgs) => {
      const spriteData = spriteCanvas.current?.getCreateData();
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();

      if (spriteCanvasRef == null || spriteData == null) {
        return;
      }

      return confettiCanvas.current?.addConfetti(
        createConfettiArgs,
        spriteCanvasRef,
        spriteData
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

  return { addConfetti, addMultipleConfetti };
}
