import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function initNavigation(): () => void {
  const controller = new AbortController();
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector<HTMLElement>(link.hash);
      if (!target) return;
      event.preventDefault();
      // Native scrolling, no scroll hijacking or extra animation plugin.
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      history.replaceState(null, '', link.hash);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }, { signal: controller.signal });
  });
  // Reveal keyboard-focused content immediately even if its visual reveal has not run.
  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    const row = event.target.closest<HTMLElement>('.contact-row');
    if (row) gsap.set(row, { x: 0 });
    const project = event.target.closest<HTMLElement>('.project');
    if (!project || !document.documentElement.classList.contains('cinema-on')) return;
    const trigger = ScrollTrigger.getById('project-sequence');
    const index = Number(project.dataset.project ?? 0);
    if (trigger) {
      const fraction = index === 0 ? 0.12 : index === 1 ? 0.46 : 0.85;
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * fraction, behavior: 'instant' });
      trigger.animation?.progress(fraction);
      ScrollTrigger.update();
    }
  }, { signal: controller.signal });
  return () => controller.abort();
}
