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

The selected FIELD clip played as a bounded, muted, non-looping 8.5-second source in the in-page control. The production web derivative is `media/field/video/meta-field-pov-1045-1130-autoplay.mp4`; the optional audio review source is adjacent. The browser surface used for this pass did not expose a screen-recording API, so no synthetic or misleading “screen recording” was created. The actual web clip is the retained motion artifact.

## Known pre-publication review points

- The in-frame `CENTRO 4` equipment marking remains present in some cropped FIELD compositions. It is part of the real source and was not altered; confirm whether this marking is acceptable for public use.
- `IMG_3496.jpeg` remains excluded pending workplace-background clearance.
- `IMG_1982.jpeg` remains excluded because the only AI cleanup attempt changed the subject; its original was not altered.
- `Italy/IMG_7566.jpeg`, `video-1017_singular_display.mov`, `IMG_3135.MOV`, and `IMG_3137.MOV` remain planned reserves pending isolated privacy/frame review.
