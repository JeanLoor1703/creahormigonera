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
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.calculator-form input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                calcularVolumen();
            }
        });
    });


});
// VIDEO SMART - AUTOPLAY Y ACTIVAR SONIDO
document.addEventListener("DOMContentLoaded", function () {
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

document.addEventListener("DOMContentLoaded", function () {
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
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir navegación inmediata

            const url = this.getAttribute('href');
            if (!url || url === '#') return;

            const target = this.getAttribute('target');
            const isWaMeOrSocial = url.includes('wa.me') || url.includes('facebook.com') || url.includes('instagram.com') || url.includes('tiktok.com');
            const finalTarget = (target === '_blank' || isWaMeOrSocial) ? '_blank' : '_self';

            let called = false;

            const doNavigation = function () {
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
// --- CONFIGURACIÓN DEL ASISTENTE VIRTUAL ---
// El proveedor y su clave viven en el Cloudflare Worker, nunca en el
// JavaScript público de este sitio estático.
const CHAT_ENDPOINT = window.CREACOM_CHAT_ENDPOINT || "https://creacom-chat-api.creacom-chat.workers.dev";

// Historial de conversación completo para memoria de acero
let conversationHistory = [];
let isSendingMessage = false;

// El prompt activo está en la función Edge para que no se exponga ni se pueda alterar desde el navegador.

// --- FUNCIÓN PARA ENVIAR MENSAJE ---
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const sendButton = document.getElementById('chatbot-send');
    const text = input ? input.value.trim() : "";

    if (!text || isSendingMessage) return;

    isSendingMessage = true;
    if (sendButton) sendButton.disabled = true;

    // 1. Mostrar mensaje del usuario
    appendMessage('user', text);
    input.value = '';
    input.focus();

    // 2. Agregar al historial
    conversationHistory.push({ role: "user", content: text });

    // 3. Mostrar indicador de escritura
    const typingIndicator = showTypingIndicator();

    try {
        // La función Edge decide el proveedor (Groq/OpenAI-compatible) y
        // conserva la clave fuera del navegador.
        let response;
        const MAX_ATTEMPTS = 2;

        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 25000);
            try {
                response = await fetch(CHAT_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: conversationHistory
                    }),
                    signal: controller.signal
                });
            } catch (err) {
                if (attempt < MAX_ATTEMPTS) {
                    await new Promise(function (r) { setTimeout(r, 1000); });
                    continue;
                }
                throw err;
            } finally {
                clearTimeout(timeoutId);
            }

            if ((response.status === 429 || response.status >= 500) && attempt < MAX_ATTEMPTS) {
                await new Promise(function (r) { setTimeout(r, 1000); });
                continue;
            }

            break;
        }

        removeTypingIndicator(typingIndicator);

        if (!response || !response.ok) {
            const detail = response ? await response.text() : "sin respuesta";
            console.error("Chat API error", response?.status, detail);
            throw new Error(`Chat API respondió ${response?.status || "sin respuesta"}`);
        }

        const data = await response.json();
        const botText = typeof data.reply === "string"
            ? data.reply.trim()
            : data.choices?.[0]?.message?.content?.trim();

        if (!botText) throw new Error("La API no devolvió un mensaje");

        // 6. Guardar respuesta del bot en historial
        conversationHistory.push({ role: "assistant", content: botText });

        // 7. Mostrar respuesta
        appendMessage('bot', botText);

    } catch (error) {
        removeTypingIndicator(typingIndicator);
        console.error("No se pudo enviar el mensaje del chatbot", error);
        appendMessage('bot', "Ahora mismo no puedo responder desde el chat. Puedes continuar con un ingeniero por WhatsApp:", true);
    } finally {
        isSendingMessage = false;
        if (sendButton) sendButton.disabled = false;
    }
}

