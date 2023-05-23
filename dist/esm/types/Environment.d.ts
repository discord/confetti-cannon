export default class Environment {
    gravity: number;
    wind: number;
    constructor({ gravity, wind }?: {
        gravity?: number;
        wind?: number;
    });
}
