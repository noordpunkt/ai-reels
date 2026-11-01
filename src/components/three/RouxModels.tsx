const blackBody = {
  color: "#111111",
  metalness: 0.72,
  roughness: 0.38,
} as const;

const silver = {
  color: "#D4D4D4",
  metalness: 0.95,
  roughness: 0.18,
} as const;

export const Hob: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, 0],
}) => {
  return (
    <group position={position}>
      <mesh position={[0, -0.12, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.05, 1.08, 0.12, 64]} />
        <meshStandardMaterial {...blackBody} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[1.02, 0.018, 12, 64]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <torusGeometry args={[0.58, 0.012, 10, 48]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
};

export const Saucepan: React.FC<{
  position?: [number, number, number];
  fill?: string;
  scale?: number;
  hob?: boolean;
}> = ({ position = [0, 0, 0], fill = "#F4F4F0", scale = 1, hob = false }) => {
  return (
    <group position={position} scale={scale} rotation={[0, -0.55, 0]}>
      {hob ? <Hob /> : null}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.58, 0.82, 64]} />
        <meshStandardMaterial {...blackBody} />
      </mesh>
      <mesh position={[0, 0.835, 0]}>
        <cylinderGeometry args={[0.79, 0.79, 0.022, 64]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.69, 0.69, 0.12, 48]} />
        <meshStandardMaterial color={fill} roughness={0.82} metalness={0.08} />
      </mesh>
      <mesh
        position={[1.22, 0.58, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.024, 0.028, 1.05, 16]} />
        <meshStandardMaterial {...blackBody} />
      </mesh>
      <mesh position={[1.76, 0.58, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.055, 0.014, 10, 24]} />
        <meshStandardMaterial {...silver} />
      </mesh>
    </group>
  );
};

export const EqualPartsBoard: React.FC = () => {
  return (
    <group rotation={[0, 0.4, 0]}>
      <mesh position={[0, 0.06, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.5, 0.12, 2.3]} />
        <meshStandardMaterial {...blackBody} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[3.48, 0.01, 2.28]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.55} metalness={0.4} />
      </mesh>
      <mesh position={[-0.9, 0.38, 0.05]} castShadow>
        <boxGeometry args={[0.74, 0.48, 0.74]} />
        <meshStandardMaterial color="#F2EFE8" roughness={0.62} />
      </mesh>
      <mesh position={[0.82, 0.13, 0.08]} castShadow>
        <sphereGeometry args={[0.46, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#F7F7F4" roughness={0.96} />
      </mesh>
      <group position={[0.08, 0.2, 0.52]} rotation={[0.1, 0.6, 0.08]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry
            args={[0.15, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial {...silver} />
        </mesh>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.68, 12]} />
          <meshStandardMaterial {...blackBody} />
        </mesh>
        <mesh position={[0.74, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.042, 0.012, 8, 16]} />
          <meshStandardMaterial {...silver} />
        </mesh>
      </group>
    </group>
  );
};

export const Whisk: React.FC<{
  angle?: number;
  standing?: boolean;
}> = ({ angle = 0, standing = false }) => {
  return (
    <group
      rotation={standing ? [0.16, 0.18, 0.04] : [0.42, 0.08, angle]}
      position={standing ? [0.06, 1.12, 0.05] : [0.2, 0.95, 0.14]}
    >
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.82, 12]} />
        <meshStandardMaterial {...blackBody} />
      </mesh>
      <mesh position={[0, 0.54, 0]}>
        <sphereGeometry args={[0.038, 12, 10]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      {[0, 0.52, 1.05, 1.57].map((r) => (
        <mesh key={r} position={[0, -0.44, 0]} rotation={[0.72, r, 0]}>
          <torusGeometry args={[0.22, 0.009, 8, 28]} />
          <meshStandardMaterial {...silver} />
        </mesh>
      ))}
    </group>
  );
};

export const FlourPour: React.FC = () => {
  return (
    <group position={[0.82, 1.72, 0.12]} rotation={[0, 0, -0.85]}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.16, 0.24, 28]} />
        <meshStandardMaterial {...blackBody} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <torusGeometry args={[0.185, 0.014, 8, 28]} />
        <meshStandardMaterial {...silver} />
      </mesh>
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.03, 0.065, 0.9, 10]} />
        <meshStandardMaterial color="#F5F3ED" roughness={1} />
      </mesh>
    </group>
  );
};

export const LiquidPour: React.FC = () => {
  return (
    <mesh position={[0.12, 1.22, 0.04]}>
      <cylinderGeometry args={[0.04, 0.07, 0.95, 16]} />
      <meshStandardMaterial color="#E4E0D4" transparent opacity={0.72} />
    </mesh>
  );
};
