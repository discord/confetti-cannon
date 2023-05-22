import { UpdatableValue } from "./UpdatableValue";
import { EasingFunction } from "./easing";

export class StaticUpdatableValue extends UpdatableValue {
  update() {
    /* Static */
  }
}

export class LinearUpdatableValue extends UpdatableValue {
  addValue: number;

  constructor(value: number, addValue: number) {
    super(value);
    this.addValue = addValue;
  }

  update(deltaTime: number) {
    this.value += this.addValue * deltaTime;
  }
}

export type Direction = 1 | -1;

export class OscillatingUpdatableValue extends UpdatableValue {
  min: number;
  max: number;
  duration: number;
  timePassed: number;
  directionMultiplier: Direction;
  easingFunction: EasingFunction;

  constructor(
    value: number,
    min: number,
    max: number,
    duration: number,
    directionMultiplier: Direction,
    easingFunction: EasingFunction
  ) {
    super(value);
    this.min = min;
    this.max = max;
    this.duration = duration;
    this.timePassed = 0;
    this.directionMultiplier = directionMultiplier;
    this.easingFunction = easingFunction;
  }

  update(deltaTime: number) {
    const distance = this.max - this.min;
    const timeDiff = this.timePassed + deltaTime * this.directionMultiplier;
    this.timePassed = Math.min(Math.max(timeDiff, 0), this.duration);

    if (this.timePassed >= this.duration || this.timePassed <= 0) {
      this.directionMultiplier *= -1;
    }

    const newValue = this.easingFunction(
      this.timePassed,
      this.min,
      distance,
      this.duration
    );
    this.value = isNaN(newValue) ? 0 : newValue;
  }
}
