export declare abstract class UpdatableValue {
    value: number;
    constructor(value: number);
    abstract update(deltaTime: number): void;
    abstract previewUpdate(deltaTime: number): number;
}
export declare class UpdatableVector2Value {
    _x: UpdatableValue;
    _y: UpdatableValue;
    constructor(x: UpdatableValue, y: UpdatableValue);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): {
        x: number;
        y: number;
    };
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
}
export declare class UpdatableVector3Value extends UpdatableVector2Value {
    _z: UpdatableValue;
    constructor(x: UpdatableValue, y: UpdatableValue, z: UpdatableValue);
    update(deltaTime: number): void;
    previewUpdate(deltaTime: number): {
        z: number;
        x: number;
        y: number;
    };
    get z(): number;
    set z(z: number);
}
