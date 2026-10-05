export function initLocalTime(): void {
  const time = document.querySelector<HTMLTimeElement>('#local-time');
  if (!time) return;
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const update = (): void => {
    const now = new Date();
    time.textContent = formatter.format(now) + ' NPT';
    time.dateTime = now.toISOString();
  };
  let timer: ReturnType<typeof setInterval> | undefined;
  const resume = (): void => {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
    if (!document.hidden) { update(); timer = setInterval(update, 30000); }
  };
  document.addEventListener('visibilitychange', resume);
  resume();
}
