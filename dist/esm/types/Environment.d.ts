export default class Environment {
    gravity: number;
    wind: number;
    density: number;
    constructor({ gravity, wind, density, }?: {
        gravity?: number;
        wind?: number;
        density?: number;
    });
}
