import * as React from "react";
import { ConfettiCanvasHandle } from "./ConfettiCanvas";
import { SpriteCanvasHandle } from "./SpriteCanvas";
import { CreateConfettiArgs } from "../createConfetti";

export default function useConfettiCannon(
  confettiCanvas: React.RefObject<ConfettiCanvasHandle>,
  spriteCanvas: React.RefObject<SpriteCanvasHandle>
) {
  const addConfetti = React.useCallback(
    (createConfettiArgs: CreateConfettiArgs, numConfetti = 1) => {
      const spriteData = spriteCanvas.current?.getCreateData();
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();

      if (spriteCanvasRef == null || spriteData == null) {
        return;
      }

      for (let i = 0; i < numConfetti; i++) {
        confettiCanvas.current?.addConfetti(
          createConfettiArgs,
          spriteCanvasRef,
          spriteData
        );
      }
    },
    [confettiCanvas, spriteCanvas]
  );

  return { addConfetti };
}
