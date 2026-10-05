type RGB = readonly [number, number, number];
type Zone = { element: HTMLElement; top: number; color: RGB };
const colors: Record<string, RGB> = {
  dark: [12, 20, 32], sky: [191, 217, 234], light: [243, 245, 246],
};
const clamp = (value: number): number => Math.min(1, Math.max(0, value));
const channel = (value: number): number => {
  const srgb = value / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
};
export function initScrollJourney(): void {
  const root = document.documentElement;
  const hero = document.querySelector<HTMLElement>('.hero-track');
  const sticky = document.querySelector<HTMLElement>('.hero-sticky');
  const windowElement = document.querySelector<HTMLElement>('.window');
  const statement = document.querySelector<HTMLElement>('#statement');
  if (!hero || !sticky || !windowElement || !statement) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const fallback: RGB = [12, 20, 32];
  const zones: Zone[] = Array.from(document.querySelectorAll<HTMLElement>('[data-zone]')).map((element) => ({
    element, top: 0, color: colors[element.dataset.zone ?? 'dark'] ?? fallback,
  }));
  let frame = 0;
  let heroTop = 0;
  let heroRange = 1;
  let statementTop = 0;
  let viewportHeight = 1;
  let enabled = !motion.matches;
  // All geometry reads are batched here, never in the scroll rendering function.
  const measure = (): void => {
    viewportHeight = window.innerHeight;
    const y = window.scrollY;
    heroTop = hero.getBoundingClientRect().top + y;
    heroRange = Math.max(1, hero.offsetHeight - sticky.offsetHeight);
    statementTop = statement.getBoundingClientRect().top + y;
    for (const zone of zones) zone.top = zone.element.getBoundingClientRect().top + y;
    // Cover viewport even when the window is not centered or the screen is ultrawide.
    const requiredScale = Math.max(window.innerWidth / windowElement.offsetWidth, viewportHeight / windowElement.offsetHeight) * 2.8;
    root.style.setProperty('--zoom-range', String(Math.max(5, requiredScale - 1)));
    schedule();
  };
  const render = (): void => {
    frame = 0;
    if (!enabled || document.hidden) return;
    const y = window.scrollY;
    root.style.setProperty('--progress', String(clamp((y - heroTop) / heroRange)));
    root.style.setProperty('--object-progress', String(clamp((y + viewportHeight - statementTop) / viewportHeight)));
    const sample = y + viewportHeight * 0.4;
    let previous: RGB = zones[0]?.color ?? fallback;
    let next: RGB = previous;
    let fraction = 0;
    for (let i = 1; i < zones.length; i += 1) {
      const zone = zones[i];
      if (!zone) continue;
      const range = Math.min(400, viewportHeight * 0.55);
      if (sample >= zone.top) { previous = zone.color; next = previous; fraction = 0; }
      else if (sample > zone.top - range) { next = zone.color; fraction = clamp((sample - zone.top + range) / range); break; }
      else break;
    }
    const r = Math.round(previous[0] + (next[0] - previous[0]) * fraction);
    const g = Math.round(previous[1] + (next[1] - previous[1]) * fraction);
    const b = Math.round(previous[2] + (next[2] - previous[2]) * fraction);
    const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    // Pick whichever extreme has higher contrast, avoiding gray-on-gray midpoints.
    const darkText = luminance > 0.179;
    const background = 'rgb(' + r + ' ' + g + ' ' + b + ')';
    const foreground = darkText ? '#000000' : '#ffffff';
    const focus = darkText ? '#003b61' : '#7dc4f2';
    root.style.setProperty('--page-bg', background);
    root.style.setProperty('--page-fg', foreground);
    root.style.setProperty('--page-focus', focus);
    root.style.setProperty('--project-muted', luminance < 0.05 ? '#b4c4d0' : luminance > 0.6 ? '#435767' : foreground);
    root.style.setProperty('--header-bg', background);
    root.style.setProperty('--header-fg', foreground);
    root.style.setProperty('--header-focus', focus);
  };
  function schedule(): void { if (enabled && !frame && !document.hidden) frame = requestAnimationFrame(render); }
  const configure = (): void => {
    enabled = !motion.matches;
    root.classList.toggle('journey-on', enabled);
    if (!enabled) {
      cancelAnimationFrame(frame); frame = 0;
      for (const name of ['--page-bg','--page-fg','--page-focus','--project-muted','--header-bg','--header-fg','--header-focus','--progress','--object-progress']) root.style.removeProperty(name);
    } else measure();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else schedule();
  });
  motion.addEventListener('change', configure);
  // Font loading can change section heights after the initial cache.
  void document.fonts.ready.then(measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  configure();
}
