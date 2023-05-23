import * as React from "react";
import { v4 as uuid } from "uuid";
import Confetti from "../Confetti";
import Environment from "../Environment";
import { SpriteProp } from "../Types";
import { getClickPosition, isInRect, mapFind, setCanvasSize } from "../Utils";
import createConfettiHelper, { CreateConfettiArgs } from "../createConfetti";
import { SpriteCanvasData } from "./SpriteCanvas";

interface ConfettiCanvasProps
  extends Omit<
    React.HTMLAttributes<HTMLCanvasElement>,
    "onClick" | "onMouseDown"
  > {
  className?: string;
  environment: Environment;
  onClick?: (e: React.MouseEvent, confetti: Confetti | null) => void;
  onMouseDown?: (e: React.MouseEvent, confetti: Confetti | null) => void;
  onBeforeRender?: (context: CanvasRenderingContext2D) => void;
  onAfterRender?: (context: CanvasRenderingContext2D) => void;
}

export interface ConfettiCanvasHandle {
  createConfetti: (
    args: CreateConfettiArgs,
    spriteCanvas: HTMLCanvasElement,
    SpriteCanvasData: SpriteCanvasData,
    sprite?: SpriteProp,
    color?: string | null
  ) => Confetti;
  deleteConfetti: (id: string) => void;
  clearConfetti: () => void;
  getCanvas: () => HTMLCanvasElement | null;
}

const CLICK_BUFFER_FRAME_COUNT = 2;

const ConfettiCanvas: React.ForwardRefRenderFunction<
  ConfettiCanvasHandle,
  ConfettiCanvasProps
> = (
  {
    className,
    environment,
    onClick,
    onMouseDown,
    onBeforeRender,
    onAfterRender,
    ...props
  },
  forwardedRef
) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  const allConfetti = React.useRef<
    Map<string, { confetti: Confetti; spriteCanvas: HTMLCanvasElement }>
  >(new Map());

  const animationFrameRequestId = React.useRef<number | null>(null);
  const lastFrameUpdatedAt = React.useRef(0);
  const frameRate = React.useRef<number>(0);

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

    onBeforeRender?.(context);

    allConfetti.current.forEach(({ confetti, spriteCanvas }, id) => {
      confetti.update(environment);
      confetti.draw(spriteCanvas, context);

      if (confetti.shouldDestroy(canvasRef, environment)) {
        allConfetti.current.delete(id);
      }
    });

    onAfterRender?.(context);

    if (allConfetti.current.size > 0) {
      animationFrameRequestId.current =
        window.requestAnimationFrame(handleTick);
    } else {
      context.clearRect(0, 0, canvasRef.width, canvasRef.height);
      animationFrameRequestId.current = null;
    }

    const now = Date.now();
    if (lastFrameUpdatedAt.current !== 0) {
      frameRate.current = 1000 / (now - lastFrameUpdatedAt.current);
    }
    lastFrameUpdatedAt.current = now;
  }, [environment, onAfterRender, onBeforeRender]);

  React.useEffect(() => {
    if (animationFrameRequestId.current != null) {
      window.cancelAnimationFrame(animationFrameRequestId.current);
      animationFrameRequestId.current =
        window.requestAnimationFrame(handleTick);
    }
  }, [handleTick]);

  const createConfetti = React.useCallback(
    (
      args: CreateConfettiArgs,
      spriteCanvas: HTMLCanvasElement,
      SpriteCanvasData: SpriteCanvasData,
      sprite?: SpriteProp,
      color?: string | null
    ) => {
      const confetti = createConfettiHelper(
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

  const deleteConfetti = React.useCallback((id: string) => {
    allConfetti.current.delete(id);
  }, []);

  const clearConfetti = React.useCallback(
    () => allConfetti.current.clear(),
    []
  );

  const getCanvas = React.useCallback(() => canvas.current, []);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      return {
        createConfetti,
        deleteConfetti,
        clearConfetti,
        getCanvas,
      };
    },
    [createConfetti, clearConfetti, getCanvas, deleteConfetti]
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
      const deltaTime = -(1000 / frameRate.current) * CLICK_BUFFER_FRAME_COUNT;
      const confetti = mapFind(allConfetti.current, ({ confetti }) => {
        const confettiPosition = confetti.previewPositionUpdate(
          environment,
          deltaTime
        );

        return isInRect(clickPosition, {
          x: confettiPosition.x - confetti.width.value / 2,
          y: confettiPosition.y - confetti.height.value / 2,
          width: confetti.width.value,
          height: confetti.height.value,
        });
      });
      handler(e, confetti?.confetti ?? null);
    },
    [environment]
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
