import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, draw, ink, mid, paper, ramp } from "../french2d/Draw";

const stroke = {
  fill: "none" as const,
  stroke: ink,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ButterPat: React.FC = () => {
  const frame = useCurrentFrame();
  const body = draw(frame, 0, 18, 420);
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" style={{ display: "block", margin: "0 auto" }}>
      <path d="M40 70 H210 L240 110 H70 Z" {...stroke} strokeWidth="6" {...body} />
      <path d="M40 70 L70 40 H240 L210 70" {...stroke} strokeWidth="6" {...draw(frame, 8, 14, 280)} />
      <path d="M240 40 V110" {...stroke} strokeWidth="6" {...draw(frame, 14, 10, 80)} />
    </svg>
  );
};

export const ClearBottle: React.FC<{ fill?: number; dark?: boolean }> = ({
  fill = 0.7,
  dark = false,
}) => {
  const frame = useCurrentFrame();
  const level = ramp(frame, 0, fill, 8, 36);
  return (
    <svg width="200" height="360" viewBox="0 0 200 360" style={{ display: "block", margin: "0 auto" }}>
      {level > 0.05 ? (
        <rect
          x="48"
          y={300 - level * 200}
          width="104"
          height={level * 200}
          fill={ink}
          opacity={dark ? 0.92 : 0.28}
        />
      ) : null}
      <path d="M80 24 H120 V56 H140 V88 H60 V56 H80 Z" {...stroke} strokeWidth="6" {...draw(frame, 0, 16, 280)} />
      <path d="M48 88 H152 V300 H48 Z" {...stroke} strokeWidth="6" {...draw(frame, 8, 18, 520)} />
      {dark ? (
        <path d="M48 88 H152 V300 H48 Z" fill={ink} opacity="0.55" />
      ) : null}
    </svg>
  );
};

export const PairSwap: React.FC = () => {
  const frame = useCurrentFrame();
  const cross = ramp(frame, 0, 1, 16, 34);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        fontFamily: FONT,
        color: ink,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ButterPat />
        <div style={{ marginTop: 8, fontSize: 28, letterSpacing: "0.14em" }}>MANTECA</div>
        <svg width="200" height="80" viewBox="0 0 200 80" style={{ margin: "0 auto" }}>
          <path
            d="M20 20 L180 60 M180 20 L20 60"
            {...stroke}
            strokeWidth="7"
            opacity={cross}
          />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <ClearBottle />
        <div style={{ marginTop: 8, fontSize: 28, letterSpacing: "0.14em" }}>SEMILLA</div>
      </div>
    </div>
  );
};

export const OlivePress: React.FC<{ yields?: boolean }> = ({ yields = true }) => {
  const frame = useCurrentFrame();
  const drop = ramp(frame, 0, 1, 18, 40);
  return (
    <svg width="420" height="460" viewBox="0 0 420 460" style={{ display: "block", margin: "20px auto 0" }}>
      {yields ? (
        <>
          <ellipse cx="210" cy="150" rx="70" ry="90" {...stroke} strokeWidth="7" {...draw(frame, 0, 18, 420)} />
          <path d="M210 80 C 230 70, 250 90, 238 110" {...stroke} strokeWidth="5" />
        </>
      ) : (
        <path
          d="M210 70 C 150 110, 140 200, 210 250 C 280 200, 270 110, 210 70 Z"
          {...stroke}
          strokeWidth="7"
          {...draw(frame, 0, 18, 420)}
        />
      )}
      <path d="M140 240 H280 V280 H140 Z" {...stroke} strokeWidth="6" {...draw(frame, 10, 12, 280)} />
      <path d="M160 280 L120 360 H300 L260 280" {...stroke} strokeWidth="6" {...draw(frame, 16, 14, 320)} />
      {yields ? (
        <ellipse cx="210" cy={390 + Math.sin(frame / 6) * 4} rx="10" ry="16" fill={ink} opacity={drop} />
      ) : (
        <text x="210" y="420" textAnchor="middle" fill={mid} fontSize="28" fontFamily={FONT} opacity={drop}>
          nada
        </text>
      )}
    </svg>
  );
};

