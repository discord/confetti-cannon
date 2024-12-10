import type { StoryObj } from "@storybook/react";
import * as React from "react";
declare function ConfettiCanvasStory({ className, ...args }: {
    className: string;
    gravity: number;
    density: number;
    wind: number;
}): React.JSX.Element;
declare const meta: {
    title: string;
    component: typeof ConfettiCanvasStory;
    tags: string[];
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
    args: {
        gravity: number;
        wind: number;
        density: number;
        className: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Example: Story;
