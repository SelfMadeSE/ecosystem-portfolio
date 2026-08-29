# Render QA — production pass 01

## Verified render states

| Viewport | Captured file | What was checked |
| --- | --- | --- |
| 1440 × 1000 | `screenshots/1440-hero.png` | FIELD-led hero; typography clears the industrial source; no truck-door company mark in the cropped hero. |
| 1024 × 900 | `screenshots/1024-rome.png` | Laptop responsive structure and chapter handoff. |
| 768 × 900 | `screenshots/768-work.png` | Tablet header/menu breakpoint and vertical FIELD layout. |
| 390 × 844 | `screenshots/390-hero.png` | Mobile hero crop, typography, menu trigger, and call-to-action. |
| 1024 × 900 reduced motion | `screenshots/1024-reduced-motion.png` | Browser-emulated `prefers-reduced-motion: reduce`: media query matched, hero transform was `none`, and the FIELD video had no autoplay attribute. |

The browser reported no console errors or warnings after the final stylesheet repair.

## Motion test

The selected FIELD clip played as a bounded, muted, non-looping 8.5-second source in the in-page control. The production web derivative was `media/field/video/meta-field-pov-1045-1130-autoplay.mp4`; the optional audio review source is adjacent. The browser surface used for this pass did not expose a screen-recording API, so no synthetic or misleading “screen recording” was created. The actual web clip is the retained motion artifact.

## Continuation motion pass — 2026-08-27

The active portfolio now uses `media/field/video/meta-field-pov-100-111-slowcut.mp4`, a 13.6-second muted, non-looping derivative of `video-1247_singular_display.mov`. It combines four source windows from 01:40.0–01:51.3 with deliberate speed changes: a slower opening work-surface move, a quicker connective beat, a longer mechanical reveal, and a measured return to the tool. The original file is unchanged; source intervals, speed factors, dimensions, and the output hash are recorded in `derivative-manifest.json`.

The cut is mounted through the existing `FieldRecord` control and respects reduced motion: no in-view autoplay is attempted when `prefers-reduced-motion: reduce` matches. The video is displayed in its native portrait orientation so the field-of-view and hands/equipment remain legible on desktop and mobile.

## Known pre-publication review points

- The in-frame `CENTRO 4` equipment marking remains present in some cropped FIELD compositions. It is part of the real source and was not altered; confirm whether this marking is acceptable for public use.
- `IMG_3496.jpeg` remains excluded pending workplace-background clearance.
- `IMG_1982.jpeg` remains excluded because the only AI cleanup attempt changed the subject; its original was not altered.
- `Italy/IMG_7566.jpeg`, `video-1017_singular_display.mov`, `IMG_3135.MOV`, and `IMG_3137.MOV` remain planned reserves pending isolated privacy/frame review.
