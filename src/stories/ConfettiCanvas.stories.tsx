import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ConfettiCanvas from "../react/ConfettiCanvas";
import Environment from "../Environment";

function ConfettiCanvasStory(args: { gravity: number; wind: number }) {
  return <ConfettiCanvas environment={new Environment(args)} />;
}

const meta = {
  title: "ConfettiCanvas",
  component: ConfettiCanvasStory,
  excludeStories: ["Example"],
  args: {
    gravity: -9.8,
    wind: 5,
  },
} satisfies Meta<typeof ConfettiCanvasStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
