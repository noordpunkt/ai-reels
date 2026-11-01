#!/usr/bin/env python3
"""Original black-and-white story sounds: 303-style squelch and Juno-style pad."""

from __future__ import annotations

import math
import os
import struct
import wave

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")


def write_wav(name: str, samples: list[float]) -> None:
    os.makedirs(OUT, exist_ok=True)
    peak = max((abs(s) for s in samples), default=1.0)
    gain = 0.9 / peak if peak > 0.9 else 1.0
    path = os.path.join(OUT, name)
    with wave.open(path, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SR)
        wav.writeframes(
            b"".join(
                struct.pack("<h", max(-32767, min(32767, int(s * gain * 32767))))
                for s in samples
            )
        )
    print(name, f"{len(samples) / SR:.2f}s")


def saw(phase: float) -> float:
    return 2.0 * (phase / (2 * math.pi) - math.floor(phase / (2 * math.pi) + 0.5))


def tb303_squelch(duration: float = 8.0) -> list[float]:
    n = int(SR * duration)
    samples: list[float] = []
    phase = 0.0
    lp = 0.0
    bp = 0.0
    notes = [36.7, 41.2, 36.7, 49.0, 36.7, 41.2, 55.0, 36.7]
    for i in range(n):
        t = i / SR
        note = notes[int(t * 4) % len(notes)]
        cutoff = 280 + 2200 * (0.5 + 0.5 * math.sin(t * 1.7))
        res = 0.72 + 0.18 * math.sin(t * 0.9)
        phase += 2 * math.pi * note / SR
        x = saw(phase) * 0.55
        f = cutoff / SR
        q = min(0.95, res)
        lp += f * bp
        hp = x - lp - q * bp
        bp += f * hp
        env = 0.35 + 0.65 * math.exp(-((t % 0.25) * 11))
        samples.append((lp * 0.55 + bp * 0.7) * env)
    return samples


def juno_pad(duration: float = 7.5) -> list[float]:
    n = int(SR * duration)
    freqs = [130.81, 164.81, 196.0]
    detune = [-0.18, 0.0, 0.21]
    samples = [0.0] * n
    for base in freqs:
        for d in detune:
            phase = 0.0
            freq = base * (2 ** (d / 12))
            for i in range(n):
                t = i / SR
                phase += 2 * math.pi * freq / SR
                env = min(1.0, t * 3.0) * math.exp(-t * 0.18)
                chorus = 1 + 0.012 * math.sin(2 * math.pi * 0.55 * t)
                samples[i] += saw(phase * chorus) * env * 0.11
    return samples


if __name__ == "__main__":
    write_wav("tb303-squelch.wav", tb303_squelch())
    write_wav("juno-pad.wav", juno_pad())
