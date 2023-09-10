import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import {
  Confetti,
  ConfettiCanvas,
  ConfettiCanvasHandle,
  CreateConfettiArgs,
  Environment,
  SpriteCanvas,
  SpriteCanvasHandle,
  useConfettiCannon,
} from "../../";
import { getClickPosition } from "../../Utils";
import styles from "../Stories.module.css";
import SpriteCanvasStory from "../components/SpriteCanvas.stories";

interface StaticStoryProps {
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

function StaticStory({
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
}: StaticStoryProps) {
  const [confettiCanvas, setConfettiCanvas] =
    React.useState<ConfettiCanvasHandle | null>(null);
  const [spriteCanvas, setSpriteCanvas] =
    React.useState<SpriteCanvasHandle | null>(null);
  const environment = React.useMemo(
    () => new Environment({ gravity: 0, wind: 0 }),
    []
  );
  const [isSmall, setIsSmall] = React.useState(false);
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas);

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      const createConfettiArgs: CreateConfettiArgs = {
        position: {
          type: "linear",
          value: { x, y },
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
      };

      cannon.createConfetti(createConfettiArgs);
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

  const handleClick = (e: MouseEvent, confetti: Confetti | null) => {
    if (confetti != null) {
      cannon.deleteConfetti(confetti.id);
      return;
    }
    const { x, y } = getClickPosition(e, confettiCanvas?.getCanvas());
    addConfetti(x, y);
  };

  return (
    <>
      <SpriteCanvas
        ref={setSpriteCanvas}
        className={styles.bordered}
        visible={showSpriteCanvas}
        sprites={SpriteCanvasStory.args.sprites}
        colors={SpriteCanvasStory.args.colors}
        spriteWidth={size}
        spriteHeight={size}
      />
      <ConfettiCanvas
        ref={setConfettiCanvas}
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

const meta = {
  title: "Examples/Static",
  component: StaticStory,
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
} satisfies Meta<typeof StaticStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
