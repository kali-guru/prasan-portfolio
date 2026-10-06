import { gsap } from 'gsap';
import type { HeroScene } from '../scene/HeroScene';
export function initParallax(scene: HeroScene | null, mobile: boolean): void {
  gsap.from('.name-line > span', { yPercent: 115, rotate: 2, duration: 1.2, stagger: 0.12, ease: 'power3.out' });
  const hero = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
  hero.to('.first-line', { xPercent: mobile ? -6 : -16, yPercent: -10, scale: 1.06, ease: 'none' }, 0)
    .to('.last-line', { xPercent: mobile ? 6 : 16, yPercent: 10, scale: 1.04, ease: 'none' }, 0)
    .to('.hero-bottom', { y: -40, opacity: 0, ease: 'none' }, 0);
  if (scene) hero.to(scene.pose, { z: 1.7, ry: 1.2, rx: 0.55, scale: 1.3, ease: 'none' }, 0);
  gsap.to('.fog-one', { xPercent: 9, yPercent: -8, duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.fog-two', { xPercent: -6, yPercent: 8, duration: 26, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.statement h2', { y: mobile ? -20 : -65, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
  gsap.from('.footer p', { yPercent: 18, xPercent: -4, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 1.2 } });
}
