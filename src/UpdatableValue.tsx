export abstract class UpdatableValue {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  abstract update(deltaTime: number): void;
}

export class UpdatableVector2Value {
  _x: UpdatableValue;
  _y: UpdatableValue;

  constructor(x: UpdatableValue, y: UpdatableValue) {
    this._x = x;
    this._y = y;
  }

  update(deltaTime: number) {
    this._x.update(deltaTime);
    this._y.update(deltaTime);
  }

  get x() {
    return this._x.value;
  }

  set x(x: number) {
    this._x.value = x;
  }

  get y() {
    return this._y.value;
  }

  set y(y: number) {
    this._y.value = y;
  }
}

export class UpdatableVector3Value extends UpdatableVector2Value {
  _z: UpdatableValue;

  constructor(x: UpdatableValue, y: UpdatableValue, z: UpdatableValue) {
    super(x, y);
    this._z = z;
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this._z.update(deltaTime);
  }

  get z() {
    return this._z.value;
  }

  set z(z: number) {
    this._z.value = z;
  }
}
