import type { StoryObj } from "@storybook/react";
import * as React from "react";
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
declare function StaticStory({ showSpriteCanvas, size, positionAddX, positionAddY, velocityAddX, velocityAddY, rotateAddX, rotateAddY, rotateAddZ, opacityAdd, sizeAdd, }: StaticStoryProps): React.JSX.Element;
declare const meta: {
    title: string;
    component: typeof StaticStory;
    tags: string[];
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    args: {
        showSpriteCanvas: false;
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
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Example: Story;
