import * as React from "react";
import { getDevicePixelRatio, hexToRgb } from "../Utils";

import styles from "./SpriteCanvas.module.css";

const SPRITE_SPACING = 2;

type SpriteProp =
  | {
      src: string;
      colorize: boolean;
    }
  | string;

interface Sprites {
  image: HTMLImageElement;
  colorize: boolean;
  src: string;
}

interface SpriteCanvasProps {
  sprites: SpriteProp[];
  colors: string[];
  spriteWidth: number;
  spriteHeight: number;
}

interface SpriteCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

const SpriteCanvas: React.ForwardRefRenderFunction<
  SpriteCanvasHandle,
  SpriteCanvasProps
> = (
  {
    sprites: spriteProps,
    colors,
    spriteWidth: spriteWidth,
    spriteHeight: spriteHeight,
  },
  forwardedRef
) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);
  const sprites = React.useRef<Sprites[]>([]);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      return {
        getCanvas: () => canvas.current,
      };
    },
    []
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
        const x =
          (spriteWidth * colorIndex + SPRITE_SPACING * colorIndex) *
          getDevicePixelRatio();
        const y =
          (spriteHeight * spriteIndex + SPRITE_SPACING * spriteIndex) *
          getDevicePixelRatio();

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

    Promise.all(loadingSprites.map((sprite) => sprite.loadPromise)).then(() => {
      sprites.current = loadingSprites.map((sprite) => ({
        colorize: sprite.colorize,
        image: sprite.image,
        src: sprite.src,
      }));
      drawSprites();
    });
  }, [drawSprites, spriteProps]);

  React.useEffect(() => {
    createSprites();
  }, [createSprites]);

  React.useEffect(() => {
    if (canvas.current != null) {
      canvas.current.width =
        (spriteWidth + SPRITE_SPACING) *
        Math.max(colors.length, 1) *
        getDevicePixelRatio();
      canvas.current.height =
        (spriteHeight + SPRITE_SPACING) *
        spriteProps.length *
        getDevicePixelRatio();
    }
  }, [colors.length, spriteHeight, spriteWidth, spriteProps.length]);

  return <canvas ref={canvas} className={styles.spriteCanvas} />;
};

export default React.forwardRef(SpriteCanvas);
