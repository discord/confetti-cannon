import type { StoryObj } from "@storybook/react";
import * as React from "react";
declare function DraggingStory(): React.JSX.Element;
declare const meta: {
    title: string;
    component: typeof DraggingStory;
    tags: string[];
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Example: Story;
