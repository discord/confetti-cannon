export type EasingFunction = (
  timePassed: number,
  startValue: number,
  changeInValue: number,
  totalDuration: number
) => number;

export const easeInOutQuad: EasingFunction = (
  timePassed,
  startValue,
  changeInValue,
  totalDuration
) => {
  if ((timePassed /= totalDuration / 2) < 1) {
    return (changeInValue / 2) * timePassed * timePassed + startValue;
  }
  return (
    (-changeInValue / 2) * (--timePassed * (timePassed - 2) - 1) + startValue
  );
};
