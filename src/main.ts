import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createHeroScene } from './scene/HeroScene';
import { initNavigation } from './ui/Navigation';
import { initScrollReveal } from './ui/ScrollReveal';
import { initProjectScenes } from './ui/ProjectScenes';
import { initParallax } from './ui/Parallax';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ duration: 1, ease: 'power3.out' });
let destroy: (() => void) | undefined;
function start(): void {
  const removeNavigation = initNavigation();
  const mm = gsap.matchMedia();
  mm.add({ motion: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 760px)' }, (context) => {
    if (!context.conditions?.motion) return;
    const mobile = Boolean(context.conditions.mobile);
    const mount = document.querySelector<HTMLElement>('#scene-layer');
    let scene: ReturnType<typeof createHeroScene> = null;
    if (mount) {
      try { scene = createHeroScene(mount); } catch { document.documentElement.classList.remove('webgl-ready'); }
    }
    initParallax(scene, mobile);
    const removeScenes = initProjectScenes(scene, mobile);
    initScrollReveal();
    return () => { removeScenes(); scene?.dispose(); };
  });
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
  const visibility = (): void => { if (document.hidden) gsap.globalTimeline.pause(); else { gsap.globalTimeline.resume(); ScrollTrigger.refresh(); } };
  document.addEventListener('visibilitychange', visibility);
  destroy = () => { mm.revert(); removeNavigation(); document.removeEventListener('visibilitychange', visibility); destroy = undefined; };
}
start();
window.addEventListener('pagehide', () => destroy?.());
window.addEventListener('pageshow', (event) => { if (event.persisted && !destroy) start(); });
