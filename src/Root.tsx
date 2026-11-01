import "./index.css";
import { Composition } from "remotion";
import {
  STORY_DURATION_FRAMES,
  STORY_FPS,
  STORY_HEIGHT,
  STORY_WIDTH,
} from "./data/story";
import { Story } from "./Story";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Story"
      component={Story}
      durationInFrames={STORY_DURATION_FRAMES}
      fps={STORY_FPS}
      width={STORY_WIDTH}
      height={STORY_HEIGHT}
    />
  );
};
