import { UpdatableValue } from "./UpdatableValue";

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
