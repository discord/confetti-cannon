import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import {
  ConfettiCanvas,
  CreateConfettiArgs,
  Environment,
  SpriteCanvas,
  SpriteProp,
  useConfettiCannon,
} from "../";
import { getClickPosition } from "../Utils";
import styles from "./Stories.module.css";
import ConfettiCanvasStory from "./components/ConfettiCanvas.stories";
import SpriteCanvasStory from "./components/SpriteCanvas.stories";

interface PlaygroundStoryProps {
  autoFire: boolean;
  numberToFire: number;
  showSpriteCanvas: boolean;
  gravity: number;
  wind: number;
  positionSpreadX: number;
  positionSpreadY: number;
  minVelocityX: number;
  maxVelocityX: number;
  minVelocityY: number;
  maxVelocityY: number;
  minRotationX: number;
  maxRotationX: number;
  minRotationY: number;
  maxRotationY: number;
  minRotationZ: number;
  maxRotationZ: number;
  minRotationAddValueX: number;
  maxRotationAddValueX: number;
  minRotationAddValueY: number;
  maxRotationAddValueY: number;
  minRotationAddValueZ: number;
  maxRotationAddValueZ: number;
  dragCoefficientX: number;
  dragCoefficientY: number;
  opacity: number;
  opacityAddValue: number;
  minSize: number;
  maxSize: number;
  sprites: SpriteProp[];
  colors: string[];
}

function PlaygroundStory({
  autoFire,
  numberToFire,
  showSpriteCanvas,
  gravity,
  wind,
  positionSpreadX,
  positionSpreadY,
  minVelocityX,
  maxVelocityX,
  minVelocityY,
  maxVelocityY,
  minRotationX,
  maxRotationX,
  minRotationY,
  maxRotationY,
  minRotationZ,
  maxRotationZ,
  minRotationAddValueX,
  maxRotationAddValueX,
  minRotationAddValueY,
  maxRotationAddValueY,
  minRotationAddValueZ,
  maxRotationAddValueZ,
  dragCoefficientX,
  dragCoefficientY,
  opacity,
  opacityAddValue,
  minSize,
  maxSize,
  sprites,
  colors,
}: PlaygroundStoryProps) {
  const confettiCanvas =
    React.useRef<React.ElementRef<typeof ConfettiCanvas>>(null);
  const spriteCanvas =
    React.useRef<React.ElementRef<typeof SpriteCanvas>>(null);
  const environment = React.useMemo(
    () => new Environment({ gravity, wind }),
    [gravity, wind]
  );
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas);

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      const createConfettiArgs: CreateConfettiArgs = {
        position: {
          type: "static-random",
          minValue: { x: x - positionSpreadX, y: y - positionSpreadY },
          maxValue: { x: x + positionSpreadX, y: y + positionSpreadY },
        },
        velocity: {
          type: "static-random",
          minValue: { x: minVelocityX, y: minVelocityY },
          maxValue: { x: maxVelocityX, y: maxVelocityY },
        },
        rotation: {
          type: "linear-random",
          minValue: { x: minRotationX, y: minRotationY, z: minRotationZ },
          maxValue: { x: maxRotationX, y: maxRotationY, z: maxRotationZ },
          minAddValue: {
            x: minRotationAddValueX,
            y: minRotationAddValueY,
            z: minRotationAddValueZ,
          },
          maxAddValue: {
            x: maxRotationAddValueX,
            y: maxRotationAddValueY,
            z: maxRotationAddValueZ,
          },
        },
        dragCoefficient: {
          type: "static",
          value: { x: dragCoefficientX, y: dragCoefficientY },
        },
        opacity: {
          type: "linear",
          value: opacity,
          addValue: opacityAddValue,
        },
        size: {
          type: "static-random",
          minValue: minSize,
          maxValue: maxSize,
        },
      };

      cannon.createMultipleConfetti(createConfettiArgs, numberToFire);
    },
    [
      cannon,
      dragCoefficientX,
      dragCoefficientY,
      maxRotationAddValueX,
      maxRotationAddValueY,
      maxRotationAddValueZ,
      maxRotationX,
      maxRotationY,
      maxRotationZ,
      maxSize,
      maxVelocityX,
      maxVelocityY,
      minRotationAddValueX,
      minRotationAddValueY,
      minRotationAddValueZ,
      minRotationX,
      minRotationY,
      minRotationZ,
      minSize,
      minVelocityX,
      minVelocityY,
      numberToFire,
      opacity,
      opacityAddValue,
      positionSpreadX,
      positionSpreadY,
    ]
  );

  const handleClick = (e: MouseEvent) => {
    const { x, y } = getClickPosition(e, confettiCanvas.current?.getCanvas());
    addConfetti(x, y);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timer;
    if (autoFire) {
      interval = setInterval(() => addConfetti(100, 100), 500);
    }
    return () => clearInterval(interval);
  }, [addConfetti, autoFire]);

  return (
    <>
      <SpriteCanvas
        ref={spriteCanvas}
        className={styles.bordered}
        visible={showSpriteCanvas}
        sprites={sprites}
        colors={colors}
        spriteWidth={maxSize}
        spriteHeight={maxSize}
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

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Playground",
  component: PlaygroundStory,
  tags: ["autodocs"],
  args: {
    autoFire: false,
    numberToFire: 5,
    showSpriteCanvas: false,
    gravity: ConfettiCanvasStory.args.gravity,
    wind: ConfettiCanvasStory.args.wind,
    positionSpreadX: 25,
    positionSpreadY: 25,
    minVelocityX: -20,
    maxVelocityX: 20,
    minVelocityY: -50,
    maxVelocityY: -75,
    minRotationX: 0,
    maxRotationX: 360,
    minRotationY: 0,
    maxRotationY: 360,
    minRotationZ: 0,
    maxRotationZ: 360,
    minRotationAddValueX: -25,
    maxRotationAddValueX: 25,
    minRotationAddValueY: -25,
    maxRotationAddValueY: 25,
    minRotationAddValueZ: -25,
    maxRotationAddValueZ: 25,
    dragCoefficientX: 0.001,
    dragCoefficientY: 0.001,
    opacity: 1,
    opacityAddValue: -0.01,
    minSize: 20,
    maxSize: 40,
    sprites: SpriteCanvasStory.args.sprites,
    colors: SpriteCanvasStory.args.colors,
  },
  parameters: {
    docs: {
      description: {
        component: `Tweak some settings and click the canvas to spawn some
          confetti.`,
      },
    },
  },
} satisfies Meta<typeof PlaygroundStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
