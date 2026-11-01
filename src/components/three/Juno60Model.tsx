import { useCurrentFrame } from "remotion";

const SECTIONS = 7;

export const Juno60Model: React.FC<{
  focus?: "body" | "dco" | "chorus" | "keys";
}> = ({ focus = "body" }) => {
  const frame = useCurrentFrame();
  const chorusOn = focus === "chorus" || Math.floor(frame / 12) % 2 === 0;

  return (
    <group rotation={[-0.38, -0.42, -0.12]} scale={focus === "keys" ? 1.05 : 1}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.4, 0.3, 2.55]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.18} />
      </mesh>
      <mesh position={[-3.82, 0.06, 0]} castShadow>
        <boxGeometry args={[0.22, 0.48, 2.55]} />
        <meshStandardMaterial color="#6E6E6E" roughness={0.8} />
      </mesh>
      <mesh position={[3.82, 0.06, 0]} castShadow>
        <boxGeometry args={[0.22, 0.48, 2.55]} />
        <meshStandardMaterial color="#6E6E6E" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.18, -0.15]} receiveShadow>
        <boxGeometry args={[7.1, 0.04, 1.55]} />
        <meshStandardMaterial color="#111111" roughness={0.6} />
      </mesh>

      {Array.from({ length: SECTIONS }).map((_, col) =>
        Array.from({ length: 5 }).map((_, row) => {
          const highlight = focus === "dco" && col === 2;
          return (
            <group
              key={`slider-${col}-${row}`}
              position={[-2.7 + col * 0.78, 0.24, -0.62 + row * 0.22]}
            >
              <mesh>
                <boxGeometry args={[0.06, 0.03, 0.2]} />
                <meshStandardMaterial color="#0A0A0A" />
              </mesh>
              <mesh position={[0, 0.04, highlight ? 0.04 : -0.02]}>
                <boxGeometry args={[0.12, 0.05, 0.07]} />
                <meshStandardMaterial
                  color="#E8E8E8"
                  emissive={highlight ? "#FFFFFF" : "#000000"}
                  emissiveIntensity={highlight ? 0.25 : 0}
                />
              </mesh>
            </group>
          );
        }),
      )}

      {[0, 1].map((i) => (
        <mesh
          key={`chorus-${i}`}
          position={[2.55 + i * 0.28, 0.26, -0.55]}
          castShadow
        >
          <boxGeometry args={[0.22, 0.06, 0.16]} />
          <meshStandardMaterial
            color={chorusOn && i === 0 ? "#FFFFFF" : "#BDBDBD"}
            emissive={chorusOn && i === 0 ? "#FFFFFF" : "#000000"}
            emissiveIntensity={chorusOn && i === 0 ? 0.45 : 0}
          />
        </mesh>
      ))}

      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`mem-${i}`} position={[2.2 + (i % 4) * 0.28, 0.26, 0.15 + Math.floor(i / 4) * 0.22]}>
          <boxGeometry args={[0.2, 0.05, 0.16]} />
          <meshStandardMaterial color="#D6D6D6" />
        </mesh>
      ))}

      {Array.from({ length: 36 }).map((_, i) => {
        const black = [1, 3, 6, 8, 10].includes(i % 12);
        const press = focus === "keys" && Math.floor(frame / 6) % 36 === i;
        return (
          <mesh
            key={`key-${i}`}
            position={[-3.15 + i * 0.175, press ? 0.12 : 0.14, 0.92]}
            castShadow
          >
            <boxGeometry args={[0.16, black ? 0.1 : 0.14, black ? 0.42 : 0.62]} />
            <meshStandardMaterial color={black ? "#111111" : "#F3F3F3"} />
          </mesh>
        );
      })}
    </group>
  );
};
