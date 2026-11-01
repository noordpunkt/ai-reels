import type { OverlayCue } from "./types";

export const ROUX_DURATION_FRAMES = 1550;

export const rouxCaptions: OverlayCue[] = [
  {
    fromFrame: 0,
    durationInFrames: 178,
    small: "From Le Lapin Bleu. A binding, cooked before the liquid.",
    big: "roux",
    voice: "audio/vo-roux-1.wav",
  },
  {
    fromFrame: 178,
    durationInFrames: 188,
    small: "Fifty grams of butter. Fifty grams of flour.",
    big: "equal parts",
    highlight: "equal",
    voice: "audio/vo-roux-2.wav",
  },
  {
    fromFrame: 366,
    durationInFrames: 210,
    small: "Melt the butter. Add the flour all at once. Whisk.",
    big: "no lumps",
    highlight: "lumps",
    voice: "audio/vo-roux-3.wav",
  },
  {
    fromFrame: 576,
    durationInFrames: 162,
    small: "Two to three minutes, no colour. The base of béchamel.",
    big: "white roux",
    highlight: "white",
    voice: "audio/vo-roux-4.wav",
  },
  {
    fromFrame: 738,
    durationInFrames: 140,
    small: "Pale gold, a hint of hazelnut. The base of velouté.",
    big: "blond roux",
    highlight: "blond",
    voice: "audio/vo-roux-5.wav",
  },
  {
    fromFrame: 878,
    durationInFrames: 286,
    small: "Darker, toasted. The base of espagnole. It thickens less.",
    big: "brown roux",
    highlight: "brown",
    voice: "audio/vo-roux-6.wav",
  },
  {
    fromFrame: 1164,
    durationInFrames: 198,
    small: "Milk or stock, little by little. The roux is cooked first.",
    big: "then the liquid",
    highlight: "liquid",
    voice: "audio/vo-roux-7.wav",
  },
  {
    fromFrame: 1362,
    durationInFrames: 188,
    small: "Heat knocks out the amylase. Fat coats the starch.",
    big: "why it works",
    highlight: "works",
    voice: "audio/vo-roux-8.wav",
  },
];
