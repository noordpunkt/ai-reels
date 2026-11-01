import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const RING_RADIUS = 118;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export const TwoMinuteRule: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 14, stiffness: 120 },
  });
  const clockEnter = spring({
    frame,
    fps,
    delay: 70,
    config: { damping: 16, stiffness: 130 },
  });
  const progress = interpolate(frame, [180, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const done = spring({
    frame,
    fps,
    delay: 300,
    config: { damping: 12, stiffness: 160 },
  });

  const cardX = interpolate(cardEnter, [0, 1], [80, 0]);
  const clockScale = interpolate(clockEnter, [0, 1], [0.72, 1]);
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);
  const checkOpacity = interpolate(done, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const listFade = interpolate(frame, [180, 230], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: "360px 48px 360px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 900 780" width="900" height="780">
        <g opacity={listFade} transform={`translate(${cardX}, 0)`}>
          <TaskCard x={70} y={80} label="Reply to Alex" muted />
          <TaskCard x={70} y={230} label="Book dentist" />
          <TaskCard x={70} y={380} label="Water plants" muted />
        </g>

        <g
          transform={`translate(700 350) scale(${clockScale}) translate(-140 -140)`}
        >
          <circle cx="140" cy="140" r="136" fill="#161A22" />
          <circle
            cx="140"
            cy="140"
            r={RING_RADIUS}
            fill="none"
            stroke="#2A3140"
            strokeWidth="16"
          />
          <circle
            cx="140"
            cy="140"
            r={RING_RADIUS}
            fill="none"
            stroke="#C8F542"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 140 140)"
          />
          <line
            x1="140"
            y1="140"
            x2="140"
            y2="58"
            stroke="#F4F1EA"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="140"
            y1="140"
            x2="188"
            y2="140"
            stroke="#C8F542"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="140" cy="140" r="8" fill="#F4F1EA" />
          <text
            x="140"
            y="330"
            textAnchor="middle"
            fill="#F4F1EA"
            fontSize="42"
            fontFamily='ui-sans-serif, system-ui, sans-serif'
            fontWeight="700"
          >
            2:00
          </text>
        </g>

        <g opacity={checkOpacity} transform="translate(70 230)">
          <rect width="360" height="120" rx="28" fill="#C8F542" />
          <path
            d="M48 60 L78 90 L132 36"
            fill="none"
            stroke="#0B0D10"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="168"
            y="72"
            fill="#0B0D10"
            fontSize="34"
            fontFamily='ui-sans-serif, system-ui, sans-serif'
            fontWeight="750"
          >
            Done
          </text>
        </g>
      </svg>
    </div>
  );
};

const TaskCard: React.FC<{
  x: number;
  y: number;
  label: string;
  muted?: boolean;
}> = ({ x, y, label, muted = false }) => {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="360"
        height="120"
        rx="28"
        fill={muted ? "#12151C" : "#161A22"}
        stroke="#2A3140"
        strokeWidth="3"
      />
      <rect x="28" y="44" width="32" height="32" rx="8" fill="#2A3140" />
      <text
        x="80"
        y="72"
        fill={muted ? "#6B7386" : "#F4F1EA"}
        fontSize="32"
        fontFamily='ui-sans-serif, system-ui, sans-serif'
        fontWeight="650"
      >
        {label}
      </text>
    </g>
  );
};
