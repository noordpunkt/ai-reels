import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const PaperStage: React.FC<{
  camera: [number, number, number];
  lookAt?: [number, number, number];
  children: ReactNode;
}> = ({ camera, lookAt = [0, 0.1, 0], children }) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        orthographic={false}
        gl={{ alpha: true, antialias: true }}
        shadows
        camera={{ fov: 30, position: camera, near: 0.1, far: 40 }}
        style={{ backgroundColor: "transparent" }}
      >
        <color attach="background" args={["#F3F1EC"]} />
        <fog attach="fog" args={["#F3F1EC", 8, 18]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 9, 5]}
          intensity={1.6}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#FFFFFF" />
        <CameraLook position={camera} lookAt={lookAt} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <circleGeometry args={[10, 48]} />
          <meshStandardMaterial color="#EDEAE3" roughness={1} />
        </mesh>
        {children}
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
  const drift = Math.sin(frame * 0.012) * 0.08;
  camera.position.set(position[0] + drift, position[1], position[2]);
  camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  return null;
};
