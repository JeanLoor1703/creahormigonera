const gallery = document.querySelector('.bombeo-photo');
const slides = [...document.querySelectorAll('[data-bombeo-slide]')];
const toggle = document.querySelector('[data-bombeo-toggle]');

if (gallery && slides.length > 1 && toggle) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const icon = toggle.querySelector('path');
  let current = 0;
  let timer;
  let inView = false;
  let pausedByUser = false;

  const canRotate = () => !document.hidden && inView && !pausedByUser && !reducedMotion.matches;
  const schedule = () => {
    window.clearTimeout(timer);
    if (!canRotate()) return;
    timer = window.setTimeout(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
      schedule();
    }, 4000);
  };

  toggle.addEventListener('click', () => {
    pausedByUser = !pausedByUser;
    toggle.setAttribute('aria-pressed', String(pausedByUser));
    toggle.setAttribute('aria-label', pausedByUser ? 'Reanudar cambio de imágenes' : 'Pausar cambio de imágenes');
    icon.setAttribute('d', pausedByUser ? 'M8 5l11 7-11 7V5Z' : 'M8 5v14M16 5v14');
    schedule();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    }, { threshold: 0.25 }).observe(gallery);
  }

  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      slides[current].classList.remove('is-active');
      current = 0;
      slides[current].classList.add('is-active');
    }
    schedule();
  });
}
