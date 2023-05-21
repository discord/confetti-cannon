import * as React from "react";
import Confetti from "../Confetti";
import createConfetti, { CreateConfettiArgs } from "../createConfetti";
import Environment from "../Environment";

function getDevicePixelRatio() {
  return window.devicePixelRatio;
}

type ConfettiCanvasProps = {
  environment: Environment;
  onClick?: (e: React.MouseEvent) => void;
};

interface ConfettiCanvasHandle {
  addConfetti: (args: CreateConfettiArgs) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

const ConfettiCanvas: React.ForwardRefRenderFunction<
  ConfettiCanvasHandle,
  ConfettiCanvasProps
> = ({ environment, onClick }, forwardedRef) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  const allConfetti = React.useRef<
    Map<string, { confetti: Confetti; spriteCanvas: HTMLCanvasElement }>
  >(new Map());

  const animationFrameRequestId = React.useRef<number | null>(null);

  const setCanvasSize = React.useCallback(() => {
    if (canvas.current != null) {
      const { width, height } = canvas.current.getBoundingClientRect();
      canvas.current.width = width * getDevicePixelRatio();
      canvas.current.height = height * getDevicePixelRatio();
    }
  }, []);

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
    (args: CreateConfettiArgs) => {
      allConfetti.current.set(`${Math.random()}`, {
        confetti: createConfetti(args),
        // TODO: sprite canvas is incorrect
        spriteCanvas: canvas.current!,
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
      setCanvasSize();
    }
  }, [setCanvasSize]);

  return (
    <canvas
      ref={canvas}
      onClick={onClick}
      style={{ border: "1px solid black" }}
    />
  );
};

export default React.forwardRef(ConfettiCanvas);
