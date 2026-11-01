import { interpolate } from "remotion";

export const ink = "#F2F2F2";
export const paper = "#080808";
export const mid = "#8A8A8A";

export const FONT =
  'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif';

export const draw = (
  frame: number,
  delay: number,
  dur: number,
  len: number,
) => {
  const t = interpolate(frame, [delay, delay + dur], [len, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    strokeDasharray: len,
    strokeDashoffset: t,
    pathLength: len,
  };
};

export const ramp = (
  frame: number,
  from: number,
  to: number,
  start: number,
  end: number,
) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
