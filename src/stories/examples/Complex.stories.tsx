import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import { v4 as uuid } from "uuid";
import Confetti from "../../Confetti";
import Environment from "../../Environment";
import {
  UpdatableVector2Value,
  UpdatableVector3Value,
} from "../../UpdatableValue";
import {
  LinearUpdatableValue,
  StaticUpdatableValue,
} from "../../UpdatableValueImplementations";
import { getClickPosition } from "../../Utils";
import ConfettiCanvas from "../../components/ConfettiCanvas";
import SpriteCanvas from "../../components/SpriteCanvas";
import useConfettiCannon from "../../components/useConfettiCannon";
import { CreateConfettiArgs } from "../../createConfetti";
import { easeInOutQuad } from "../../easing";
import styles from "../Stories.module.css";

const FALLING_CHARACTER_SPRITE = {
  src: require("../images/duck.svg"),
  colorize: false,
};
const FALLING_CHARACTER_SPRITES = [FALLING_CHARACTER_SPRITE];
const FALLING_CHARACTER_COLORS: string[] = [];

const SPRITES = [
  require("../images/square.svg"),
  require("../images/circle.svg"),
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

const FALLING_CHARACTER_SIZE = 80;
const MAX_SIZE = FALLING_CHARACTER_SIZE;

const FALLING_CHARACTER_ID_PREFIX = "FALLING_CHARACTER";
const FALLING_CHARACTER_CONFETTI_CONFIG: Partial<CreateConfettiArgs> = {
  velocity: {
    type: "static-random",
    minValue: { x: 2, y: 0 },
    maxValue: { x: 5, y: 0 },
  },
  rotation: {
    type: "oscillating-random",
    minValue: { x: 0, y: 0, z: -20 },
    maxValue: { x: 0, y: 0, z: 20 },
    minStart: { x: 0, y: 0, z: -20 },
    maxStart: { x: 0, y: 0, z: -10 },
    minFinal: { x: 0, y: 0, z: 10 },
    maxFinal: { x: 0, y: 0, z: 20 },
    minDuration: { x: 0, y: 0, z: 5 },
    maxDuration: { x: 0, y: 0, z: 8 },
    minDirection: { x: 1, y: 1, z: -1 },
    maxDirection: { x: 1, y: 1, z: 1 },
    easingFunctions: [easeInOutQuad],
  },
  size: {
    type: "static",
    value: FALLING_CHARACTER_SIZE,
  },
  dragCoefficient: {
    type: "static",
    value: { x: 0.001, y: 0.01 },
  },
};

const CONFETTI_CONFETTI_CONFIG: Partial<CreateConfettiArgs> = {
  size: {
    type: "static-random",
    minValue: 20,
    maxValue: 40,
  },
  velocity: {
    type: "static-random",
    minValue: { x: -25, y: -75 },
    maxValue: { x: 25, y: -50 },
  },
  rotation: {
    type: "linear-random",
    minValue: { x: 0, y: 0, z: 0 },
    maxValue: { x: 360, y: 360, z: 360 },
    minAddValue: {
      x: 5,
      y: 5,
      z: 5,
    },
    maxAddValue: {
      x: 10,
      y: 10,
      z: 10,
    },
  },
};

function ComplexStory() {
  const confettiCanvas =
    React.useRef<React.ElementRef<typeof ConfettiCanvas>>(null);

  const confettiSpriteCanvas =
    React.useRef<React.ElementRef<typeof SpriteCanvas>>(null);
  const fallingCharacterSpriteCanvas =
    React.useRef<React.ElementRef<typeof SpriteCanvas>>(null);

  const environment = React.useMemo(() => new Environment({ wind: 5 }), []);

  const fallingCharacterCannon = useConfettiCannon(
    confettiCanvas,
    fallingCharacterSpriteCanvas
  );
  const confettiCannon = useConfettiCannon(
    confettiCanvas,
    confettiSpriteCanvas
  );

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      const createConfettiArgs: CreateConfettiArgs = {
        ...CONFETTI_CONFETTI_CONFIG,
        position: {
          type: "static-random",
          minValue: { x: x - 5, y: y - 5 },
          maxValue: { x: x + 5, y: y + 5 },
        },
      };
      confettiCannon.addMultipleConfetti(createConfettiArgs, 5);
    },
    [confettiCannon]
  );

  const addFallingCharacter = React.useCallback(
    (x: number, y: number) => {
      const createConfettiArgs: CreateConfettiArgs = {
        id: `${FALLING_CHARACTER_ID_PREFIX}-${uuid()}`,
        ...FALLING_CHARACTER_CONFETTI_CONFIG,
        position: {
          type: "static",
          value: { x, y },
        },
      };

      fallingCharacterCannon.addConfetti(createConfettiArgs);
    },
    [fallingCharacterCannon]
  );

  const handleClickFallingCharacter = React.useCallback(
    (confetti: Confetti) => {
      confetti.rotation = new UpdatableVector3Value(
        new StaticUpdatableValue(confetti.rotation.x),
        new StaticUpdatableValue(confetti.rotation.y),
        new LinearUpdatableValue(confetti.rotation.z, 5)
      );
      confetti.dragCoefficient = new UpdatableVector2Value(
        new StaticUpdatableValue(0.001),
        new StaticUpdatableValue(0.001)
      );
      confetti.addForce({ x: 0, y: -100 });
      addConfetti(
        confetti.position.x + confetti.width.value / 2,
        confetti.position.y + confetti.height.value / 2
      );
    },
    [addConfetti]
  );

  const handleClick = (e: React.MouseEvent, confetti: Confetti | null) => {
    if (
      confetti != null &&
      confetti.id.startsWith(FALLING_CHARACTER_ID_PREFIX)
    ) {
      return handleClickFallingCharacter(confetti);
    }
    const { x, y } = getClickPosition(e, confettiCanvas.current?.getCanvas());
    addFallingCharacter(x, y);
  };

  return (
    <>
      <SpriteCanvas
        ref={fallingCharacterSpriteCanvas}
        sprites={FALLING_CHARACTER_SPRITES}
        colors={FALLING_CHARACTER_COLORS}
        spriteWidth={MAX_SIZE}
        spriteHeight={MAX_SIZE}
      />
      <SpriteCanvas
        ref={confettiSpriteCanvas}
        sprites={SPRITES}
        colors={COLORS}
        spriteWidth={MAX_SIZE}
        spriteHeight={MAX_SIZE}
      />
      <ConfettiCanvas
        ref={confettiCanvas}
        className={classNames(styles.bordered, styles.sizedLarge)}
        onClick={handleClick}
        environment={environment}
      />
    </>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Examples/Complex",
  component: ComplexStory,
  tags: ["autodocs"],
} satisfies Meta<typeof ComplexStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};