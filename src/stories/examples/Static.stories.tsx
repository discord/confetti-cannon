import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ConfettiCanvas from "../../components/ConfettiCanvas";
import SpriteCanvas from "../../components/SpriteCanvas";
import useConfettiCannon from "../../components/useConfettiCannon";
import { CreateConfettiArgs } from "../../createConfetti";
import Environment from "../../Environment";
import { getClickPosition } from "../Utils";
import SpriteCanvasStory from "../components/SpriteCanvas.stories";

import styles from "../Stories.module.css";
import classNames from "classnames";

interface StaticStoryWrapperProps {
  showSpriteCanvas: boolean;
  size: number;
  positionAddX: number;
  positionAddY: number;
  velocityAddX: number;
  velocityAddY: number;
  rotateAddX: number;
  rotateAddY: number;
  rotateAddZ: number;
  opacityAdd: number;
  sizeAdd: number;
}

function StaticStoryWrapper({
  showSpriteCanvas,
  size,
  positionAddX,
  positionAddY,
  velocityAddX,
  velocityAddY,
  rotateAddX,
  rotateAddY,
  rotateAddZ,
  opacityAdd,
  sizeAdd,
}: StaticStoryWrapperProps) {
  const confettiCanvas = React.useRef<React.ElementRef<
    typeof ConfettiCanvas
  > | null>(null);
  const spriteCanvas =
    React.useRef<React.ElementRef<typeof SpriteCanvas>>(null);
  const environment = React.useMemo(
    () => new Environment({ gravity: 0, wind: 0 }),
    []
  );
  const [isSmall, setIsSmall] = React.useState(false);
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas);

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      const spriteCanvasRef = spriteCanvas.current?.getCanvas();
      if (confettiCanvas.current == null || spriteCanvasRef == null) {
        return;
      }

      const createConfettiArgs: CreateConfettiArgs = {
        position: {
          type: "linear",
          value: { x: x, y: y },
          addValue: { x: positionAddX, y: positionAddY },
        },
        velocity: {
          type: "linear",
          value: { x: 0, y: 0 },
          addValue: { x: velocityAddX, y: velocityAddY },
        },
        rotation: {
          type: "linear",
          value: { x: 0, y: 0, z: 0 },
          addValue: { x: rotateAddX, y: rotateAddY, z: rotateAddZ },
        },
        dragCoefficient: {
          type: "static",
          value: 0.001,
        },
        opacity: {
          type: "linear",
          value: 1,
          addValue: opacityAdd,
        },
        size: {
          type: "linear",
          value: size,
          addValue: sizeAdd,
        },
        colors: SpriteCanvasStory.args.colors,
      };

      cannon.addConfetti(createConfettiArgs);
    },
    [
      cannon,
      opacityAdd,
      positionAddX,
      positionAddY,
      rotateAddX,
      rotateAddY,
      rotateAddZ,
      size,
      sizeAdd,
      velocityAddX,
      velocityAddY,
    ]
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
        visible={showSpriteCanvas}
        sprites={SpriteCanvasStory.args.sprites}
        colors={SpriteCanvasStory.args.colors}
        spriteWidth={size}
        spriteHeight={size}
      />
      <ConfettiCanvas
        ref={confettiCanvas}
        className={classNames(
          styles.bordered,
          isSmall ? styles.sizedSmall : styles.sized
        )}
        onClick={handleClick}
        environment={environment}
      />
      <div>
        <button onClick={() => addConfetti(size / 2, size / 2)}>
          Create at top left
        </button>
        <button onClick={() => cannon.clearConfetti()}>Clear Canvas</button>
        <button onClick={() => setIsSmall(!isSmall)}>Toggle Size</button>
      </div>
    </>
  );
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Examples/Static Story",
  component: StaticStoryWrapper,
  tags: ["autodocs"],
  args: {
    showSpriteCanvas: false,
    size: 40,
    positionAddX: 0,
    positionAddY: 0,
    velocityAddX: 0,
    velocityAddY: 0,
    rotateAddX: 0,
    rotateAddY: 0,
    rotateAddZ: 0,
    opacityAdd: 0,
    sizeAdd: 0,
  },
} satisfies Meta<typeof StaticStoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};