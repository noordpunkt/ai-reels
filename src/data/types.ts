export const STORY_FPS = 30;
export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

export type OverlayCue = {
  fromFrame: number;
  durationInFrames: number;
  small: string;
  big: string;
  highlight?: string;
  voice: string;
};

export type Hit = number;
