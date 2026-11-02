import { useCurrentFrame } from "remotion";

const white = {
  color: "#F3F3F3",
  metalness: 0.18,
  roughness: 0.38,
} as const;

const silver = {
  color: "#DEDEDE",
  metalness: 0.82,
  roughness: 0.22,
} as const;

const mid = {
  color: "#9A9A9A",
  metalness: 0.25,
  roughness: 0.5,
} as const;

const dark = {
  color: "#3A3A3A",
  metalness: 0.35,
  roughness: 0.45,
} as const;

export const ButterBlock: React.FC<{ crossed?: boolean }> = ({
  crossed = false,
}) => {
  const frame = useCurrentFrame();
  const spin = -0.35 + Math.sin(frame * 0.01) * 0.05;
  return (
    <group position={[0, 0.28, 0]} rotation={[0.15, spin, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.36, 0.72]} />
        <meshStandardMaterial {...white} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.23, 0.02, 0.7]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      {crossed ? (
        <group position={[0, 0.4, 0]}>
          <mesh rotation={[0, 0, 0.55]}>
            <boxGeometry args={[1.9, 0.05, 0.05]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh rotation={[0, 0, -0.55]}>
            <boxGeometry args={[1.9, 0.05, 0.05]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ) : null}
    </group>
  );
};

export const OilBottle: React.FC<{
  darkGlass?: boolean;
  x?: number;
}> = ({ darkGlass = false, x = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <group position={[x, 0, 0]} rotation={[0, frame * 0.008, 0]}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 1.35, 32]} />
        <meshStandardMaterial {...(darkGlass ? dark : white)} transparent={!darkGlass} opacity={darkGlass ? 1 : 0.55} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.85, 32]} />
        <meshStandardMaterial {...(darkGlass ? dark : mid)} />
      </mesh>
      <mesh position={[0, 1.48, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.28, 24]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.16, 24]} />
        <meshStandardMaterial {...white} />
      </mesh>
    </group>
  );
};

export const OliveFruit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <group rotation={[0.2, frame * 0.015, 0]} position={[0, 0.55, 0]}>
      <mesh castShadow scale={[0.72, 1, 0.62]}>
        <sphereGeometry args={[0.55, 32, 24]} />
        <meshStandardMaterial {...white} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.22, 8]} />
        <meshStandardMaterial {...mid} />
      </mesh>
    </group>
  );
};

export const SunflowerSeed: React.FC = () => {
  return (
    <group position={[0, 0.4, 0]} rotation={[0.4, 0.3, 0]}>
      <mesh castShadow scale={[0.55, 1.05, 0.38]}>
        <sphereGeometry args={[0.55, 24, 16]} />
        <meshStandardMaterial {...white} />
      </mesh>
    </group>
  );
};

export const Press: React.FC<{ dripping?: boolean }> = ({ dripping = false }) => {
  const frame = useCurrentFrame();
  const drop = (Math.sin(frame * 0.2) + 1) * 0.08;
  return (
    <group>
      <mesh position={[0, 1.35, 0]} castShadow>
        <boxGeometry args={[1.4, 0.16, 1.4]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.7, 32]} />
        <meshStandardMaterial {...mid} />
      </mesh>
      {dripping ? (
        <mesh position={[0, 0.12 - drop, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial {...white} />
        </mesh>
      ) : null}
    </group>
  );
};

export const HeatColumn: React.FC = () => {
  const frame = useCurrentFrame();
  const h = Math.min(1.6, 0.2 + frame * 0.012);
  return (
    <group>
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.7, 24]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 0.15 + h / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.07, h, 16]} />
        <meshStandardMaterial {...white} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.28, 24, 16]} />
        <meshStandardMaterial {...white} />
      </mesh>
    </group>
  );
};

export const SprayBottle: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <group rotation={[0, 0.4, 0]} scale={0.78}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.36, 1.5, 28]} />
        <meshStandardMaterial {...white} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.22, 16]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0.28, 1.78, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 10]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            0.55 + i * 0.12,
            1.78 + Math.sin((frame + i * 6) * 0.2) * 0.05,
            0,
          ]}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial {...white} />
        </mesh>
      ))}
    </group>
  );
};

export const FryingPan: React.FC<{ film?: boolean }> = ({ film = false }) => {
  return (
    <group rotation={[-0.55, 0.4, 0]} position={[0, 0.2, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[1.15, 1.05, 0.16, 48]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 0.04, 48]} />
        <meshStandardMaterial {...(film ? white : dark)} />
      </mesh>
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.3, 12]} />
        <meshStandardMaterial {...mid} />
      </mesh>
    </group>
  );
};

export const SeedRow: React.FC = () => {
  const frame = useCurrentFrame();
  const hot = Math.floor(frame / 40) % 4;
  return (
    <group>
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh
          key={x}
          position={[x, 0.35 + (i === hot ? 0.12 : 0), 0]}
          castShadow
          scale={i === hot ? 1.15 : 1}
        >
          <sphereGeometry args={[0.32, 20, 16]} />
          <meshStandardMaterial {...(i === hot ? white : mid)} />
        </mesh>
      ))}
    </group>
  );
};

export const FryPot3D: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.8, 0.9, 40]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.18, 40]} />
        <meshStandardMaterial {...white} />
      </mesh>
      {[-0.25, 0.05, 0.3].map((x, i) => (
        <mesh
          key={x}
          position={[x, 0.95 + Math.sin((frame + i * 10) * 0.12) * 0.04, 0.1]}
          rotation={[0.4, 0.2, 0.3]}
        >
          <boxGeometry args={[0.18, 0.08, 0.5]} />
          <meshStandardMaterial {...white} />
        </mesh>
      ))}
    </group>
  );
};

export const LetterBlocks: React.FC<{ letters: string[] }> = ({ letters }) => {
  const frame = useCurrentFrame();
  const hot = Math.min(letters.length - 1, Math.floor(frame / 48));
  const span = (letters.length - 1) * 0.9;
  return (
    <group>
      {letters.map((letter, i) => (
        <mesh
          key={letter}
          position={[-span / 2 + i * 0.9, 0.45 + (i === hot ? 0.1 : 0), 0]}
          castShadow
        >
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial {...(i === hot ? white : mid)} />
        </mesh>
      ))}
    </group>
  );
};
