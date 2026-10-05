export function initProjectPicker(): void {
  const items = Array.from(document.querySelectorAll<HTMLLIElement>('.project-list li'));
  const label = document.querySelector<HTMLElement>('#project-label');
  const action = document.querySelector<HTMLAnchorElement>('#project-action');
  if (!label || !action || items.length === 0) return;
  const activate = (item: HTMLLIElement): void => {
    const link = item.querySelector<HTMLAnchorElement>('a');
    if (!link) return;
    const activeIndex = items.indexOf(item);
    items.forEach((other, index) => {
      other.classList.toggle('is-active', other === item);
      other.style.setProperty('--distance', String(Math.abs(index - activeIndex)));
    });
    label.textContent = (item.dataset.category ?? '') + ' / ' + (item.dataset.year ?? '');
    action.href = link.href;
    action.setAttribute('aria-label', 'View ' + (item.querySelector('h3')?.textContent ?? 'project'));
  };
  document.documentElement.classList.add('picker-on');
  for (const item of items) {
    item.addEventListener('pointerenter', () => activate(item));
    item.addEventListener('focusin', () => activate(item));
  }
  const first = items[0];
  if (first) activate(first);
  // Scroll selection shares the browser's visibility system, not another scroll listener.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (document.querySelector('.project-list :focus')) return;
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target instanceof HTMLLIElement) activate(entry.target);
      }
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    for (const item of items) observer.observe(item);
  }
}
