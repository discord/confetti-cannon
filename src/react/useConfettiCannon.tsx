import * as React from "react";
import { ConfettiCanvasHandle } from "./ConfettiCanvas";
import { SpriteCanvasHandle } from "./SpriteCanvas";
import { CreateConfettiArgs } from "../createConfetti";

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

      confettiCanvas.current?.addConfetti(
        createConfettiArgs,
        spriteCanvasRef,
        spriteData
      );
    },
    [confettiCanvas, spriteCanvas]
  );

  return { addConfetti };
}
