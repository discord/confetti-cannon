import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import { ConfettiCanvas, Environment } from "../../";
import styles from "../Stories.module.css";

function ConfettiCanvasStory({
  className,
  ...args
}: {
  className: string;
  gravity: number;
  wind: number;
}) {
  return (
    <ConfettiCanvas className={className} environment={new Environment(args)} />
  );
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
    className: classNames(styles.sized, styles.bordered),
  },
} satisfies Meta<typeof ConfettiCanvasStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
