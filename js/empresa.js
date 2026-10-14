const brandPanel = document.querySelector('.brand-panel');
const plantGallery = document.querySelector('.plant-gallery');
const motionTargets = [brandPanel, plantGallery].filter(Boolean);

const book = document.querySelector('.brand-book');
if (book) {
  const pages = [...book.querySelectorAll('[data-book-page]')];
  const previous = book.querySelector('[data-book-previous]');
  const next = book.querySelector('[data-book-next]');
  const count = book.querySelector('[data-book-count]');
  const viewport = book.querySelector('.brand-book__viewport');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let page = 0;
  let turning = false;
  let visible = !('IntersectionObserver' in window);
  let hovered = false;
  let focused = false;
  let timer;
  const scheduleTurn = () => {
    window.clearTimeout(timer);
    if (!visible || hovered || focused || document.hidden || reducedMotion.matches || turning) return;
    timer = window.setTimeout(() => turnTo((page + 1) % pages.length, true), 5000);
  };
  const showPage = (target) => {
    pages[page].hidden = true;
    pages[target].hidden = false;
    page = target;
    count.textContent = `${page + 1} de ${pages.length}`;
    previous.disabled = page === 0;
    next.disabled = page === pages.length - 1;
  };
  const turnTo = (target, automatic = false) => {
    if (turning || target < 0 || target >= pages.length || target === page) return;
    window.clearTimeout(timer);
    if (reducedMotion.matches) {
      showPage(target);
      return;
    }
    turning = true;
    const direction = automatic || target > page ? 'next' : 'previous';
    const leaf = pages[page].cloneNode(true);
    leaf.removeAttribute('hidden');
    leaf.classList.add('brand-book__turning', `brand-book__turning--${direction}`);
    leaf.setAttribute('aria-hidden', 'true');
    leaf.setAttribute('inert', '');
    viewport.append(leaf);
    showPage(target);
    const finish = () => {
      leaf.remove();
      turning = false;
      scheduleTurn();
    };
    leaf.addEventListener('animationend', finish, { once: true });
  };
  previous.addEventListener('click', () => turnTo(page - 1));
  next.addEventListener('click', () => turnTo(page + 1));
  book.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      turnTo(page + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  book.addEventListener('mouseenter', () => { hovered = true; scheduleTurn(); });
  book.addEventListener('mouseleave', () => { hovered = false; scheduleTurn(); });
  book.addEventListener('focusin', () => { focused = true; scheduleTurn(); });
  book.addEventListener('focusout', () => {
    window.setTimeout(() => { focused = book.contains(document.activeElement); scheduleTurn(); }, 0);
  });
  document.addEventListener('visibilitychange', scheduleTurn);
  reducedMotion.addEventListener('change', scheduleTurn);
  if ('IntersectionObserver' in window) {
    const bookObserver = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.35;
      scheduleTurn();
    }, { threshold: [0, 0.35, 0.6] });
    bookObserver.observe(book);
  }
  scheduleTurn();
}

const plantVideo = document.querySelector('.plant-video video');
if (plantVideo) {
  plantVideo.muted = true;
  plantVideo.loop = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const playVisibleVideo = () => {
    if (!reducedMotion.matches && !document.hidden) {
      plantVideo.play().catch(() => {});
    }
  };
  let videoVisible = false;
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(([entry]) => {
      videoVisible = entry.isIntersecting;
      if (videoVisible) playVisibleVideo();
      else plantVideo.pause();
    }, { threshold: 0.25 });
    videoObserver.observe(plantVideo);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) plantVideo.pause();
    else if (videoVisible) playVisibleVideo();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) plantVideo.pause();
    else if (videoVisible) playVisibleVideo();
  });
}

if (motionTargets.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });

  for (const target of motionTargets) {
    target.classList.add('is-pending');
    observer.observe(target);
  }
}
