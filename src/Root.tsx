import "./index.css";
import { Composition } from "remotion";
import { Fr01Sons } from "./Fr01Sons";
import { Juno60 } from "./Juno60";
import { Roland303 } from "./Roland303";
import { Roux } from "./Roux";
import { FR01_DURATION_FRAMES } from "./data/fr01-sons";
import { JUNO60_DURATION_FRAMES } from "./data/juno60";
import { ROUX_DURATION_FRAMES } from "./data/roux";
import { TB303_DURATION_FRAMES } from "./data/tb303";
import { STORY_FPS, STORY_HEIGHT, STORY_WIDTH } from "./data/types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Fr01Sons"
        component={Fr01Sons}
        durationInFrames={FR01_DURATION_FRAMES}
        fps={STORY_FPS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
      />
      <Composition
        id="Roux"
        component={Roux}
        durationInFrames={ROUX_DURATION_FRAMES}
        fps={STORY_FPS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
      />
      <Composition
        id="Roland303"
        component={Roland303}
        durationInFrames={TB303_DURATION_FRAMES}
        fps={STORY_FPS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
      />
      <Composition
        id="Juno60"
        component={Juno60}
        durationInFrames={JUNO60_DURATION_FRAMES}
        fps={STORY_FPS}
        width={STORY_WIDTH}
        height={STORY_HEIGHT}
      />
    </>
  );
};
