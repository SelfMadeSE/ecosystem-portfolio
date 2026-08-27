# Ecosystem Portfolio canonical-rebuild audit

Audit date: 2026-08-27 (America/Edmonton)

## Determination

`SelfMadeSE/ecosystem-portfolio` is the sole canonical repository for the rebuild. The prior static output remains source/reference material only. The Vercel project must be linked to this repository after this rebuild is pushed.

## Three-state comparison

| Area | GitHub main at `37a0f33` | Separate local output | Current Vercel production |
| --- | --- | --- | --- |
| Source shape | Five tracked files: README, license, navigation, and two stale case-study pages; no package/build configuration. | Static 39 MB bundle with HTML, CSS, JavaScript, six legacy project pages, 62 deployment files, and `.vercel` metadata. | Byte-identical `index.html` to the separate static output; deployment is a static “Other” preset build. |
| Features | Only isolated, unmounted Next-flavoured components/pages. | Editorial hero, project stories, personal imagery, videos, form/mailto logic, legacy scroll/motion system. | Same static bundle as local output. |
| Media | No tracked media. | Game Studio, Outbound, SCAFFOLD, marketplace, Pathmaker, and personal media; mixed provenance/publish-safety status. | Same static assets uploaded with the static deployment. |
| Copy | Historical Godot/WebAssembly and AI-receptionist/revenue/testimonial claims in case-study sources. | More recent Unity-first Game Studio and URL-audit framing, but still includes service pricing and old information architecture. | Same as local static output. |
| Contact | No canonical contact copy. | `owner@outboundautonomy.com` via mailto. | Same. |
| Deployment configuration | No Vercel config or package manifest. | Local `.vercel/project.json` points to the live project; deploy root is that unrelated output directory. | Project `ecosystem-portfolio`, framework `Other`, root `.`, static output; current production deployment completed in 153 ms. |

## Salvage decision

Retain only reviewed real product evidence, provenance records, selected tonal lessons, and verified current-source wording. Do not copy the static implementation or let any production path depend on its directory.

## Factual reset used in this rebuild

- **Game Studio:** current active checkout is Unity-first. The historical Godot/WebAssembly architecture is excluded from current product claims.
- **MuseStudio:** represented by the source-backed SPECTER LYRICS / Muse Studio native macOS workspace and an existing UI-test capture.
- **Outbound Autonomy:** represented as the current URL-based website-audit and implementation guidance product, never as an AI receptionist.
- **Autonomous Operations:** custom work built using OpenClaw. This portfolio does not claim authorship of OpenClaw and does not publish sensitive operational screens.
- **Commercial proof:** no customers, revenue, testimonials, aggregate metrics, or performance outcomes are asserted.
- **Portrait:** no approved final portrait was supplied. A labelled non-person placeholder is required until that changes.
