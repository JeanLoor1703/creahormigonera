(() => {
  const portfolio = document.querySelector('[data-project-portfolio]');
  if (!portfolio) return;

  const stories = [...portfolio.querySelectorAll('[data-project-story]')];
  const selectors = [...portfolio.querySelectorAll('[data-project-select]')];
  const stage = portfolio.querySelector('[data-project-stage]');
  const count = portfolio.querySelector('[data-project-count]');
  const status = portfolio.querySelector('[data-project-status]');
  const toggle = portfolio.querySelector('[data-project-toggle]');
  const progress = portfolio.querySelector('[data-project-progress]');
  const progressFill = portfolio.querySelector('[data-project-progress-fill]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const viewer = document.querySelector('[data-project-viewer]');
  const STILL_DURATION = 5000;
  let active = 0;
  let requested = 0;
  let navigation = 0;
  let pointerStart = null;
  let suppressClickUntil = 0;
  let lastPhotoLink = null;
  let viewerPhotos = [];
  let viewerIndex = 0;
  let previousOverflow = '';
  let userPaused = reduceMotion.matches;
  let inViewport = !('IntersectionObserver' in window);
  let remaining = STILL_DURATION;
  let deadline = 0;
  let timer = 0;
  let frame = 0;
  let videoFallback = false;

  const activeVideo = () => stories[active]?.querySelector('video') || null;
  const isSuspended = () => userPaused || !inViewport || document.hidden || Boolean(viewer?.open);

  stories.forEach((story, index) => { story.hidden = index !== 0; });
  portfolio.classList.add('is-enhanced');
  portfolio.querySelector('.project-selectors').hidden = false;
  portfolio.querySelector('.portfolio-controls').hidden = false;
  progress.hidden = false;

  function setToggleState() {
    const running = !userPaused;
    toggle.textContent = running ? 'Pausar recorrido' : 'Continuar recorrido';
    toggle.setAttribute('aria-pressed', String(running));
    toggle.setAttribute('aria-label', running ? 'Pausar recorrido automático' : 'Continuar recorrido automático');
  }

  function setProgress(value) {
    const normalized = Math.max(0, Math.min(1, value || 0));
    progressFill.style.transform = `scaleX(${normalized})`;
    progress.setAttribute('aria-valuenow', String(Math.round(normalized * 100)));
  }

  function clearClock() {
    window.clearTimeout(timer);
    window.cancelAnimationFrame(frame);
    timer = 0;
    frame = 0;
  }

  function animateStillProgress() {
    if (isSuspended() || !deadline || activeVideo()) return;
    const left = Math.max(0, deadline - performance.now());
    remaining = left;
    setProgress(1 - left / STILL_DURATION);
    if (left <= 0) {
      advanceAutomatically();
      return;
    }
    frame = requestAnimationFrame(animateStillProgress);
  }

  function scheduleStill(continueFromSaved = false) {
    clearClock();
    const duration = continueFromSaved ? remaining : STILL_DURATION;
    remaining = duration;
    deadline = performance.now() + duration;
    timer = window.setTimeout(advanceAutomatically, duration);
    animateStillProgress();
  }

  function updateVideoProgress() {
    const video = activeVideo();
    if (!video || videoFallback) return;
    const ratio = Number.isFinite(video.duration) && video.duration > 0 ? video.currentTime / video.duration : 0;
    setProgress(ratio);
  }

  function pauseVideo(video) {
    if (!video || video.paused) return;
    video.__portfolioProgrammaticPause = true;
    video.pause();
  }

  function resetVideo(video) {
    if (!video) return;
    pauseVideo(video);
    try { video.currentTime = 0; } catch { /* metadata may not be available yet */ }
  }

  function startVideoFallback() {
    videoFallback = true;
    const video = activeVideo();
    pauseVideo(video);
    remaining = STILL_DURATION;
    setProgress(0);
    if (!isSuspended()) scheduleStill(false);
  }

  function tryPlayVideo(video) {
    if (!video || videoFallback || isSuspended() || !video.paused) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    let play;
    try { play = video.play(); } catch { startVideoFallback(); return; }
    if (play?.catch) play.catch(startVideoFallback);
  }

  function reconcilePlayback() {
    clearClock();
    const video = activeVideo();
    if (isSuspended()) {
      if (video && videoFallback) {
        remaining = Math.max(0, deadline ? deadline - performance.now() : remaining);
        deadline = 0;
      } else if (!video && deadline) {
        remaining = Math.max(0, deadline - performance.now());
        deadline = 0;
        setProgress(1 - remaining / STILL_DURATION);
      }
      pauseVideo(video);
      return;
    }
    if (video) {
      if (videoFallback) scheduleStill(true);
      else tryPlayVideo(video);
    } else {
      scheduleStill(true);
    }
  }

  function advanceAutomatically() {
    if (isSuspended()) return;
    remaining = STILL_DURATION;
    deadline = 0;
    showProject(active + 1, false);
  }

  async function showProject(index, announce = true) {
    requested = (index + stories.length) % stories.length;
    const destination = requested;
    const request = ++navigation;
    clearClock();
    deadline = 0;
    if (destination === active) {
      remaining = STILL_DURATION;
      videoFallback = false;
      setProgress(0);
      reconcilePlayback();
      return;
    }
    const oldVideo = activeVideo();
    if (oldVideo) resetVideo(oldVideo);
    const next = stories[destination];
    await Promise.all([...next.querySelectorAll('img')].map(image => {
      image.loading = 'eager';
      return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
    }));
    if (request !== navigation) return;
    stories[active].hidden = true;
    stories[active].classList.remove('is-entering');
    active = destination;
    next.hidden = false;
    if (!reduceMotion.matches) next.classList.add('is-entering');
    selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === active)));
    count.innerHTML = `${String(active + 1).padStart(2, '0')} <span>/ ${String(stories.length).padStart(2, '0')}</span>`;
    status.textContent = `${next.dataset.projectName} · ${active + 1} de ${stories.length}`;
    status.setAttribute('aria-live', announce ? 'polite' : 'off');
    remaining = STILL_DURATION;
    videoFallback = false;
    deadline = 0;
    setProgress(0);
    reconcilePlayback();
  }

  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    setToggleState();
    reconcilePlayback();
  });
  selectors.forEach((button, index) => button.addEventListener('click', () => showProject(index)));
  portfolio.querySelector('[data-project-prev]').addEventListener('click', () => showProject(requested - 1));
  portfolio.querySelector('[data-project-next]').addEventListener('click', () => showProject(requested + 1));
  portfolio.addEventListener('keydown', event => {
    if (event.target.closest('video') || event.altKey || event.ctrlKey || event.metaKey) return;
    let destination;
    if (event.key === 'ArrowRight') destination = requested + 1;
    else if (event.key === 'ArrowLeft') destination = requested - 1;
    else if (event.key === 'Home') destination = 0;
    else if (event.key === 'End') destination = stories.length - 1;
    else return;
    event.preventDefault();
    if (event.target.closest('[data-project-story]') || event.target.matches('[data-project-select]')) {
      selectors[(destination + stories.length) % stories.length].focus({ preventScroll: true });
    }
    showProject(destination);
  });

  stage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || event.target.closest('video')) return;
    pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  stage.addEventListener('pointercancel', () => { pointerStart = null; });
  stage.addEventListener('pointerup', event => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClickUntil = performance.now() + 500;
      showProject(requested + (dx < 0 ? 1 : -1));
    }
  });

  function renderViewerPhoto() {
    const link = viewerPhotos[viewerIndex];
    const original = link.querySelector('img');
    const image = viewer.querySelector('[data-viewer-image]');
    image.src = link.href;
    image.alt = original.alt;
    image.width = original.width;
    image.height = original.height;
    viewer.querySelector('[data-viewer-caption]').textContent = link.closest('figure').querySelector('figcaption').textContent;
    viewer.querySelector('[data-viewer-count]').textContent = `${viewerIndex + 1} de ${viewerPhotos.length}`;
    viewer.querySelector('[data-viewer-prev]').hidden = viewerPhotos.length < 2;
    viewer.querySelector('[data-viewer-next]').hidden = viewerPhotos.length < 2;
  }

  portfolio.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) { event.preventDefault(); return; }
    const link = event.target.closest('[data-project-photo]');
    if (!link || !viewer || typeof viewer.showModal !== 'function') return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    lastPhotoLink = link;
    viewerPhotos = [...stories[active].querySelectorAll('[data-project-photo]')];
    viewerIndex = viewerPhotos.indexOf(link);
    viewer.querySelector('#project-viewer-title').textContent = stories[active].dataset.projectName;
    renderViewerPhoto();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    viewer.showModal();
    viewer.querySelector('[data-viewer-close]').focus();
    reconcilePlayback();
  });
  if (viewer) {
    const stepPhoto = direction => {
      viewerIndex = (viewerIndex + direction + viewerPhotos.length) % viewerPhotos.length;
      renderViewerPhoto();
    };
    viewer.querySelector('[data-viewer-close]').addEventListener('click', () => viewer.close());
    viewer.querySelector('[data-viewer-prev]').addEventListener('click', () => stepPhoto(-1));
    viewer.querySelector('[data-viewer-next]').addEventListener('click', () => stepPhoto(1));
    viewer.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      stepPhoto(event.key === 'ArrowLeft' ? -1 : 1);
    });
    viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
    viewer.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      lastPhotoLink?.focus({ preventScroll: true });
      reconcilePlayback();
    });
  }

  stories.flatMap(story => [...story.querySelectorAll('video')]).forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.addEventListener('timeupdate', updateVideoProgress);
    video.addEventListener('durationchange', updateVideoProgress);
    video.addEventListener('ended', () => {
      if (video === activeVideo() && !isSuspended()) advanceAutomatically();
    });
    video.addEventListener('error', () => {
      if (video === activeVideo() && !isSuspended()) startVideoFallback();
    });
    video.addEventListener('pause', () => {
      if (video.__portfolioProgrammaticPause) {
        video.__portfolioProgrammaticPause = false;
        return;
      }
      if (video === activeVideo() && !isSuspended() && !video.ended) {
        userPaused = true;
        setToggleState();
        clearClock();
      }
    });
    video.addEventListener('play', () => {
      if (video === activeVideo() && !isSuspended()) {
        userPaused = false;
        setToggleState();
      }
    });
  });

  document.addEventListener('visibilitychange', reconcilePlayback);
  reduceMotion.addEventListener?.('change', event => {
    if (event.matches) {
      userPaused = true;
      setToggleState();
      reconcilePlayback();
    }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inViewport = entries[0]?.isIntersecting ?? false;
      reconcilePlayback();
    }, { threshold: 0.1 });
    observer.observe(portfolio);
  }

  setToggleState();
  setProgress(0);
  reconcilePlayback();
})();
