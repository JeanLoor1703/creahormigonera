/* Preferencias de privacidad compartidas por las páginas de Creacom. */
(() => {
  'use strict';

  const key = 'creacom_privacy_v1';
  const maxAge = 180 * 24 * 60 * 60 * 1000;
  const googleAdsId = 'AW-17780502582';
  // Completar cuando Creacom facilite el ID de medición de su propiedad GA4.
  const ga4Id = '';
  // Completar solo si Creacom decide instalar Meta Pixel.
  const metaPixelId = '';
  const hasAnalytics = /^G-[A-Z0-9]+$/.test(ga4Id);
  const configuration = `${ga4Id}|${metaPixelId}`;
  let current = null;
  let tagLoaded = false;
  let metaLoaded = false;

  const readChoice = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved?.version === 1 && saved.configuration === configuration && Date.now() - saved.date < maxAge) {
        return { analytics: saved.analytics === true, marketing: saved.marketing === true };
      }
    } catch (_) { /* El sitio sigue funcionando sin almacenamiento local. */ }
    return null;
  };

  const clearOptionalCookies = () => {
    document.cookie.split(';').forEach((item) => {
      const name = item.split('=')[0].trim();
      if (!/^(_ga|_gid|_gcl_|_fbp$|_fbc$)/.test(name)) return;
      const host = location.hostname.split('.');
      const domains = ['', location.hostname, host.length > 2 ? host.slice(-2).join('.') : ''].filter(Boolean);
      ['', ...domains].forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
      });
    });
  };

  const applyChoice = (choice) => {
    if (!choice) return;
    window.CREACOM_PRIVACY = { analytics: choice.analytics, marketing: choice.marketing };
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', {
      analytics_storage: choice.analytics ? 'granted' : 'denied',
      ad_storage: choice.marketing ? 'granted' : 'denied',
      ad_user_data: choice.marketing ? 'granted' : 'denied',
      ad_personalization: choice.marketing ? 'granted' : 'denied'
    });

    if ((choice.analytics && hasAnalytics) || choice.marketing) {
      if (!tagLoaded) {
        const id = choice.marketing ? googleAdsId : ga4Id;
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
        document.head.append(script);
        tagLoaded = true;
        window.gtag('js', new Date());
      }
      if (choice.analytics && hasAnalytics) window.gtag('config', ga4Id);
      if (choice.marketing) window.gtag('config', googleAdsId);
    }

    if (choice.marketing && /^\d+$/.test(metaPixelId) && !metaLoaded) {
      /* Meta solo se carga tras aceptar publicidad. */
      window.fbq = window.fbq || function () { (window.fbq.queue = window.fbq.queue || []).push(arguments); };
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.append(script);
      window.fbq('init', metaPixelId);
      window.fbq('track', 'PageView');
      metaLoaded = true;
    }
  };

  const saveChoice = (choice) => {
    const revoked = current && ((current.analytics && !choice.analytics) || (current.marketing && !choice.marketing));
    current = { analytics: hasAnalytics && choice.analytics, marketing: choice.marketing };
    try { localStorage.setItem(key, JSON.stringify({ version: 1, configuration, date: Date.now(), ...current })); } catch (_) { /* Sin persistencia. */ }
    if (revoked) {
      clearOptionalCookies();
      location.reload();
      return;
    }
    applyChoice(current);
    document.querySelector('.privacy-banner')?.remove();
    document.querySelector('.privacy-dialog')?.close();
  };

  const openSettings = () => {
    const dialog = document.querySelector('.privacy-dialog');
    if (!dialog) return;
    dialog.querySelector('[name="analytics"]').checked = current?.analytics === true;
    dialog.querySelector('[name="marketing"]').checked = current?.marketing === true;
    dialog.showModal();
  };

  const mount = () => {
    if (!document.querySelector('[data-privacy-settings]')) {
      document.body.insertAdjacentHTML('beforeend', '<nav class="privacy-standalone-links" aria-label="Privacidad"><a href="/privacidad/">Privacidad y cookies</a><a href="#" data-privacy-settings>Preferencias de privacidad</a></nav>');
    }
    document.querySelector('[data-load-map]')?.addEventListener('click', () => {
      const frame = document.querySelector('.contacto-mapa iframe[data-src]');
      if (!frame) return;
      frame.src = frame.dataset.src;
      frame.removeAttribute('data-src');
      document.querySelector('[data-map-consent]')?.remove();
    });
    document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="/styles/privacy-consent.css">');
    document.body.insertAdjacentHTML('beforeend', `
      <dialog class="privacy-dialog" aria-labelledby="privacy-dialog-title">
        <form method="dialog" class="privacy-dialog__inner">
          <div class="privacy-dialog__head"><span class="privacy-eyebrow">Creacom Hormigonera</span><button type="button" class="privacy-dialog__close" aria-label="Cerrar preferencias">×</button></div>
          <h2 id="privacy-dialog-title">Tus preferencias de privacidad</h2>
          <p>Elige qué datos de navegación podemos usar. Puedes cambiar esta decisión cuando quieras.</p>
          <div class="privacy-option"><div><strong>Necesarias</strong><small>Guardan tu elección y permiten funciones básicas.</small></div><span>Siempre activas</span></div>
          <label class="privacy-option"><div><strong>Analítica</strong><small>${hasAnalytics ? 'Nos ayuda a saber qué páginas son útiles y a mejorar la web.' : 'Disponible cuando conectemos Google Analytics.'}</small></div><input type="checkbox" name="analytics" aria-label="Permitir analítica" ${hasAnalytics ? '' : 'disabled'}></label>
          <label class="privacy-option"><div><strong>Publicidad</strong><small>Mide nuestros anuncios en Google y, si lo incorporamos, en Meta.</small></div><input type="checkbox" name="marketing" aria-label="Permitir publicidad"></label>
          <p class="privacy-dialog__link"><a href="/privacidad/#cookies">Lee nuestra política de privacidad y cookies</a></p>
          <div class="privacy-dialog__actions"><button type="button" data-privacy-reject>Rechazar opcionales</button><button type="button" class="privacy-primary" data-privacy-save>Guardar elección</button></div>
        </form>
      </dialog>`);
    const dialog = document.querySelector('.privacy-dialog');
    dialog.querySelector('.privacy-dialog__close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-privacy-reject]').addEventListener('click', () => saveChoice({ analytics: false, marketing: false }));
    dialog.querySelector('[data-privacy-save]').addEventListener('click', () => saveChoice({
      analytics: dialog.querySelector('[name="analytics"]').checked,
      marketing: dialog.querySelector('[name="marketing"]').checked
    }));
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-privacy-settings]')) { event.preventDefault(); openSettings(); }
    });

    // El sitio mantiene el acceso a preferencias y la política en el pie. El
    // aviso de consentimiento queda desactivado por ahora, a petición de Creacom.
  };

  current = readChoice();
  applyChoice(current);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
