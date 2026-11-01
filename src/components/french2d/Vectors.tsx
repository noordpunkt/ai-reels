import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, draw, ink, mid, paper, ramp } from "./Draw";

const stroke = {
  fill: "none" as const,
  stroke: ink,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Field: React.FC = () => {
  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", inset: 0 }}
    >
      <rect width="1080" height="1920" fill={paper} />
      {Array.from({ length: 54 }).map((_, i) => (
        <circle
          key={i}
          cx={48 + (i % 6) * 176}
          cy={220 + Math.floor(i / 6) * 176}
          r="1.15"
          fill="#2A2A2A"
        />
      ))}
    </svg>
  );
};

export const Stage: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 360,
        bottom: 170,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
};

const InkPath: React.FC<{
  d: string;
  width?: number;
  delay?: number;
  dur?: number;
  len: number;
  opacity?: number;
}> = ({ d, width = 6, delay = 0, dur = 22, len, opacity = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <path
      d={d}
      {...stroke}
      strokeWidth={width}
      opacity={opacity}
      {...draw(frame, delay, dur, len)}
    />
  );
};

export const TitleWord: React.FC<{
  word: string;
  note?: string;
  size?: number;
}> = ({ word, note, size = 148 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = draw(frame, 16, 18, 520);
  const letters = [...word];

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
        textAlign: "center",
      }}
    >
      {note ? (
        <div
          style={{
            marginBottom: 22,
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: mid,
          }}
        >
          {note}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          gap: size > 120 ? 2 : 6,
          fontSize: size,
          fontWeight: 750,
          letterSpacing: "-0.07em",
          lineHeight: 0.9,
        }}
      >
        {letters.map((letter, i) => {
          const enter = spring({
            frame: frame - 2 - i * 2,
            fps,
            config: { damping: 14, stiffness: 160, mass: 0.7 },
          });
          return (
            <span
              key={`${letter}-${i}`}
              style={{
                display: "inline-block",
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [26, 0])}px)`,
              }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          );
        })}
      </div>
      <svg width="540" height="28" viewBox="0 0 540 28" style={{ marginTop: 18 }}>
        <path
          d="M20 14 H520"
          {...stroke}
          strokeWidth="2"
          {...line}
        />
      </svg>
    </div>
  );
};

type Vowel = "A" | "É" | "I" | "O" | "U";

const MOUTH: Record<
  Vowel,
  { open: number; wide: number; round: number; jaw: number }
> = {
  A: { open: 46, wide: 88, round: 0.08, jaw: 28 },
  É: { open: 26, wide: 70, round: 0.16, jaw: 14 },
  I: { open: 7, wide: 52, round: 0.1, jaw: 4 },
  O: { open: 24, wide: 36, round: 0.92, jaw: 10 },
  U: { open: 13, wide: 24, round: 1, jaw: 6 },
};

export const MouthVowel: React.FC<{ vowel: Vowel }> = ({ vowel }) => {
  const frame = useCurrentFrame();
  const s = MOUTH[vowel];
  const breath = 1 + Math.sin(frame / 7) * 0.03;
  const open = Math.max(s.open * breath, 4);
  const wide = s.wide;
  const cx = 210;
  const cy = 128;
  const oh = open + 16 + s.round * 8;

  return (
    <svg width="420" height="220" viewBox="0 0 420 220" style={{ display: "block", margin: "0 auto" }}>
      <path
        d={`M${cx - wide} ${cy} C ${cx - wide} ${cy - oh}, ${cx + wide} ${cy - oh}, ${cx + wide} ${cy} C ${cx + wide} ${cy + oh}, ${cx - wide} ${cy + oh}, ${cx - wide} ${cy} Z`}
        fill="none"
        stroke={ink}
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={wide * (0.38 + s.round * 0.16)}
        ry={open * 0.72}
        fill={ink}
        opacity={0.16}
        stroke={ink}
        strokeWidth="4"
      />
    </svg>
  );
};

export const VowelLab: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters: Vowel[] = ["A", "É", "I", "O", "U"];
  const active: Vowel =
    frame < 128 ? "A" : frame < 258 ? "É" : frame < 378 ? "I" : frame < 498 ? "O" : "U";

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT }}>
      <div style={{ marginTop: 64 }}>
        <MouthVowel vowel={active} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 8,
        }}
      >
        {letters.map((letter, i) => {
          const on = letter === active;
          const pop = spring({
            frame: frame - i * 3,
            fps,
            config: { damping: 13, stiffness: 170 },
          });
          return (
            <div
              key={letter}
              style={{
                width: 112,
                height: 140,
                border: `2px solid ${ink}`,
                background: on ? ink : "transparent",
                color: on ? paper : ink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 68,
                fontWeight: 740,
                transform: `scale(${0.88 + pop * 0.12})`,
              }}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 28,
          textAlign: "center",
          color: mid,
          fontSize: 22,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        {active === "A"
          ? "ouverte"
          : active === "É"
            ? "écartée"
            : active === "I"
              ? "fendue"
              : active === "O"
                ? "arrondie"
                : "pincée"}
      </div>
    </div>
  );
};

export const NasalFace: React.FC = () => {
  const frame = useCurrentFrame();
  const air = draw(frame, 8, 36, 420);

  return (
    <svg
      width="860"
      height="720"
      viewBox="0 0 860 720"
      style={{ display: "block", margin: "10px auto 0" }}
    >
      <InkPath
        d="M260 620 C 236 560, 198 500, 184 430 C 154 330, 128 250, 134 188 C 140 110, 198 58, 276 70 C 348 80, 392 128, 404 186 C 412 226, 446 254, 500 270 C 518 276, 516 294, 494 298 C 470 302, 460 316, 474 332 C 490 350, 478 372, 450 382 C 416 396, 396 440, 404 500 C 412 560, 396 600, 372 620 L260 620"
        width={7}
        delay={0}
        dur={32}
        len={900}
      />
      <path d="M438 320 C 456 328, 458 342, 440 348" {...stroke} strokeWidth="5" />
      <circle cx="326" cy="200" r="6" fill={ink} />
      <path
        d="M500 268 C 590 150, 720 110, 820 168"
        {...stroke}
        strokeWidth="5"
        strokeDasharray="14 12"
        strokeDashoffset={air.strokeDashoffset}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const t = ((frame + i * 7) % 46) / 46;
        const x = 500 + t * 300;
        const y = 268 - Math.sin(t * Math.PI) * 90 - i * 4;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2.2 + t * 1.8}
            fill={ink}
            opacity={0.85 - t}
          />
        );
      })}
      <text x="640" y="248" fill={ink} fontSize="28" fontFamily={FONT}>
        nez
      </text>
    </svg>
  );
};

export const NasalWord: React.FC<{
  word: string;
  coda?: string;
  delay?: number;
  size?: number;
  layout?: "fill" | "inline";
}> = ({ word, coda = "n", delay = 0, size = 168, layout = "fill" }) => {
  const frame = useCurrentFrame();
  const fadeN = ramp(frame, 1, 0.16, delay + 10, delay + 38);
  const tilde = ramp(frame, 0, 1, delay + 14, delay + 42);
  const stem = word.slice(0, -coda.length);

  const body = (
    <div
      style={{
        position: "relative",
        fontSize: size,
        fontWeight: 750,
        letterSpacing: "-0.06em",
        lineHeight: 1,
        color: ink,
        fontFamily: FONT,
      }}
    >
      <span>{stem}</span>
      <span style={{ opacity: fadeN }}>{coda}</span>
      <svg
        width="160"
        height="46"
        viewBox="0 0 160 46"
        style={{
          position: "absolute",
          left: "8%",
          top: -34,
          width: "58%",
          opacity: tilde,
        }}
      >
        <path
          d="M8 30 C 32 4, 58 40, 86 14 S 140 6, 152 24"
          {...stroke}
          strokeWidth="7"
        />
      </svg>
    </div>
  );

  if (layout === "inline") {
    return body;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {body}
    </div>
  );
};

export const NasalTrio: React.FC = () => {
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
      }}
    >
      <NasalWord word="pain" delay={0} size={110} layout="inline" />
      <NasalWord word="vin" delay={10} size={110} layout="inline" />
      <NasalWord word="un" delay={20} size={110} layout="inline" />
    </div>
  );
};

export const LiaisonJoin: React.FC<{
  left: string;
  right: string;
  link: string;
}> = ({ left, right, link }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 108 },
  });
  const gap = interpolate(enter, [0, 1], [118, 22]);
  const linkOn = ramp(frame, 0, 1, 16, 32);
  const bridge = draw(frame, 14, 18, 160);

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
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div style={{ fontSize: 92, fontWeight: 730, letterSpacing: "-0.045em" }}>
          {left}
        </div>
        <div
          style={{
            width: gap,
            textAlign: "center",
            fontSize: 42,
            fontWeight: 800,
            opacity: linkOn,
            paddingBottom: 8,
          }}
        >
          {link}
        </div>
        <div style={{ fontSize: 92, fontWeight: 730, letterSpacing: "-0.045em" }}>
          {right}
        </div>
      </div>
      <svg width="420" height="70" viewBox="0 0 420 70" style={{ marginTop: 8 }}>
        <path
          d="M70 18 C 140 58, 280 58, 350 18"
          {...stroke}
          strokeWidth="5"
          {...bridge}
        />
      </svg>
      <div
        style={{
          marginTop: 18,
          color: mid,
          fontSize: 22,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        on glisse
      </div>
    </div>
  );
};

export const BaguetteLoaf: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const body = draw(frame, delay, 26, 1000);
  const slash = (d: number) => draw(frame, delay + 18 + d, 8, 70);

  return (
    <svg
      width="920"
      height="240"
      viewBox="0 0 920 240"
      style={{ display: "block", margin: "0 auto" }}
    >
      <path
        d="M96 78 C 48 78, 48 186, 96 186 L 824 186 C 872 186, 872 78, 824 78 Z"
        fill="none"
        stroke={ink}
        strokeWidth="7"
        strokeLinejoin="round"
        {...body}
      />
      {[230, 380, 530, 680].map((x, i) => (
        <path
          key={x}
          d={`M${x} 96 L${x + 34} 164`}
          fill="none"
          stroke={ink}
          strokeWidth="5"
          strokeLinecap="round"
          {...slash(i * 3)}
        />
      ))}
    </svg>
  );
};

export const WineFill: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const frame = useCurrentFrame();
  const fill = ramp(frame, 0, 1, 10, 46);
  const appear = ramp(frame, 0, 1, 0, 14);
  const w = compact ? 200 : 280;
  const h = compact ? 300 : 420;
  const half = 22 + fill * 26;
  const top = 188 - fill * 88;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 280 420"
      style={{ display: "block", margin: "0 auto", opacity: appear }}
    >
      {fill > 0.08 ? (
        <path
          d={`M${140 - half} ${top} L${140 + half} ${top} C 176 ${top + 36}, 168 176, 140 192 C 112 176, 104 ${top + 36}, ${140 - half} ${top} Z`}
          fill={ink}
          opacity="0.88"
        />
      ) : null}
      <path d="M94 40 H186" {...stroke} strokeWidth="6" />
      <path d="M94 40 C 80 112, 90 166, 118 198" {...stroke} strokeWidth="6" />
      <path d="M186 40 C 200 112, 190 166, 162 198" {...stroke} strokeWidth="6" />
      <path d="M140 198 V 326" {...stroke} strokeWidth="6" />
      <rect x="98" y="323" width="84" height="7" rx="3.5" fill={ink} />
    </svg>
  );
};

export const TasteStill: React.FC = () => {
  const frame = useCurrentFrame();
  const glassIn = ramp(frame, 0, 1, 18, 34);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <BaguetteLoaf />
      <div style={{ opacity: glassIn, transform: "scale(0.82)" }}>
        <WineFill />
      </div>
    </div>
  );
};

export const VinScene: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <WineFill compact />
      <NasalWord word="vin" layout="inline" size={150} />
    </div>
  );
};

export const BaguetteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const gap = ramp(frame, 64, 10, 0, 24);

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
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap,
          fontSize: 108,
          fontWeight: 740,
          letterSpacing: "-0.05em",
        }}
      >
        <span>BA</span>
        <span>GUETTE</span>
      </div>
      <div style={{ marginTop: 36, width: "100%" }}>
        <BaguetteLoaf delay={8} />
      </div>
    </div>
  );
};

const MiniIcon: React.FC<{ kind: "butter" | "cheese" | "basket" | "tomato" }> = ({
  kind,
}) => {
  if (kind === "butter") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <rect x="8" y="22" width="48" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M14 22 L20 12 H44 L50 22" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M16 32 H48" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    );
  }
  if (kind === "cheese") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <path d="M8 46 L56 46 L34 10 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="28" cy="34" r="3.2" fill="currentColor" />
        <circle cx="40" cy="38" r="2.2" fill="currentColor" />
        <circle cx="32" cy="24" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "basket") {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <path d="M12 28 H52 L46 52 H18 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M18 28 C 18 12, 46 12, 46 28" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 38 H44 M22 45 H42" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="36" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M32 20 C 36 10, 46 12, 42 22" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M26 20 C 30 18, 34 18, 38 20" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
};

export const MarketRow: React.FC<{
  items: Array<{ word: string; icon: "butter" | "cheese" | "basket" | "tomato" }>;
  pulse?: string;
}> = ({ items, pulse }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slot = Math.min(items.length - 1, Math.floor(frame / 58));
  const active = pulse ?? items[slot].word;

  return (
    <div
      style={{
        position: "absolute",
        inset: "48px 72px 0",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        fontFamily: FONT,
      }}
    >
      {items.map((item, i) => {
        const enter = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 14, stiffness: 140 },
        });
        const on = item.word === active;
        return (
          <div
            key={item.word}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [32, 0])}px)`,
              color: on ? paper : ink,
              background: on ? ink : "transparent",
              padding: "12px 20px",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            <MiniIcon kind={item.icon} />
            {item.word}
          </div>
        );
      })}
    </div>
  );
};

