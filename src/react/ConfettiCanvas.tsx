import * as React from "react";
import Confetti from "../Confetti";
import createConfetti from "../createConfetti";
import Environment from "../Environment";

function getDevicePixelRatio() {
  return window.devicePixelRatio;
}

function getClickPosition(
  e: React.MouseEvent,
  canvas: HTMLCanvasElement | null
) {
  if (canvas == null) {
    throw new Error("Canvas should not be null");
  }

  const rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export default function ConfettiCanvas() {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  const allConfetti = React.useRef<
    Map<string, { confetti: Confetti; spriteCanvas: HTMLCanvasElement }>
  >(new Map());
  const environment = React.useRef(new Environment());

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
      confetti.update(environment.current, devicePixelRatio);
      confetti.draw(spriteCanvas, context, devicePixelRatio);

      if (
        confetti.shouldDestroy(canvasRef, environment.current, devicePixelRatio)
      ) {
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
  }, []);

  const addConfetti = React.useCallback(
    (e: React.MouseEvent) => {
      const { x, y } = getClickPosition(e, canvas.current);

      allConfetti.current.set(`${Math.random()}`, {
        confetti: createConfetti({
          position: {
            type: "static-random",
            minValue: { x: x - 25, y: y - 25 },
            maxValue: { x: x + 25, y: y + 25 },
          },
          velocity: {
            type: "static-random",
            minValue: { x: -50, y: -100 },
            maxValue: { x: 50, y: -150 },
          },
          rotation: {
            type: "linear-random",
            minValue: { x: 0, y: 0, z: 0 },
            maxValue: { x: 360, y: 360, z: 360 },
            minAddValue: { x: 1, y: 1, z: 1 },
            maxAddValue: { x: 25, y: 25, z: 25 },
          },
          dragCoefficient: {
            type: "static",
            value: 0.001,
          },
          opacity: {
            type: "linear",
            value: 1,
            addValue: -0.01,
          },
          size: {
            type: "static-random",
            minValue: 5,
            maxValue: 25,
          },
        }),
        // TODO: sprite canvas is incorrect
        spriteCanvas: canvas.current!,
      });

      if (animationFrameRequestId.current == null) {
        handleTick();
      }
    },
    [handleTick]
  );

  React.useEffect(() => {
    if (canvas.current != null) {
      setCanvasSize();
    }
  }, [setCanvasSize]);

  return (
    <canvas
      ref={canvas}
      onClick={addConfetti}
      style={{ border: "1px solid black" }}
    />
  );
}
