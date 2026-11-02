import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif';

export const Field: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "-10%",
            width: "120%",
            top: `${12 + i * 15}%`,
            height: 1,
            background: "rgba(242,242,242,0.07)",
            transform: `translateX(${Math.sin((frame + i * 18) * 0.03) * 48}px)`,
          }}
        />
      ))}
    </div>
  );
};

const plate: React.CSSProperties = {
  position: "absolute",
  inset: "16% 48px 38%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  fontFamily: FONT,
  textAlign: "center",
};

export const GiantLetters: React.FC<{ word: string; size?: number }> = ({
  word,
  size = 128,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = [...word];
  return (
    <div style={plate}>
      <div style={{ display: "flex", gap: word.length > 10 ? 2 : 6 }}>
        {letters.map((letter, i) => {
          const enter = spring({
            frame: frame - i * 2,
            fps,
            config: { damping: 14, stiffness: 180, mass: 0.55 },
          });
          return (
            <span
              key={`${letter}-${i}`}
              style={{
                color: "#F4F4F4",
                fontSize: size,
                fontWeight: 730,
                letterSpacing: "-0.07em",
                lineHeight: 0.9,
                display: "inline-block",
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [42, 0])}px) rotate(${interpolate(enter, [0, 1], [-6, 0])}deg)`,
              }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const StrikeWord: React.FC<{ word: string }> = ({ word }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  });
  const line = interpolate(frame, [8, 28], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={plate}>
      <div style={{ position: "relative", width: "fit-content" }}>
        <div
          style={{
            color: "#F4F4F4",
            fontSize: 118,
            fontWeight: 730,
            letterSpacing: "-0.06em",
            opacity: enter,
            transform: `scale(${0.92 + enter * 0.08})`,
          }}
        >
          {word}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "52%",
            height: 8,
            width: `${line}%`,
            background: "#F4F4F4",
          }}
        />
      </div>
    </div>
  );
};

export const StepRow: React.FC<{ steps: string[] }> = ({ steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hot = Math.min(steps.length - 1, Math.floor(frame / 28));
  return (
    <div style={{ ...plate, gap: 22 }}>
      {steps.map((step, i) => {
        const enter = spring({
          frame: frame - i * 6,
          fps,
          config: { damping: 14, stiffness: 160 },
        });
        const on = i === hot;
        return (
          <div
            key={step}
            style={{
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [36, 0])}px)`,
              color: on ? "#080808" : "#F4F4F4",
              background: on ? "#F4F4F4" : "transparent",
              border: "2px solid #F4F4F4",
              padding: "10px 28px",
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              width: "fit-content",
            }}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
};

export const LetterCells: React.FC<{ letters: string[] }> = ({ letters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hot = Math.min(letters.length - 1, Math.floor(frame / 32));
  return (
    <div
      style={{
        ...plate,
        flexDirection: "row",
        gap: 18,
      }}
    >
      {letters.map((letter, i) => {
        const enter = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 12, stiffness: 170 },
        });
        const on = i === hot;
        return (
          <div
            key={letter}
            style={{
              width: 210,
              height: 240,
              border: "2px solid #F4F4F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: on ? "#080808" : "#F4F4F4",
              background: on ? "#F4F4F4" : "transparent",
              fontSize: 120,
              fontWeight: 730,
              transform: `scale(${0.84 + enter * 0.16})`,
              opacity: enter,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export const CountMark: React.FC<{ to: number; unit: string }> = ({
  to,
  unit,
}) => {
  const frame = useCurrentFrame();
  const n = Math.round(
    interpolate(frame, [0, 36], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const pulse = 1 + Math.sin(frame * 0.25) * 0.015;
  return (
    <div style={plate}>
      <div
        style={{
          color: "#F4F4F4",
          fontSize: 160,
          fontWeight: 730,
          letterSpacing: "-0.08em",
          transform: `scale(${pulse})`,
        }}
      >
        {n}
        {unit}
      </div>
    </div>
  );
};

export const FlickerWord: React.FC<{ word: string }> = ({ word }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const flicker = frame > 20 ? 0.55 + Math.abs(Math.sin(frame * 0.4)) * 0.45 : 1;
  return (
    <div style={plate}>
      <div
        style={{
          color: "#F4F4F4",
          fontSize: 128,
          fontWeight: 730,
          letterSpacing: "-0.06em",
          opacity: enter * flicker,
          filter: `blur(${interpolate(flicker, [0.55, 1], [2.2, 0])}px)`,
        }}
      >
        {word}
      </div>
    </div>
  );
};

export const SplitPair: React.FC<{ left: string; right: string }> = ({
  left,
  right,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 14, stiffness: 150 } });
  const b = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  return (
    <div style={{ ...plate, flexDirection: "row", gap: 28 }}>
      <div
        style={{
          flex: 1,
          color: "#F4F4F4",
          fontSize: 64,
          fontWeight: 730,
          opacity: a,
          transform: `translateX(${interpolate(a, [0, 1], [-30, 0])}px)`,
        }}
      >
        {left}
      </div>
      <div style={{ width: 2, height: 120, background: "#F4F4F4", opacity: 0.35 }} />
      <div
        style={{
          flex: 1,
          color: "rgba(244,244,244,0.38)",
          fontSize: 64,
          fontWeight: 530,
          opacity: b,
          transform: `translateX(${interpolate(b, [0, 1], [30, 0])}px)`,
        }}
      >
        {right}
      </div>
    </div>
  );
};

export const SprayType: React.FC<{ word: string }> = ({ word }) => {
  const frame = useCurrentFrame();
  const copies = [0, 1, 2, 3];
  return (
    <div style={plate}>
      {copies.map((i) => {
        const t = interpolate(frame, [i * 5, i * 5 + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              color: "#F4F4F4",
              fontSize: 110,
              fontWeight: 730,
              letterSpacing: "-0.06em",
              opacity: (1 - i * 0.18) * t,
              transform: `translate(${i * 18}px, ${i * 28}px) scale(${1 + i * 0.08})`,
            }}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
};

export const StackNo: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...plate, gap: 16, alignItems: "flex-start", paddingLeft: 24 }}>
      {lines.map((line, i) => {
        const enter = spring({
          frame: frame - i * 7,
          fps,
          config: { damping: 13, stiffness: 160 },
        });
        return (
          <div
            key={line}
            style={{
              color: "#F4F4F4",
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};
