import { AbsoluteFill } from "remotion";

export const FrenchLetters: React.FC<{
  letters: string[];
  active?: string;
}> = ({ letters, active }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 28,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
        }}
      >
        {letters.map((letter) => (
          <span
            key={letter}
            style={{
              color: letter === active ? "#FFFFFF" : "rgba(255,255,255,0.38)",
              fontSize: 86,
              fontWeight: 650,
              letterSpacing: "-0.04em",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
