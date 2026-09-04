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
    const dots = document.querySelectorAll('.empresa-dot');
    if (!groups.length) return;

    currentEmpresasGroup = (targetIndex + groups.length) % groups.length;

    groups.forEach((g, idx) => {
        if (idx === currentEmpresasGroup) {
            g.classList.add('active');
        } else {
            g.classList.remove('active');
        }
    });

    dots.forEach((dot, idx) => {
        if (idx === currentEmpresasGroup) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
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
