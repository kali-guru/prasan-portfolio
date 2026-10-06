# Contribution rules

## Stack and boundaries
Strict TypeScript, Vite, vanilla HTML and CSS. GSAP + ScrollTrigger own motion;
Three.js owns procedural WebGL rendering in src/scene. No React, Vue, UI or CSS
framework, backend, database, API, CMS, auth, external runtime requests, imported
3D assets or textures. No unnecessary animation libraries.

## Visual tokens
Display: Anton Latin 400, Impact/Arial Narrow/sans-serif fallback.
Mono: JetBrains Mono Latin 400, ui-monospace/SFMono-Regular/Menlo/Consolas fallback.
Body: system sans-serif. Fonts must be open-source and self-hosted; preserve OFL.
Palette: --black #0b1015, --steel #202e38, --blue #1b3444, --ice #e0e7eb,
--muted #aabac4, --accent #b1d8ee. Hairlines and huge condensed typography.
Functional labels use brackets. No copyright, badges, stock photography, SaaS
cards, neon, heavy glassmorphism, or bouncy motion.
UI easing cubic-bezier(.22,1,.36,1), GSAP power3.out; 0.8–1.2s deliberate motion.
Atmosphere is slower. Match reference pacing, depth and choreography, not only fades.

## Architecture and quality
Keep public content in semantic HTML. Exactly one h1 and logical headings.
One project ScrollTrigger timeline coordinates clipping, translation, scale,
background changes and sculpture pose. Cache or delegate scroll measurements to
ScrollTrigger. No custom rAF scroll engine; rAF only for Three.js rendering.
Geometry and material resources are allocated once, disposed on pagehide/context
loss. Pause when hidden/offscreen. One clock, no per-frame GPU allocations.
DPR max 2 desktop and 1.25 mobile; use reduced mobile geometry.

Native links, skip link, visible focus and readable controlled text surfaces.
No-JS must show all content without blank scenes. Reduced motion must revert
pinning/reveals/parallax and stop decorative WebGL. WebGL failure must display
the CSS fallback. Mobile adapts cinematic motion rather than removing it.
Test 375px, 390px, 768px, 1024px, 1440px and 4K for horizontal overflow.

## Content integrity
Never invent people, clients, employers, URLs, projects, descriptions, achievements,
statistics, locations, credentials or contact information. Preserve placeholders
until verified content is supplied. Do not create a fake CV. Missing destinations
are visibly disabled anchor placeholders, never fake href values.

## Release
Run npm run typecheck and npm run build with zero errors. Keep package-lock.json.
Review desktop/mobile, keyboard, reduced motion, no-JS, no-WebGL and transitions.
Document limits honestly. Publish dist only. Preserve the existing live branch
until the user chooses this placeholder study. Do not alter DNS or add CI by default.
