import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import Environment from "../../Environment";
import ConfettiCanvas from "../../components/ConfettiCanvas";

function ConfettiCanvasStory(args: { gravity: number; wind: number }) {
  return <ConfettiCanvas environment={new Environment(args)} />;
}

const meta = {
  title: "Components/ConfettiCanvas",
  component: ConfettiCanvasStory,
  tags: ["autodocs"],
  args: {
    gravity: -9.8,
    wind: 2,
  },
} satisfies Meta<typeof ConfettiCanvasStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
