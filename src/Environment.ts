export default class Environment {
  gravity = -9.8;
  wind = 0;

  constructor({ gravity, wind }: { gravity?: number; wind?: number } = {}) {
    this.gravity = gravity ?? this.gravity;
    this.wind = wind ?? this.wind;
  }
}
