import * as React from "react";
import { CreateConfettiArgs } from "../createConfetti";
import Environment from "../Environment";
type ConfettiCanvasProps = {
    environment: Environment;
    onClick?: (e: React.MouseEvent) => void;
};
interface ConfettiCanvasHandle {
    addConfetti: (args: CreateConfettiArgs) => void;
    getCanvas: () => HTMLCanvasElement | null;
}
declare const _default: React.ForwardRefExoticComponent<ConfettiCanvasProps & React.RefAttributes<ConfettiCanvasHandle>>;
export default _default;
