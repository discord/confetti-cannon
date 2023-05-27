import * as React from "react";
import { v4 as uuid } from "uuid";
import Confetti from "../Confetti";
import Environment from "../Environment";
import { SpriteProp } from "../Types";
import { getClickPosition, isInRect, mapFind, setCanvasSize } from "../Utils";
import createConfettiHelper, { CreateConfettiArgs } from "../createConfetti";
import { SpriteCanvasData } from "./SpriteCanvas";

type ClickListener = (e: MouseEvent, confetti: Confetti | null) => void;
type MouseListener = (e: MouseEvent) => void;

interface ConfettiCanvasProps
  extends Omit<
    React.HTMLAttributes<HTMLCanvasElement>,
    "onClick" | "onMouseDown" | "onMouseMove" | "onMouseUp"
  > {
  className?: string;
  environment: Environment;
  onClick?: ClickListener;
  onMouseDown?: ClickListener;
  onMouseMove?: MouseListener;
  onMouseUp?: MouseListener;
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
  addConfetti: (confetti: Confetti, spriteCanvas: HTMLCanvasElement) => void;
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
    onMouseMove,
    onMouseUp,
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

  const addConfetti = React.useCallback(
    (confetti: Confetti, spriteCanvas: HTMLCanvasElement) => {
      allConfetti.current.set(confetti.id, {
        confetti,
        spriteCanvas,
      });

      if (animationFrameRequestId.current == null) {
        handleTick();
      }
    },
    [handleTick]
  );

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

      addConfetti(confetti, spriteCanvas);

      return confetti;
    },
    [addConfetti]
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
        addConfetti,
        deleteConfetti,
        clearConfetti,
        getCanvas,
      };
    },
    [createConfetti, addConfetti, deleteConfetti, clearConfetti, getCanvas]
  );

  const handleMouseEvent = React.useCallback(
    (
      e: MouseEvent,
      {
        clickHandler,
        mouseHandler,
      }: {
        clickHandler?: ClickListener;
        mouseHandler?: MouseListener;
      }
    ) => {
      if (clickHandler == null && mouseHandler == null) {
        return;
      }

      const canvasRect = canvas.current?.getBoundingClientRect();
      if (canvasRect == null) {
        return;
      }

      const clickPosition = getClickPosition(e, canvas.current);
      if (
        !isInRect(clickPosition, {
          x: canvasRect.left,
          y: canvasRect.top,
          width: canvasRect.width,
          height: canvasRect.height,
        })
      ) {
        return;
      }

      if (mouseHandler != null) {
        return mouseHandler(e);
      }

      if (clickHandler == null) {
        return;
      }

      const deltaTime = -(1000 / frameRate.current) * CLICK_BUFFER_FRAME_COUNT;
      const confetti = mapFind(allConfetti.current, ({ confetti }) => {
        const confettiPosition = confetti.previewPositionUpdate(
          environment,
          deltaTime
        );

        return isInRect(clickPosition, {
          x: confettiPosition.x - confetti.width / 2,
          y: confettiPosition.y - confetti.height / 2,
          width: confetti.width,
          height: confetti.height,
        });
      });
      clickHandler(e, confetti?.confetti ?? null);
    },
    [environment]
  );

  const handleClick: MouseListener = React.useCallback(
    (e) => handleMouseEvent(e, { clickHandler: onClick }),
    [handleMouseEvent, onClick]
  );

  const handleMouseDown: MouseListener = React.useCallback(
    (e) => handleMouseEvent(e, { clickHandler: onMouseDown }),
    [handleMouseEvent, onMouseDown]
  );

  const handleMouseMove: MouseListener = React.useCallback(
    (e) => handleMouseEvent(e, { mouseHandler: onMouseMove }),
    [handleMouseEvent, onMouseMove]
  );

  const handleMouseUp: MouseListener = React.useCallback(
    (e) => handleMouseEvent(e, { mouseHandler: onMouseUp }),
    [handleMouseEvent, onMouseUp]
  );

  React.useEffect(() => {
    const possiblyAddEventListener = (
      event: "click" | "mousedown" | "mousemove" | "mouseup",
      globalListener: (e: MouseEvent) => void,
      propListener: ClickListener | MouseListener | undefined
    ) => {
      if (propListener != null) {
        window.addEventListener(event, globalListener);
      }
    };

    possiblyAddEventListener("click", handleClick, onClick);
    possiblyAddEventListener("mousedown", handleMouseDown, onMouseDown);
    possiblyAddEventListener("mousemove", handleMouseMove, onMouseMove);
    possiblyAddEventListener("mouseup", handleMouseUp, onMouseUp);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseMove);
    };
  }, [
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  ]);

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

  return <canvas {...props} className={className} ref={canvas} />;
};

export default React.forwardRef(ConfettiCanvas);
