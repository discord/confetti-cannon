import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import {
  ConfettiCanvas,
  CreateConfettiArgs,
  Environment,
  SpriteCanvas,
  useConfettiCannon,
} from "../../";
import { getClickPosition } from "../../Utils";
import styles from "../Stories.module.css";

const SPRITES = [
  require("../images/square.svg"),
  require("../images/circle.svg"),
  { src: require("../images/duck.svg"), colorize: false },
];

const COLORS = [
  "#FF73FA",
  "#FFC0FF",
  "#FFD836",
  "#FF9A15",
  "#A5F7DE",
  "#51BC9D",
  "#AEC7FF",
  "#3E70DD",
];

const MAX_SIZE = 40;

function BasicStory() {
  const confettiCanvas =
    React.useRef<React.ElementRef<typeof ConfettiCanvas>>(null);
  const spriteCanvas =
    React.useRef<React.ElementRef<typeof SpriteCanvas>>(null);
  const environment = React.useMemo(() => new Environment(), []);
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas);

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();
      if (confettiCanvas.current == null || spriteCanvasRef == null) {
        return;
      }

      const createConfettiArgs: CreateConfettiArgs = {
        position: {
          type: "static-random",
          minValue: { x: x, y: y },
          maxValue: { x: x, y: y },
        },
        velocity: {
          type: "static-random",
          minValue: { x: 5, y: -50 },
          maxValue: { x: 5, y: -75 },
        },
        rotation: {
          type: "linear-random",
          minValue: { x: 0, y: 0, z: 0 },
          maxValue: { x: 360, y: 360, z: 360 },
          minAddValue: {
            x: -25,
            y: -25,
            z: -25,
          },
          maxAddValue: {
            x: 25,
            y: 25,
            z: 25,
          },
        },
        size: {
          type: "static-random",
          minValue: 20,
          maxValue: MAX_SIZE,
        },
      };

      cannon.addConfetti(createConfettiArgs);
    },
    [cannon]
  );

  const handleClick = (e: React.MouseEvent) => {
    const { x, y } = getClickPosition(e, confettiCanvas.current?.getCanvas());
    addConfetti(x, y);
  };

  return (
    <>
      <SpriteCanvas
        ref={spriteCanvas}
        className={styles.bordered}
        sprites={SPRITES}
        colors={COLORS}
        spriteWidth={MAX_SIZE}
        spriteHeight={MAX_SIZE}
      />
      <ConfettiCanvas
        ref={confettiCanvas}
        className={classNames(styles.bordered, styles.sized)}
        onClick={handleClick}
        environment={environment}
      />
    </>
  );
}

const meta = {
  title: "Examples/Basic",
  component: BasicStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `This is a basic example. Click to spawn a confetti.`,
      },
    },
  },
} satisfies Meta<typeof BasicStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
