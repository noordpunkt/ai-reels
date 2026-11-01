import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif';

export const GiantWord: React.FC<{
  word: string;
  sub?: string;
  size?: number;
}> = ({ word, sub, size = 140 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });
  const y = interpolate(enter, [0, 1], [36, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: enter,
        transform: `translateY(${y}px)`,
        fontFamily: FONT,
        textAlign: "center",
        padding: "0 48px",
      }}
    >
      {sub ? (
        <div
          style={{
            marginBottom: 18,
            color: "rgba(255,255,255,0.5)",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {sub}
        </div>
      ) : null}
      <div
        style={{
          color: "#FFFFFF",
          fontSize: size,
          fontWeight: 720,
          letterSpacing: "-0.055em",
          lineHeight: 0.92,
        }}
      >
        {word}
      </div>
    </div>
  );
};

export const VowelRow: React.FC<{
  letters: string[];
  active?: string;
}> = ({ letters, active }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        pointerEvents: "none",
        fontFamily: FONT,
      }}
    >
      {letters.map((letter, i) => {
        const on = letter === active;
        const pop = spring({
          frame: frame - i * 4,
          fps,
          config: { damping: 12, stiffness: 160 },
        });
        return (
          <div
            key={letter}
            style={{
              minWidth: 150,
              padding: "0 22px",
              height: 190,
              border: `2px solid ${on ? "#FFFFFF" : "rgba(255,255,255,0.22)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: on ? "#080808" : "#FFFFFF",
              background: on ? "#FFFFFF" : "transparent",
              fontSize: 92,
              fontWeight: 730,
              letterSpacing: "-0.05em",
              transform: `scale(${0.86 + pop * 0.14})`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export const SyllableSplit: React.FC<{
  parts: string[];
  glue?: boolean;
}> = ({ parts, glue = false }) => {
  const frame = useCurrentFrame();
  const gap = glue
    ? interpolate(frame, [0, 18], [48, 8], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 28;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap,
        pointerEvents: "none",
        fontFamily: FONT,
      }}
    >
      {parts.map((part, i) => (
        <div
          key={`${part}-${i}`}
          style={{
            color: "#FFFFFF",
            fontSize: 110,
            fontWeight: 720,
            letterSpacing: "-0.05em",
          }}
        >
          {part}
        </div>
      ))}
    </div>
  );
};

export const WordStack: React.FC<{ words: string[]; pulse?: string }> = ({
  words,
  pulse,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: "34% 64px 18%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 18,
        pointerEvents: "none",
        fontFamily: FONT,
      }}
    >
      {words.map((word, i) => {
        const enter = spring({
          frame: frame - i * 7,
          fps,
          config: { damping: 14, stiffness: 140 },
        });
        const hot = pulse === word;
        return (
          <div
            key={word}
            style={{
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [40, 0])}px)`,
              color: hot ? "#080808" : "#FFFFFF",
              background: hot ? "#FFFFFF" : "transparent",
              padding: hot ? "6px 18px" : 0,
              fontSize: 72,
              fontWeight: 680,
              letterSpacing: "-0.045em",
              width: "fit-content",
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
};
