import type { ReactNode } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const FONT = "Apercu, system-ui, sans-serif";
export const MONO = "Apercu Mono, ui-monospace, monospace";

export const stageYaw = (frame: number) => Math.sin(frame * 0.01) * 10;
export const stagePitch = (frame: number) => 61 + Math.sin(frame * 0.007) * 2.4;

export const PerspectiveStage: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const yaw = stageYaw(frame);
  const pitch = stagePitch(frame);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        perspective: 1580,
        perspectiveOrigin: "50% 24%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "20%",
          width: 1680,
          height: 1680,
          marginLeft: -840,
          transformStyle: "preserve-3d",
          transform: `rotateX(${pitch}deg) rotateZ(${yaw}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1180,
            height: 1180,
            marginLeft: -590,
            marginTop: -590,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 42% 38%, #2C2C2C 0%, #141414 52%, #070707 100%)",
            boxShadow: "0 50px 90px rgba(0,0,0,0.65)",
          }}
        />
        {[280, 430, 580, 730].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: r * 2,
              height: r * 2,
              marginLeft: -r,
              marginTop: -r,
              borderRadius: "50%",
              border: "1px solid rgba(242,242,242,0.08)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) translateZ(36px)",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const Tile: React.FC<{
  label: string;
  lit?: boolean;
  size?: number;
  pad?: string;
  delay?: number;
  strike?: number;
}> = ({
  label,
  lit = true,
  size = 92,
  pad = "18px 22px 14px",
  delay = 0,
  strike = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.6 },
  });
  const thick = 28;

  return (
    <div
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        opacity: enter,
        transform: `translateZ(${interpolate(enter, [0, 1], [0, 18])}px) scale(${0.82 + enter * 0.18})`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          position: "relative",
          background: lit ? "#EFEFEF" : "#9A9A9A",
          color: "#0A0A0A",
          fontSize: size,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          lineHeight: 0.86,
          padding: pad,
          whiteSpace: "nowrap",
          transform: `translateZ(${thick}px)`,
        }}
      >
        {label}
        {strike > 0 ? (
          <div
            style={{
              position: "absolute",
              left: "8%",
              top: "48%",
              height: 7,
              width: `${strike}%`,
              background: "#0A0A0A",
            }}
          />
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: thick,
          background: lit ? "#6A6A6A" : "#3F3F3F",
          transformOrigin: "bottom",
          transform: "rotateX(-90deg)",
        }}
      />
    </div>
  );
};

const row: React.CSSProperties = {
  display: "flex",
  gap: 18,
  alignItems: "flex-end",
  transformStyle: "preserve-3d",
};

const stack: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  alignItems: "center",
  transformStyle: "preserve-3d",
};

export const GiantLetters: React.FC<{ word: string; size?: number }> = ({
  word,
  size = 108,
}) => {
  const letters = [...word];
  const compact = word.length > 8;
  return (
    <div style={{ ...row, gap: compact ? 6 : 10 }}>
      {letters.map((letter, i) => (
        <Tile
          key={`${letter}-${i}`}
          label={letter === " " ? "\u00a0" : letter}
          size={compact ? size * 0.78 : size}
          pad={compact ? "14px 8px 10px" : "16px 12px 12px"}
          delay={i * 2}
        />
      ))}
    </div>
  );
};

export const StrikeWord: React.FC<{ word: string }> = ({ word }) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [8, 26], [0, 84], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <Tile label={word} size={96} pad="22px 28px 16px" strike={line} />;
};

export const StepRow: React.FC<{ steps: string[] }> = ({ steps }) => {
  const frame = useCurrentFrame();
  const hot = Math.min(steps.length - 1, Math.floor(frame / 28));
  const vertical = steps.length > 3;
  return (
    <div style={vertical ? stack : row}>
      {steps.map((step, i) => (
        <Tile
          key={step}
          label={step}
          lit={i === hot}
          size={vertical ? 56 : 58}
          pad="16px 22px 12px"
          delay={i * 5}
        />
      ))}
    </div>
  );
};

export const LetterCells: React.FC<{ letters: string[] }> = ({ letters }) => {
  const frame = useCurrentFrame();
  const hot = Math.min(letters.length - 1, Math.floor(frame / 32));
  return (
    <div style={row}>
      {letters.map((letter, i) => (
        <Tile
          key={letter}
          label={letter}
          lit={i === hot}
          size={120}
          pad="28px 36px 22px"
          delay={i * 5}
        />
      ))}
    </div>
  );
};

export const CountMark: React.FC<{ to: number; unit: string }> = ({
  to,
  unit,
}) => {
  const frame = useCurrentFrame();
  const n = Math.round(
    interpolate(frame, [0, 34], [0, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return <Tile label={`${n}${unit}`} size={120} pad="20px 26px 14px" />;
};

export const FlickerWord: React.FC<{ word: string }> = ({ word }) => {
  const frame = useCurrentFrame();
  const flicker = frame > 18 ? 0.55 + Math.abs(Math.sin(frame * 0.38)) * 0.45 : 1;
  return (
    <div style={{ opacity: flicker, transformStyle: "preserve-3d" }}>
      <Tile label={word} size={100} pad="22px 28px 16px" />
    </div>
  );
};

export const SplitPair: React.FC<{ left: string; right: string }> = ({
  left,
  right,
}) => {
  return (
    <div style={row}>
      <Tile label={left} size={64} pad="18px 24px 14px" />
      <Tile label={right} lit={false} size={64} pad="18px 24px 14px" delay={7} />
    </div>
  );
};

export const SprayType: React.FC<{ word: string }> = ({ word }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 420, height: 220, transformStyle: "preserve-3d" }}>
      {[0, 1, 2, 3].map((i) => {
        const t = interpolate(frame, [i * 5, i * 5 + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 28,
              top: i * 22,
              opacity: (1 - i * 0.2) * t,
              transform: `translateZ(${40 - i * 10}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Tile label={word} size={88} pad="16px 22px 12px" delay={0} />
          </div>
        );
      })}
    </div>
  );
};

export const StackNo: React.FC<{ lines: string[] }> = ({ lines }) => {
  return (
    <div style={stack}>
      {lines.map((line, i) => (
        <Tile
          key={line}
          label={line}
          size={52}
          pad="14px 22px 12px"
          delay={i * 6}
          lit={i === 0}
        />
      ))}
    </div>
  );
};
