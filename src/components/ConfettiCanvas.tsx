import * as React from "react";
import { v4 as uuid } from "uuid";
import Confetti from "../Confetti";
import createConfetti, { CreateConfettiArgs } from "../createConfetti";
import Environment from "../Environment";
import { getClickPosition, isInRect, mapFind, setCanvasSize } from "../Utils";
import { SpriteCanvasData, SpriteProp } from "./SpriteCanvas";

interface ConfettiCanvasProps
  extends Omit<
    React.HTMLAttributes<HTMLCanvasElement>,
    "onClick" | "onMouseDown"
  > {
  className?: string;
  environment: Environment;
  onClick?: (e: React.MouseEvent, confetti: Confetti | null) => void;
  onMouseDown?: (e: React.MouseEvent, confetti: Confetti | null) => void;
}

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
> = (
  { className, environment, onClick, onMouseDown, ...props },
  forwardedRef
) => {
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

  const handleMouseEvent = React.useCallback(
    (
      e: React.MouseEvent,
      handler?:
        | ((e: React.MouseEvent, confetti: Confetti | null) => void)
        | null
    ) => {
      if (handler == null) {
        return;
      }

      const clickPosition = getClickPosition(e, canvas.current);
      const confetti = mapFind(allConfetti.current, ({ confetti }) =>
        isInRect(clickPosition, {
          x: confetti.position.x,
          y: confetti.position.y,
          width: confetti.width.value,
          height: confetti.height.value,
        })
      );
      handler(e, confetti?.confetti ?? null);
    },
    []
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => handleMouseEvent(e, onClick),
    [handleMouseEvent, onClick]
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => handleMouseEvent(e, onMouseDown),
    [handleMouseEvent, onMouseDown]
  );

  React.useEffect(() => {
    const canvasRef = canvas.current;
    const observer = new ResizeObserver(() => {
      console.log("fired");
      setCanvasSize(canvas.current);
    });
    if (canvasRef != null) {
      observer.observe(canvasRef);
    }
    return () => {
      if (canvasRef != null) {
        observer.unobserve(canvasRef);
      }
    };
  }, []);

  return (
    <canvas
      {...props}
      className={className}
      ref={canvas}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    />
  );
};

export default React.forwardRef(ConfettiCanvas);
