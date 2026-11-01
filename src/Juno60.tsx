import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ManualDiagram } from "./components/ManualDiagram";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { BwStage } from "./components/three/BwStage";
import { Juno60Model } from "./components/three/Juno60Model";
import { juno60Captions } from "./data/juno60";

export const Juno60: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [894, 913], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const focus =
    frame >= 309 && frame < 416
      ? "dco"
      : frame >= 525 && frame < 640
        ? "chorus"
        : frame >= 754
          ? "keys"
          : "body";

  const year = frame >= 166 && frame < 309 ? "1982" : undefined;

  const nodes =
    focus === "dco"
      ? ["DCO", "HPF", "VCF", "VCA"]
      : focus === "chorus"
        ? ["VCA", "CHORUS I", "CHORUS II", "OUT"]
        : ["LFO", "DCO", "VCF", "CHORUS"];

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808", opacity: fade }}>
      <BwStage
        camera={
          focus === "keys"
            ? [3.2, 2.4, 4.6]
            : focus === "dco" || focus === "chorus"
              ? [3.6, 3.2, 4.4]
              : [4.1, 3.8, 5.6]
        }
        lookAt={[0, 0.15, -0.15]}
        year={year}
        yearCaption={year ? "bride of Jupiter" : undefined}
      >
        <Juno60Model focus={focus} />
      </BwStage>
      <ManualDiagram title="JUNO-60  ·  OWNER'S MANUAL" nodes={nodes} />
      <StoryCaptions cues={juno60Captions} />
      <VoiceHits cues={juno60Captions} bed="audio/juno-pad.wav" bedVolume={0.32} />
    </AbsoluteFill>
  );
};
