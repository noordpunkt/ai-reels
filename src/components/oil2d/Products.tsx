import { useId } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, stagePitch, stageYaw } from "./Kinetic";

const Standing: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.7 },
  });
  const yaw = stageYaw(frame);
  const pitch = stagePitch(frame);

  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        opacity: enter,
        transform: `rotateZ(${-yaw}deg) rotateX(${-pitch}deg) translateY(${interpolate(enter, [0, 1], [28, 0])}px)`,
        transformOrigin: "50% 100%",
      }}
    >
      {children}
    </div>
  );
};

export const BordierWrap: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const crease = 0.7 + Math.sin(frame * 0.035) * 0.12;

  return (
    <Standing>
      <svg
        width={460 * scale}
        height={300 * scale}
        viewBox="0 0 460 300"
        style={{ display: "block", filter: "drop-shadow(0 22px 22px rgba(0,0,0,0.55))" }}
      >
        <path d="M42 268 L418 268 L438 214 L62 214 Z" fill="#6A6A6A" />
        <path d="M418 268 L438 214 L438 72 L418 112 Z" fill="#3A3A3A" />
        <path
          d="M48 64 C36 64 28 78 30 96 L44 220 C48 246 76 258 108 260 L352 260 C392 260 422 244 426 214 L438 84 C440 62 422 48 392 48 L112 48 C78 48 56 54 48 64 Z"
          fill="#F2F2F2"
        />
        <path
          d="M48 64 C36 64 28 78 30 96 L44 220 C48 246 76 258 108 260 L352 260 C392 260 422 244 426 214 L438 84 C440 62 422 48 392 48 L112 48 C78 48 56 54 48 64 Z"
          fill="none"
          stroke="#111"
          strokeWidth="1.6"
        />
        <path d="M30 98 L78 48 L98 48 L48 108 Z" fill="#FFFFFF" stroke="#111" strokeWidth="1" />
        <path d="M426 92 L380 48 L358 48 L418 112 Z" fill="#E4E4E4" stroke="#111" strokeWidth="1" />
        <path d="M70 236 L108 260 L92 214 Z" fill="#C8C8C8" stroke="#111" strokeWidth="1" />
        <path d="M390 236 L352 260 L372 214 Z" fill="#B8B8B8" stroke="#111" strokeWidth="1" />
        <path
          d="M82 86 Q230 74 378 90"
          fill="none"
          stroke="#111"
          strokeWidth="1"
          opacity={0.22 * crease}
        />
        <path d="M74 208 Q230 224 386 206" fill="none" stroke="#111" strokeWidth="1" opacity="0.18" />
        <path d="M96 70 L108 250" fill="none" stroke="#111" strokeWidth="0.6" opacity="0.12" />
        <path d="M360 68 L348 248" fill="none" stroke="#111" strokeWidth="0.6" opacity="0.12" />
        <text
          x="230"
          y="118"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="23"
          fontWeight="400"
          letterSpacing="0.2em"
        >
          Maison
        </text>
        <text
          x="230"
          y="156"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="38"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          BORDIER
        </text>
        <path d="M184 166 C204 160 218 170 230 166 C242 162 256 170 276 166" fill="none" stroke="#111" strokeWidth="1.7" />
        <path d="M188 172 C206 166 218 176 230 172 C242 168 254 176 272 172" fill="none" stroke="#111" strokeWidth="1.2" />
        <text
          x="230"
          y="204"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="17"
          fontWeight="500"
          letterSpacing="0.24em"
        >
          LE BEURRE BORDIER
        </text>
        <path d="M204 216 L256 216" stroke="#111" strokeWidth="1.8" />
        <text
          x="230"
          y="238"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="16"
          fontWeight="400"
        >
          Oignon de Roscoff
        </text>
      </svg>
    </Standing>
  );
};

