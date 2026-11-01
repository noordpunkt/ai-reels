export const STORY_FPS = 30;
export const STORY_DURATION_FRAMES = 15 * STORY_FPS;
export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

export type CaptionCue = {
  fromFrame: number;
  durationInFrames: number;
  text: string;
};

export const captions: CaptionCue[] = [
  {
    fromFrame: 0,
    durationInFrames: 90,
    text: "If a task takes under 2 minutes…",
  },
  {
    fromFrame: 90,
    durationInFrames: 90,
    text: "Don't add it to the list.",
  },
  {
    fromFrame: 180,
    durationInFrames: 120,
    text: "Just do it now.",
  },
  {
    fromFrame: 300,
    durationInFrames: 150,
    text: "That's the 2-minute rule.",
  },
];
