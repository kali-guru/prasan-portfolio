export function initHeader(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const dialog = document.querySelector<HTMLDialogElement>('#mobile-menu');
  const close = dialog?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!toggle || !dialog || !close || typeof dialog.showModal !== 'function') return;
  const mobile = window.matchMedia('(max-width: 760px)');
  toggle.hidden = false;
  document.documentElement.classList.add('header-enhanced');
  const closeMenu = (): void => { if (dialog.open) dialog.close(); };
  toggle.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    close.focus();
  });
  close.addEventListener('click', closeMenu);
  // Native modal dialog makes the rest of the document inert and handles Escape.
  // This explicit Tab cycle keeps focus within the menu across browser versions.
  dialog.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return; }
    if (event.key !== 'Tab') return;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (mobile.matches) toggle.focus();
  });
  dialog.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
      const target = document.querySelector<HTMLElement>(link.hash);
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) closeMenu(); });
}
