import { CreateConfettiArgs } from "./createConfetti";

export type CreateConfettiArgsDefaults = Pick<
  Required<CreateConfettiArgs>,
  "velocity" | "rotation" | "dragCoefficient" | "airResistanceArea" | "opacity"
>;

export const CREATE_CONFETTI_DEFAULTS: CreateConfettiArgsDefaults = {
  velocity: {
    type: "static",
    value: 0,
  },
  rotation: {
    type: "static",
    value: 0,
  },
  dragCoefficient: {
    type: "static",
    value: 1.66,
  },
  airResistanceArea: {
    type: "static",
    value: 0.001,
  },
  opacity: {
    type: "static",
    value: 1,
  },
};
