import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ManualDiagram } from "./components/ManualDiagram";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { BwStage } from "./components/three/BwStage";
import { TB303Model } from "./components/three/TB303Model";
import { tb303Captions } from "./data/tb303";

export const Roland303: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [900, 919], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dim = frame >= 398 && frame < 558;
  const twist = frame >= 558 && frame < 696;
  const focusSequencer = frame >= 288 && frame < 398;
  const year =
    frame >= 134 && frame < 288
      ? "1981"
      : frame >= 696 && frame < 830
        ? "1987"
        : undefined;
  const yearCaption =
    year === "1981"
      ? "companion of the TR-606"
      : year === "1987"
        ? "Chicago  ·  Acid Tracks"
        : undefined;

  const showManual = frame < 134 || twist;

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808", opacity: fade }}>
      <BwStage
        camera={focusSequencer ? [1.8, 2.1, 2.6] : [2.6, 2.4, 3.5]}
        lookAt={[0, 0.15, 0]}
        year={year}
        yearCaption={yearCaption}
      >
        <TB303Model dim={dim} twist={twist} focusSequencer={focusSequencer} />
      </BwStage>
      {showManual ? (
        <ManualDiagram
          title="TB-303  ·  OWNER'S MANUAL"
          nodes={["VCO", "VCF", "VCA", "OUT"]}
        />
      ) : null}
      <StoryCaptions cues={tb303Captions} />
      <VoiceHits cues={tb303Captions} bed="audio/tb303-squelch.wav" bedVolume={0.22} />
    </AbsoluteFill>
  );
};
