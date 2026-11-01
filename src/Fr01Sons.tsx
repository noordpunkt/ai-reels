import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { StoryCaptions } from "./components/StoryCaptions";
import { VoiceHits } from "./components/VoiceHits";
import {
  BaguetteMark,
  BreathPath,
  DotField,
  ParisSkyline,
  RepeatRibbon,
  ThroatR,
  WineMark,
} from "./components/french2d/Marks";
import {
  GiantWord,
  SyllableSplit,
  VowelRow,
  WordStack,
} from "./components/french2d/TypePlate";
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
          : frame < 1655
            ? "nasalIntro"
            : frame < 1911
              ? "pain"
              : frame < 2099
                ? "vin"
                : frame < 2275
                  ? "un"
                  : frame < 2484
                    ? "nasalRow"
                    : frame < 3003
                      ? "r"
                      : frame < 3460
                        ? "liaison"
                        : frame < 3752
                          ? "baguette"
                          : frame < 4010
                            ? "market"
                            : frame < 4318
                              ? "art"
                              : frame < 4551
                                ? "paris"
                                : frame < 5122
                                  ? "repeat"
                                  : "bye";

  const vowel =
    frame < 850 ? "A" : frame < 980 ? "É" : frame < 1100 ? "I" : frame < 1220 ? "O" : "U";

  const marketPulse =
    frame < 3840 ? "beurre" : frame < 3900 ? "fromage" : frame < 3960 ? "marché" : "tomate";

  const artPulse =
    frame < 4100 ? "Louvre" : frame < 4180 ? "Monet" : "lumière";

  return (
    <AbsoluteFill style={{ backgroundColor: "#080808", opacity: fade }}>
      <DotField />
      {scene === "intro" ? <GiantWord word="bonjour" sub="01  ·  les sons" size={150} /> : null}
      {scene === "taste" ? (
        <>
          <GiantWord word="les sons" sub="le français se goûte" />
          <BaguetteMark />
          <WineMark />
        </>
      ) : null}
      {scene === "vowels" ? (
        <VowelRow letters={["A", "É", "I", "O", "U"]} active={vowel} />
      ) : null}
      {scene === "nasalIntro" ? (
        <>
          <GiantWord word="nasales" sub="par le nez" size={130} />
          <BreathPath />
        </>
      ) : null}
      {scene === "pain" ? <GiantWord word="pain" sub="p  ·  ɛ̃" size={200} /> : null}
      {scene === "vin" ? <GiantWord word="vin" sub="v  ·  ɛ̃" size={200} /> : null}
      {scene === "un" ? <GiantWord word="un" sub="œ̃" size={220} /> : null}
      {scene === "nasalRow" ? (
        <VowelRow letters={["pain", "vin", "un"]} active="vin" />
      ) : null}
      {scene === "r" ? (
        <>
          <ThroatR />
          <WordStack words={["rue", "Paris", "roux"]} pulse={frame > 2860 ? "roux" : "rue"} />
        </>
      ) : null}
      {scene === "liaison" ? (
        <SyllableSplit
          parts={frame < 3232 ? ["LES", "AMIS"] : ["VOUS", "AVEZ"]}
          glue
        />
      ) : null}
      {scene === "baguette" ? (
        <>
          <SyllableSplit parts={["BA", "GUETTE"]} />
          <BaguetteMark />
        </>
      ) : null}
      {scene === "market" ? (
        <WordStack
          words={["beurre", "fromage", "marché", "tomate"]}
          pulse={marketPulse}
        />
      ) : null}
      {scene === "art" ? (
        <WordStack words={["Louvre", "Monet", "lumière"]} pulse={artPulse} />
      ) : null}
      {scene === "paris" ? (
        <>
          <GiantWord word="Paris" sub="Pa-ri  ·  le s se tait" />
          <ParisSkyline />
        </>
      ) : null}
      {scene === "repeat" ? (
        <RepeatRibbon
          words={["pain", "vin", "un", "rue", "Paris", "baguette", "café"]}
        />
      ) : null}
      {scene === "bye" ? (
        <GiantWord word="à bientôt" sub="02  ·  le marché" size={120} />
      ) : null}
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
