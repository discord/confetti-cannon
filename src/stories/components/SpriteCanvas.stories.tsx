import type { Meta, StoryObj } from "@storybook/react";
import SpriteCanvas from "../../components/SpriteCanvas";

const SPRITES = [
  require("../images/square.svg"),
  require("../images/circle.svg"),
  { src: require("../images/duck.svg"), colorize: false },
];

const meta = {
  title: "Components/SpriteCanvas",
  component: SpriteCanvas,
  tags: ["autodocs"],
  args: {
    visible: true,
    spriteWidth: 20,
    spriteHeight: 20,
    colors: [
      "#FF73FA",
      "#FFC0FF",
      "#FFD836",
      "#FF9A15",
      "#A5F7DE",
      "#51BC9D",
      "#AEC7FF",
      "#3E70DD",
    ],
    sprites: SPRITES,
  },
} satisfies Meta<typeof SpriteCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
