#!/usr/bin/env python3
"""Speak French lines with a female France voice and write 16-bit WAV."""

from __future__ import annotations

import json
import subprocess
import sys
import wave
from pathlib import Path

VOICE = "Shelley (French (France))"
RATE = "155"
ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "public" / "audio"


def duration(path: Path) -> float:
    with wave.open(str(path)) as wav:
        return wav.getnframes() / float(wav.getframerate())


def speak(text: str, wav_path: Path) -> float:
    aiff = wav_path.with_suffix(".aiff")
    wav_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(
        ["say", "-v", VOICE, "-r", RATE, "-o", str(aiff), text]
    )
    subprocess.check_call(
        ["afconvert", "-f", "WAVE", "-d", "LEI16", str(aiff), str(wav_path)]
    )
    aiff.unlink(missing_ok=True)
    return duration(wav_path)


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit("usage: say-french.py lines.json prefix")
    lines = json.loads(Path(sys.argv[1]).read_text())
    prefix = sys.argv[2]
    total = 0.0
    for index, line in enumerate(lines, start=1):
        path = AUDIO / f"{prefix}-{index}.wav"
        seconds = speak(line, path)
        total += seconds
        print(f"{path.name:18} {seconds:6.2f}s")
    print(f"total {total:.2f}s  voice={VOICE}  rate={RATE}")


if __name__ == "__main__":
    main()
