import type { OverlayCue } from "./types";

export const JUNO60_DURATION_FRAMES = 913;

export const juno60Captions: OverlayCue[] = [
  {
    fromFrame: 0,
    durationInFrames: 166,
    small: "Si el Jupiter-8 era inalcanzable, esto era para el resto.",
    big: "JUNO-60",
    highlight: "JUNO",
    voice: "audio/vo-juno-1.wav",
  },
  {
    fromFrame: 166,
    durationInFrames: 143,
    small: "Salió en 1982. El nombre es la esposa de Júpiter.",
    big: "1982",
    voice: "audio/vo-juno-2.wav",
  },
  {
    fromFrame: 309,
    durationInFrames: 107,
    small: "El oscilador es analógico, pero no se desafina.",
    big: "DCO",
    voice: "audio/vo-juno-3.wav",
  },
  {
    fromFrame: 416,
    durationInFrames: 109,
    small: "Seis voces. Un oscilador, un sub y un chorus.",
    big: "6 voces",
    highlight: "6",
    voice: "audio/vo-juno-4.wav",
  },
  {
    fromFrame: 525,
    durationInFrames: 115,
    small: "El chorus I y II es sucio, ruidoso y adictivo.",
    big: "CHORUS",
    highlight: "CHORUS",
    voice: "audio/vo-juno-5.wav",
  },
  {
    fromFrame: 640,
    durationInFrames: 114,
    small: "56 memorias y DCB, el abuelo del MIDI.",
    big: "DCB",
    voice: "audio/vo-juno-6.wav",
  },
  {
    fromFrame: 754,
    durationInFrames: 159,
    small: "Last Christmas. Can You Feel It. The Cure en directo.",
    big: "un solo take",
    highlight: "take",
    voice: "audio/vo-juno-7.wav",
  },
];
