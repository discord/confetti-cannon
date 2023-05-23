import type { StoryObj } from "@storybook/react";
import * as React from "react";
declare function MultipleCannonsStory(): React.JSX.Element;
declare const meta: {
    title: string;
    component: typeof MultipleCannonsStory;
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
