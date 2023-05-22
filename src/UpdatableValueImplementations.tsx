import { UpdatableValue } from "./UpdatableValue";
import { EasingFunction } from "./easing";

export class StaticUpdatableValue extends UpdatableValue {
  update() {
    /* Static */
  }

  previewUpdate(): number {
    return this.value;
  }
}

export class LinearUpdatableValue extends UpdatableValue {
  addValue: number;

  constructor(value: number, addValue: number) {
    super(value);
    this.addValue = addValue;
  }

  update(deltaTime: number) {
    this.value = this.previewUpdate(deltaTime);
  }

  previewUpdate(deltaTime: number) {
    return this.value + this.addValue * deltaTime;
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
    const timePassedCalculated =
      (this.value / (this.max - this.min)) * this.duration;
    const timePassed = isNaN(timePassedCalculated) ? 0 : timePassedCalculated;
    this.timePassed = timePassed < 0 ? this.duration - timePassed : timePassed;
    this.directionMultiplier = directionMultiplier;
    this.easingFunction = easingFunction;
  }

  update(deltaTime: number) {
    const [value, timePassed, directionMultiplier] = this.doUpdate(deltaTime);
    this.value = value;
    this.directionMultiplier = directionMultiplier;
    this.timePassed = timePassed;
  }

  previewUpdate(deltaTime: number): number {
    return this.doUpdate(deltaTime)[0];
  }

  doUpdate(deltaTime: number): [number, number, Direction] {
    const distance = this.max - this.min;
    const timeDiff = this.timePassed + deltaTime * this.directionMultiplier;
    const timePassed = Math.min(Math.max(timeDiff, 0), this.duration);

    const directionMultiplier = (
      timeDiff < 0 || timeDiff > this.duration
        ? this.directionMultiplier * -1
        : this.directionMultiplier
    ) as Direction;

    const newValue = this.easingFunction(
      timePassed,
      this.min,
      distance,
      this.duration
    );
    return [isNaN(newValue) ? 0 : newValue, timePassed, directionMultiplier];
  }
}
