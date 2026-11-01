import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FrenchLetters } from "./components/FrenchLetters";
import { ManualDiagram } from "./components/ManualDiagram";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { BwStage } from "./components/three/BwStage";
import {
  Baguette,
  ButterBlock,
  MarketCrate,
  WineGlass,
} from "./components/three/FrenchKitchen";
import { fr01Captions } from "./data/fr01-sons";

export const Fr01Sons: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [5368, 5400], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene =
    frame < 469
      ? "intro"
      : frame < 722
        ? "taste"
        : frame < 1419
          ? "vowels"
          : frame < 2484
            ? "nasals"
            : frame < 3003
              ? "r"
              : frame < 3460
                ? "liaison"
                : frame < 4010
                  ? "market"
                  : frame < 4551
                    ? "art"
                    : "repeat";

  const vowel =
    frame < 850 ? "A" : frame < 980 ? "É" : frame < 1100 ? "I" : frame < 1220 ? "O" : "U";

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808", opacity: fade }}>
      <BwStage
        camera={
          scene === "vowels"
            ? [0.2, 1.8, 5.2]
            : scene === "market"
              ? [1.8, 2.2, 4.2]
              : [2.6, 1.7, 4.4]
        }
        lookAt={[0, 0.35, 0]}
        year={scene === "intro" ? "01" : undefined}
        yearCaption={scene === "intro" ? "les sons" : undefined}
      >
        {scene === "intro" || scene === "taste" || scene === "repeat" ? (
          <group>
            <Baguette position={[-0.35, 0.18, 0.1]} />
            <WineGlass position={[0.95, 0, -0.1]} />
          </group>
        ) : null}
        {scene === "nasals" ? (
          <group>
            <Baguette position={[-0.9, 0.16, 0]} />
            <WineGlass position={[0.35, 0, 0]} />
            <ButterBlock position={[1.25, 0.22, 0.1]} />
          </group>
        ) : null}
        {scene === "r" || scene === "art" ? (
          <group>
            <mesh position={[-0.7, 0.7, 0]} castShadow>
              <boxGeometry args={[0.22, 1.4, 0.22]} />
              <meshStandardMaterial color="#D0D0D0" roughness={0.4} />
            </mesh>
            <mesh position={[0.7, 0.7, 0]} castShadow>
              <boxGeometry args={[0.22, 1.4, 0.22]} />
              <meshStandardMaterial color="#D0D0D0" roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.45, 0]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.72, 0.08, 12, 28, Math.PI]} />
              <meshStandardMaterial color="#E8E8E8" roughness={0.32} />
            </mesh>
          </group>
        ) : null}
        {scene === "market" ? (
          <group>
            <MarketCrate />
            <Baguette position={[0.1, 0.58, 0.15]} />
          </group>
        ) : null}
        {scene === "vowels" || scene === "liaison" ? (
          <WineGlass position={[0, 0, 0]} />
        ) : null}
      </BwStage>
      {scene === "vowels" ? (
        <FrenchLetters letters={["A", "É", "I", "O", "U"]} active={vowel} />
      ) : null}
      {scene === "liaison" ? (
        <ManualDiagram title="FRANÇAIS  ·  LIAISON" nodes={["LES", "AMIS", "VOUS", "AVEZ"]} />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 56,
          color: "rgba(255,255,255,0.62)",
          fontSize: 16,
          letterSpacing: "0.26em",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", sans-serif',
        }}
      >
        COURS DE FRANÇAIS
      </div>
      <StoryCaptions cues={fr01Captions} />
      <VoiceHits cues={fr01Captions} />
    </AbsoluteFill>
  );
};
