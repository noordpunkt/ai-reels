import { useCurrentFrame } from "remotion";

const SMALL_KNOBS = [
  "TUNING",
  "CUT OFF",
  "RESO",
  "ENV MOD",
  "DECAY",
  "ACCENT",
];

export const TB303Model: React.FC<{
  dim?: boolean;
  twist?: boolean;
  focusSequencer?: boolean;
}> = ({ dim = false, twist = false, focusSequencer = false }) => {
  const frame = useCurrentFrame();
  const shade = dim ? 0.28 : 1;
  const spin = twist ? frame * 0.08 : 0;

  return (
    <group rotation={[-0.22, 0.15, 0]} scale={focusSequencer ? 1.15 : 1}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.95, 0.34, 1.72]} />
        <meshStandardMaterial
          color="#C8C8C8"
          metalness={0.42}
          roughness={0.32}
          opacity={shade}
          transparent={dim}
        />
      </mesh>
      <mesh position={[0, 0.2, 0.02]} castShadow>
        <boxGeometry args={[2.78, 0.05, 1.55]} />
        <meshStandardMaterial color="#141414" roughness={0.55} />
      </mesh>

      {SMALL_KNOBS.map((_, i) => {
        const active = twist && (i === 1 || i === 2);
        return (
          <group
            key={`small-${i}`}
            position={[-1.1 + i * 0.44, 0.3, -0.42]}
            rotation={[0, active ? spin : i * 0.4, 0]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[0.1, 0.11, 0.09, 22]} />
              <meshStandardMaterial
                color="#E8E8E8"
                metalness={0.35}
                roughness={0.28}
                emissive={active ? "#FFFFFF" : "#000000"}
                emissiveIntensity={active ? 0.35 : 0}
              />
            </mesh>
            <mesh position={[0, 0.055, 0.05]}>
              <boxGeometry args={[0.016, 0.016, 0.055]} />
              <meshStandardMaterial color="#111111" />
            </mesh>
          </group>
        );
      })}

      {[0, 1, 2, 3].map((i) => (
        <mesh key={`big-${i}`} position={[-0.9 + i * 0.6, 0.32, 0.02]} castShadow>
          <cylinderGeometry args={[0.16, 0.17, 0.12, 24]} />
          <meshStandardMaterial color="#DEDEDE" metalness={0.3} roughness={0.3} />
        </mesh>
      ))}

      {Array.from({ length: 13 }).map((_, i) => {
        const pulse = focusSequencer && Math.floor(frame / 5) % 13 === i;
        return (
          <mesh
            key={`key-${i}`}
            position={[-1.2 + i * 0.19, 0.26, 0.48]}
            castShadow
          >
            <boxGeometry args={[0.16, 0.05, 0.22]} />
            <meshStandardMaterial
              color={pulse ? "#FFFFFF" : "#D0D0D0"}
              emissive={pulse ? "#FFFFFF" : "#000000"}
              emissiveIntensity={pulse ? 0.55 : 0}
            />
          </mesh>
        );
      })}

      <mesh position={[-1.15, 0.24, 0.72]} castShadow>
        <boxGeometry args={[0.42, 0.07, 0.2]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      <mesh position={[1.15, 0.24, 0.72]} castShadow>
        <boxGeometry args={[0.42, 0.07, 0.2]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
    </group>
  );
};
