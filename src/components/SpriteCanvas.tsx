import classNames from "classnames";
import * as React from "react";
import { SPRITE_SPACING } from "../ConstantsInternal";
import { SpriteProp } from "../Types";
import { hexToRgb } from "../Utils";
import styles from "./SpriteCanvas.module.css";

export interface Sprite {
  image: HTMLImageElement;
  colorize: boolean;
  src: string;
}

export interface SpriteCanvasProps {
  className?: string;
  visible?: boolean;
  sprites: SpriteProp[];
  colors: string[];
  spriteWidth: number;
  spriteHeight: number;
}

export interface SpriteCanvasData {
  sprites: Sprite[];
  colors: string[];
  spriteWidth: number;
  spriteHeight: number;
}

export interface SpriteCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  getCreateData: () => SpriteCanvasData;
  onReady: (listener: (isReady: boolean) => void) => void;
  isReady: boolean;
}

const SpriteCanvas: React.ForwardRefRenderFunction<
  SpriteCanvasHandle,
  SpriteCanvasProps
> = (
  {
    className,
    visible = false,
    sprites: spriteProps,
    colors,
    spriteWidth,
    spriteHeight,
  },
  forwardedRef
) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);
  const sprites = React.useRef<Sprite[]>([]);
  const isReady = React.useRef<boolean>(false);
  const onReadyListeners = React.useRef<Array<(isReady: boolean) => void>>([]);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      return {
        getCanvas: () => canvas.current,
        getCreateData: () => ({
          sprites: sprites.current,
          colors,
          spriteWidth,
          spriteHeight,
        }),
        onReady: (listener: (isReady: boolean) => void) => {
          onReadyListeners.current.push(listener);
        },
        isReady: isReady.current,
      };
    },
    [colors, spriteHeight, spriteWidth]
  );

  const drawSprites = React.useCallback(() => {
    const canvasRef = canvas.current;
    const context = canvasRef?.getContext("2d", {
      willReadFrequently: true,
    });
    if (context == null || canvasRef == null) {
      return;
    }
    context.clearRect(0, 0, canvasRef.width, canvasRef.height);

    sprites.current.forEach((sprite, spriteIndex) => {
      const drawSprite = (color: string | null, colorIndex: number) => {
        const x = spriteWidth * colorIndex + SPRITE_SPACING * colorIndex;
        const y = spriteHeight * spriteIndex + SPRITE_SPACING * spriteIndex;

        context.drawImage(sprite.image, x, y, spriteWidth, spriteHeight);

        if (color != null) {
          const imageData = context.getImageData(
            x,
            y,
            spriteWidth,
            spriteHeight
          );
          const rgb = hexToRgb(color);

          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = rgb.r;
            imageData.data[i + 1] = rgb.g;
            imageData.data[i + 2] = rgb.b;
          }

          context.putImageData(imageData, x, y);
        }
      };

      if (sprite.colorize) {
        colors.forEach((color, colorIndex) => drawSprite(color, colorIndex));
      } else {
        drawSprite(null, 0);
      }
    });
  }, [colors, spriteHeight, spriteWidth]);

  const createSprites = React.useCallback(() => {
    const loadingSprites = spriteProps.map((sprite) => {
      const image = new Image();
      const src = typeof sprite === "string" ? sprite : sprite.src;
      const colorize = typeof sprite === "string" ? true : sprite.colorize;

      image.src = src;
      const loadPromise = new Promise((resolve) => {
        image.onload = resolve;
      });
      return { colorize, image, src, loadPromise };
    });

    return Promise.all(loadingSprites.map((sprite) => sprite.loadPromise)).then(
      () => {
        sprites.current = loadingSprites.map((sprite) => ({
          colorize: sprite.colorize,
          image: sprite.image,
          src: sprite.src,
        }));
      }
    );
  }, [spriteProps]);

  const getCanvasReady = React.useCallback(async () => {
    await createSprites();
    drawSprites();
    isReady.current = true;
    onReadyListeners.current.forEach((listener) => listener(true));
  }, [createSprites, drawSprites]);

  React.useEffect(() => {
    getCanvasReady();
  }, [getCanvasReady]);

  React.useEffect(() => {
    const listeners = onReadyListeners.current;
    return () => listeners.forEach((listener) => listener(false));
  }, []);

  React.useEffect(() => {
    if (canvas.current != null) {
      canvas.current.width =
        (spriteWidth + SPRITE_SPACING) * Math.max(colors.length, 1);
      canvas.current.height =
        (spriteHeight + SPRITE_SPACING) * spriteProps.length;
    }
  }, [colors.length, spriteHeight, spriteWidth, spriteProps.length]);

  return (
    <canvas
      ref={canvas}
      className={classNames(className, {
        [styles.spriteCanvasHidden]: !visible,
      })}
    />
  );
};

export default React.forwardRef(SpriteCanvas);
