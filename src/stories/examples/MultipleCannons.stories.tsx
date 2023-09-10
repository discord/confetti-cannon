import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import { v4 as uuid } from "uuid";
import {
  Confetti,
  ConfettiCanvas,
  ConfettiCanvasHandle,
  CreateConfettiArgs,
  Environment,
  SpriteCanvas,
  SpriteCanvasHandle,
  easeInOutQuad,
  getUpdatableValueVector2,
  getUpdatableValueVector3,
  useConfettiCannon,
} from "../../";
import { getClickPosition } from "../../Utils";
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
const MAX_CONFETTI_SIZE = 40;

const FALLING_CHARACTER_ID_PREFIX = "FALLING_CHARACTER";
const FALLING_CHARACTER_CONFETTI_CONFIG: Partial<CreateConfettiArgs> &
  Pick<CreateConfettiArgs, "size"> = {
  velocity: {
    type: "static-random",
    minValue: { x: -5, y: 0 },
    maxValue: { x: -2, y: 0 },
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
    value: { x: 0.001, y: 0.05 },
  },
};

const CONFETTI_CONFETTI_CONFIG: Partial<CreateConfettiArgs> &
  Pick<CreateConfettiArgs, "size"> = {
  size: {
    type: "static-random",
    minValue: 20,
    maxValue: MAX_CONFETTI_SIZE,
  },
  velocity: {
    type: "static-random",
    minValue: { x: -25, y: -75 },
    maxValue: { x: 25, y: -50 },
  },
  rotation: {
    type: "linear-random",
    minValue: 0,
    maxValue: 360,
    minAddValue: 5,
    maxAddValue: 10,
  },
};

function MultipleCannonsStory() {
  const [confettiCanvas, setConfettiCanvas] =
    React.useState<ConfettiCanvasHandle | null>(null);

  const [confettiSpriteCanvas, setConfettiSpriteCanvas] =
    React.useState<SpriteCanvasHandle | null>(null);
  const [fallingCharacterSpriteCanvas, setFallingCharacterSpriteCanvas] =
    React.useState<SpriteCanvasHandle | null>(null);

  const environment = React.useMemo(() => new Environment({ wind: -5 }), []);

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
      confettiCannon.createMultipleConfetti(createConfettiArgs, 5);
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

      return fallingCharacterCannon.createConfetti(createConfettiArgs);
    },
    [fallingCharacterCannon]
  );

  const handleClickFallingCharacter = React.useCallback(
    (confetti: Confetti) => {
      const prevRotation = confetti.rotation.z;
      const futureRotation = confetti.rotation.previewUpdate(0.1).z;
      const direction = prevRotation - futureRotation > 0 ? -1 : 1;
      confetti.rotation = getUpdatableValueVector3({
        type: "linear-random",
        minValue: confetti.rotation,
        maxValue: confetti.rotation,
        minAddValue: { x: 0, y: 0, z: 5 * direction },
        maxAddValue: { x: 0, y: 0, z: 10 * direction },
      });
      confetti.dragCoefficient = getUpdatableValueVector2({
        type: "static",
        value: 0.001,
      });

      confetti.addForce({ x: 0, y: -100 });
      addConfetti(
        confetti.position.x + confetti.width / 2,
        confetti.position.y + confetti.height / 2
      );
    },
    [addConfetti]
  );

  const handleClick = (e: MouseEvent, confetti: Confetti | null) => {
    if (
      confetti != null &&
      confetti.id.startsWith(FALLING_CHARACTER_ID_PREFIX)
    ) {
      return handleClickFallingCharacter(confetti);
    }
    const { x, y } = getClickPosition(e, confettiCanvas?.getCanvas());
    addFallingCharacter(x, y);
  };

  return (
    <>
      <SpriteCanvas
        ref={setFallingCharacterSpriteCanvas}
        sprites={FALLING_CHARACTER_SPRITES}
        colors={FALLING_CHARACTER_COLORS}
        spriteWidth={FALLING_CHARACTER_SIZE}
        spriteHeight={FALLING_CHARACTER_SIZE}
      />
      <SpriteCanvas
        ref={setConfettiSpriteCanvas}
        sprites={SPRITES}
        colors={COLORS}
        spriteWidth={MAX_CONFETTI_SIZE}
        spriteHeight={MAX_CONFETTI_SIZE}
      />
      <ConfettiCanvas
        ref={setConfettiCanvas}
        className={classNames(styles.bordered, styles.sizedLarge)}
        onClick={handleClick}
        environment={environment}
      />
    </>
  );
}

const meta = {
  title: "Examples/MultipleCannons",
  component: MultipleCannonsStory,
} satisfies Meta<typeof MultipleCannonsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
