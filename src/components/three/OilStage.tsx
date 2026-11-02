import { ContactShadows } from "@react-three/drei";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const OilStage: React.FC<{
  camera?: [number, number, number];
  lookAt?: [number, number, number];
  children: ReactNode;
}> = ({ camera = [1.7, 2.05, 5.9], lookAt = [0, -0.45, 0], children }) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        orthographic={false}
        gl={{ alpha: false, antialias: true }}
        shadows
        camera={{ fov: 34, position: camera, near: 0.1, far: 40 }}
        style={{ backgroundColor: "#0B0B0B" }}
      >
        <color attach="background" args={["#0B0B0B"]} />
        <hemisphereLight args={["#FFFFFF", "#3A3A3A", 0.85]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4.5, 7, 5]}
          intensity={3.4}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2.4, 2]} intensity={1.1} color="#F2F2F2" />
        <pointLight position={[0, 2.8, 1.6]} intensity={1.2} color="#FFFFFF" />
        <CameraLook position={camera} lookAt={lookAt} />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <circleGeometry args={[8, 64]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.9} metalness={0} />
        </mesh>
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.55}
          scale={10}
          blur={2.4}
          far={4}
          color="#000000"
        />
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
