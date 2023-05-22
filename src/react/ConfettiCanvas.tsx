import * as React from "react";
import { v4 as uuid } from "uuid";
import Confetti from "../Confetti";
import createConfetti, { CreateConfettiArgs } from "../createConfetti";
import Environment from "../Environment";
import { getDevicePixelRatio, setCanvasSize } from "../Utils";
import { SpriteCanvasData, SpriteProp } from "./SpriteCanvas";

type ConfettiCanvasProps = {
  className?: string;
  environment: Environment;
  onClick?: (e: React.MouseEvent) => void;
};

export interface ConfettiCanvasHandle {
  addConfetti: (
    args: CreateConfettiArgs,
    spriteCanvas: HTMLCanvasElement,
    SpriteCanvasData: SpriteCanvasData,
    sprite?: SpriteProp,
    color?: string | null
  ) => Confetti;
  clearConfetti: () => void;
  getCanvas: () => HTMLCanvasElement | null;
}

const ConfettiCanvas: React.ForwardRefRenderFunction<
  ConfettiCanvasHandle,
  ConfettiCanvasProps
> = ({ className, environment, onClick }, forwardedRef) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  const allConfetti = React.useRef<
    Map<string, { confetti: Confetti; spriteCanvas: HTMLCanvasElement }>
  >(new Map());

  const animationFrameRequestId = React.useRef<number | null>(null);

  const handleTick = React.useCallback(() => {
    const canvasRef = canvas.current;
    if (canvasRef == null) {
      return;
    }

    const context = canvasRef.getContext("2d");
    if (context == null) {
      return;
    }

    context.clearRect(0, 0, canvasRef.width, canvasRef.height);

    allConfetti.current.forEach(({ confetti, spriteCanvas }, id) => {
      confetti.update(environment);
      confetti.draw(spriteCanvas, context);

      if (confetti.shouldDestroy(canvasRef, environment)) {
        allConfetti.current.delete(id);
      }
    });

    if (allConfetti.current.size > 0) {
      animationFrameRequestId.current =
        window.requestAnimationFrame(handleTick);
    } else {
      context.clearRect(0, 0, canvasRef.width, canvasRef.height);
      animationFrameRequestId.current = null;
    }
  }, [environment]);

  React.useEffect(() => {
    if (animationFrameRequestId.current != null) {
      window.cancelAnimationFrame(animationFrameRequestId.current);
      animationFrameRequestId.current =
        window.requestAnimationFrame(handleTick);
    }
  }, [handleTick]);

  const addConfetti = React.useCallback(
    (
      args: CreateConfettiArgs,
      spriteCanvas: HTMLCanvasElement,
      SpriteCanvasData: SpriteCanvasData,
      sprite?: SpriteProp,
      color?: string | null
    ) => {
      const confetti = createConfetti(
        args.id ?? uuid(),
        args,
        SpriteCanvasData,
        sprite,
        color
      );

      allConfetti.current.set(confetti.id, {
        confetti,
        spriteCanvas,
      });

      if (animationFrameRequestId.current == null) {
        handleTick();
      }

      return confetti;
    },
    [handleTick]
  );

  const clearConfetti = React.useCallback(
    () => allConfetti.current.clear(),
    []
  );

  const getCanvas = React.useCallback(() => canvas.current, []);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      return {
        addConfetti,
        clearConfetti,
        getCanvas,
      };
    },
    [addConfetti, clearConfetti, getCanvas]
  );

  React.useEffect(() => {
    if (canvas.current != null) {
      setCanvasSize(canvas.current);
    }
  }, []);

  return <canvas className={className} ref={canvas} onClick={onClick} />;
};

export default React.forwardRef(ConfettiCanvas);
