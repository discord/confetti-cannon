import type { Meta, StoryObj } from "@storybook/react";
import classNames from "classnames";
import * as React from "react";
import {
  Confetti,
  ConfettiCanvas,
  CreateConfettiArgs,
  Environment,
  SpriteCanvas,
  useConfettiCannon,
} from "../../";
import { getClickPosition } from "../../Utils";
import styles from "../Stories.module.css";
import SpriteCanvasStory from "../components/SpriteCanvas.stories";

const SIZE = 40;

function DraggingStory() {
  const confettiCanvas = React.useRef<React.ElementRef<
    typeof ConfettiCanvas
  > | null>(null);
  const spriteCanvas =
    React.useRef<React.ElementRef<typeof SpriteCanvas>>(null);
  const environment = React.useMemo(
    () => new Environment({ gravity: 0, wind: 0 }),
    []
  );
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas);
  const lastMousePosition = React.useRef({ x: 0, y: 0 });
  const lastMouseEventTime = React.useRef(0);
  const draggingConfetti = React.useRef<Confetti | null>(null);

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      const createConfettiArgs: CreateConfettiArgs = {
        position: {
          type: "static",
          value: { x, y },
        },
        size: {
          type: "static",
          value: SIZE,
        },
      };

      cannon.createConfetti(createConfettiArgs);
    },
    [cannon]
  );

  const handleMouseDown = (e: MouseEvent, confetti: Confetti | null) => {
    if (confetti != null) {
      confetti.velocity.x = 0;
      confetti.velocity.y = 0;
      draggingConfetti.current = confetti;
      lastMouseEventTime.current = Date.now();
      return;
    }
    const { x, y } = getClickPosition(e, confettiCanvas.current?.getCanvas());
    lastMousePosition.current = { x, y };
    addConfetti(x, y);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingConfetti.current != null) {
      const { x, y } = getClickPosition(e, confettiCanvas.current?.getCanvas());
      draggingConfetti.current.position.x = x;
      draggingConfetti.current.position.y = y;
      lastMouseEventTime.current = Date.now();
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (draggingConfetti.current == null) {
      return;
    }

    const { x, y } = getClickPosition(e, confettiCanvas.current?.getCanvas());

    const deltaTime = Math.max(Date.now() - lastMouseEventTime.current ?? 1, 1);
    const velocityX = (x - lastMousePosition.current.x) / deltaTime;
    const velocityY = (y - lastMousePosition.current.y) / deltaTime;
    draggingConfetti.current.velocity.x = velocityX;
    draggingConfetti.current.velocity.y = velocityY;

    draggingConfetti.current = null;
  };

  return (
    <>
      <SpriteCanvas
        ref={spriteCanvas}
        className={styles.bordered}
        sprites={SpriteCanvasStory.args.sprites}
        colors={SpriteCanvasStory.args.colors}
        spriteWidth={SIZE}
        spriteHeight={SIZE}
      />
      <ConfettiCanvas
        ref={confettiCanvas}
        className={classNames(styles.bordered, styles.sized)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        environment={environment}
      />
      <div>
        <button onClick={() => cannon.clearConfetti()}>Clear Canvas</button>
      </div>
    </>
  );
}

const meta = {
  title: "Examples/Dragging",
  component: DraggingStory,
} satisfies Meta<typeof DraggingStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
