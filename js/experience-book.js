(() => {
  const dialog = document.querySelector('#creacom-experience-book');
  const triggers = [...document.querySelectorAll('[data-experience-open]')];
  if (!dialog || !triggers.length || typeof dialog.showModal !== 'function') return;
  const stage = dialog.querySelector('.experience-book__stage');
  const spreads = [...dialog.querySelectorAll('[data-experience-spread]')];
  const previous = dialog.querySelector('[data-experience-previous]');
  const next = dialog.querySelector('[data-experience-next]');
  const status = dialog.querySelector('[data-experience-status]');
  const close = dialog.querySelector('[data-experience-close]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 700px)');
  let current = 0;
  let cleanup = () => {};
  let busy = false;
  let savedOverflow = '';
  let savedPadding = '';
  let touch = null;
  let activeTrigger = null;
  const show = (index) => {
    const activeControl = document.activeElement;
    spreads.forEach((spread, i) => { spread.hidden = i !== index; });
    current = index;
    previous.disabled = index === 0;
    next.disabled = index === spreads.length - 1;
    if (activeControl === next && next.disabled) previous.focus({ preventScroll: true });
    if (activeControl === previous && previous.disabled) next.focus({ preventScroll: true });
    status.textContent = `${index + 1} / ${spreads.length} · ${spreads[index].dataset.title}`;
    stage.scrollTop = 0;
  };
  const clone = (element) => {
    const copy = element.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.inert = true;
    copy.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
    return copy;
  };
  const animateLeaf = (front, back, direction, mask) => {
    busy = true;
    const leaf = document.createElement('div');
    leaf.className = `experience-book__leaf experience-book__leaf--${direction}`;
    leaf.setAttribute('aria-hidden', 'true');
    leaf.inert = true;
    leaf.append(clone(front), clone(back));
    let cover;
    if (mask) {
      cover = clone(mask);
      cover.classList.add('experience-book__mask');
      if (direction === 'previous') cover.classList.add('experience-book__mask--right');
      stage.append(cover);
    }
    stage.append(leaf);
    const timer = setTimeout(() => cleanup(), 650);
    cleanup = () => {
      clearTimeout(timer);
      leaf.remove();
      cover?.remove();
      dialog.classList.remove('is-opening');
      busy = false;
      cleanup = () => {};
    };
    leaf.addEventListener('animationend', event => { if (event.target === leaf) cleanup(); });
  };
  const turn = (index) => {
    if (busy || index < 0 || index >= spreads.length || index === current) return;
    const outgoing = spreads[current];
    const forward = index > current;
    show(index);
    if (reduced.matches) return;
    if (narrow.matches) {
      const incoming = spreads[index];
      incoming.classList.add('is-entering');
      busy = true;
      const timer = setTimeout(() => cleanup(), 450);
      cleanup = () => { clearTimeout(timer); incoming.classList.remove('is-entering'); busy = false; cleanup = () => {}; };
      return;
    }
    animateLeaf(outgoing.children[forward ? 1 : 0], spreads[index].children[forward ? 0 : 1], forward ? 'next' : 'previous', outgoing.children[forward ? 0 : 1]);
  };
  triggers.forEach(trigger => {
    trigger.hidden = false;
    trigger.addEventListener('click', () => {
      activeTrigger = trigger;
      savedOverflow = document.body.style.overflow;
      savedPadding = document.body.style.paddingRight;
      const gutter = innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + gutter}px`;
      document.body.style.overflow = 'hidden';
      show(0);
      dialog.showModal();
      close.focus({ preventScroll: true });
      if (!reduced.matches && !narrow.matches) {
        dialog.classList.add('is-opening');
        animateLeaf(spreads[0].children[0], spreads[0].children[0], 'next');
      }
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    cleanup();
    touch = null;
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPadding;
    activeTrigger?.focus({ preventScroll: true });
    activeTrigger = null;
  });
  previous.addEventListener('click', () => turn(current - 1));
  next.addEventListener('click', () => turn(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      turn(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button:not(:disabled), a[href]')].filter(el => el.getClientRects().length);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!dialog.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  stage.addEventListener('touchstart', event => {
    if (event.touches.length !== 1 || event.target.closest('a, button')) { touch = null; return; }
    touch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touch) return;
    const dx = event.changedTouches[0].clientX - touch.x;
    const dy = event.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { touch = null; }, { passive: true });
  reduced.addEventListener('change', () => cleanup());
  narrow.addEventListener('change', () => cleanup());
})();
