/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("../../components/SpriteCanvas").SpriteCanvasProps & import("react").RefAttributes<import("../../").SpriteCanvasHandle>>;
    tags: string[];
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    args: {
        visible: true;
        spriteWidth: number;
        spriteHeight: number;
        colors: string[];
        sprites: any[];
        className: any;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Example: Story;
