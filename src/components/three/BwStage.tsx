import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { ReactNode } from "react";

export const BwStage: React.FC<{
  camera: [number, number, number];
  lookAt?: [number, number, number];
  year?: string;
  yearCaption?: string;
  children: ReactNode;
}> = ({ camera, lookAt = [0, 0.1, 0], year, yearCaption, children }) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        orthographic={false}
        gl={{ alpha: true, antialias: true }}
        shadows
        camera={{ fov: 28, position: camera, near: 0.1, far: 40 }}
        style={{ backgroundColor: "transparent" }}
      >
        <color attach="background" args={["#080808"]} />
        <fog attach="fog" args={["#080808", 6, 16]} />
        <ambientLight intensity={0.22} />
        <directionalLight
          position={[5, 8, 4]}
          intensity={2.1}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[0, 2.2, 1.4]} intensity={0.7} color="#FFFFFF" />
        <CameraLook position={camera} lookAt={lookAt} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.28, 0]} receiveShadow>
          <circleGeometry args={[9, 48]} />
          <meshStandardMaterial color="#0A0A0A" roughness={1} />
        </mesh>
        {children}
      </ThreeCanvas>
      {year ? <YearStamp year={year} caption={yearCaption} /> : null}
    </AbsoluteFill>
  );
};

const CameraLook: React.FC<{
  position: [number, number, number];
  lookAt: [number, number, number];
}> = ({ position, lookAt }) => {
  const frame = useCurrentFrame();
  const camera = useThree((state) => state.camera);
  const drift = Math.sin(frame * 0.01) * 0.12;
  camera.position.set(position[0] + drift, position[1], position[2]);
  camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  return null;
};

const YearStamp: React.FC<{ year: string; caption?: string }> = ({
  year,
  caption,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "18%",
        textAlign: "center",
        opacity: enter,
        pointerEvents: "none",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
      }}
    >
      <div
        style={{
          color: "#F2F2F2",
          fontSize: 120,
          fontWeight: 730,
          letterSpacing: "-0.06em",
        }}
      >
        {year}
      </div>
      {caption ? (
        <div style={{ marginTop: 12, color: "rgba(242,242,242,0.7)", fontSize: 22 }}>
          {caption}
        </div>
      ) : null}
    </div>
  );
};
