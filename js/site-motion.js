(() => {
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealSelector = '.section-head, .tile, .fact, .split > *, .process article, .advice-band, .product-delivery__heading, .project-card, .coverage-card, .coverage-reach__copy, .coverage-reach__photo, .guide-card, .producto-card, .empresa-card, .p-card, .equipo-grid > *, .ciudades-grid li, .info-card';

if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const elements = [...document.querySelectorAll(revealSelector)];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  elements.forEach((element, index) => {
    element.classList.add('motion-reveal');
    element.style.setProperty('--motion-delay', `${(index % 4) * 75}ms`);
    observer.observe(element);
  });
}
})();
