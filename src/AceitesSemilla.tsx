import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { paper } from "./components/french2d/Draw";
import { Field, Stage, TitleWord } from "./components/french2d/Vectors";
import {
  BottlePair,
  ButterPat,
  ClearBottle,
  ExtraVirgin,
  FryPot,
  HeatMark,
  OlivePress,
  PalateTest,
  PanFilm,
  PairSwap,
  ProcessRow,
  RbdMark,
  SeedNames,
  SprayCan,
} from "./components/seed2d/Vectors";
import { aceitesCaptions } from "./data/aceites-semilla";

export const AceitesSemilla: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [8068, 8100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: paper, opacity: fade }}>
      <Field />
      <Sequence durationInFrames={398} name="intro" layout="none">
        <Stage>
          <TitleWord word="grasas" note="0:00  ·  4:30" />
        </Stage>
      </Sequence>
      <Sequence from={398} durationInFrames={355} name="manteca" layout="none">
        <Stage>
          <div style={{ marginTop: 180 }}>
            <ButterPat />
          </div>
        </Stage>
      </Sequence>
      <Sequence from={753} durationInFrames={436} name="recambio" layout="none">
        <Stage>
          <PairSwap />
        </Stage>
      </Sequence>
      <Sequence from={1189} durationInFrames={405} name="oliva" layout="none">
        <Stage>
          <OlivePress yields />
        </Stage>
      </Sequence>
      <Sequence from={1594} durationInFrames={352} name="semilla" layout="none">
        <Stage>
          <OlivePress yields={false} />
        </Stage>
      </Sequence>
      <Sequence from={1946} durationInFrames={403} name="extraer" layout="none">
        <Stage>
          <ProcessRow
            steps={["presión", "calor", "solvente"]}
            active={Math.min(2, Math.floor((frame - 1946) / 90))}
          />
        </Stage>
      </Sequence>
      <Sequence from={2349} durationInFrames={467} name="rbd" layout="none">
        <Stage>
          <RbdMark />
        </Stage>
      </Sequence>
      <Sequence from={2816} durationInFrames={437} name="240" layout="none">
        <Stage>
          <HeatMark />
        </Stage>
      </Sequence>
      <Sequence from={3253} durationInFrames={392} name="luz" layout="none">
        <Stage>
          <ClearBottle fill={0.8} />
        </Stage>
      </Sequence>
      <Sequence from={3645} durationInFrames={338} name="oscuro" layout="none">
        <Stage>
          <BottlePair />
        </Stage>
      </Sequence>
      <Sequence from={3983} durationInFrames={464} name="spray" layout="none">
        <Stage>
          <SprayCan />
        </Stage>
      </Sequence>
      <Sequence from={4447} durationInFrames={324} name="no-pasa" layout="none">
        <Stage>
          <PanFilm />
        </Stage>
      </Sequence>
      <Sequence from={4771} durationInFrames={427} name="inflaman" layout="none">
        <Stage>
          <SeedNames />
        </Stage>
      </Sequence>
      <Sequence from={5198} durationInFrames={437} name="margarina" layout="none">
        <Stage>
          <PalateTest />
        </Stage>
      </Sequence>
      <Sequence from={5635} durationInFrames={367} name="papas" layout="none">
        <Stage>
          <FryPot />
        </Stage>
      </Sequence>
      <Sequence from={6002} durationInFrames={391} name="oleico" layout="none">
        <Stage>
          <TitleWord word="alto oleico" note="solo dura más" size={110} />
        </Stage>
      </Sequence>
      <Sequence from={6393} durationInFrames={395} name="virgen" layout="none">
        <Stage>
          <ExtraVirgin />
        </Stage>
      </Sequence>
      <Sequence from={6788} durationInFrames={423} name="etiqueta" layout="none">
        <Stage>
          <TitleWord word="virgen extra" note="lee la etiqueta" size={110} />
        </Stage>
      </Sequence>
      <Sequence from={7211} durationInFrames={434} name="salud" layout="none">
        <Stage>
          <TitleWord word="más comida" note="menos industria" size={120} />
        </Stage>
      </Sequence>
      <Sequence from={7645} durationInFrames={455} name="cierre" layout="none">
        <Stage>
          <TitleWord word="virgen extra" note="0:00  ·  4:30" size={120} />
        </Stage>
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
      <StoryCaptions cues={aceitesCaptions} />
      <VoiceHits cues={aceitesCaptions} />
    </AbsoluteFill>
  );
};
