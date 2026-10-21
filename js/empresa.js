const brandPanel = document.querySelector('.brand-panel');
const plantGallery = document.querySelector('.plant-gallery');
const motionTargets = [brandPanel, plantGallery].filter(Boolean);

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
