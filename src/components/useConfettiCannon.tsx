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
  isReady: boolean;
}

export default function useConfettiCannon(
  confettiCanvas: ConfettiCanvasHandle | null,
  spriteCanvas: SpriteCanvasHandle | null
): ConfettiCannon {
  const [isReady, setIsReady] = React.useState(spriteCanvas?.isReady ?? false);

  React.useEffect(() => {
    spriteCanvas?.onReady((isReady) => setIsReady(isReady));
  }, [spriteCanvas]);

  const createConfetti = React.useCallback(
    (
      createConfettiArgs: CreateConfettiArgs,
      { sprite, color }: CreateConfettiRequestedOptions = {}
    ) => {
      const spriteData = spriteCanvas?.getCreateData();
      const spriteCanvasRef = spriteCanvas?.getCanvas();

      if (
        spriteCanvasRef == null ||
        spriteData == null ||
        spriteData.sprites.length === 0
      ) {
        return;
      }

      return confettiCanvas?.createConfetti(
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
      const spriteCanvasRef = spriteCanvas?.getCanvas();
      if (spriteCanvasRef != null) {
        confettiCanvas?.addConfetti(confetti, spriteCanvasRef);
      }
    },
    [confettiCanvas, spriteCanvas]
  );

  const deleteConfetti = React.useCallback(
    (id: string) => {
      confettiCanvas?.deleteConfetti(id);
    },
    [confettiCanvas]
  );

  const clearConfetti = React.useCallback(
    () => confettiCanvas?.clearConfetti(),
    [confettiCanvas]
  );

  return React.useMemo(
    () => ({
      createConfetti,
      createMultipleConfetti,
      addConfetti,
      clearConfetti,
      deleteConfetti,
      isReady: isReady && spriteCanvas != null && confettiCanvas != null,
    }),
    [
      addConfetti,
      clearConfetti,
      confettiCanvas,
      createConfetti,
      createMultipleConfetti,
      deleteConfetti,
      isReady,
      spriteCanvas,
    ]
  );
}
