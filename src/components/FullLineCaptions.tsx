import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { OverlayCue } from "../data/types";

export const FullLineCaptions: React.FC<{ cues: OverlayCue[] }> = ({
  cues,
}) => {
  return (
    <>
      {cues.map((cue) => (
        <Sequence
          key={`${cue.fromFrame}-${cue.voice}`}
          from={cue.fromFrame}
          durationInFrames={cue.durationInFrames}
          name={cue.small}
        >
          <AbsoluteFill style={{ pointerEvents: "none" }}>
            <LineBlock
              text={cue.big}
              hold={cue.durationInFrames}
              spoken={cue.spokenFrames ?? cue.durationInFrames}
            />
          </AbsoluteFill>
        </Sequence>
      ))}
    </>
  );
};

const LineBlock: React.FC<{
  text: string;
  hold: number;
  spoken: number;
}> = ({ text, hold, spoken }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    delay: -4,
    config: { damping: 18, stiffness: 140, mass: 0.7 },
  });
  const words = text.split(/\s+/);
  const revealed = interpolate(
    frame,
    [2, Math.max(10, spoken - 6)],
    [0, words.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const size = text.length > 160 ? 32 : text.length > 110 ? 36 : text.length > 80 ? 40 : 44;
  const fadeOut = interpolate(frame, [hold - 10, hold], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 560,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0) 100%)",
          opacity: enter * fadeOut,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 44,
          right: 44,
          bottom: 132,
          opacity: enter * fadeOut,
          transform: `translateY(${interpolate(enter, [0, 1], [16, 0])}px)`,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#F4F4F4",
            fontSize: size,
            fontWeight: 620,
            letterSpacing: "-0.03em",
            lineHeight: 1.28,
            textWrap: "balance",
            textShadow: "0 2px 22px rgba(0,0,0,0.9)",
          }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                opacity: i < revealed ? 1 : 0.32,
                fontWeight: i < revealed ? 730 : 520,
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};