export const LouvreLight: React.FC<{ words: string[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const ray = ramp(frame, -80, 80, 0, 70);
  const glow = 0.08 + Math.sin(frame / 14) * 0.04;
  const active =
    frame < 90 ? words[0] : frame < 170 ? words[1] : words[2];

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT, color: ink }}>
      <svg
        width="760"
        height="400"
        viewBox="0 0 760 400"
        style={{ display: "block", margin: "8px auto 0" }}
      >
        <line x1="40" y1="352" x2="720" y2="352" stroke={ink} strokeWidth="3" />
        <polygon
          points="380,36 70,352 690,352"
          fill={ink}
          opacity={glow}
        />
        <polygon points="380,36 70,352 690,352" {...stroke} strokeWidth="7" />
        <polygon points="380,250 310,352 450,352" {...stroke} strokeWidth="4" />
        {[0.22, 0.4, 0.58, 0.76].map((t) => {
          const y = 36 + t * 316;
          const half = (1 - (400 - y) / 364) * 310;
          return (
            <line
              key={t}
              x1={380 - half}
              y1={y}
              x2={380 + half}
              y2={y}
              stroke={ink}
              strokeWidth="2"
              opacity="0.35"
            />
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={`f-${i}`}
            x1="380"
            y1="36"
            x2={120 + i * 104}
            y2="352"
            stroke={ink}
            strokeWidth="2"
            opacity="0.28"
          />
        ))}
        <polygon
          points={`380,36 ${380 + ray},352 ${380 + ray + 90},352`}
          fill={ink}
          opacity="0.1"
        />
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 34,
          marginTop: 28,
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        {words.map((word) => (
          <span
            key={word}
            style={{
              borderBottom: word === active ? `3px solid ${ink}` : "3px solid transparent",
              opacity: word === active ? 1 : 0.38,
              paddingBottom: 6,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ParisMark: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = ramp(frame, 0, 96, 22, 56);
  const fade = ramp(frame, 1, 0.12, 22, 56);
  const tower = draw(frame, 4, 30, 740);

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT, color: ink }}>
      <div
        style={{
          textAlign: "center",
          marginTop: 28,
          fontSize: 132,
          fontWeight: 750,
          letterSpacing: "-0.06em",
        }}
      >
        Pari
        <span
          style={{
            display: "inline-block",
            opacity: fade,
            transform: `translateY(${drop}px)`,
          }}
        >
          s
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          color: mid,
          fontSize: 22,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        le s se tait
      </div>
      <svg
        width="1080"
        height="620"
        viewBox="0 0 1080 620"
        style={{ position: "absolute", left: 0, bottom: 0 }}
      >
        <path
          d="M540 28 L526 90 L498 236 L424 440 L348 568 M540 28 L554 90 L582 236 L656 440 L732 568"
          {...stroke}
          strokeWidth="6"
          {...tower}
        />
        <path d="M468 234 H612" {...stroke} strokeWidth="8" {...draw(frame, 18, 10, 160)} />
        <path d="M410 438 H670" {...stroke} strokeWidth="10" {...draw(frame, 22, 10, 270)} />
        <path d="M498 236 L582 438 M582 236 L498 438" {...stroke} strokeWidth="3" opacity={0.45} {...draw(frame, 24, 12, 420)} />
        <path d="M424 440 L656 568 M656 440 L424 568" {...stroke} strokeWidth="3" opacity={0.4} {...draw(frame, 26, 12, 480)} />
        <line x1="540" y1="28" x2="540" y2="6" stroke={ink} strokeWidth="5" />
        <line x1="80" y1="576" x2="1000" y2="576" stroke={ink} strokeWidth="4" />
      </svg>
    </div>
  );
};

export const WordTicker: React.FC<{ words: string[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const x = -((frame * 3.1) % 1200);
  const line = words.concat(words).join("   —   ");
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          whiteSpace: "nowrap",
          color: ink,
          fontSize: 88,
          fontWeight: 730,
          letterSpacing: "-0.045em",
          fontFamily: FONT,
          transform: `translateX(${x}px)`,
        }}
      >
        {line}
      </div>
      <div
        style={{
          position: "absolute",
          top: 370,
          left: 80,
          right: 80,
          height: 2,
          background: ink,
          opacity: 0.32,
        }}
      />
    </div>
  );
};

