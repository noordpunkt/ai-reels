import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { captions } from "../data/story";

export const TopCaptions: React.FC = () => {
  return (
    <>
      {captions.map((cue) => (
        <AbsoluteFill
          key={`${cue.fromFrame}-${cue.text}`}
          name={cue.text}
          from={cue.fromFrame}
          durationInFrames={cue.durationInFrames}
          style={{ justifyContent: "flex-start", pointerEvents: "none" }}
        >
          <CaptionLine text={cue.text} />
        </AbsoluteFill>
      ))}
    </>
  );
};

const CaptionLine: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.8 },
  });

  const opacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(enter, [0, 1], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        marginTop: 118,
        paddingLeft: 64,
        paddingRight: 64,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#F4F1EA",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
          fontSize: 58,
          fontWeight: 720,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          textWrap: "balance",
        }}
      >
        {text}
      </p>
    </div>
  );
};
