import type { StoryObj } from "@storybook/react";
import * as React from "react";
declare function ConditionalRenderStory(): React.JSX.Element;
declare const meta: {
    title: string;
    component: typeof ConditionalRenderStory;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Example: Story;
