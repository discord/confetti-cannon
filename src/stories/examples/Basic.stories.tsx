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
      const createConfettiArgs: CreateConfettiArgs = {
        position: {
          type: "static-random",
          minValue: { x, y },
          maxValue: { x, y },
        },
        velocity: {
          type: "static-random",
          minValue: { x: 5, y: -50 },
          maxValue: { x: 5, y: -75 },
        },
        rotation: {
          type: "linear-random",
          minValue: 0,
          maxValue: 360,
          minAddValue: -25,
          maxAddValue: 25,
        },
        size: {
          type: "static-random",
          minValue: 20,
          maxValue: MAX_SIZE,
        },
      };

      cannon.createConfetti(createConfettiArgs);
    },
    [cannon]
  );

  const handleClick = (e: MouseEvent) => {
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
} satisfies Meta<typeof BasicStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
