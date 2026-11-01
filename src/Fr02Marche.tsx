import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import { paper } from "./components/french2d/Draw";
import {
  BaguetteLoaf,
  BaguetteScene,
  CoinEuro,
  Field,
  FruitRow,
  MarketRow,
  NumberStrip,
  PhraseStack,
  Stage,
  StallAwning,
  TitleWord,
  VinScene,
  WordTicker,
} from "./components/french2d/Vectors";
import { fr02Captions } from "./data/fr02-marche";

const GOODS = [
  { word: "beurre", icon: "butter" as const },
  { word: "fromage", icon: "cheese" as const },
  { word: "marché", icon: "basket" as const },
  { word: "tomate", icon: "tomato" as const },
];

export const Fr02Marche: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [5368, 5400], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: paper, opacity: fade }}>
      <Field />
      <Sequence durationInFrames={318} name="marche" layout="none">
        <Stage>
          <StallAwning />
          <TitleWord word="le marché" note="02  ·  cuisine" size={140} />
        </Stage>
      </Sequence>
      <Sequence from={318} durationInFrames={296} name="bonjour" layout="none">
        <Stage>
          <PhraseStack phrases={["bonjour", "bonjour monsieur", "bonjour madame"]} />
        </Stage>
      </Sequence>
      <Sequence from={614} durationInFrames={290} name="formules" layout="none">
        <Stage>
          <PhraseStack phrases={["s'il vous plaît", "merci", "voilà"]} />
        </Stage>
      </Sequence>
      <Sequence from={904} durationInFrames={308} name="baguette" layout="none">
        <Stage>
          <BaguetteScene />
        </Stage>
      </Sequence>
      <Sequence from={1212} durationInFrames={255} name="fromage" layout="none">
        <Stage>
          <MarketRow items={GOODS} pulse="fromage" />
        </Stage>
      </Sequence>
      <Sequence from={1467} durationInFrames={233} name="beurre" layout="none">
        <Stage>
          <MarketRow items={GOODS} pulse="beurre" />
        </Stage>
      </Sequence>
      <Sequence from={1700} durationInFrames={249} name="tomate" layout="none">
        <Stage>
          <MarketRow items={GOODS} pulse="tomate" />
        </Stage>
      </Sequence>
      <Sequence from={1949} durationInFrames={241} name="vin" layout="none">
        <Stage>
          <VinScene />
        </Stage>
      </Sequence>
      <Sequence from={2190} durationInFrames={260} name="euros" layout="none">
        <Stage>
          <CoinEuro />
        </Stage>
      </Sequence>
      <Sequence from={2450} durationInFrames={237} name="prends" layout="none">
        <Stage>
          <TitleWord word="je prends" note="c'est parfait" size={120} />
        </Stage>
      </Sequence>
      <Sequence from={2687} durationInFrames={256} name="fruits" layout="none">
        <Stage>
          <FruitRow />
        </Stage>
      </Sequence>
      <Sequence from={2943} durationInFrames={264} name="sac" layout="none">
        <Stage>
          <WordTicker words={["pain", "fromage", "vin", "beurre", "tomate"]} />
        </Stage>
      </Sequence>
      <Sequence from={3207} durationInFrames={296} name="nombres" layout="none">
        <Stage>
          <NumberStrip values={["1", "2", "3", "4", "5"]} />
        </Stage>
      </Sequence>
      <Sequence from={3503} durationInFrames={279} name="merci" layout="none">
        <Stage>
          <PhraseStack phrases={["bonjour", "merci", "à demain"]} />
        </Stage>
      </Sequence>
      <Sequence from={3782} durationInFrames={287} name="dialogue" layout="none">
        <Stage>
          <BaguetteLoaf />
          <TitleWord word="s'il vous plaît" size={88} />
        </Stage>
      </Sequence>
      <Sequence from={4069} durationInFrames={293} name="repete" layout="none">
        <Stage>
          <MarketRow items={GOODS} />
        </Stage>
      </Sequence>
      <Sequence from={4362} durationInFrames={251} name="maison" layout="none">
        <Stage>
          <StallAwning />
          <TitleWord word="le sac" note="à la maison" size={140} />
        </Stage>
      </Sequence>
      <Sequence from={4613} durationInFrames={305} name="encore" layout="none">
        <Stage>
          <TitleWord word="baguette" note="trois fois" />
        </Stage>
      </Sequence>
      <Sequence from={4918} durationInFrames={228} name="pain" layout="none">
        <Stage>
          <BaguetteLoaf />
          <TitleWord word="le pain" size={120} />
        </Stage>
      </Sequence>
      <Sequence from={5146} durationInFrames={254} name="bye" layout="none">
        <Stage>
          <TitleWord word="à bientôt" note="03  ·  paris" size={120} />
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
      <StoryCaptions cues={fr02Captions} />
      <VoiceHits cues={fr02Captions} />
    </AbsoluteFill>
  );
};
