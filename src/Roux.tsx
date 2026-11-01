import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ManualDiagram } from "./components/ManualDiagram";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { StudioStage } from "./components/three/StudioStage";
import {
  EqualPartsBoard,
  FlourPour,
  LiquidPour,
  Saucepan,
  Whisk,
} from "./components/three/RouxModels";
import { rouxCaptions } from "./data/roux";

export const Roux: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [1530, 1550], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene =
    frame < 178
      ? "intro"
      : frame < 366
        ? "board"
        : frame < 576
          ? "whisk"
          : frame < 738
            ? "white"
            : frame < 878
              ? "blond"
              : frame < 1164
                ? "three"
                : frame < 1362
                  ? "liquid"
                  : "why";

  const whiskAngle = Math.sin(frame / 4) * 0.4;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", opacity: fade }}>
      <StudioStage
        camera={
          scene === "three"
            ? [0.25, 1.85, 6.4]
            : scene === "board"
              ? [1.55, 2.15, 3.5]
              : [2.35, 1.35, 3.45]
        }
        lookAt={scene === "three" ? [0, 0.35, 0] : [0.15, 0.4, 0]}
      >
        {scene === "intro" ? (
          <group>
            <Saucepan fill="#F4F1EA" hob />
            <Whisk standing />
          </group>
        ) : null}
        {scene === "board" ? <EqualPartsBoard /> : null}
        {scene === "whisk" ? (
          <group>
            <Saucepan fill="#EFEBE3" hob />
            <Whisk angle={whiskAngle} />
            <FlourPour />
          </group>
        ) : null}
        {scene === "white" ? <Saucepan fill="#F4F1EA" hob /> : null}
        {scene === "blond" ? <Saucepan fill="#C4A56A" hob /> : null}
        {scene === "three" ? (
          <group>
            <Saucepan position={[-2.25, 0, 0]} fill="#F4F1EA" scale={0.7} />
            <Saucepan position={[0, 0, 0]} fill="#C4A56A" scale={0.7} />
            <Saucepan position={[2.25, 0, 0]} fill="#1A1410" scale={0.7} />
          </group>
        ) : null}
        {scene === "liquid" || scene === "why" ? (
          <group>
            <Saucepan fill="#E6E2D6" hob />
            {scene === "liquid" ? <LiquidPour /> : <Whisk standing />}
          </group>
        ) : null}
      </StudioStage>
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 56,
          color: "#FFFFFF",
          fontSize: 18,
          letterSpacing: "0.28em",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
        }}
      >
        LE LAPIN BLEU
      </div>
      {scene === "why" || scene === "intro" ? (
        <ManualDiagram
          title="BUTTER  //  FLOUR  //  COOK  //  LIQUID"
          nodes={["BUTTER", "FLOUR", "COOK", "LIQUID"]}
        />
      ) : null}
      <StoryCaptions cues={rouxCaptions} />
      <VoiceHits cues={rouxCaptions} />
    </AbsoluteFill>
  );
};
