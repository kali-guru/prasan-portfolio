import { gsap } from 'gsap';
export function initScrollReveal(): void {
  document.querySelectorAll<HTMLElement>('.bio, .work-intro h2, .statement h2').forEach((heading) => {
    gsap.from(heading.querySelectorAll('.reveal-line'), {
      yPercent: 110, rotate: 2, duration: 1.15, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
    });
  });
  gsap.from('.skill-row', { y: 35, clipPath: 'inset(100% 0 0 0)', duration: 1, stagger: 0.08,
    scrollTrigger: { trigger: '.skills-table', start: 'top 85%', once: true } });
  gsap.from('.contact-row', { x: -25, duration: 1, stagger: 0.12,
    scrollTrigger: { trigger: '.contact-table', start: 'top 85%', once: true } });
}
