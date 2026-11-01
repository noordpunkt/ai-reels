import type { OverlayCue } from "./types";

export const TB303_DURATION_FRAMES = 919;

export const tb303Captions: OverlayCue[] = [
  {
    fromFrame: 0,
    durationInFrames: 134,
    small: "Roland la pensó para reemplazar a un bajista.",
    big: "TB-303",
    highlight: "303",
    voice: "audio/vo-303-1.wav",
  },
  {
    fromFrame: 134,
    durationInFrames: 154,
    small: "Salió en 1981. Era la hermana de la TR-606.",
    big: "1981",
    voice: "audio/vo-303-2.wav",
  },
  {
    fromFrame: 288,
    durationInFrames: 110,
    small: "El secuenciador era un laberinto.",
    big: "un fracaso",
    highlight: "fracaso",
    voice: "audio/vo-303-3.wav",
  },
  {
    fromFrame: 398,
    durationInFrames: 160,
    small: "En 1984 Roland la retiró. Acabó en las casas de empeño.",
    big: "se apagó",
    highlight: "apagó",
    voice: "audio/vo-303-4.wav",
  },
  {
    fromFrame: 558,
    durationInFrames: 138,
    small: "En Chicago giraron el corte y la resonancia.",
    big: "CUT OFF FREQ",
    highlight: "CUT OFF",
    voice: "audio/vo-303-5.wav",
  },
  {
    fromFrame: 696,
    durationInFrames: 134,
    small: "Phuture lo grabó. Ron Hardy lo puso en el club.",
    big: "Acid Tracks",
    highlight: "Acid",
    voice: "audio/vo-303-6.wav",
  },
  {
    fromFrame: 830,
    durationInFrames: 89,
    small: "Un uso equivocado inventó un género.",
    big: "acid house",
    highlight: "acid",
    voice: "audio/vo-303-7.wav",
  },
];
