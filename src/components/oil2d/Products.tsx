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
  const crease = 0.85 + Math.sin(frame * 0.04) * 0.03;

  return (
    <Standing>
      <svg
        width={420 * scale}
        height={268 * scale}
        viewBox="0 0 420 268"
        style={{ display: "block", filter: "drop-shadow(0 18px 18px rgba(0,0,0,0.45))" }}
      >
        <path
          d="M28 58 C18 58 14 70 16 84 L28 214 C32 238 58 248 86 250 L334 250 C368 250 396 236 400 208 L410 78 C412 58 396 46 372 46 L86 46 C58 46 36 50 28 58 Z"
          fill="#E8E4DC"
        />
        <path
          d="M28 58 C18 58 14 70 16 84 L28 214 C32 238 58 248 86 250 L334 250 C368 250 396 236 400 208 L410 78 C412 58 396 46 372 46 L86 46 C58 46 36 50 28 58 Z"
          fill="none"
          stroke="#B8B3A8"
          strokeWidth="1.4"
        />
        <path d="M22 92 L58 48 L78 48 L36 102 Z" fill="#F4F1EA" />
        <path d="M398 88 L362 48 L342 48 L392 108 Z" fill="#F4F1EA" />
        <path d="M48 236 L86 250 L70 214 Z" fill="#D4CFC4" />
        <path d="M372 236 L334 250 L354 214 Z" fill="#D4CFC4" />
        <path
          d="M70 78 Q210 70 350 82"
          fill="none"
          stroke="#C9C3B8"
          strokeWidth="1.2"
          opacity={crease}
        />
        <path
          d="M62 200 Q210 214 358 198"
          fill="none"
          stroke="#C9C3B8"
          strokeWidth="1.2"
        />
        <text
          x="210"
          y="108"
          textAnchor="middle"
          fill="#3A2A28"
          fontFamily={FONT}
          fontSize="22"
          fontWeight="400"
          letterSpacing="0.18em"
        >
          Maison
        </text>
        <text
          x="210"
          y="142"
          textAnchor="middle"
          fill="#3A2A28"
          fontFamily={FONT}
          fontSize="36"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          BORDIER
        </text>
        <path d="M168 152 C186 148 198 156 210 152 C222 148 234 156 252 152" fill="none" stroke="#3A2A28" strokeWidth="1.6" />
        <path d="M172 158 C188 154 200 162 210 158 C220 154 232 162 248 158" fill="none" stroke="#3A2A28" strokeWidth="1.2" />
        <text
          x="210"
          y="190"
          textAnchor="middle"
          fill="#3A2A28"
          fontFamily={FONT}
          fontSize="18"
          fontWeight="500"
          letterSpacing="0.22em"
        >
          LE BEURRE BORDIER
        </text>
        <path d="M186 204 L234 204" stroke="#6A3A6A" strokeWidth="2" />
        <text
          x="210"
          y="226"
          textAnchor="middle"
          fill="#6A3A6A"
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
  const lines = Array.from({ length: 11 }, (_, i) => 8 + i * ((h - 16) / 10));
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot} ${w / 2} ${h / 2})`}>
      <rect x="0" y="0" width={w} height={h} rx="10" fill={fill} />
      {lines.map((yy) => (
        <path
          key={yy}
          d={`M 8 ${yy} L ${w - 8} ${yy}`}
          stroke="#000"
          strokeOpacity="0.12"
          strokeWidth="1.4"
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
      <svg width="560" height="360" viewBox="0 0 560 360" style={{ display: "block" }}>
        <RidgedPat x={20} y={24} w={120} h={72} fill="#E2D39A" rot={-8} />
        <RidgedPat x={170} y={8} w={118} h={70} fill="#C4B49A" rot={6} />
        <RidgedPat x={320} y={18} w={124} h={74} fill="#D8D4A8" rot={-4} />
        <RidgedPat x={430} y={90} w={110} h={68} fill="#E6D56A" rot={10} />
        <RidgedPat x={12} y={140} w={122} h={74} fill="#D5C36A" rot={7} />
        <RidgedPat x={400} y={200} w={130} h={76} fill="#E4D48A" rot={-6} />
        <RidgedPat x={30} y={250} w={118} h={70} fill="#E8C84A" rot={-12} />
        <RidgedPat x={280} y={248} w={126} h={78} fill="#E2C27A" rot={8} />
        <g transform="translate(188 130)">
          <rect x="0" y="0" width="168" height="100" rx="8" fill="#EDE8DF" />
          <text
            x="84"
            y="38"
            textAnchor="middle"
            fill="#3A2A28"
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
            fill="#3A2A28"
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
            fill="#3A2A28"
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
  const ribs = Array.from({ length: 16 }, (_, i) => i);

  return (
    <Standing delay={4}>
      <svg
        width={220 * scale}
        height={430 * scale}
        viewBox="0 0 220 430"
        style={{ display: "block", filter: "drop-shadow(0 22px 20px rgba(0,0,0,0.5))" }}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M62 108 C62 90 84 76 110 76 C136 76 158 90 158 108 L164 150 C176 168 184 210 184 268 L186 352 C186 390 152 412 110 412 C68 412 34 390 34 352 L36 268 C36 210 44 168 56 150 Z" />
          </clipPath>
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1A2210" />
            <stop offset="0.32" stopColor="#3A4C20" />
            <stop offset="0.52" stopColor="#7A8C40" />
            <stop offset="1" stopColor="#161C0E" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="416" rx="58" ry="7" fill="#000" opacity="0.38" />
        <path
          d="M62 108 C62 90 84 76 110 76 C136 76 158 90 158 108 L164 150 C176 168 184 210 184 268 L186 352 C186 390 152 412 110 412 C68 412 34 390 34 352 L36 268 C36 210 44 168 56 150 Z"
          fill={`url(#glass-${id})`}
        />
        <g clipPath={`url(#${clip})`} opacity="0.5">
          {ribs.map((i) => {
            const x = -40 + i * 18;
            return (
              <path
                key={i}
                d={`M${x} 60 L${x + 92} 430`}
                fill="none"
                stroke="#0A0A0A"
                strokeWidth="6"
              />
            );
          })}
        </g>
        <ellipse cx="86" cy="210" rx="18" ry="70" fill="#E8F0C0" opacity="0.12" />
        <rect x="92" y="28" width="36" height="26" rx="3" fill="#111" />
        <rect x="86" y="50" width="48" height="12" rx="2" fill="#1A1A1A" />
        <path d="M96 62 L96 78 Q110 88 124 78 L124 62 Z" fill="#2A2A2A" />
        <rect x="52" y="154" width="116" height="62" fill="#C6D24A" />
        <text
          x="110"
          y="172"
          textAnchor="middle"
          fill="#1A1A1A"
          fontFamily={FONT}
          fontSize="6.5"
          fontWeight="500"
          letterSpacing="0.22em"
        >
          CASA OLEARIA
        </text>
        <text
          x="110"
          y="196"
          textAnchor="middle"
          fill="#111"
          fontFamily={FONT}
          fontSize="15"
          fontWeight="700"
          letterSpacing="-0.02em"
        >
          CARAPELLI
        </text>
        <text
          x="110"
          y="210"
          textAnchor="middle"
          fill="#1A1A1A"
          fontFamily={FONT}
          fontSize="7"
          letterSpacing="0.16em"
        >
          FIRENZE 1893
        </text>
        <rect x="52" y="216" width="116" height="108" fill="#2F6A3A" />
        <text
          x="110"
          y="250"
          textAnchor="middle"
          fill="#F4F4F4"
          fontFamily={FONT}
          fontSize="22"
          fontWeight="400"
        >
          Classico
        </text>
        <text
          x="110"
          y="268"
          textAnchor="middle"
          fill="#D8E8D0"
          fontFamily={FONT}
          fontSize="8"
        >
          Goût équilibré
        </text>
        <text
          x="102"
          y="292"
          textAnchor="middle"
          fill="#F4F4F4"
          fontFamily={FONT}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.05em"
        >
          HUILE D'OLIVE
        </text>
        <text
          x="102"
          y="304"
          textAnchor="middle"
          fill="#F4F4F4"
          fontFamily={FONT}
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.05em"
        >
          VIERGE EXTRA
        </text>
        <ellipse cx="154" cy="292" rx="9" ry="5.5" fill="#3A2A18" />
        <ellipse cx="163" cy="288" rx="6" ry="4" fill="#6A3A18" />
        <path d="M158 286 C166 276 170 274 174 268" fill="none" stroke="#2A4A22" strokeWidth="1.3" />
        <text
          x="168"
          y="312"
          textAnchor="end"
          fill="#D8E8D0"
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
