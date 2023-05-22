import { CreateConfettiArgsDefaults } from "./createConfetti";

export const CREATE_CONFETTI_DEFAULTS: CreateConfettiArgsDefaults = {
  velocity: {
    type: "static",
    value: { x: 0, y: 0 },
  },
  rotation: {
    type: "static",
    value: { x: 0, y: 0, z: 0 },
  },
  dragCoefficient: {
    type: "static",
    value: { x: 0.001, y: 0.001 },
  },
  opacity: {
    type: "static",
    value: 1,
  },
};
