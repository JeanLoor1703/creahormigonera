const fs = require('fs');

// 1. Append JS script
const jsToAppend = `

// =========================================
// INTERCEPTACIÓN GLOBAL FAIL-SAFE DE BOTONES
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los enlaces trackeables
    const trackableSelectors = [
        'a.btn-quote-main', 
        'a.btn-whatsapp', 
        'a.social-btn', 
        'a.btn-glossy', 
        'a.btn-wa-micro',
        '#waFloatBtn'
    ];
    
    const trackableLinks = document.querySelectorAll(trackableSelectors.join(', '));

    trackableLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir navegación inmediata
            
            const url = this.getAttribute('href');
            if (!url || url === '#') return;
            
            const target = this.getAttribute('target');
            const isWaMeOrSocial = url.includes('wa.me') || url.includes('facebook.com') || url.includes('instagram.com') || url.includes('tiktok.com');
            const finalTarget = (target === '_blank' || isWaMeOrSocial) ? '_blank' : '_self';
            
            let called = false;
            
            const doNavigation = function() {
                if (!called) {
                    called = true;
                    if (finalTarget === '_blank') {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }
            };

            // Timeout de Seguridad de 300ms
            setTimeout(doNavigation, 300);

            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-17780502582/Z5sSCOOlp-0bELbgs55C',
                    'event_callback': doNavigation
                });
            } else {
                doNavigation();
            }
        });
    });
});
`;
fs.appendFileSync('js/creahormigonera.js', jsToAppend);

// 2. Append CSS rules
const cssToAppend = `

/* =========================================
   FIXES ADICIONALES (Resistencias, Sociales, Solapamiento)
   ========================================= */

/* Pointer-events: none para los iconos internos de los botones glossy (H-180 a H-280) */
.btn-glossy i, 
.btn-glossy img,
.btn-glossy span {
    pointer-events: none;
}

/* Área de clic garantizada de 44x44 en móviles para .social-btn */
.social-btn {
    min-width: 44px;
    min-height: 44px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

/* Solapamiento: Agregar espacio en móviles al final de contacto para que el botón flotante no tape el botón grande */
@media (max-width: 768px) {
    .contacto-info {
        padding-bottom: 80px; /* Espacio extra para el botón flotante de WhatsApp */
    }
}
`;
fs.appendFileSync('styles/creahormigonera.css', cssToAppend);

console.log('Appended JS and CSS fixes successfully.');
