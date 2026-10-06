import { gsap } from 'gsap';
import type { HeroScene } from '../scene/HeroScene';
export function initProjectScenes(scene: HeroScene | null, mobile: boolean): () => void {
  const stage = document.querySelector<HTMLElement>('.project-stage');
  const projects = Array.from(document.querySelectorAll<HTMLElement>('.project'));
  if (!stage || projects.length !== 3) return () => {};
  document.documentElement.classList.add('cinema-on');
  // One pinned scene and one shared timeline coordinate all three sequences.
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
    id: 'project-sequence', trigger: stage, start: 'top top',
    end: () => '+=' + window.innerHeight * (mobile ? 3.3 : 4.2),
    pin: true, scrub: 1.1, anticipatePin: 1, invalidateOnRefresh: true,
  } });
  projects.forEach((project, i) => {
    gsap.set(project, { zIndex: i + 1 });
    if (i > 0) gsap.set(project, { clipPath: 'inset(100% 0 0 0)' });
  });
  const first = projects[0]!; const second = projects[1]!; const third = projects[2]!;
  timeline.to(first.querySelector('.project-title'), { xPercent: -5, yPercent: -5, duration: 1.1 }, 0)
    .to(first.querySelector('.project-number'), { xPercent: 10, duration: 1.1 }, 0)
    .to(first.querySelector('.project-wash'), { opacity: 0.5, duration: 1.1 }, 0);
  if (scene) timeline.fromTo(scene.pose,
    { x: -0.75, y: 0.35, z: 0, rx: 0.45, ry: 0.8, rz: -0.3, scale: 1 },
    { x: -0.95, rx: 0.8, ry: 1.6, duration: 1.1, immediateRender: false }, 0);
  const transition = (outgoing: HTMLElement, incoming: HTMLElement, at: number): void => {
    timeline.to(outgoing.querySelector('.project-title'), { yPercent: -35, xPercent: -9, scale: 0.94, duration: 1.2 }, at)
      .to(outgoing.querySelector('.project-caption'), { y: -35, opacity: 0, duration: 0.75 }, at)
      .to(incoming, { clipPath: 'inset(0% 0 0 0)', duration: 1.2 }, at)
      .fromTo(incoming.querySelector('.project-title'), { yPercent: 65, xPercent: mobile ? 5 : 12, scale: 1.08 }, { yPercent: 0, xPercent: 0, scale: 1, duration: 1.2, immediateRender: false }, at)
      .fromTo(incoming.querySelector('.project-number'), { xPercent: -15, yPercent: 10 }, { xPercent: 0, yPercent: 0, duration: 1.3, immediateRender: false }, at)
      .fromTo(incoming.querySelector('.project-caption'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, immediateRender: false }, at + 0.5);
  };
  transition(first, second, 1.1);
  timeline.to(second.querySelector('.project-title'), { xPercent: 3, duration: 0.85 }, 2.3);
  if (scene) timeline.to(scene.pose, { x: -0.25, z: 0.45, ry: 3, rx: -0.25, rz: 0.45, scale: 1.08, duration: 2.05 }, 1.1);
  transition(second, third, 3.15);
  if (scene) timeline.to(scene.pose, { x: 0.65, z: 0.2, rx: 1.2, ry: 4.2, rz: -0.15, scale: 1.15, duration: 1.7 }, 3.15);
  timeline.to(third.querySelector('.project-title'), { xPercent: -3, yPercent: -5, duration: 1 }, 4.35)
    .to('.project-progress b', { scaleX: 1, duration: 5.35 }, 0);
  return () => document.documentElement.classList.remove('cinema-on');
}