// --- INDICADOR DE ESCRITURA ---
function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    if (!container) return null;

    const div = document.createElement('div');
    div.className = 'msg bot-msg typing-indicator';
    div.innerHTML = `<i class="fa-solid fa-helmet-safety msg-icon"></i> <div class="typing-dots"><span></span><span></span><span></span></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function removeTypingIndicator(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
}

// --- FUNCIÓN DE INTERFAZ ---
function appendMessage(role, text, showWhatsappButton = false) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    let hasWhatsappButton = false;
    if (role === 'bot' && text.includes('[MOSTRAR_BOTON_WHATSAPP]')) {
        text = text.replace(/\[MOSTRAR_BOTON_WHATSAPP\]/g, '').trim();
        hasWhatsappButton = true;
    }
    hasWhatsappButton = hasWhatsappButton || showWhatsappButton;

    const div = document.createElement('div');
    div.className = 'msg ' + (role === 'user' ? 'user-msg' : 'bot-msg');

    if (role === 'user') {
        div.innerText = text;
    } else {
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-helmet-safety msg-icon';
        const content = document.createElement('div');
        content.textContent = text;
        div.append(icon, content);
    }

    container.appendChild(div);

    if (hasWhatsappButton) {
        const btnContainer = document.createElement('div');
        btnContainer.style.alignSelf = 'flex-start';
        btnContainer.style.marginLeft = '38px';
        btnContainer.style.marginBottom = '12px';
        btnContainer.style.marginTop = '-4px';
        btnContainer.style.animation = 'bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        btnContainer.innerHTML = `
            <a href="${buildWhatsappUrl()}" target="_blank" rel="noopener noreferrer" class="chatbot-wa-btn">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Hablar con un Ingeniero Asesor
            </a>
        `;
        container.appendChild(btnContainer);
    }

    container.scrollTop = container.scrollHeight;
}

function buildWhatsappUrl() {
    const recentMessages = conversationHistory
        .slice(-6)
        .map(message => `${message.role === 'user' ? 'Cliente' : 'Asistente'}: ${message.content}`)
        .join('\n');
    const message = `Hola, deseo una cotización de hormigón.\n\n${recentMessages}`.slice(0, 900);
    return `https://wa.me/593997528670?text=${encodeURIComponent(message)}`;
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    const cta = document.getElementById('chat-cta-bubble');
    const toggle = document.getElementById('chatbot-toggle');
    if (win) {
        const isHidden = (win.style.display === 'none' || win.style.display === '');
        win.style.display = isHidden ? 'flex' : 'none';
        win.setAttribute('aria-hidden', String(!isHidden));
        if (toggle) toggle.setAttribute('aria-expanded', String(isHidden));
        if (cta) cta.style.display = isHidden ? 'none' : 'block';
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const btnSend = document.getElementById('chatbot-send');
    if (btnSend) btnSend.onclick = sendMessage;

    const inputField = document.getElementById('chat-input');
    if (inputField) {
        inputField.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }

});

