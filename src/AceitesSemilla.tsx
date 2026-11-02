import "./loadApercu";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FullLineCaptions } from "./components/FullLineCaptions";
import { VoiceHits } from "./components/VoiceHits";
import {
  CountMark,
  FlickerWord,
  GiantLetters,
  LetterCells,
  MONO,
  PerspectiveStage,
  SplitPair,
  SprayType,
  StackNo,
  StepRow,
  StrikeWord,
} from "./components/oil2d/Kinetic";
import {
  BordierGrid,
  BordierWrap,
  CarapelliBottle,
  PairProducts,
} from "./components/oil2d/Products";
import { aceitesCaptions } from "./data/aceites-semilla";

export const AceitesSemilla: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [4290, 4314], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scene = aceitesCaptions.reduce(
    (index, cue, i) => (frame >= cue.fromFrame ? i : index),
    0,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808", opacity: fade }}>
      <PerspectiveStage>
        {scene === 0 ? <PairProducts /> : null}
        {scene === 1 ? <BordierWrap scale={1.12} /> : null}
        {scene === 2 ? <SplitPair left="grasa" right="botella" /> : null}
        {scene === 3 ? <BordierGrid /> : null}
        {scene === 4 ? <GiantLetters word="nada" size={128} /> : null}
        {scene === 5 ? (
          <StepRow steps={["presión", "calor", "solvente"]} />
        ) : null}
        {scene === 6 ? <LetterCells letters={["R", "B", "D"]} /> : null}
        {scene === 7 ? <CountMark to={240} unit="°" /> : null}
        {scene === 8 ? <FlickerWord word="rancio" /> : null}
        {scene === 9 ? <CarapelliBottle scale={1.05} /> : null}
        {scene === 10 ? <SprayType word="spray" /> : null}
        {scene === 11 ? <PairProducts /> : null}
        {scene === 12 ? (
          <StepRow steps={["girasol", "soja", "maíz", "canola"]} />
        ) : null}
        {scene === 13 ? <StrikeWord word="margarina" /> : null}
        {scene === 14 ? <GiantLetters word="papas" size={118} /> : null}
        {scene === 15 ? <GiantLetters word="alto oleico" size={72} /> : null}
        {scene === 16 ? <CarapelliBottle scale={1.08} /> : null}
        {scene === 17 ? <CarapelliBottle scale={1.08} /> : null}
        {scene === 18 ? (
          <StackNo lines={["menos industria", "más comida"]} />
        ) : null}
        {scene === 19 ? <CarapelliBottle scale={1.08} /> : null}
      </PerspectiveStage>
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 56,
          color: "rgba(255,255,255,0.55)",
          fontSize: 15,
          letterSpacing: "0.22em",
          fontFamily: MONO,
        }}
      >
        ACEITES DE SEMILLA
      </div>
      <FullLineCaptions cues={aceitesCaptions} />
      <VoiceHits cues={aceitesCaptions} />
    </AbsoluteFill>
  );
};
