import { interpolate, useCurrentFrame } from "remotion";

export const DotField: React.FC = () => {
  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <pattern id="fr-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#1C1C1C" />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="#080808" />
      <rect width="1080" height="1920" fill="url(#fr-dots)" />
    </svg>
  );
};

export const BaguetteMark: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [0, 80], [-8, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="900"
      height="280"
      viewBox="0 0 900 280"
      style={{
        position: "absolute",
        left: 90,
        top: 820,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <rect
        x="40"
        y="90"
        width="820"
        height="86"
        rx="43"
        fill="#F2F2F2"
      />
      {[180, 360, 540, 720].map((x) => (
        <path
          key={x}
          d={`M${x} 108 L${x + 28} 158`}
          stroke="#080808"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export const WineMark: React.FC = () => {
  return (
    <svg
      width="220"
      height="360"
      viewBox="0 0 220 360"
      style={{ position: "absolute", right: 120, top: 760 }}
    >
      <path
        d="M60 20 H160 L140 150 H80 Z"
        fill="none"
        stroke="#F2F2F2"
        strokeWidth="7"
      />
      <path d="M80 150 H140 L128 210 H92 Z" fill="#F2F2F2" />
      <line x1="110" y1="210" x2="110" y2="300" stroke="#F2F2F2" strokeWidth="7" />
      <line x1="70" y1="300" x2="150" y2="300" stroke="#F2F2F2" strokeWidth="7" />
    </svg>
  );
};

export const BreathPath: React.FC = () => {
  const frame = useCurrentFrame();
  const dash = interpolate(frame, [0, 40], [240, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="720"
      height="420"
      viewBox="0 0 720 420"
      style={{ position: "absolute", left: 180, top: 780 }}
    >
      <circle cx="180" cy="210" r="70" fill="none" stroke="#F2F2F2" strokeWidth="6" />
      <circle cx="180" cy="190" r="10" fill="#F2F2F2" />
      <circle cx="210" cy="190" r="10" fill="#F2F2F2" />
      <path
        d="M250 200 C 360 80, 520 80, 640 160"
        fill="none"
        stroke="#F2F2F2"
        strokeWidth="6"
        strokeDasharray="12 10"
        strokeDashoffset={dash}
      />
      <text
        x="640"
        y="148"
        fill="#F2F2F2"
        fontSize="28"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        nez
      </text>
    </svg>
  );
};

export const ThroatR: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 8) * 0.03;

  return (
    <svg
      width="640"
      height="640"
      viewBox="0 0 640 640"
      style={{
        position: "absolute",
        left: 220,
        top: 680,
        transform: `scale(${pulse})`,
      }}
    >
      <text
        x="320"
        y="430"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="420"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        R
      </text>
      <path
        d="M140 180 C 200 120, 280 260, 360 200 S 520 140, 540 220"
        fill="none"
        stroke="#080808"
        strokeWidth="16"
      />
      <path
        d="M140 180 C 200 120, 280 260, 360 200 S 520 140, 540 220"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeDasharray="8 12"
      />
    </svg>
  );
};

export const ParisSkyline: React.FC = () => {
  return (
    <svg
      width="1080"
      height="520"
      viewBox="0 0 1080 520"
      style={{ position: "absolute", left: 0, bottom: 220 }}
    >
      <rect x="80" y="260" width="90" height="180" fill="#F2F2F2" />
      <rect x="190" y="200" width="70" height="240" fill="#D8D8D8" />
      <rect x="720" y="230" width="110" height="210" fill="#F2F2F2" />
      <rect x="850" y="280" width="80" height="160" fill="#C8C8C8" />
      <polygon points="540,40 500,420 580,420" fill="#FFFFFF" />
      <line x1="540" y1="40" x2="540" y2="8" stroke="#FFFFFF" strokeWidth="4" />
    </svg>
  );
};

export const RepeatRibbon: React.FC<{ words: string[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const x = -((frame * 4) % 900);

  return (
    <div
      style={{
        position: "absolute",
        top: 860,
        left: 0,
        right: 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        color: "#FFFFFF",
        fontSize: 88,
        fontWeight: 700,
        letterSpacing: "-0.04em",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
        transform: `translateX(${x}px)`,
      }}
    >
      {words.concat(words).join("   ·   ")}
    </div>
  );
};
