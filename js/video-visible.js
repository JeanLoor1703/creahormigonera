const operationVideos = [...document.querySelectorAll('[data-visible-video]')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const visibility = new Map(operationVideos.map((video) => [video, 0]));

for (const video of operationVideos) {
  video.muted = true;
  video.loop = true;
  video.addEventListener('play', () => {
    for (const other of operationVideos) if (other !== video) other.pause();
  });
}

const updateVideos = () => {
  if (document.hidden) {
    for (const video of operationVideos) video.pause();
    return;
  }
  const best = [...visibility].sort((a, b) => b[1] - a[1])[0];
  for (const video of operationVideos) {
    if (video !== best?.[0] || visibility.get(video) < 0.25) video.pause();
  }
  if (!motionPreference.matches && best?.[1] >= 0.25) {
    best[0].play().catch(() => {
      // Los controles permiten reproducirlo si el navegador bloquea la reproducción automática.
    });
  }
};

if (operationVideos.length && 'IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) visibility.set(entry.target, entry.intersectionRatio);
    updateVideos();
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  for (const video of operationVideos) videoObserver.observe(video);
}

document.addEventListener('visibilitychange', updateVideos);
motionPreference.addEventListener('change', updateVideos);

const deliverySection = document.querySelector('.product-delivery');
if (deliverySection && 'IntersectionObserver' in window && !motionPreference.matches) {
  deliverySection.classList.add('has-motion');
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  for (const item of deliverySection.querySelectorAll('[data-operation-reveal]')) revealObserver.observe(item);
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches) deliverySection.classList.remove('has-motion');
  });
}