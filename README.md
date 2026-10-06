# Cinematic static portfolio

Reference-led motion study with explicit content placeholders. Strict TypeScript,
Vite, vanilla HTML/CSS, GSAP + ScrollTrigger, and procedural Three.js geometry.
No backend, database, CMS, authentication, API calls, CDN, imported models, or
external runtime assets. Fonts are bundled locally with Vite.

## Run and build

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Publish **only `dist/`** to any static host. For Cloudflare Pages use build command
`npm run build`, output directory `dist`, and repository root as the build root.
Do not retain the previous portfolio's `exit 0` and root-output settings.
For GitHub Pages, publish the built files to the configured publishing branch or
use a separately configured build workflow. No CI is introduced here.
Vite's relative base supports root domains and project subpaths.

## Content replacement

All content lives in `index.html` and is available without JavaScript.

| Content | Where to edit |
| --- | --- |
| Name | title, Open Graph title, header, hero h1, footer |
| Role | metadata, hero role, About focus |
| Bio | `.bio .reveal-line` text; keep each line inside its `.mask` |
| Skills and descriptions | six `.skill-row` elements |
| Projects and descriptions | three `.project` articles |
| Project URLs | corresponding `.placeholder-link` anchors |
| Email and social links | `.contact-row` anchors |
| Location and status | About `.metadata` |
| CV | add the real PDF as `public/cv.pdf`, then replace the disabled header label |
| Colors, fonts, spacing | custom properties at the top of `src/styles.css` |
| 3D sculpture | `src/scene/HeroScene.ts` |
| Project choreography | `src/ui/ProjectScenes.ts` |

Links whose destinations were not supplied deliberately have no `href`, use
`aria-disabled="true"`, and display a visible placeholder. Once a real destination
is supplied, set `href`, remove `aria-disabled`, remove the temporary `role` and
`tabindex`, and update the accessible label. Use `mailto:` for email. For the CV,
use `%BASE_URL%cv.pdf` in source HTML. No fake PDF is created. Never replace
placeholders with invented facts or reuse personal details without authorization.
Original certificate assets from the previous version remain in the repository;
they are not referenced by this placeholder study and are not included in dist.

## Motion and fallbacks

- Full-viewport hero: oversized masked text and an industrial orbital sculpture.
- One pinned ScrollTrigger timeline: three project scenes, clipped environmental
  transitions, counter-moving type, scale, and synchronized sculpture poses.
- Intersection-based Three.js visibility gating; capped pixel ratio (1.25 mobile,
  2 desktop), lower geometry detail on mobile, shared clock, no per-frame GPU
  allocation, context-loss fallback, GPU disposal on pagehide.
- CSS bracket sculpture when WebGL is unavailable or motion is reduced.
- No JavaScript: natural document flow, all text visible, static CSS atmosphere.
- Reduced motion: GSAP matchMedia reverts pinning and transforms; no Three.js loop.
- Keyboard: skip link, focus outlines, native anchor navigation. Project link
  focus synchronizes the pinned scene so it is not clipped out of view.
- Only Anton Latin 400 and JetBrains Mono Latin 400 are loaded. Fontsource uses
  font-display swap. Preserve the fonts' OFL licenses in redistributed packages.

The reference video provides the pacing, scale changes, scene continuity, and
layering; the supplied brief replaces its literal aviation imagery with a cold
industrial sculpture and condensed typography.

## Validation

See `VALIDATION.md` for the checks performed and any remaining limitations.