export const Syllables: React.FC<{ parts: string[] }> = ({ parts }) => {
  const frame = useCurrentFrame();
  const gap = ramp(frame, 70, 12, 0, 22);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap,
        color: ink,
        fontFamily: FONT,
        fontSize: 110,
        fontWeight: 740,
        letterSpacing: "-0.05em",
      }}
    >
      {parts.map((part, i) => (
        <span key={`${part}-${i}`}>{part}</span>
      ))}
    </div>
  );
};

export const RLab: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wave = draw(frame, 4, 24, 480);
  const words = ["rue", "Paris", "roux"] as const;
  const hot =
    frame < 293 ? "" : frame < 380 ? "rue" : frame < 450 ? "Paris" : "roux";

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT, color: ink }}>
      <svg
        width="680"
        height="540"
        viewBox="0 0 680 540"
        style={{ display: "block", margin: "0 auto" }}
      >
        <text
          x="340"
          y="390"
          textAnchor="middle"
          fill={ink}
          fontSize="360"
          fontWeight="800"
          fontFamily={FONT}
        >
          R
        </text>
        {[0, 1, 2].map((i) => {
          const wobble = Math.sin(frame / 3.2 + i) * (8 - i * 2);
          return (
            <path
              key={i}
              d={`M110 ${390 + i * 16} C 170 ${350 + wobble}, 250 ${300 - wobble}, 360 ${250 + wobble} S 520 ${200 + wobble}, 610 ${230 + i * 12}`}
              {...stroke}
              strokeWidth={6 - i}
              opacity={1 - i * 0.28}
              {...wave}
            />
          );
        })}
        <circle cx="132" cy="396" r="7" fill={ink} />
        <text x="48" y="430" fill={mid} fontSize="22" fontFamily={FONT}>
          gorge
        </text>
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 36,
          fontSize: 46,
          fontWeight: 680,
        }}
      >
        {words.map((word, i) => {
          const enter = spring({
            frame: frame - 18 - i * 4,
            fps,
            config: { damping: 14, stiffness: 150 },
          });
          return (
            <span
              key={word}
              style={{
                opacity: enter,
                borderBottom: hot === word ? `3px solid ${ink}` : "3px solid transparent",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const PhraseStack: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hot = phrases[Math.min(phrases.length - 1, Math.floor(frame / 48))];

  return (
    <div
      style={{
        position: "absolute",
        inset: "80px 64px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
        fontFamily: FONT,
        color: ink,
      }}
    >
      {phrases.map((phrase, i) => {
        const enter = spring({
          frame: frame - i * 6,
          fps,
          config: { damping: 14, stiffness: 140 },
        });
        const on = phrase === hot;
        return (
          <div
            key={phrase}
            style={{
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [28, 0])}px)`,
              fontSize: phrase.length > 14 ? 56 : 68,
              fontWeight: 730,
              letterSpacing: "-0.045em",
              padding: "8px 18px",
              color: on ? paper : ink,
              background: on ? ink : "transparent",
              width: "fit-content",
            }}
          >
            {phrase}
          </div>
        );
      })}
    </div>
  );
};

export const NumberStrip: React.FC<{ values: string[] }> = ({ values }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hot = Math.min(values.length - 1, Math.floor(frame / 36));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        fontFamily: FONT,
      }}
    >
      {values.map((value, i) => {
        const enter = spring({
          frame: frame - i * 3,
          fps,
          config: { damping: 13, stiffness: 170 },
        });
        const on = i === hot;
        return (
          <div
            key={value}
            style={{
              width: 112,
              height: 150,
              border: `2px solid ${ink}`,
              background: on ? ink : "transparent",
              color: on ? paper : ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: 740,
              transform: `scale(${0.88 + enter * 0.12})`,
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export const CoinEuro: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = draw(frame, 0, 20, 360);
  const mark = ramp(frame, 0, 1, 12, 26);
  const amount =
    frame < 70 ? "2 €" : frame < 120 ? "3 €" : frame < 170 ? "6 €" : "10 €";

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
      <svg width="280" height="280" viewBox="0 0 280 280">
        <circle cx="140" cy="140" r="108" {...stroke} strokeWidth="8" {...ring} />
        <circle cx="140" cy="140" r="88" {...stroke} strokeWidth="3" opacity="0.45" />
        <text
          x="140"
          y="162"
          textAnchor="middle"
          fill={ink}
          fontSize="92"
          fontWeight="750"
          fontFamily={FONT}
          opacity={mark}
        >
          €
        </text>
      </svg>
      <div style={{ marginTop: 18, fontSize: 72, fontWeight: 740, letterSpacing: "-0.05em" }}>
        {amount}
      </div>
    </div>
  );
};

export const FruitRow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fruits = [
    { word: "pomme", d: "M40 78 C 18 78, 14 118, 40 138 C 66 118, 62 78, 40 78 M40 78 C 48 58, 62 60, 58 74" },
    { word: "poire", d: "M40 46 C 28 70, 18 96, 28 124 C 38 148, 62 148, 72 124 C 82 96, 52 70, 40 46 M40 46 C 44 34, 54 34, 52 46" },
    { word: "pêche", d: "M40 80 C 16 80, 12 124, 40 142 C 68 124, 64 80, 40 80 M40 80 C 40 80, 52 68, 40 80" },
  ];
  const hot = fruits[Math.min(fruits.length - 1, Math.floor(frame / 55))].word;

  return (
    <div
      style={{
        position: "absolute",
        inset: "60px 48px 0",
        display: "flex",
        justifyContent: "center",
        gap: 28,
        fontFamily: FONT,
      }}
    >
      {fruits.map((fruit, i) => {
        const enter = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 14, stiffness: 140 },
        });
        const on = fruit.word === hot;
        return (
          <div
            key={fruit.word}
            style={{
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
              color: on ? paper : ink,
              background: on ? ink : "transparent",
              padding: "28px 22px 22px",
              textAlign: "center",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            <svg width="80" height="160" viewBox="0 0 80 160">
              <path d={fruit.d} fill="none" stroke="currentColor" strokeWidth="4" />
            </svg>
            {fruit.word}
          </div>
        );
      })}
    </div>
  );
};

export const StallAwning: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = ramp(frame, -40, 0, 0, 18);

  return (
    <svg
      width="920"
      height="220"
      viewBox="0 0 920 220"
      style={{ display: "block", margin: "20px auto 0", transform: `translateY(${drop}px)` }}
    >
      <path d="M40 40 H880 V110 H40 Z" fill={ink} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M${40 + i * 105} 110 L${92 + i * 105} 190 L${145 + i * 105} 110`}
          fill={i % 2 === 0 ? ink : paper}
          stroke={ink}
          strokeWidth="4"
        />
      ))}
    </svg>
  );
};
