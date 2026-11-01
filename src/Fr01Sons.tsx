import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { paper } from "./components/french2d/Draw";
import {
  BaguetteScene,
  Field,
  LiaisonJoin,
  LouvreLight,
  MarketRow,
  NasalFace,
  NasalTrio,
  NasalWord,
  ParisMark,
  RLab,
  Stage,
  TasteStill,
  TitleWord,
  VinScene,
  VowelLab,
  WordTicker,
} from "./components/french2d/Vectors";
import { fr01Captions } from "./data/fr01-sons";

export const Fr01Sons: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [5368, 5400], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: paper, opacity: fade }}>
      <Field />
      <Sequence durationInFrames={469} name="bonjour" layout="none">
        <Stage>
          <TitleWord word="bonjour" note="01  ·  les sons" />
        </Stage>
      </Sequence>
      <Sequence from={469} durationInFrames={253} name="gout" layout="none">
        <Stage>
          <TasteStill />
        </Stage>
      </Sequence>
      <Sequence from={722} durationInFrames={697} name="voyelles" layout="none">
        <Stage>
          <VowelLab />
        </Stage>
      </Sequence>
      <Sequence from={1419} durationInFrames={236} name="nez" layout="none">
        <Stage>
          <NasalFace />
        </Stage>
      </Sequence>
      <Sequence from={1655} durationInFrames={256} name="pain" layout="none">
        <Stage>
          <NasalWord word="pain" />
        </Stage>
      </Sequence>
      <Sequence from={1911} durationInFrames={188} name="vin" layout="none">
        <Stage>
          <VinScene />
        </Stage>
      </Sequence>
      <Sequence from={2099} durationInFrames={176} name="un" layout="none">
        <Stage>
          <NasalWord word="un" />
        </Stage>
      </Sequence>
      <Sequence from={2275} durationInFrames={209} name="nasales" layout="none">
        <Stage>
          <NasalTrio />
        </Stage>
      </Sequence>
      <Sequence from={2484} durationInFrames={519} name="r" layout="none">
        <Stage>
          <RLab />
        </Stage>
      </Sequence>
      <Sequence from={3003} durationInFrames={229} name="liaison-1" layout="none">
        <Stage>
          <LiaisonJoin left="LES" right="AMIS" link="Z" />
        </Stage>
      </Sequence>
      <Sequence from={3232} durationInFrames={228} name="liaison-2" layout="none">
        <Stage>
          <LiaisonJoin left="VOUS" right="AVEZ" link="Z" />
        </Stage>
      </Sequence>
      <Sequence from={3460} durationInFrames={292} name="baguette" layout="none">
        <Stage>
          <BaguetteScene />
        </Stage>
      </Sequence>
      <Sequence from={3752} durationInFrames={258} name="marche" layout="none">
        <Stage>
          <MarketRow
            items={[
              { word: "beurre", icon: "butter" },
              { word: "fromage", icon: "cheese" },
              { word: "marché", icon: "basket" },
              { word: "tomate", icon: "tomato" },
            ]}
          />
        </Stage>
      </Sequence>
      <Sequence from={4010} durationInFrames={308} name="lumiere" layout="none">
        <Stage>
          <LouvreLight words={["Louvre", "Monet", "lumière"]} />
        </Stage>
      </Sequence>
      <Sequence from={4318} durationInFrames={233} name="paris" layout="none">
        <Stage>
          <ParisMark />
        </Stage>
      </Sequence>
      <Sequence from={4551} durationInFrames={571} name="repete" layout="none">
        <Stage>
          <WordTicker
            words={["pain", "vin", "un", "rue", "Paris", "baguette", "café"]}
          />
        </Stage>
      </Sequence>
      <Sequence from={5122} durationInFrames={278} name="bye" layout="none">
        <Stage>
          <TitleWord word="à bientôt" note="02  ·  le marché" size={120} />
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
        COURS DE FRANÇAIS
      </div>
      <StoryCaptions cues={fr01Captions} />
      <VoiceHits cues={fr01Captions} />
    </AbsoluteFill>
  );
};