const RidgedPat: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  rot?: number;
}> = ({ x, y, w, h, fill, rot = 0 }) => {
  const lines = Array.from({ length: 12 }, (_, i) => 7 + i * ((h - 14) / 11));
  const thick = 10;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot} ${w / 2} ${h / 2})`}>
      <path d={`M0 ${h} L${thick} ${h + thick} L${w + thick} ${h + thick} L${w} ${h} Z`} fill="#4A4A4A" />
      <path d={`M${w} 0 L${w + thick} ${thick} L${w + thick} ${h + thick} L${w} ${h} Z`} fill="#2A2A2A" />
      <rect x="0" y="0" width={w} height={h} rx="9" fill={fill} stroke="#111" strokeWidth="1.2" />
      {lines.map((yy) => (
        <path
          key={yy}
          d={`M 9 ${yy} L ${w - 9} ${yy}`}
          stroke="#111"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
      ))}
    </g>
  );
};

export const BordierGrid: React.FC = () => {
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
        opacity: enter,
        transform: `translateZ(${interpolate(enter, [0, 1], [0, 10])}px) scale(${0.86 + enter * 0.14})`,
      }}
    >
      <svg width="580" height="380" viewBox="0 0 580 380" style={{ display: "block" }}>
        <RidgedPat x={18} y={28} w={124} h={74} fill="#F0F0F0" rot={-8} />
        <RidgedPat x={176} y={10} w={122} h={72} fill="#C8C8C8" rot={6} />
        <RidgedPat x={328} y={22} w={128} h={76} fill="#E4E4E4" rot={-4} />
        <RidgedPat x={444} y={98} w={114} h={70} fill="#B8B8B8" rot={10} />
        <RidgedPat x={10} y={148} w={126} h={76} fill="#D6D6D6" rot={7} />
        <RidgedPat x={412} y={214} w={134} h={78} fill="#EFEFEF" rot={-6} />
        <RidgedPat x={28} y={262} w={122} h={72} fill="#A8A8A8" rot={-12} />
        <RidgedPat x={286} y={262} w={130} h={80} fill="#C0C0C0" rot={8} />
        <g transform="translate(196 138)">
          <path d="M0 100 L12 112 L180 112 L168 100 Z" fill="#5A5A5A" />
          <rect x="0" y="0" width="168" height="100" rx="7" fill="#F4F4F4" stroke="#111" strokeWidth="1.4" />
          <text
            x="84"
            y="38"
            textAnchor="middle"
            fill="#111"
            fontFamily={FONT}
            fontSize="11"
            fontWeight="400"
            letterSpacing="0.16em"
          >
            Maison
          </text>
          <text
            x="84"
            y="58"
            textAnchor="middle"
            fill="#111"
            fontFamily={FONT}
            fontSize="16"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            BORDIER
          </text>
          <text
            x="84"
            y="80"
            textAnchor="middle"
            fill="#111"
            fontFamily={FONT}
            fontSize="8"
            fontWeight="500"
            letterSpacing="0.14em"
          >
            LE BEURRE BORDIER
          </text>
        </g>
      </svg>
    </div>
  );
};

export const CarapelliBottle: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const id = useId().replace(/:/g, "");
  const clip = `body-${id}`;
  const ribs = Array.from({ length: 18 }, (_, i) => i);

  return (
    <Standing delay={4}>
      <svg
        width={240 * scale}
        height={460 * scale}
        viewBox="0 0 240 460"
        style={{ display: "block", filter: "drop-shadow(0 24px 22px rgba(0,0,0,0.55))" }}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M70 118 C70 96 88 84 120 84 C152 84 170 96 170 118 L176 156 C186 172 192 210 192 278 L194 368 C194 404 160 424 120 424 C80 424 46 404 46 368 L48 278 C48 210 54 172 64 156 Z" />
          </clipPath>
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#111" />
            <stop offset="0.28" stopColor="#3A3A3A" />
            <stop offset="0.5" stopColor="#8A8A8A" />
            <stop offset="0.72" stopColor="#2E2E2E" />
            <stop offset="1" stopColor="#0A0A0A" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="438" rx="62" ry="8" fill="#000" opacity="0.42" />
        <path
          d="M70 118 C70 96 88 84 120 84 C152 84 170 96 170 118 L176 156 C186 172 192 210 192 278 L194 368 C194 404 160 424 120 424 C80 424 46 404 46 368 L48 278 C48 210 54 172 64 156 Z"
          fill={`url(#glass-${id})`}
        />
        <g clipPath={`url(#${clip})`}>
          {ribs.map((i) => {
            const x = -50 + i * 17;
            return (
              <path
                key={i}
                d={`M${x} 70 L${x + 108} 450`}
                fill="none"
                stroke={i % 2 === 0 ? "#F4F4F4" : "#111"}
                strokeOpacity={i % 2 === 0 ? 0.18 : 0.55}
                strokeWidth="5.5"
              />
            );
          })}
        </g>
        <ellipse cx="92" cy="230" rx="16" ry="78" fill="#FFF" opacity="0.1" />
        <rect x="102" y="30" width="36" height="28" rx="3" fill="#111" />
        <rect x="96" y="54" width="48" height="14" rx="2" fill="#1A1A1A" stroke="#444" strokeWidth="0.8" />
        <path d="M106 68 L106 86 Q120 96 134 86 L134 68 Z" fill="#2A2A2A" />
        <rect x="62" y="164" width="116" height="64" fill="#D8D8D8" />
        <text
          x="120"
          y="182"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="6.5"
          fontWeight="500"
          letterSpacing="0.22em"
        >
          CASA OLEARIA
        </text>
        <text
          x="120"
          y="206"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="15"
          fontWeight="700"
          letterSpacing="-0.03em"
        >
          CARAPELLI
        </text>
        <text
          x="120"
          y="220"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="7"
          letterSpacing="0.16em"
        >
          FIRENZE 1893
        </text>
        <rect x="62" y="228" width="116" height="112" fill="#1A1A1A" />
        <text
          x="120"
          y="264"
          textAnchor="middle"
          fill="#F4F4F4"
          fontFamily={FONT}
          fontSize="22"
          fontWeight="400"
        >
          Classico
        </text>
        <text
          x="120"
          y="284"
          textAnchor="middle"
          fill="#B8B8B8"
          fontFamily={FONT}
          fontSize="8"
        >
          Goût équilibré
        </text>
        <text
          x="112"
          y="308"
          textAnchor="middle"
          fill="#F4F4F4"
          fontFamily={FONT}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.06em"
        >
          HUILE D'OLIVE
        </text>
        <text
          x="112"
          y="322"
          textAnchor="middle"
          fill="#F4F4F4"
          fontFamily={FONT}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.06em"
        >
          VIERGE EXTRA
        </text>
        <ellipse cx="164" cy="308" rx="9" ry="5.5" fill="#F4F4F4" />
        <ellipse cx="173" cy="304" rx="6" ry="4" fill="#A8A8A8" />
        <path d="M168 302 C176 292 180 290 184 284" fill="none" stroke="#F4F4F4" strokeWidth="1.3" />
        <text
          x="168"
          y="330"
          textAnchor="end"
          fill="#B8B8B8"
          fontFamily={FONT}
          fontSize="7"
        >
          0,75 L
        </text>
      </svg>
    </Standing>
  );
};

export const PairProducts: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 36,
        transformStyle: "preserve-3d",
      }}
    >
      <BordierWrap scale={0.78} />
      <CarapelliBottle scale={0.92} />
    </div>
  );
};
