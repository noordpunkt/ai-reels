const grey = {
  color: "#D8D8D8",
  metalness: 0.18,
  roughness: 0.42,
} as const;

const dark = {
  color: "#2A2A2A",
  metalness: 0.35,
  roughness: 0.55,
} as const;

export const Baguette: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0.12, 0], rotation = [0, 0.35, Math.PI / 2] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.1, 2.6, 18]} />
        <meshStandardMaterial {...grey} roughness={0.7} />
      </mesh>
      {[ -0.6, 0, 0.6 ].map((z) => (
        <mesh key={z} position={[0.08, 0.02, z]} rotation={[0.2, 0, 0.3]}>
          <boxGeometry args={[0.02, 0.03, 0.28]} />
          <meshStandardMaterial color="#F2F2F2" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

export const WineGlass: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
        <meshStandardMaterial {...grey} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.44, 12]} />
        <meshStandardMaterial {...grey} metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.18, 0.08, 0.32, 24]} />
        <meshStandardMaterial
          color="#BDBDBD"
          metalness={0.15}
          roughness={0.18}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.12, 20]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.45} />
      </mesh>
    </group>
  );
};

export const MarketCrate: React.FC = () => {
  return (
    <group>
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.32, 1.4]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      <mesh position={[-0.55, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.22, 18, 14]} />
        <meshStandardMaterial {...grey} />
      </mesh>
      <mesh position={[0, 0.4, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 18, 14]} />
        <meshStandardMaterial color="#C8C8C8" roughness={0.6} />
      </mesh>
      <mesh position={[0.55, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.18, 18, 14]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.55} />
      </mesh>
    </group>
  );
};

export const ButterBlock: React.FC<{
  position?: [number, number, number];
}> = ({ position = [0, 0.2, 0] }) => {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.7, 0.36, 0.7]} />
      <meshStandardMaterial color="#F0F0F0" roughness={0.62} />
    </mesh>
  );
};
