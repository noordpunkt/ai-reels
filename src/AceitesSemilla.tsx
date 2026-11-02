import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FullLineCaptions } from "./components/FullLineCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { OilStage } from "./components/three/OilStage";
import {
  ButterBlock,
  FryPot3D,
  FryingPan,
  HeatColumn,
  LetterBlocks,
  OilBottle,
  OliveFruit,
  Press,
  SeedRow,
  SprayBottle,
  SunflowerSeed,
} from "./components/three/OilModels";
import { aceitesCaptions } from "./data/aceites-semilla";

export const AceitesSemilla: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [8068, 8100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene = aceitesCaptions.reduce(
    (index, cue, i) => (frame >= cue.fromFrame ? i : index),
    0,
  );
  const current = aceitesCaptions[scene];
  const stamp = current?.small ?? "";
  const stampIn = interpolate(
    frame - (current?.fromFrame ?? 0),
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const framing = frameFor(scene);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0B", opacity: fade }}>
      <OilStage camera={framing.camera} lookAt={framing.lookAt}>
        {scene === 0 ? (
          <group>
            <group position={[0, 0, 0.2]} scale={0.9}>
              <ButterBlock />
            </group>
            <OilBottle x={-0.98} />
            <OilBottle x={0.98} darkGlass />
          </group>
        ) : null}
        {scene === 1 ? <ButterBlock crossed /> : null}
        {scene === 2 ? <OilBottle /> : null}
        {scene === 3 ? (
          <group>
            <OliveFruit />
            <group position={[1.35, 0, 0]}>
              <Press dripping />
            </group>
          </group>
        ) : null}
        {scene === 4 ? (
          <group>
            <SunflowerSeed />
            <group position={[1.35, 0, 0]}>
              <Press />
            </group>
          </group>
        ) : null}
        {scene === 5 ? (
          <group>
            <Press dripping />
            <group position={[1.2, 0, 0]}>
              <HeatColumn />
            </group>
          </group>
        ) : null}
        {scene === 6 ? <LetterBlocks letters={["R", "B", "D"]} /> : null}
        {scene === 7 ? <HeatColumn /> : null}
        {scene === 8 ? <OilBottle /> : null}
        {scene === 9 ? (
          <group>
            <OilBottle x={-0.88} darkGlass />
            <OilBottle x={0.88} />
          </group>
        ) : null}
        {scene === 10 ? <SprayBottle /> : null}
        {scene === 11 ? <FryingPan /> : null}
        {scene === 12 ? <SeedRow /> : null}
        {scene === 13 ? <ButterBlock crossed /> : null}
        {scene === 14 ? <FryPot3D /> : null}
        {scene === 15 ? <FryingPan film /> : null}
        {scene === 16 || scene === 17 || scene === 19 ? (
          <OilBottle darkGlass />
        ) : null}
        {scene === 18 ? <OliveFruit /> : null}
      </OilStage>
      <Stamp word={stamp} enter={stampIn} />
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 56,
          color: "rgba(255,255,255,0.55)",
          fontSize: 16,
          letterSpacing: "0.26em",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
        }}
      >
        ACEITES DE SEMILLA
      </div>
      <FullLineCaptions cues={aceitesCaptions} />
      <VoiceHits cues={aceitesCaptions} />
    </AbsoluteFill>
  );
};

const frameFor = (
  scene: number,
): { camera: [number, number, number]; lookAt: [number, number, number] } => {
  if (scene === 0 || scene === 9) {
    return { camera: [0.12, 1.75, 5.7], lookAt: [0, 0.6, 0] };
  }
  if (scene === 6 || scene === 12) {
    return { camera: [0.2, 1.55, 4.8], lookAt: [0, 0.4, 0] };
  }
  if (scene === 8 || scene === 10 || scene === 16 || scene === 17 || scene === 19) {
    return { camera: [1.35, 1.45, 4.15], lookAt: [0, 0.85, 0] };
  }
  if (scene === 2) {
    return { camera: [1.35, 1.45, 4.15], lookAt: [0, 0.85, 0] };
  }
  return { camera: [1.55, 1.55, 4.35], lookAt: [0, 0.4, 0] };
};

const Stamp: React.FC<{ word: string; enter: number }> = ({ word, enter }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: "9%",
        textAlign: "center",
        pointerEvents: "none",
        opacity: 0.92,
        transform: `translateY(${(1 - enter) * 10}px)`,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
      }}
    >
      <div
        style={{
          color: "#F4F4F4",
          fontSize: word.length > 10 ? 72 : 108,
          fontWeight: 730,
          letterSpacing: "-0.06em",
          textShadow: "0 8px 40px rgba(0,0,0,0.65)",
        }}
      >
        {word}
      </div>
    </div>
  );
};
