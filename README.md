# ai-reels

Instagram-style vertical stories: a talking person, captions on top, and animated **2D vector** graphics that explain the idea.

This repo is meant to live on GitHub so you can open it on this Mac and on iPhone.

## Yes, this format is possible

A typical 9:16 story / Reel is three layers:

1. **Talking person** — AI presenter video (or a real clip later)
2. **Captions on top** — timed text, Instagram-safe
3. **Explainer graphics** — 2D vectors that move as the person talks

The first demo is a 15-second story about the 2-minute rule. The presenter is still a vector stand-in. The graphics and captions are already in the real format.

## Which tool for the 2D vector graphics

**Remotion + SVG.** That is the graphics engine for this repo.

Why this and not a generative video model:

- Instagram explainers need **clean 2D vectors** (icons, charts, cards, clocks), not cinematic footage
- SVG stays sharp at 1080×1920
- Motion is code (`spring`, `interpolate`), so we can time graphics to the voice
- The same project composites captions + presenter + graphics
- Everything is git-friendly on Mac and iPhone

Other tools we are **not** using for the main graphics:

| Tool | Role |
| --- | --- |
| **Rive** | Later, only if we want a very polished character rig |
| **Lottie** | Later, if a designer exports After Effects motion |
| **Runway / Kling / Pika** | Bad fit for crisp vector explainers; they make film-like video |
| **Manim** | Strong for math, weaker for Instagram packaging |

**Talking person:** HeyGen API (best current talking-avatar API). Voice can come from HeyGen or ElevenLabs. We drop that clip into the avatar slot.

## Mac vs iPhone

| Device | What you can do |
| --- | --- |
| **Mac** | Edit in Cursor, preview with `npm run dev`, render MP4, push to GitHub |
| **iPhone** | Browse and comment in [GitHub](https://github.com/mobile), or commit notes/scripts with [Working Copy](https://workingcopyapp.com). Rendering stays on the Mac |

## Commands

```bash
npm run dev      # Remotion Studio preview
npm run render   # writes out/story.mp4
npm run lint
```

## Layout

```
src/Story.tsx                 9:16 composition
src/components/TopCaptions.tsx
src/components/TwoMinuteRule.tsx   SVG explainer
src/components/AvatarSlot.tsx      presenter placeholder
src/data/story.ts             caption timing
```
