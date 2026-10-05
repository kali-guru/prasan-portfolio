export function initReveal(): void {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  if (!('IntersectionObserver' in window) || motion.matches) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
      entry.target.classList.remove('is-waiting');
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px 25px 0px' });
  elements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', String(index % 4 * 60) + 'ms');
    element.classList.add('is-waiting');
    observer.observe(element);
  });
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    observer.disconnect();
    for (const element of elements) element.classList.remove('is-waiting');
  });
  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    const parent = event.target.closest<HTMLElement>('.reveal');
    if (parent) { parent.classList.remove('is-waiting'); observer.unobserve(parent); }
  });
}
