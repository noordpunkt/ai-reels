import { Html5Audio, Sequence, staticFile } from "remotion";
import type { OverlayCue } from "../data/types";

export const VoiceHits: React.FC<{
  cues: OverlayCue[];
  bed?: string;
  bedVolume?: number;
}> = ({ cues, bed, bedVolume = 0.28 }) => {
  return (
    <>
      {bed ? <Html5Audio src={staticFile(bed)} volume={bedVolume} /> : null}
      {cues.map((cue) => (
        <Sequence
          key={cue.voice}
          from={cue.fromFrame}
          durationInFrames={cue.durationInFrames}
          layout="none"
        >
          <Html5Audio src={staticFile(cue.voice)} />
        </Sequence>
      ))}
    </>
  );
};