export const ProcessRow: React.FC<{ steps: string[]; active: number }> = ({
  steps,
  active,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: "80px 48px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 22,
        fontFamily: FONT,
      }}
    >
      {steps.map((step, i) => {
        const enter = spring({
          frame: frame - i * 6,
          fps,
          config: { damping: 14, stiffness: 150 },
        });
        const on = i === active;
        return (
          <div
            key={step}
            style={{
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [28, 0])}px)`,
              display: "flex",
              alignItems: "center",
              gap: 18,
              color: on ? paper : ink,
              background: on ? ink : "transparent",
              padding: "12px 20px",
              fontSize: 48,
              fontWeight: 720,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ opacity: 0.5, fontSize: 28 }}>{String(i + 1).padStart(2, "0")}</span>
            {step}
          </div>
        );
      })}
    </div>
  );
};

export const RbdMark: React.FC = () => {
  const frame = useCurrentFrame();
  const letters = ["R", "B", "D"];
  const words = ["refinado", "blanqueado", "desodorizado"];
  const hot = Math.min(2, Math.floor(frame / 50));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        fontFamily: FONT,
        color: ink,
      }}
    >
      <div style={{ display: "flex", gap: 18 }}>
        {letters.map((letter, i) => (
          <div
            key={letter}
            style={{
              width: 140,
              height: 170,
              border: `2px solid ${ink}`,
              background: i === hot ? ink : "transparent",
              color: i === hot ? paper : ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 92,
              fontWeight: 780,
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 36, letterSpacing: "0.12em", textTransform: "uppercase", color: mid }}>
        {words[hot]}
      </div>
    </div>
  );
};

export const HeatMark: React.FC = () => {
  const frame = useCurrentFrame();
  const mercury = ramp(frame, 20, 210, 6, 40);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        color: ink,
      }}
    >
      <svg width="180" height="420" viewBox="0 0 180 420">
        <rect x="72" y="20" width="36" height="300" {...stroke} strokeWidth="6" />
        <rect x="80" y={312 - mercury} width="20" height={mercury} fill={ink} />
        <circle cx="90" cy="360" r="42" fill={ink} />
      </svg>
      <div style={{ fontSize: 72, fontWeight: 750, letterSpacing: "-0.05em" }}>240°</div>
    </div>
  );
};

export const BottlePair: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        fontFamily: FONT,
        color: ink,
        textAlign: "center",
      }}
    >
      <div>
        <ClearBottle fill={0.75} />
        <div style={{ marginTop: 12, fontSize: 26, letterSpacing: "0.16em" }}>LUZ</div>
      </div>
      <div>
        <ClearBottle fill={0.75} dark />
        <div style={{ marginTop: 12, fontSize: 26, letterSpacing: "0.16em" }}>OSCURO</div>
      </div>
    </div>
  );
};

export const SprayCan: React.FC = () => {
  const frame = useCurrentFrame();
  const mist = ramp(frame, 0, 1, 12, 28);
  return (
    <svg width="420" height="520" viewBox="0 0 420 520" style={{ display: "block", margin: "10px auto 0" }}>
      <path d="M170 80 H250 V130 H280 V420 H140 V130 H170 Z" {...stroke} strokeWidth="7" {...draw(frame, 0, 20, 620)} />
      <path d="M190 40 H230 V80" {...stroke} strokeWidth="7" {...draw(frame, 8, 10, 80)} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={300 + i * 18}
          cy={70 + Math.sin((frame + i * 8) / 5) * 8}
          r={3 + (i % 2)}
          fill={ink}
          opacity={mist * (1 - i * 0.12)}
        />
      ))}
    </svg>
  );
};

export const PanFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const film = ramp(frame, 0, 1, 14, 40);
  return (
    <svg width="640" height="360" viewBox="0 0 640 360" style={{ display: "block", margin: "40px auto 0" }}>
      <ellipse cx="320" cy="200" rx="240" ry="70" {...stroke} strokeWidth="8" {...draw(frame, 0, 18, 900)} />
      <path d="M80 200 L40 40" {...stroke} strokeWidth="8" />
      <path
        d="M160 190 C 240 150, 400 150, 480 190"
        {...stroke}
        strokeWidth="5"
        opacity={0.35 + film * 0.5}
        {...draw(frame, 16, 16, 360)}
      />
      <path
        d="M180 210 C 260 230, 380 230, 460 210"
        {...stroke}
        strokeWidth="4"
        opacity={film * 0.7}
      />
    </svg>
  );
};

export const PalateTest: React.FC = () => {
  const frame = useCurrentFrame();
  const hot = frame < 70 ? 0 : 1;
  const items = ["manteca", "margarina"];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        fontFamily: FONT,
      }}
    >
      {items.map((word, i) => {
        const on = i === hot;
        return (
          <div
            key={word}
            style={{
              width: 640,
              padding: "22px 28px",
              border: `2px solid ${ink}`,
              background: on ? ink : "transparent",
              color: on ? paper : ink,
              fontSize: 56,
              fontWeight: 730,
              letterSpacing: "-0.04em",
            }}
          >
            {word}
            <div style={{ fontSize: 22, letterSpacing: "0.14em", marginTop: 8, opacity: 0.7 }}>
              {i === 0 ? "se derrite" : "plastifica"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SeedNames: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const names = ["girasol", "soja", "maíz", "canola"];
  const hot = Math.min(names.length - 1, Math.floor(frame / 48));
  return (
    <div
      style={{
        position: "absolute",
        inset: "60px 72px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 22,
        fontFamily: FONT,
      }}
    >
      {names.map((name, i) => {
        const enter = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 14, stiffness: 150 },
        });
        const on = i === hot;
        return (
          <div
            key={name}
            style={{
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [32, 0])}px)`,
              color: on ? paper : ink,
              background: on ? ink : "transparent",
              padding: "14px 22px",
              fontSize: 64,
              fontWeight: 730,
              letterSpacing: "-0.045em",
            }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export const FryPot: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width="520" height="420" viewBox="0 0 520 420" style={{ display: "block", margin: "20px auto 0" }}>
      <path d="M80 140 H440 V340 H80 Z" {...stroke} strokeWidth="8" {...draw(frame, 0, 18, 720)} />
      <path d="M60 140 H460" {...stroke} strokeWidth="8" />
      <path d="M40 200 H80 M440 200 H480" {...stroke} strokeWidth="8" />
      <path d="M110 220 H410" {...stroke} strokeWidth="5" opacity="0.45" {...draw(frame, 12, 14, 300)} />
      {[160, 230, 300, 370].map((x, i) => (
        <path
          key={x}
          d={`M${x} 250 C ${x + 8} 230, ${x + 18} 270, ${x + 10} 300`}
          {...stroke}
          strokeWidth="5"
          opacity={0.55 + Math.sin((frame + i * 9) / 7) * 0.2}
        />
      ))}
    </svg>
  );
};

export const ExtraVirgin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        color: ink,
        opacity: enter,
      }}
    >
      <ClearBottle dark fill={0.8} />
      <div
        style={{
          marginTop: 20,
          fontSize: 56,
          fontWeight: 750,
          letterSpacing: "-0.04em",
        }}
      >
        virgen extra
      </div>
    </div>
  );
};
