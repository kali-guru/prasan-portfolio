import * as THREE from 'three';

export interface SculpturePose { x: number; y: number; z: number; rx: number; ry: number; rz: number; scale: number; }
export interface HeroScene { pose: SculpturePose; dispose: () => void; }

export function createHeroScene(mount: HTMLElement): HeroScene | null {
  const small = matchMedia('(max-width: 760px)').matches;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { alpha: true, antialias: !small });
  if (!context) return null;
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: !small }); }
  catch { return null; }
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.z = 8.5;
  const object = new THREE.Group();
  scene.add(object);
  const steel = new THREE.MeshStandardMaterial({ color: 0x7895a7, metalness: 0.68, roughness: 0.27 });
  const edge = new THREE.MeshStandardMaterial({ color: 0xd8e4ec, metalness: 0.5, roughness: 0.22 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1a2b37, metalness: 0.6, roughness: 0.4 });
  const segments = small ? 48 : 112;
  const ringGeometry = new THREE.TorusGeometry(1.15, 0.13, small ? 8 : 16, segments);
  const trimGeometry = new THREE.TorusGeometry(1.15, 0.018, 6, segments);
  const strutGeometry = new THREE.BoxGeometry(0.07, 0.09, 0.36);
  for (let i = 0; i < 3; i += 1) {
    const assembly = new THREE.Group();
    const ring = new THREE.Mesh(ringGeometry, steel);
    assembly.add(ring);
    const trim = new THREE.Mesh(trimGeometry, edge);
    trim.position.z = 0.13;
    assembly.add(trim);
    for (let j = 0; j < 12; j += 1) {
      const angle = j / 12 * Math.PI * 2;
      const strut = new THREE.Mesh(strutGeometry, dark);
      strut.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 1.15, 0);
      strut.rotation.z = angle;
      assembly.add(strut);
    }
    assembly.rotation.set(i * 0.95, i * 0.65, i * 0.4);
    assembly.scale.setScalar(1 - i * 0.17);
    object.add(assembly);
  }
  const coreGeometry = new THREE.OctahedronGeometry(0.38, 0);
  const core = new THREE.Mesh(coreGeometry, edge);
  object.add(core);
  scene.add(new THREE.HemisphereLight(0xc8e3f3, 0x18212c, 2.1));
  const key = new THREE.DirectionalLight(0xe2f1ff, 5);
  key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x699ac3, 5);
  rim.position.set(-4, 1, -2); scene.add(rim);
  const fill = new THREE.PointLight(0xf3ede4, 65, 18);
  fill.position.set(-2, -3, 3); scene.add(fill);
  const pose: SculpturePose = { x: 0.2, y: 0.2, z: 0, rx: 0.2, ry: -0.45, rz: -0.3, scale: 1 };
  const clock = new THREE.Clock(false);
  let elapsed = 0;
  let raf = 0;
  let disposed = false;
  let active = false;
  const visible = new Set<Element>();
  const regions = document.querySelectorAll<HTMLElement>('.hero, .project-stage');
  const render = (): void => {
    raf = 0;
    if (disposed || !active || document.hidden) return;
    elapsed += Math.min(clock.getDelta(), 0.05);
    const narrow = window.innerWidth <= 760;
    object.position.set(pose.x * (narrow ? 0.35 : 1), pose.y + Math.sin(elapsed * 0.3) * 0.035, pose.z);
    object.rotation.set(pose.rx, pose.ry + elapsed * 0.035, pose.rz);
    object.scale.setScalar(pose.scale * (narrow ? 0.77 : 1.3));
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };
  const sync = (): void => {
    active = visible.size > 0;
    mount.style.visibility = active && !document.hidden ? 'visible' : 'hidden';
    if (active && !document.hidden && !disposed) {
      if (!raf) { clock.start(); raf = requestAnimationFrame(render); }
    } else { cancelAnimationFrame(raf); raf = 0; clock.stop(); }
  };
  const resize = (): void => {
    const width = window.innerWidth; const height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, width <= 760 ? 1.25 : 2));
    renderer.setSize(width, height);
    camera.aspect = width / height;
    // Wider camera on portrait viewports avoids an oversized, cropped sculpture.
    camera.fov = width <= 760 ? 48 : 34;
    camera.updateProjectionMatrix();
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); }
    sync();
  }, { threshold: 0 });
  for (const region of regions) observer.observe(region);
  const lost = (event: Event): void => { event.preventDefault(); dispose(); };
  function dispose(): void {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(raf); clock.stop(); observer.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', sync);
    canvas.removeEventListener('webglcontextlost', lost);
    for (const geometry of [ringGeometry, trimGeometry, strutGeometry, coreGeometry]) geometry.dispose();
    for (const material of [steel, edge, dark]) material.dispose();
    renderer.dispose(); renderer.forceContextLoss(); scene.clear(); canvas.remove();
    mount.style.visibility = 'hidden';
    document.documentElement.classList.remove('webgl-ready');
  }
  canvas.addEventListener('webglcontextlost', lost);
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', sync);
  mount.append(canvas); resize();
  document.documentElement.classList.add('webgl-ready');
  return { pose, dispose };
}
