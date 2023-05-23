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
  parameters: {
    docs: {
      description: {
        component: `This component will render a canvas that will render your confetti.
          This story won't display anything since we need a \`SpriteCanvas\`
          to render confetti. To this this in action see
          [Playground](/docs/playground--docs)`,
      },
    },
  },
  args: {
    gravity: -9.8,
    wind: 2,
  },
} satisfies Meta<typeof ConfettiCanvasStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
