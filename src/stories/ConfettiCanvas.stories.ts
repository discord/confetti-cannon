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

export const Example: Story = {
  args: {},
};
