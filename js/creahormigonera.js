function calcularVolumen() {
    // Obtener valores
    const largo = parseFloat(document.getElementById('largo').value);
    const ancho = parseFloat(document.getElementById('ancho').value);
    const espesor = parseFloat(document.getElementById('espesor').value);
    
    // Validación básica
    if (!largo || !ancho || !espesor) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    if (largo <= 0 || ancho <= 0 || espesor <= 0) {
        alert('Los valores deben ser mayores a cero.');
        return;
    }
    
    // VALIDACIÓN DE SEGURIDAD - Espesor
    if (espesor > 2) {
        alert('⚠️ Parece que ingresaste metros enteros en el campo "Espesor".\n\nPara 10 centímetros, escribe: 0.10\nPara 15 centímetros, escribe: 0.15\n\nPor favor, corrige el valor.');
        return;
    }
    
    // Cálculo del volumen
    const volumen = (largo * ancho * espesor).toFixed(2);
    
    // Mostrar resultado
    const resultadoDiv = document.getElementById('resultado');
    const resultadoContenido = document.getElementById('resultado-contenido');
    
    resultadoDiv.style.display = 'block';
    
    // Verificar pedido mínimo
    if (volumen < 5) {
        resultadoDiv.className = 'resultado resultado-alerta';
        resultadoContenido.innerHTML = `
            <h3>⚠️ Volumen calculado: ${volumen} m³</h3>
            <p><strong>El pedido mínimo es de 5 metros cúbicos.</strong></p>
            <p>Te recomendamos ajustar las dimensiones o consultar con nuestro equipo para opciones especiales.</p>
        `;
    } else {
        resultadoDiv.className = 'resultado resultado-exito';
        const mensajeWhatsApp = `Hola, calculé que necesito ${volumen} m³ de hormigón premezclado. ¿Podrían darme más información y cotización?`;
        const urlWhatsApp = `https://wa.me/593997528670?text=${encodeURIComponent(mensajeWhatsApp)}`;
        
        resultadoContenido.innerHTML = `
            <h3>✅ Volumen calculado: ${volumen} m³</h3>
            <p>¡Perfecto! Cumples con el pedido mínimo.</p>
            <a href="${urlWhatsApp}" class="btn-glossy btn-whatsapp" target="_blank">
                <i class="fa-brands fa-whatsapp"></i> Solicitar Cotización por WhatsApp
            </a>
        `;
    }
    
    // Scroll suave al resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
    // Permitir calcular con Enter
    document.addEventListener('DOMContentLoaded', function() {
        const inputs = document.querySelectorAll('. calculator-form input');
        inputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calcularVolumen();
                }
            });
        });


    });
    // VIDEO SMART - AUTOPLAY Y ACTIVAR SONIDO
        document.addEventListener("DOMContentLoaded", function() {
            const video = document.getElementById("miVideoSmart");   
            
            // 1. AUTOPLAY AL HACER SCROLL
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // Si el video no tiene sonido activo aún...
                    if (!video.dataset.soundActive) {
                        if (entry.isIntersecting) {
                            video.play().catch(e => console.log("Esperando interacción"));
                        } else {
                            video.pause();
                        }
                    }
                });
            }, { threshold: 0.5 }); // Se activa al ver el 50%

            observer.observe(video);
        });

        // 2. ACTIVAR SONIDO Y REINICIAR CON FUERZA
        function activarExperiencia() {
            const video = document.getElementById("miVideoSmart");
            const overlay = document.getElementById("overlaySonido");

            video.muted = false; // Quita silencio
            video.currentTime = 0; // Reinicia para impacto
            video.volume = 1.0;
            video.play();
            
            // Marca que el usuario ya interactuó
            video.dataset.soundActive = "true";

            // Oculta el botón suavemente
            overlay.classList.add("video-activo");
        }
// Variable para guardar el observador y poder detenerlo luego
        let videoObserver;

        document.addEventListener("DOMContentLoaded", function() {
            const video = document.getElementById("miVideoSmart");
            
            // 1. CONFIGURACIÓN DEL SENSOR DE SCROLL
            videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // Solo actúa si el usuario NO ha activado el sonido todavía
                    if (!video.controls) {
                        if (entry.isIntersecting) {
                            video.play().catch(e => console.log("Esperando interacción"));
                        } else {
                            video.pause();
                        }
                    }
                });
            }, { threshold: 0.5 }); // 50% visible

            videoObserver.observe(video);
        });

        // 2. FUNCIÓN: CUANDO EL USUARIO TOMA EL CONTROL
        function activarExperiencia() {
            const video = document.getElementById("miVideoSmart");
            const overlay = document.getElementById("overlaySonido");

            // A) Configuramos el video para uso manual
            video.muted = false;       // Activamos sonido
            video.currentTime = 0;     // Reiniciamos desde el principio
            video.volume = 1.0;
            video.controls = true;     // <--- ¡AQUÍ ESTÁ LA MAGIA! (Aparecen pausa, volumen, etc)
            
            // B) Reproducimos
            video.play();

            // C) Ocultamos el botón rojo y desconectamos el sensor automático
            overlay.classList.add("video-activo");
            
            // "Matamos" el sensor de scroll para que no moleste más
            if (videoObserver) {
                videoObserver.disconnect();
            }
        }

// MENU HAMBURGUESA MÓVIL
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
        });
    }
});

// =========================================
// COBERTURA SECTION — Scroll Reveal
// =========================================
(function () {
    'use strict';

    function initCoberturaReveal() {
        const targets = document.querySelectorAll(
            '.cobertura-nueva-texto.reveal-ready, .cobertura-nueva-imagen.reveal-ready'
        );

        if (!targets.length || !('IntersectionObserver' in window)) {
            // Fallback: just show everything immediately
            targets.forEach(el => {
                el.style.opacity = '1';
                el.classList.remove('reveal-ready');
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Remove the "hidden" class so the animation can set opacity itself
                    el.classList.remove('reveal-ready');
                    el.classList.add('reveal-active');
                    observer.unobserve(el); // fire once only
                }
            });
        }, {
            threshold: 0.15,    // trigger when 15 % of the element is visible
            rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(el => observer.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCoberturaReveal);
    } else {
        initCoberturaReveal();
    }
}());

// =========================================
// FLOATING WHATSAPP BUTTON — Controller
// =========================================
(function () {
    'use strict';

    var TOOLTIP_SHOWN_KEY = 'waTooltipShown';

    function initFloatingWA() {
        var wrapper = document.getElementById('waFloatWrapper');
        var tooltip = document.getElementById('waTooltip');

        if (!wrapper) return;

        // 1. Entrance: show button after 800 ms page load
        setTimeout(function () {
            wrapper.classList.add('wa-visible');
        }, 800);

        // 2. Tooltip: show once per session, 2.5 s after entrance
        var alreadyShown = sessionStorage.getItem(TOOLTIP_SHOWN_KEY);

        if (!alreadyShown && tooltip) {
            setTimeout(function () {
                // Show
                tooltip.classList.add('wa-tooltip-show');

                // Auto-hide after 3 s
                setTimeout(function () {
                    tooltip.classList.remove('wa-tooltip-show');
                    tooltip.classList.add('wa-tooltip-hide');
                    sessionStorage.setItem(TOOLTIP_SHOWN_KEY, '1');
                }, 3000);

            }, 2500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloatingWA);
    } else {
        initFloatingWA();
    }
}());

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
