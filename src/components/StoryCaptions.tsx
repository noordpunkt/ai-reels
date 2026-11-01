import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { OverlayCue } from "../data/types";

export const StoryCaptions: React.FC<{
  cues: OverlayCue[];
  ink?: boolean;
}> = ({ cues, ink = false }) => {
  return (
    <>
      {cues.map((cue) => (
        <Sequence
          key={`${cue.fromFrame}-${cue.big}`}
          name={cue.big}
          from={cue.fromFrame}
          durationInFrames={cue.durationInFrames}
        >
          <AbsoluteFill
            style={{ justifyContent: "flex-start", pointerEvents: "none" }}
          >
            <CaptionBlock cue={cue} ink={ink} />
          </AbsoluteFill>
        </Sequence>
      ))}
    </>
  );
};

const CaptionBlock: React.FC<{ cue: OverlayCue; ink: boolean }> = ({
  cue,
  ink,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    delay: -6,
    config: { damping: 18, stiffness: 130, mass: 0.75 },
  });
  const opacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(enter, [0, 1], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        marginTop: 150,
        paddingLeft: 72,
        paddingRight: 72,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
      }}
    >
      <p
        style={{
          margin: 0,
          color: ink ? "rgba(20,20,18,0.72)" : "rgba(255,255,255,0.62)",
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: ink ? "0" : "0.04em",
          lineHeight: 1.4,
          textWrap: "balance",
        }}
      >
        {cue.small}
      </p>
      <p
        style={{
          margin: "16px 0 0",
          color: ink ? "#141412" : "#FFFFFF",
          fontSize: 68,
          fontWeight: 650,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
        }}
      >
        <Highlighted text={cue.big} highlight={cue.highlight} />
      </p>
    </div>
  );
};

const Highlighted: React.FC<{ text: string; highlight?: string }> = ({
  text,
  highlight,
}) => {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>;
  }
  const index = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, index)}
      <span style={{ fontWeight: 800 }}>{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
};
