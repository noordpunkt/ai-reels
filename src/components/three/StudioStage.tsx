import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const StudioStage: React.FC<{
  camera: [number, number, number];
  lookAt?: [number, number, number];
  children: ReactNode;
}> = ({ camera, lookAt = [0, 0.25, 0], children }) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const spin = frame * 0.012;

  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        orthographic={false}
        gl={{ alpha: false, antialias: true }}
        shadows
        camera={{ fov: 28, position: camera, near: 0.1, far: 40 }}
        style={{ backgroundColor: "#000000" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 9, 20]} />
        <ambientLight intensity={0.18} />
        <directionalLight
          position={[4.2, 6.4, 3.6]}
          intensity={2.4}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 2.2, -3]} intensity={0.85} color="#E8EEFF" />
        <directionalLight position={[0, 1.4, 5]} intensity={0.28} color="#FFFFFF" />
        <CameraLook position={camera} lookAt={lookAt} />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.02, 0]}
          receiveShadow
        >
          <circleGeometry args={[8, 64]} />
          <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
        </mesh>
        <group rotation={[0, spin, 0]}>{children}</group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

const CameraLook: React.FC<{
  position: [number, number, number];
  lookAt: [number, number, number];
}> = ({ position, lookAt }) => {
  const frame = useCurrentFrame();
  const camera = useThree((state) => state.camera);
  const drift = Math.sin(frame * 0.01) * 0.05;
  camera.position.set(position[0] + drift, position[1], position[2]);
  camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  return null;
};
