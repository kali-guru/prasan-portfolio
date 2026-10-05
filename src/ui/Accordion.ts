export function initAccordion(): void {
  const details = Array.from(document.querySelectorAll<HTMLDetailsElement>('.accordion details'));
  const panels = Array.from(document.querySelectorAll<SVGSVGElement>('[data-media]'));
  const show = (name: string | undefined): void => {
    for (const panel of panels) panel.classList.toggle('is-active', panel.dataset.media === name);
  };
  for (const item of details) {
    item.addEventListener('toggle', () => {
      if (item.open) {
        for (const other of details) if (other !== item) other.open = false;
        show(item.dataset.scene);
      } else if (!details.some((other) => other.open)) show(undefined);
    });
  }
}
