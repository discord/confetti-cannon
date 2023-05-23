import type { StoryObj } from "@storybook/react";
import ConfettiCanvas from "../react/ConfettiCanvas";
declare const meta: {
    title: string;
    component: typeof ConfettiCanvas;
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Example: Story;
