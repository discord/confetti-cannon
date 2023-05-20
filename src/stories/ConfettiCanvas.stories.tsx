import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ConfettiCanvas from "../react/ConfettiCanvas";
import { CreateConfettiArgs } from "../createConfetti";

interface ConfettiCanvasStoryWrapperProps {
  positionSpreadX: number;
  positionSpreadY: number;
  minVelocityX: number;
  maxVelocityX: number;
  minVelocityY: number;
  maxVelocityY: number;
  minRotationX: number;
  maxRotationX: number;
  minRotationY: number;
  maxRotationY: number;
  minRotationZ: number;
  maxRotationZ: number;
  minRotationAddValueX: number;
  maxRotationAddValueX: number;
  minRotationAddValueY: number;
  maxRotationAddValueY: number;
  minRotationAddValueZ: number;
  maxRotationAddValueZ: number;
  dragCoefficient: number;
  opacity: number;
  opacityAddValue: number;
  minSize: number;
  maxSize: number;
}

function ConfettiCanvasStoryWrapper({
  positionSpreadX,
  positionSpreadY,
  minVelocityX,
  maxVelocityX,
  minVelocityY,
  maxVelocityY,
  minRotationX,
  maxRotationX,
  minRotationY,
  maxRotationY,
  minRotationZ,
  maxRotationZ,
  minRotationAddValueX,
  maxRotationAddValueX,
  minRotationAddValueY,
  maxRotationAddValueY,
  minRotationAddValueZ,
  maxRotationAddValueZ,
  dragCoefficient,
  opacity,
  opacityAddValue,
  minSize,
  maxSize,
}: ConfettiCanvasStoryWrapperProps) {
  const ref = React.useRef<React.ElementRef<typeof ConfettiCanvas>>(null);

  const handleClick = (e) => {
    const { x, y } = getClickPosition(e, ref.current?.getCanvas());

    const createConfettiArgs: CreateConfettiArgs = {
      position: {
        type: "static-random",
        minValue: { x: x - positionSpreadX, y: y - positionSpreadY },
        maxValue: { x: x + positionSpreadX, y: y + positionSpreadY },
      },
      velocity: {
        type: "static-random",
        minValue: { x: minVelocityX, y: minVelocityY },
        maxValue: { x: maxVelocityX, y: maxVelocityY },
      },
      rotation: {
        type: "linear-random",
        minValue: { x: minRotationX, y: minRotationY, z: minRotationZ },
        maxValue: { x: maxRotationX, y: maxRotationY, z: maxRotationZ },
        minAddValue: {
          x: minRotationAddValueX,
          y: minRotationAddValueY,
          z: minRotationAddValueZ,
        },
        maxAddValue: {
          x: maxRotationAddValueX,
          y: maxRotationAddValueY,
          z: maxRotationAddValueZ,
        },
      },
      dragCoefficient: {
        type: "static",
        value: dragCoefficient,
      },
      opacity: {
        type: "linear",
        value: opacity,
        addValue: opacityAddValue,
      },
      size: {
        type: "static-random",
        minValue: minSize,
        maxValue: maxSize,
      },
    };
    ref.current?.addConfetti(createConfettiArgs);
  };

  return <ConfettiCanvas ref={ref} onClick={handleClick} />;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/ConfettiCanvas",
  component: ConfettiCanvasStoryWrapper,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ConfettiCanvasStoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

function getClickPosition(
  e: React.MouseEvent,
  canvas: HTMLCanvasElement | null | undefined
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

export const Example: Story = {
  args: {
    positionSpreadX: 25,
    positionSpreadY: 25,
    minVelocityX: -50,
    maxVelocityX: 50,
    minVelocityY: -100,
    maxVelocityY: -150,
    minRotationX: 0,
    maxRotationX: 360,
    minRotationY: 0,
    maxRotationY: 360,
    minRotationZ: 0,
    maxRotationZ: 360,
    minRotationAddValueX: 1,
    maxRotationAddValueX: 25,
    minRotationAddValueY: 1,
    maxRotationAddValueY: 25,
    minRotationAddValueZ: 1,
    maxRotationAddValueZ: 25,
    dragCoefficient: 0.001,
    opacity: 1,
    opacityAddValue: -0.01,
    minSize: 5,
    maxSize: 25,
  },
};
