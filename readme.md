# Confetti Cannon

Launch Confetti

![Example](https://github.com/discord/confetti-cannon/blob/main/example.gif)

# Install
`npm i confetti-cannon`

# How to use

This is the basic use of the cannon where we render everything we need and then create confetti on the canvas where the user clicks. For more advanced uses, check out the stories.

```tsx
import {
  ConfettiCanvas,
  Environment,
  SpriteCanvas,
  useConfettiCannon,
  ConfettiCanvasHandle,
  SpriteCanvasHandle,
} from "confetti-cannon";

const SPRITES = [
  require("./images/square.svg"),
  require("./images/circle.svg"),
];
const COLORS = ["#FF73FA", "#FFC0FF"];
const SIZE = 40;

function Example() {
  const [confettiCanvas, setConfettiCanvas] =
    React.useState<ConfettiCanvasHandle | null>(null);
  const [spriteCanvas, setSpriteCanvas] =
    React.useState<SpriteCanvasHandle | null>(null);
  const environment = React.useMemo(() => new Environment(), []);
  const cannon = useConfettiCannon(confettiCanvas, spriteCanvas);

  const addConfetti = React.useCallback(
    (x: number, y: number) => {
      cannon.createConfetti({
        position: {
          type: "static",
          value: { x, y },
        },
        size: {
          type: "static",
          value: SIZE,
        },
      });
    },
    [cannon]
  );

  const handleClick = (e: MouseEvent) => {
    const { x, y } = getClickPosition(e, confettiCanvas?.getCanvas());
    addConfetti(x, y);
  };

  return (
    <>
      <SpriteCanvas
        ref={setSpriteCanvas}
        sprites={SPRITES}
        colors={COLORS}
        spriteWidth={SIZE}
        spriteHeight={SIZE}
      />
      <ConfettiCanvas
        ref={setConfettiCanvas}
        onClick={handleClick}
        environment={environment}
      />
    </>
  );
}
```

# Components

## SpriteCanvas

A `SpriteCanvas` is used to pre-render your confetti. You'll need to render this somewhere in your app in order to launch confetti on an `ConfettiCanvas`. This will not be visible to users.

| Prop           | Type                                                 | Description                                                                                                     |
| -------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `spriteWidth`  | `number`                                             | The width to render the confetti at. Should be the largest width your confetti will be rendered at if possible  |
| `spriteHeight` | `number`                                             | The height to render the confetti at. Should be the largest width your confetti will be rendered at if possible |
| `colors`       | `string[]`                                           | The colors your confetti will be rendered as                                                                    |
| `sprites`      | `Array<string \| {src: string, colorized: boolean}>` | The sources of your confetti images. If you do not want to color an image, use `{src, colorize: false}`         |
| `visible`      | `boolean`                                            | Used for debugging if you'd like to see the `SpriteCanvas` on screen                                            |

## `ConfettiCanvas`

A `ConfettiCanvas` is the canvas that will render your confetti on screen

| Prop          | Type                                                  | Description                                                                                                       |
| ------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `environment` | `Environment`                                         | An object representing the environment effecting the confetti                                                     |
| `onClick`     | `(e: MouseEvent, confetti: Confetti \| null) => void` | Event fired when the user clicks the canvas, if they clicked a confetti, that confetti is included                |
| `onMouseDown` | `(e: MouseEvent, confetti: Confetti \| null) => void` | Event fired when the user mouses down on the canvas, if they moused down on a confetti, that confetti is included |

to create an `Environment`, use `new Environment()`.

| Arg       | Type     | Default | Description                                 |
| --------- | -------- | ------- | ------------------------------------------- |
| `gravity` | `number` | `-9.8`  | How confetti will be effected on the y axis |
| `wind`    | `number` | `0`     | How confetti will be effected on the x axis |

## useConfettiCannon

`useConfettiCannon` is the hook that will allow you to launch confetti. This takes a `ConfettiCanvas` and a `SpriteCanvas` and provides a few functions to create confetti.

### Cannon methods

There's several methods available to add and manage confetti on the canvas. Typically, you'll want to use `createMultipleConfetti`.

| Method                   | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `createConfetti`         | Create a single confetti and add it to the canvas   |
| `createMultipleConfetti` | Create multiple confetti and add them to the canvas |
| `addConfetti`            | Add a confetti on the canvas                        |
| `deleteConfetti`         | Delete a confetti from the canvas                   |
| `clearConfetti`          | Delete all confetti from the canvas                 |

### CreateConfettiArgs

These are passed to `createConfetti` methods to create a confetti and define how it is updated. Each includes a `type`, which then defines the rest of the args.

| Arg               | Type                  | Default       | Description                                                                                                                           |
| ----------------- | --------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `?string`             | A uuid        | A unique id to a confetti if you want to reference it later, will be a uuid if not specified                                          |
| `position`        | `ConfigVector2Input`  | N/A           | The position to launch the confetti at and how it will be updated                                                                     |
| `velocity`        | `?ConfigVector2Input` | static, 0     | The velocity to launch the confetti at and how it will be updated                                                                     |
| `rotation`        | `?ConfigVector3Input` | static, 0     | The rotation to launch the confetti at and how it will be updated                                                                     |
| `dragCoefficient` | `?ConfigVector2Input` | static, 0.001 | The drag coefficient to launch the confetti at and how it will be updated. This effects how much gravity and wind effect the confetti |
| `size`            | `ConfigVector2Input`  | N/A           | The size to launch the confetti at and how it will be updated                                                                         |
| `opacity`         | `?ConfigNumberInput`  | static 1      | The opacity to launch the confetti at and how it will be updated                                                                      |

**Config Inputs**
Config inputs are helper objects that will eventually create an `UpdatableValue` that lives on `Confetti` that tells the `Confetti` how to update on every tick.

Valid types include:

- `static`: Will not change on updates (gravity and wind will still effect relevant fields)
- `linear`: Will update linearly on every update
- `oscillating`: Will oscillate between two values with a given easing

Each type also includes a `-random` option (ex: `static-random`) which allows you to add randomization with the initial value and the update values.

Any `Vector2` or `Vector3` will also accept a `number` as a shortcut to set all `x`, `y`, and `z` values to that number.

### CreateConfettiRequestedOptions

This is an optional object that will request that the canvas create a specific sprite or color. The sprite and color must be included on your sprite canvas for this to work.

| Arg      | Type                                                  | Description          |
| -------- | ----------------------------------------------------- | -------------------- |
| `sprite` | `?Array<string \| {src: string, colorized: boolean}>` | The requested sprite |
| `color`  | `?string`                                             | The requested color  |