// ==============================================
// HERO COLLAGE ROTATION - ESCALONADO (6s, 7s, 8s)
// ==============================================
function initHeroGallery() {
    const slots = document.querySelectorAll('.hero-img-slot');
    if (!slots.length) return;

    // Tiempos independientes para cada imagen:
    // Slot 0 (Arriba grande): cada 5 segundos en mobile (requisito móvil), 6s en desktop
    // Slot 1 (Abajo izquierda): cada 7 segundos
    // Slot 2 (Abajo derecha): cada 8 segundos
    function getIntervals() {
        const isMobile = window.innerWidth <= 768;
        return [isMobile ? 5000 : 6000, 7000, 8000];
    }
    const INITIAL_DELAYS = [2000, 5000, 7500];
    const timers = [];
    let lastTransitionTime = 0;
    const MIN_GAP_MS = 1400; // Garantiza que jamás coincidan dos imágenes en el mismo instante

    // Precargar las imágenes secundarias en segundo plano para evitar parpadeos
    slots.forEach(slot => {
        const slides = slot.querySelectorAll('.hero-slide');
        slides.forEach(img => {
            if (img.src) {
                const preload = new Image();
                preload.src = img.src;
            }
        });
    });

    function transitionSlot(slot) {
        if (document.hidden) return;

        const now = Date.now();
        const timeSinceLast = now - lastTransitionTime;
        if (timeSinceLast < MIN_GAP_MS) {
            // Si otra imagen rotó hace menos de 1.4s, retrasar para mantener el desfase orgánico
            setTimeout(() => transitionSlot(slot), MIN_GAP_MS - timeSinceLast + 250);
            return;
        }

        const slides = slot.querySelectorAll('.hero-slide');
        if (slides.length < 2) return;

        const currentSlide = slot.querySelector('.hero-slide.active') || slides[0];
        let nextIndex = 0;
        slides.forEach((slide, idx) => {
            if (slide === currentSlide) {
                nextIndex = (idx + 1) % slides.length;
            }
        });

        const nextSlide = slides[nextIndex];
        if (!nextSlide || nextSlide === currentSlide) return;

        lastTransitionTime = Date.now();

        // Entra la siguiente imagen con escala y crossfade suave
        nextSlide.classList.remove('active');
        nextSlide.classList.add('incoming');

        // Tras 1.3s de transición, consolidar clases activas
        setTimeout(() => {
            nextSlide.classList.remove('incoming');
            nextSlide.classList.add('active');
            currentSlide.classList.remove('active');
        }, 1350);
    }

    function startRotations() {
        clearAllTimers();
        const intervals = getIntervals();
        slots.forEach((slot, index) => {
            const interval = intervals[index] || 6000;
            const initialDelay = INITIAL_DELAYS[index] || (2000 + index * 2000);

            // Primer cambio escalonado
            const initialTimer = setTimeout(() => {
                transitionSlot(slot);
                // Intervalo recurrente propio (6s, 7s, 8s)
                const intervalTimer = setInterval(() => {
                    transitionSlot(slot);
                }, interval);
                timers.push(intervalTimer);
            }, initialDelay);

            timers.push(initialTimer);

            // Permitir clic para cambiar de inmediato si el usuario lo desea
            slot.style.cursor = 'pointer';
            slot.title = 'Haz clic para alternar imagen';
            slot.onclick = () => transitionSlot(slot);
        });
    }

    function clearAllTimers() {
        while (timers.length > 0) {
            const t = timers.pop();
            clearTimeout(t);
            clearInterval(t);
        }
    }

    // Pausar si la pestaña se oculta y reiniciar de forma escalonada al volver
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearAllTimers();
        } else {
            startRotations();
        }
    });

    startRotations();
}

// Inicializar galería del hero cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroGallery);
} else {
    initHeroGallery();
}

// ==============================================
// SLIDER: EMPRESAS CON LAS QUE TRABAJAMOS (5s)
// ==============================================
let currentEmpresasGroup = 0;
let empresasTimer = null;
const EMPRESAS_INTERVAL = 5000;

function goToEmpresasGroup(targetIndex) {
    const groups = document.querySelectorAll('.empresas-group');
    if (!groups.length) return;

    currentEmpresasGroup = (targetIndex + groups.length) % groups.length;

    groups.forEach((g, idx) => {
        if (idx === currentEmpresasGroup) {
            g.classList.add('active');
        } else {
            g.classList.remove('active');
        }
    });

    resetEmpresasTimer();
}

function nextEmpresasGroup() {
    goToEmpresasGroup(currentEmpresasGroup + 1);
}

function prevEmpresasGroup() {
    goToEmpresasGroup(currentEmpresasGroup - 1);
}

function resetEmpresasTimer() {
    if (empresasTimer) clearInterval(empresasTimer);
    empresasTimer = setInterval(() => {
        if (!document.hidden) {
            nextEmpresasGroup();
        }
    }, EMPRESAS_INTERVAL);
}

function initEmpresasSlider() {
    const wrapper = document.getElementById('empresasHubWrapper');
    if (!wrapper) return;

    // Precarga de logos en segundo plano
    const logos = wrapper.querySelectorAll('.empresa-logo');
    logos.forEach(img => {
        if (img.src) {
            const p = new Image();
            p.src = img.src;
        }
    });

    // Iniciar temporizador automático de 5 segundos
    resetEmpresasTimer();

    // Soporte para gestos táctiles (Swipe horizontal) en móviles
    let touchStartX = 0;
    let touchStartY = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Si el desplazamiento horizontal es significativo y mayor al vertical
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
                nextEmpresasGroup();
            } else {
                prevEmpresasGroup();
            }
        }
    }, { passive: true });

    // Pausar rotación si la pestaña está oculta
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (empresasTimer) clearInterval(empresasTimer);
        } else {
            resetEmpresasTimer();
        }
    });
}

