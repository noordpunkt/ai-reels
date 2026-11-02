import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FullLineCaptions } from "./components/FullLineCaptions";
import { VoiceHits } from "./components/VoiceHits";
import {
  CountMark,
  Field,
  FlickerWord,
  GiantLetters,
  LetterCells,
  SplitPair,
  SprayType,
  StackNo,
  StepRow,
  StrikeWord,
} from "./components/oil2d/Kinetic";
import { aceitesCaptions } from "./data/aceites-semilla";

export const AceitesSemilla: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [4290, 4314], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808", opacity: fade }}>
      <Field />
      <Sequence durationInFrames={225} name="grasas" layout="none">
        <GiantLetters word="grasas" size={148} />
      </Sequence>
      <Sequence from={225} durationInFrames={178} name="manteca" layout="none">
        <StrikeWord word="manteca" />
      </Sequence>
      <Sequence from={403} durationInFrames={236} name="recambio" layout="none">
        <SplitPair left="grasa" right="botella" />
      </Sequence>
      <Sequence from={639} durationInFrames={233} name="calidad" layout="none">
        <StepRow steps={["aceituna", "nata", "corto"]} />
      </Sequence>
      <Sequence from={872} durationInFrames={176} name="nada" layout="none">
        <GiantLetters word="nada" size={180} />
      </Sequence>
      <Sequence from={1048} durationInFrames={207} name="extraer" layout="none">
        <StepRow steps={["presión", "calor", "solvente"]} />
      </Sequence>
      <Sequence from={1255} durationInFrames={257} name="rbd" layout="none">
        <LetterCells letters={["R", "B", "D"]} />
      </Sequence>
      <Sequence from={1512} durationInFrames={237} name="240" layout="none">
        <CountMark to={240} unit="°" />
      </Sequence>
      <Sequence from={1749} durationInFrames={205} name="rancio" layout="none">
        <FlickerWord word="rancio" />
      </Sequence>
      <Sequence from={1954} durationInFrames={155} name="oscuro" layout="none">
        <SplitPair left="oscuro" right="claro" />
      </Sequence>
      <Sequence from={2109} durationInFrames={254} name="spray" layout="none">
        <SprayType word="spray" />
      </Sequence>
      <Sequence from={2363} durationInFrames={161} name="no-pasa" layout="none">
        <StackNo lines={["oliva no", "manteca no", "grasa buena no"]} />
      </Sequence>
      <Sequence from={2524} durationInFrames={246} name="inflaman" layout="none">
        <StepRow steps={["girasol", "soja", "maíz", "canola"]} />
      </Sequence>
      <Sequence from={2770} durationInFrames={243} name="margarina" layout="none">
        <StrikeWord word="margarina" />
      </Sequence>
      <Sequence from={3013} durationInFrames={210} name="papas" layout="none">
        <GiantLetters word="papas" size={150} />
      </Sequence>
      <Sequence from={3223} durationInFrames={169} name="oleico" layout="none">
        <GiantLetters word="alto oleico" size={92} />
      </Sequence>
      <Sequence from={3392} durationInFrames={210} name="virgen" layout="none">
        <GiantLetters word="virgen extra" size={88} />
      </Sequence>
      <Sequence from={3602} durationInFrames={235} name="etiqueta" layout="none">
        <StepRow steps={["virgen extra", "o mezclado"]} />
      </Sequence>
      <Sequence from={3837} durationInFrames={207} name="salud" layout="none">
        <StackNo lines={["menos industria", "más comida"]} />
      </Sequence>
      <Sequence from={4044} durationInFrames={270} name="cierre" layout="none">
        <GiantLetters word="virgen extra" size={88} />
      </Sequence>
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
