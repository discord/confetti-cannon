import type { Meta, StoryObj } from "@storybook/react";
import SpriteCanvas from "../../components/SpriteCanvas";
import styles from "../Stories.module.css";

const SPRITES = [
  require("../images/square.svg"),
  require("../images/circle.svg"),
  { src: require("../images/duck.svg"), colorize: false },
];

const meta = {
  title: "Components/SpriteCanvas",
  component: SpriteCanvas,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "This component is used to efficiently render your confetti by rendering a sprite sheet.",
      },
    },
  },
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
    className: styles.bordered,
  },
} satisfies Meta<typeof SpriteCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
