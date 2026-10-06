# Validation record

## Passed

- Dependencies installed with npm; package-lock.json generated.
- `npm run typecheck`: zero TypeScript errors.
- `npm run build`: successful static output, zero build errors.
- Production HTML references resolve to local built files.
- Fragment targets exist, IDs are unique, and there is exactly one h1.
- No external asset URLs in the built HTML. Fonts and libraries are bundled.
- Placeholder content remains explicit; no fake CV or contact URLs were created.

## Not yet verified in a browser

Browser QA could not run in the provided execution environment. The standard
Playwright browser was missing and its download failed. An alternative Chromium
package installed successfully but crashed on launch (SIGTRAP), before any page
rendered. A local HTTP preview server was available, but no screenshot or visual
result was obtained. Do not interpret implemented fallbacks as tested fallbacks.

Before merging/publishing, check:

- [ ] Desktop and mobile at 375, 390, 768, 1024, 1440, and 3840 pixels.
- [ ] No horizontal overflow or unreadable text.
- [ ] Keyboard navigation, skip link, project focus during pinning.
- [ ] Reduced motion, including changes while the page is open.
- [ ] JavaScript disabled: readable natural-flow sections and CSS sculpture.
- [ ] WebGL unavailable/context lost: complete CSS fallback.
- [ ] No external-origin runtime network requests.
- [ ] Hidden tab and offscreen rendering pauses.
- [ ] Hero/project object position, depth, and text legibility.
- [ ] Scene pinning, transitions, and pacing against the uploaded reference.

The code includes these behaviors, but their visual and interaction acceptance
criteria remain pending. Keep the pull request in draft until this list is reviewed.
