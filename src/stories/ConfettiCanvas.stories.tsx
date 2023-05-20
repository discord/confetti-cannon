import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ConfettiCanvas from "../react/ConfettiCanvas";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/ConfettiCanvas",
  component: ConfettiCanvas,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ConfettiCanvas>;

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
  render: (args) => {
    const ref = React.useRef<React.ElementRef<typeof ConfettiCanvas>>(null);

    const handleClick = (e) => {
      const { x, y } = getClickPosition(e, ref.current?.getCanvas());
      ref.current?.addConfetti(x, y);
    };

    return <ConfettiCanvas ref={ref} onClick={handleClick} />;
  },
  args: {},
};
