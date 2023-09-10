import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import {
  ConfettiCanvas,
  ConfettiCanvasHandle,
  CreateConfettiArgs,
  Environment,
  SpriteCanvas,
  SpriteCanvasHandle,
  useConfettiCannon,
} from "../../";
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

function ConditionalRenderStory() {
  const [shouldRender, setShouldRender] = React.useState(false);

  const [confettiCanvas, setConfettiCanvas] =
    React.useState<ConfettiCanvasHandle | null>(null);
  const [spriteCanvas, setSpriteCanvas] =
    React.useState<SpriteCanvasHandle | null>(null);
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

  React.useEffect(() => {
    addConfetti(20, 20);
  }, [addConfetti]);

  return (
    <>
      <button onClick={() => setShouldRender(!shouldRender)}>Render</button>
      {shouldRender ? (
        <>
          <SpriteCanvas
            ref={setSpriteCanvas}
            className={styles.bordered}
            sprites={SPRITES}
            colors={COLORS}
            spriteWidth={MAX_SIZE}
            spriteHeight={MAX_SIZE}
          />
          <ConfettiCanvas
            ref={setConfettiCanvas}
            className={classNames(styles.bordered, styles.sized)}
            environment={environment}
          />
        </>
      ) : null}
    </>
  );
}

const meta = {
  title: "Examples/ConditionalRenderStory",
  component: ConditionalRenderStory,
} satisfies Meta<typeof ConditionalRenderStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
