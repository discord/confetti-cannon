import Confetti from "./Confetti";
import { UpdatableVector2Value, UpdatableVector3Value } from "./UpdatableValue";
import {
  LinearUpdatableValue,
  StaticUpdatableValue,
} from "./UpdatableValueImplementations";

export default function createConfetti(x: number, y: number) {
  const position = new UpdatableVector2Value(
    new StaticUpdatableValue(x),
    new StaticUpdatableValue(y)
  );
  const velocity = new UpdatableVector2Value(
    new StaticUpdatableValue(0),
    new StaticUpdatableValue(0)
  );
  const rotation = new UpdatableVector3Value(
    new LinearUpdatableValue(0, 10),
    new LinearUpdatableValue(0, 25),
    new LinearUpdatableValue(0, 5)
  );
  const dragCoefficient = new StaticUpdatableValue(0.001);

  const height = new StaticUpdatableValue(10);
  const width = new StaticUpdatableValue(10);

  const opacity = new StaticUpdatableValue(1);

  return new Confetti({
    position,
    velocity,
    rotation,
    dragCoefficient,
    height,
    width,
    opacity,
  });
}
