import { interpolate, useCurrentFrame } from "remotion";

export const AvatarSlot: React.FC = () => {
  const frame = useCurrentFrame();
  const talking = Math.abs(Math.sin(frame / 3.2));
  const mouthOpen = interpolate(talking, [0, 1], [6, 22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        bottom: 92,
        width: 220,
        height: 220,
      }}
    >
      <svg viewBox="0 0 220 220" width="220" height="220">
        <circle cx="110" cy="110" r="108" fill="#161A22" />
        <circle
          cx="110"
          cy="110"
          r="100"
          fill="#0B0D10"
          stroke="#C8F542"
          strokeWidth="6"
        />
        <ellipse cx="110" cy="148" rx="62" ry="40" fill="#2A3140" />
        <circle cx="110" cy="96" r="38" fill="#E7D7C3" />
        <circle cx="96" cy="92" r="5" fill="#1A1D24" />
        <circle cx="124" cy="92" r="5" fill="#1A1D24" />
        <ellipse
          cx="110"
          cy="116"
          rx="12"
          ry={mouthOpen / 2}
          fill="#1A1D24"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 236,
          bottom: 18,
          width: 420,
          color: "#8B93A7",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Text", sans-serif',
          fontSize: 22,
          letterSpacing: "0.01em",
        }}
      >
        AI presenter slot
        <br />
        Drop a HeyGen clip in later
      </div>
    </div>
  );
};