// Inicializar slider de empresas cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmpresasSlider);
} else {
    initEmpresasSlider();
}

/* ==================================================
   PROYECTOS EJECUTADOS - CASCADA DE TARJETAS 3D
   ================================================== */
function initProyectosCascada() {
    const stage = document.getElementById('proyectosStage');
    const deck = document.getElementById('proyectosDeck');
    const track = document.getElementById('proyectosTrack');
    const section = document.getElementById('proyectos');
    if (!stage || !deck) return;

    const cards = Array.from(deck.querySelectorAll('.p-card'));
    if (!cards.length) return;

    const badgeEl = document.getElementById('editorialBadge');
    const titleEl = document.getElementById('editorialTitle');
    const descEl = document.getElementById('editorialDesc');
    const bodyEl = document.getElementById('editorialBody');
    const counterCurEl = document.getElementById('counterCurrent');
    const progressIndicator = document.getElementById('editorialProgressIndicator');
    const dots = Array.from(document.querySelectorAll('#editorialDots .p-dot'));
    const prevBtn = document.getElementById('proyectosPrevBtn');
    const nextBtn = document.getElementById('proyectosNextBtn');

    // Estructura de datos centralizada de los proyectos existentes
    const proyectosData = [
        {
            code: "H-180",
            title: "Contra Pisos",
            description: "Mezcla diseñada específicamente para contrapisos y superficies de nivelación. Es la base perfecta y económica antes de colocar acabados finales.",
            image: "imagenes/mixerdespachandoBalzarH-180Creacom.jpg",
            alt: "Construcción de aceras y bordillos con hormigón H-180 en Guayas"
        },
        {
            code: "H-210",
            title: "Pisos",
            description: "La resistencia estándar ideal para todo tipo de pisos de vivienda, patios y aceras. Garantiza una superficie sólida para el tránsito peatonal.",
            image: "imagenes/HormigoneraQuevedoH-210.jpg",
            alt: "Fundición de losa de techo con concreto H-210 resistente"
        },
        {
            code: "H-240",
            title: "Losa o Muros",
            description: "Mayor concentración de cemento para soportar carga estructural. Indispensable para la fundición segura de losas de techo, entrepisos y muros.",
            image: "imagenes/hormigonenbalzarH-240.jpg",
            alt: "Estructuras sismo-resistentes, vigas y columnas con hormigón H-240"
        },
        {
            code: "H-280",
            title: "Pavimentación de Calzadas",
            description: "Hormigón de alto desempeño diseñado para resistir el paso vehicular constante. Ideal para pavimentación de calles, vías públicas y accesos industriales.",
            image: "imagenes/Creacomhormigonera-vias.jpg",
            alt: "Pavimento rígido y puentes de alta resistencia H-280 en Ecuador"
        }
    ];

    // Precargar las 4 imágenes para evitar parpadeos
    proyectosData.forEach(p => {
        const img = new Image();
        img.src = p.image;
    });

    const total = proyectosData.length;
    let currentIndex = 0;
    let autoplayTimer = null;
    let resumeAutoplayTimer = null;
    let isUserInteracting = false;
    let isTransitioning = false;

    // Asignar índice fijo a cada tarjeta
    cards.forEach((card, idx) => {
        card.dataset.indexInt = idx;
    });

    // Configuración exacta de los 4 slots de la baraja (Arriba, Izquierda y Profundidad Z)
    function getSlotConfig(slot) {
        const isMobile = window.innerWidth < 768;
        if (slot === 0) {
            // TARJETA ACTIVA (Primer plano protagonista)
            return {
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotateZ: 0,
                opacity: 1,
                zIndex: 40
            };
        } else if (slot === 1) {
            // SEGUNDA TARJETA (Detrás, asomando hacia arriba e izquierda)
            return {
                x: isMobile ? -20 : -36,
                y: isMobile ? -24 : -42,
                z: -70,
                scale: isMobile ? 0.95 : 0.94,
                rotateZ: -1.5,
                opacity: 0.88,
                zIndex: 30
            };
        } else if (slot === 2) {
            // TERCERA TARJETA (Más atrás, asomando hacia arriba e izquierda)
            return {
                x: isMobile ? -40 : -70,
                y: isMobile ? -48 : -84,
                z: -140,
                scale: isMobile ? 0.90 : 0.88,
                rotateZ: -3,
                opacity: 0.68,
                zIndex: 20
            };
        } else {
            // CUARTA TARJETA (Fondo del stack)
            return {
                x: isMobile ? -58 : -100,
                y: isMobile ? -70 : -118,
                z: -200,
                scale: isMobile ? 0.85 : 0.82,
                rotateZ: -4.5,
                opacity: 0.42,
                zIndex: 10
            };
        }
    }

    // Aplicar slot visual a una tarjeta
    function applyCardSlot(card, slot, animated = true) {
        const s = getSlotConfig(slot);

        if (!animated) {
            card.style.transition = 'none';
        } else {
            card.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.45s ease, box-shadow 0.45s ease';
        }

        card.style.transform = `translate3d(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px), ${s.z}px) scale(${s.scale}) rotateZ(${s.rotateZ}deg)`;
        card.style.opacity = s.opacity;
        card.style.zIndex = s.zIndex;
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto';

        if (slot === 0) {
            card.classList.add('active-card');
            card.classList.remove('is-exiting');
        } else {
            card.classList.remove('active-card');
            card.classList.remove('is-exiting');
        }
    }

    // Sincronizar contenido editorial del lado derecho
    function updateEditorial(newIndex) {
        if (!bodyEl) return;
        bodyEl.classList.add('text-changing');

        setTimeout(() => {
            const data = proyectosData[newIndex];
            if (badgeEl) badgeEl.textContent = data.code;
            if (titleEl) titleEl.textContent = data.title;
            if (descEl) descEl.textContent = data.description;
            if (counterCurEl) counterCurEl.textContent = String(newIndex + 1).padStart(2, '0');
            if (progressIndicator) progressIndicator.style.width = `${((newIndex + 1) / total) * 100}%`;

            dots.forEach((dot, idx) => {
                const isActive = idx === newIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            bodyEl.classList.remove('text-changing');
        }, 150);
    }

    // Transición suave hacia el SIGUIENTE proyecto (La activa sale por la derecha sin tapar)
    function goToNext() {
        if (isTransitioning) return;
        isTransitioning = true;

        const oldCard = cards[currentIndex];
        const nextIndex = (currentIndex + 1) % total;

        // 1. La tarjeta activa sale hacia la derecha y adelante desvaneciéndose
        oldCard.classList.remove('active-card');
        oldCard.classList.add('is-exiting');

        // 2. Las demás tarjetas avanzan hacia el frente
        cards.forEach((card, j) => {
            if (j === currentIndex) return;
            const newSlot = (j - nextIndex + total) % total;
            applyCardSlot(card, newSlot, true);
        });

        // 3. Actualizar textos editoriales sincronizados
        updateEditorial(nextIndex);
        currentIndex = nextIndex;

        // 4. Tras completar la salida, reubicar la tarjeta en el fondo (Slot 3) sin salto visible
        setTimeout(() => {
            oldCard.classList.remove('is-exiting');
            const targetSlot = (parseInt(oldCard.dataset.indexInt, 10) - currentIndex + total) % total;
            applyCardSlot(oldCard, targetSlot, false);
            void oldCard.offsetWidth;
            oldCard.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 0.45s ease, box-shadow 0.45s ease';
            isTransitioning = false;
        }, 420);
    }

    // Transición hacia el proyecto ANTERIOR
    function goToPrev() {
        if (isTransitioning) return;
        isTransitioning = true;

        const prevIndex = (currentIndex - 1 + total) % total;
        const incomingCard = cards[prevIndex];

        // Preparar la tarjeta entrante fuera de pantalla a la derecha
        incomingCard.style.transition = 'none';
        incomingCard.style.transform = 'translate3d(calc(-50% + 140px), calc(-50% + 20px), 30px) scale(0.96) rotate(6deg)';
        incomingCard.style.opacity = '0';
        incomingCard.style.zIndex = '45';
        void incomingCard.offsetWidth;

        // Animar todas las tarjetas hacia atrás
        currentIndex = prevIndex;
        cards.forEach((card, j) => {
            const slot = (j - currentIndex + total) % total;
            applyCardSlot(card, slot, true);
        });

        updateEditorial(currentIndex);

        setTimeout(() => {
            isTransitioning = false;
        }, 420);
    }

    // Ir a un proyecto específico
    function goToProject(targetIndex) {
        targetIndex = (targetIndex + total) % total;
        if (targetIndex === currentIndex) return;

        if (targetIndex === (currentIndex + 1) % total) {
            goToNext();
        } else if (targetIndex === (currentIndex - 1 + total) % total) {
            goToPrev();
        } else {
            currentIndex = targetIndex;
            cards.forEach((card, j) => {
                const slot = (j - currentIndex + total) % total;
                applyCardSlot(card, slot, true);
            });
            updateEditorial(currentIndex);
        }
    }

    // --- AUTOPLAY (Cada 3 segundos) ---
    function startAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = setInterval(() => {
            if (!isUserInteracting && !isTransitioning) {
                goToNext();
            }
        }, 3000);
    }

    function pauseAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
        if (resumeAutoplayTimer) {
            clearTimeout(resumeAutoplayTimer);
            resumeAutoplayTimer = null;
        }
    }

    function scheduleResumeAutoplay(delay = 4000) {
        pauseAutoplay();
        resumeAutoplayTimer = setTimeout(() => {
            isUserInteracting = false;
            startAutoplay();
        }, delay);
    }

    // --- GESTOS: TOUCH SWIPE Y MOUSE DRAG ---
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let dragDeltaX = 0;

    function onPointerDown(e) {
        if (isTransitioning) return;
        isDragging = true;
        isUserInteracting = true;
        pauseAutoplay();
        startX = e.clientX || (e.touches && e.touches[0].clientX);
        startY = e.clientY || (e.touches && e.touches[0].clientY);
        dragDeltaX = 0;

        cards[currentIndex].classList.add('is-dragging');
    }

    function onPointerMove(e) {
        if (!isDragging || isTransitioning) return;

        const curX = e.clientX || (e.touches && e.touches[0].clientX);
        const curY = e.clientY || (e.touches && e.touches[0].clientY);
        if (curX === undefined || curY === undefined) return;

        dragDeltaX = curX - startX;
        const dragDeltaY = curY - startY;

        // La tarjeta activa sigue el arrastre suavemente con ligera rotación
        const activeCard = cards[currentIndex];
        activeCard.style.transform = `translate3d(calc(-50% + ${dragDeltaX}px), calc(-50% + ${dragDeltaY * 0.15}px), 0) scale(1) rotate(${dragDeltaX * 0.03}deg)`;
    }

    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;

        const activeCard = cards[currentIndex];
        activeCard.classList.remove('is-dragging');

        if (dragDeltaX < -40) {
            goToNext();
        } else if (dragDeltaX > 40) {
            goToPrev();
        } else {
            // Regresar a la posición inicial
            applyCardSlot(activeCard, 0, true);
        }

        scheduleResumeAutoplay(4000);
    }

    stage.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    stage.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Pausar autoplay al interactuar con la sección
    if (section) {
        section.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            pauseAutoplay();
        });
        section.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            scheduleResumeAutoplay(2500);
        });
    }

    // Clic directo en cualquiera de las tarjetas de la baraja
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (isDragging || isTransitioning) return;
            isUserInteracting = true;
            goToProject(index);
            scheduleResumeAutoplay(5000);
        });
    });

    // Clic en botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isUserInteracting = true;
            goToPrev();
            scheduleResumeAutoplay(5000);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isUserInteracting = true;
            goToNext();
            scheduleResumeAutoplay(5000);
        });
    }

    // Clic en los puntos de paginación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            isUserInteracting = true;
            goToProject(index);
            scheduleResumeAutoplay(5000);
        });
    });

    // Navegación por teclado
    stage.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            isUserInteracting = true;
            goToNext();
            scheduleResumeAutoplay(5000);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            isUserInteracting = true;
            goToPrev();
            scheduleResumeAutoplay(5000);
        }
    });

    // Renderizar estado inicial de la baraja y arrancar autoplay
    cards.forEach((card, j) => {
        const slot = (j - currentIndex + total) % total;
        applyCardSlot(card, slot, false);
    });
    updateEditorial(0);
    startAutoplay();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProyectosCascada);
} else {
    initProyectosCascada();
}
