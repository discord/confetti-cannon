export default class Environment {
  gravity = -9.8;
  wind = 0;
  density = 1.2041;

  constructor({
    gravity,
    wind,
    density,
  }: { gravity?: number; wind?: number; density?: number } = {}) {
    this.gravity = gravity ?? this.gravity;
    this.wind = wind ?? this.wind;
    this.density = density ?? this.density;
  }
}
