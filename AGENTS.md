# Portfolio contribution rules

## Stack
Strict TypeScript, Vite, semantic HTML, and vanilla CSS only. No UI/CSS framework,
animation library, Three.js, backend, database, API calls, or runtime external
requests. Only @fontsource/syne and @fontsource/inter-tight are runtime packages.
Other dependencies must be development tooling. Do not add CI without asking.

## Content integrity
Display name: Prashant Gurung. Never replace marked placeholders with invented
facts, employers, credentials, statistics, project details, or locations.
Do not change names printed in original certificates. Preserve their bytes.
The three GitHub project links and supplied education/contact details are real
user-provided or previously verified material. Ask before adding factual claims.

## Design tokens
- Fonts: Syne 500/600 display; Inter Tight 400/500 body, Latin subsets only.
- All fonts must be open source and self-hosted. Keep SIL OFL license notices.
- Fallback display: Helvetica Neue, Arial, sans-serif; body: system-ui, sans-serif.
- --warm-black: #0E0C0B; --taupe: #2A2522; --white: #F3F5F6
- --soft-sky: #BFD9EA; --mid-sky: #4C9BD6; --accent: #7DC4F2
- Chosen dark variant --navy: #0C1420; light-zone ink --ink: #152A3B
- UI easing cubic-bezier(.4,0,.2,1); reveal easing cubic-bezier(.16,1,.3,1)
- Journey zones: navy hero, sky statement, white profile/specialties, navy work,
  credentials timeline, contact.
- Sentence case headings, hairlines, spacious composition. No neon, purple,
  badges, copyright text, stock photography, or externally loaded imagery.
- Imagery is procedural CSS or inline SVG. Timeline replaces globe/canvas.

## Motion and accessibility
One passive scroll listener with one scheduled rAF; cache geometry during resize
and font readiness, never read layout in the scrolling render function.
Use transform and opacity for zoom, drift, reveals, and object motion.
Respect reduced motion initially and if changed during the session. Stop work
in hidden documents. Baseline HTML must work without JavaScript.
Keep semantic landmarks, one h1, logical headings, visible focus rings, native
details, and real project anchors. Mobile dialog traps focus, closes on Escape,
and restores focus. Maintain WCAG AA contrast through the interpolated zones.
Avoid small essential text: body 16px+, labels 14px, secondary metadata 13px+.
Check 375px screens and text enlargement.

## Delivery gates
Before marking ready or merging, run npm run typecheck and npm run build with
zero errors, and review desktop/mobile rendering plus keyboard and no-JS flows.
If the execution environment is unavailable, explicitly mark the branch/PR
unverified; do not claim tests passed or merge it into the live site.
Generate and commit package-lock.json with the first successful npm install.
Publish dist only; never publish source TypeScript. Preserve the domain and
Zoho DNS. Keep builds portable; default Vite base is relative.
