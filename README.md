# Prashant Gurung — Cybersecurity portfolio

A fully static portfolio built with strict TypeScript, Vite, and vanilla CSS.
No UI framework, CSS framework, animation library, backend, database, analytics,
fetch calls, remote fonts, or runtime API calls. External profile links and PDFs
open only when a visitor selects them.

## Status

This redesign is committed on `prashant-scroll-redesign` for review.
The coding workspace was unavailable during authoring. Dependencies have **not**
been installed, and typecheck, production build, and browser checks have **not**
been run. Do not treat this branch as release-verified. No lockfile was fabricated.
Run the gates below and commit the resulting package-lock.json before merging.

## Run

Use Node.js 22.12+ (the .nvmrc selects Node 22).

```sh
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

Both typecheck and build must pass with zero errors before publication.
The build script runs `tsc --noEmit && vite build`.
Once a package-lock.json has been generated and committed, use `npm ci` for
subsequent clean installations.

## Deployment: important migration

The old version served unbuilt HTML from the repository root. This version must
be built. **Do not publish the source root or keep the old exit-0 build setting.**

Every static host can serve the resulting `dist/` folder. No server runtime or
provider SDK is required. Vite uses `base: './'`, so generated asset links work
at a custom-domain root or under a repository subpath. Public PDF links use Vite's
BASE_URL substitution. Canonical metadata still targets https://prashantgrg.com.np/.

### Cloudflare Pages

Before merging into the production branch, update the project's configuration:

| Setting | Value |
| --- | --- |
| Framework | None |
| Build command | `npm run build` |
| Build output | `dist` |
| Root directory | Repository root / blank |
| Node version | 22.12 or newer |

Test the redesign branch as a preview before merging. The custom domain and Zoho
mail settings do not need to change. No hosting or DNS settings were changed by
this commit.

### GitHub Pages and other hosts

Build locally and publish only the contents of `dist/` to the host's publishing
branch or directory. No CI workflow is included, as requested. GitHub Pages
cannot compile TypeScript when serving the source root directly.

`public/CNAME` is copied to `dist/CNAME` for the custom domain. Remove it if
using a default github.io domain. Configure custom domains through the host and
DNS separately. Update canonical, Open Graph, robots, and sitemap URLs if the
domain changes.

## Content and placeholders

All main content is in `index.html`, so it remains available without JavaScript.
The name displayed on the website is **Prashant Gurung**, as requested. Original
certificate PDF bytes and the issuer's spelling remain unchanged.

Replace only with verified details:
- [ ] `[Add location]` in the profile sheet.
- [ ] `[Add availability]` in the profile sheet.
- [ ] `[Add year]` on the three project entries; update each `data-year` too.
- [ ] Add a CV only after receiving a real PDF.
- [ ] Add more projects only when real titles, descriptions, years, and links
      are supplied. There are three verified projects, not invented filler.

No numerical experience or client stats are included. A dated learning timeline
replaces the globe and stats block. The Kathmandu clock is a timezone display,
not a claim that the person lives in Kathmandu. Education and contact details
are carried forward from the supplied information.

## Source structure

- `index.html`: semantic content, inline SVG definitions, no-JS fallback.
- `src/styles.css`: font imports, tokens, layout, CSS sky and cloud layers.
- `src/main.ts`: progressive-enhancement initializers.
- `src/ui/Header.ts`: modal mobile menu, focus cycle, Escape and navigation.
- `src/ui/ScrollJourney.ts`: one passive scroll listener, cached geometry,
  requestAnimationFrame writes, adaptive background and text contrast.
- `src/ui/Reveal.ts`: IntersectionObserver entry reveals.
- `src/ui/Accordion.ts`: native details coordination and SVG crossfade.
- `src/ui/ProjectPicker.ts`: real project links, hover/focus and visibility selection.
- `src/ui/LocalTime.ts`: local computation of Kathmandu time; no API.
- `public/assets/certificates/`: original certificate PDFs.
- `public/`: favicon, domain, sitemap, and robots files copied into dist.

Globe.ts and canvas are intentionally absent: the approved timeline replaces
the globe. Fonts are Syne 500/600 and Inter Tight 400/500, Latin subsets only,
self-hosted from Fontsource with font-display swap. Preserve their OFL licenses
when distributing the fonts. No stock images or generated raster art are used.

## Review before release

- Run the two mandatory npm gates above.
- Check desktop, 375px mobile, and 200% text zoom for clipping and overflow.
- Test menu Tab/Shift+Tab, Escape, focus return, and section navigation.
- Test keyboard accordion and project links.
- Disable JavaScript: content, navigation, native details, and PDFs remain usable.
- Enable reduced motion: no zoom, drift, parallax, or reveal movement.
- Confirm no requests go to external origins while viewing the site.
- Confirm certificate PDF links and subpath hosting after production build.
- Test text contrast throughout the scroll transition, including project rows.
