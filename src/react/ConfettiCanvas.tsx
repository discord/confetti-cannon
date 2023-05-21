import * as React from "react";
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
  ) => void;
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

    const devicePixelRatio = getDevicePixelRatio();

    allConfetti.current.forEach(({ confetti, spriteCanvas }, id) => {
      confetti.update(environment, devicePixelRatio);
      confetti.draw(spriteCanvas, context, devicePixelRatio);

      if (confetti.shouldDestroy(canvasRef, environment, devicePixelRatio)) {
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
      allConfetti.current.set(`${Math.random()}`, {
        confetti: createConfetti(args, SpriteCanvasData, sprite, color),
        spriteCanvas,
      });

      if (animationFrameRequestId.current == null) {
        handleTick();
      }
    },
    [handleTick]
  );

  const getCanvas = React.useCallback(() => canvas.current, []);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      return {
        addConfetti,
        getCanvas,
      };
    },
    [addConfetti, getCanvas]
  );

  React.useEffect(() => {
    if (canvas.current != null) {
      setCanvasSize(canvas.current);
    }
  }, []);

  return <canvas className={className} ref={canvas} onClick={onClick} />;
};

export default React.forwardRef(ConfettiCanvas);
