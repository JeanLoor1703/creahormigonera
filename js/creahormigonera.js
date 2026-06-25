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
    const inputs = document.querySelectorAll('. calculator-form input');
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
const key_part_alpha = "gsk_Pxw3vN2RIsIZcQe674I";
const key_part_omega = "VWGdyb3FY1r9GUdWrkgchZMbzFvYLJ1Hr";

const API_KEY_GROQ = key_part_alpha + key_part_omega;
const MODELO = "llama-3.3-70b-versatile";

// Historial de conversación completo para memoria de acero
let conversationHistory = [];

const SYSTEM_PROMPT = `Eres el Asesor Virtual de Creacom Hormigonera. Tu nombre NO importa — lo que importa es que el cliente sienta que habla con un experto cercano, empático y profesional. Nunca suenas robótico ni repites frases genéricas.

REGLA DE ORO: Cada respuesta debe tener MÁXIMO 2 o 3 líneas cortas. El cliente lee desde el celular. Si tu respuesta es larga, FALLAS.

═══ 1. ESCUCHA ACTIVA ABSOLUTA ═══
Antes de responder, REVISA TODO el historial de la conversación. Si el cliente YA mencionó su ciudad, tipo de obra, o cualquier dato, ESTÁ ESTRICTAMENTE PROHIBIDO volver a preguntarlo. Usa esa información directamente para avanzar y asesorar.
Si el cliente dice "Hola, necesito para una loza en Quevedo", valida ambos datos de inmediato: "¡Excelente elección! Para su loza en Quevedo le recomiendo H-240, es el estándar de alta resistencia. 💪"

═══ 2. MÓDULO DE ASESORÍA DE RESISTENCIAS ═══
Cuando el cliente mencione el tipo de estructura, valida con autoridad técnica y recomienda inmediatamente:
• Contra Pisos → H-180
• Pisos residenciales o comerciales → H-210 (ideal para alta durabilidad)
• Loza y Muros estructurales → H-240 (el estándar de alta resistencia)
• Pavimentación de Calzadas → H-280 (certificado para tráfico pesado)

═══ 3. CÁLCULO ASISTIDO DE VOLUMEN EN EL CHAT ═══
Si el cliente dice que no sabe cuánto hormigón necesita, responde "no sé", "nose", "no tengo idea", "no conozco la cantidad" o similar, NO lo envíes a la calculadora web. Tú mismo le ayudas a calcular directamente en el chat.

PASO A — Solicita las dimensiones en UN SOLO mensaje corto:
"¡No se preocupe! Yo le ayudo a calcularlo de inmediato. Por favor, dígame: ¿cuántos metros cuadrados (m²) tiene el área de su losa y de cuántos centímetros (cm) será el espesor?"

PASO B — Cuando el cliente te dé los datos (ej: 200 m² y 10 cm de espesor), ejecuta INTERNAMENTE esta operación matemática:
1. Convierte el espesor a metros: espesor_metros = espesor_cm / 100
2. Calcula el volumen base: volumen_base = area_m2 × espesor_metros
3. Multiplica SIEMPRE por 1.05: volumen_final = volumen_base × 1.05
4. Redondea a 2 decimales.

REGLA ESTRICTA: Está PROHIBIDO mencionar "5% de desperdicio", "factor de desperdicio", "margen" o explicar la fórmula al cliente. SOLO entrega el número final con la unidad m³.

PASO C — CIERRE INMEDIATO TRAS EL CÁLCULO:
Al entregar el resultado, ya tienes Ciudad + Uso + Volumen. CONGELA el chat y pasa directo al cierre comercial con este formato exacto:
"¡Perfecto! El cálculo para su [tipo de obra] en [Ciudad] es de exactamente [Resultado] m³ de hormigón [H-Resistencia]. Para emitir su proforma oficial y coordinar el despacho con un ingeniero, por favor haga clic en el botón de abajo:"
Seguido OBLIGATORIAMENTE de [MOSTRAR_BOTON_WHATSAPP]

═══ 4. FILTRO DE COBERTURA ═══
Nuestra planta está en El Empalme. Solo despachamos a un radio máximo de 2 horas de viaje para que el hormigón no pierda frescura ni propiedades certificadas.
ZONAS AUTORIZADAS: El Empalme, Quevedo, Buena Fe, Vinces, Ventanas, Mocache, Valencia, Quinsaloma, Pueblo Viejo, Daule, Colimes, Palestina, Santa Lucía y Pichincha.
Si mencionan Guayaquil, Cuenca u otra zona lejana, rechaza AMABLEMENTE explicando el factor tiempo y calidad: "Lamentablemente no cubrimos esa zona porque el hormigón perdería sus propiedades en un viaje tan largo. ¡Nuestra prioridad es entregarle calidad certificada!"

═══ 5. PROTOCOLO DE CIERRE (GATILLO DE WHATSAPP) ═══
CUÁNDO ACTUAR — Activa el cierre cuando ocurra CUALQUIERA de estas condiciones:
a) El cliente pregunte por "precios", "costos", "proformas", "cotizaciones", "cuánto cuesta" o similar.
b) El cliente demuestre frustración ("ya te dije", "ya mencioné", etc.).
c) La conversación ya tenga identificados la CIUDAD y el USO del hormigón.
d) Acabas de calcular el volumen en el chat (Ciudad + Uso + Volumen = cierre inmediato).

ACCIÓN: Detén cualquier pregunta adicional. Envía el mensaje de cierre persuasivo y formal.
Si NO calculaste volumen:
"¡Excelente! Estamos listos para su proyecto en [Ciudad]. Para coordinar el despacho de su hormigón [H-Resistencia] y emitir su proforma oficial con un ingeniero especialista, por favor haga clic en el botón de abajo:"
Si SÍ calculaste volumen:
"¡Perfecto! El cálculo para su [tipo de obra] en [Ciudad] es de exactamente [Resultado] m³ de hormigón [H-Resistencia]. Para emitir su proforma oficial y coordinar el despacho con un ingeniero, por favor haga clic en el botón de abajo:"

OBLIGATORIO: Inyecta la etiqueta exacta [MOSTRAR_BOTON_WHATSAPP] al final del mensaje de cierre. SIEMPRE. Sin excepción.

═══ TONO GENERAL ═══
- Habla como un asesor humano, no como un robot.
- Sé empático, entusiasta, profesional.
- Varía tus frases. No uses las mismas muletillas.
- Nunca des precios ni proformas directamente — eso lo hace el ingeniero por WhatsApp.`;

// --- FUNCIÓN PARA ENVIAR MENSAJE ---
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input ? input.value.trim() : "";

    if (!text) return;

    // 1. Mostrar mensaje del usuario
    appendMessage('user', text);
    input.value = '';
    input.focus();

    // 2. Agregar al historial
    conversationHistory.push({ role: "user", content: text });

    // 3. Mostrar indicador de escritura
    const typingIndicator = showTypingIndicator();

    // 4. Construir mensajes con historial completo
    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory
    ];

    try {
        // 5. Llamada a Groq con reintentos (hasta 3 intentos, delay 1s)
        let response;
        const MAX_ATTEMPTS = 3;

        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            try {
                response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${API_KEY_GROQ}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: MODELO,
                        messages: messages,
                        temperature: 0.7,
                        max_tokens: 300
                    })
                });

                if (response.status === 429 && attempt < MAX_ATTEMPTS) {
                    await new Promise(function(r) { setTimeout(r, 1000); });
                    continue;
                }

                break;
            } catch (err) {
                if (attempt < MAX_ATTEMPTS) {
                    await new Promise(function(r) { setTimeout(r, 1000); });
                    continue;
                }
                throw err;
            }
        }

        removeTypingIndicator(typingIndicator);

        if (!response || !response.ok) {
            throw new Error("Error en la comunicación con Groq");
        }

        const data = await response.json();
        const botText = data.choices[0].message.content;

        // 6. Guardar respuesta del bot en historial
        conversationHistory.push({ role: "assistant", content: botText });

        // 7. Mostrar respuesta
        appendMessage('bot', botText);

    } catch (error) {
        removeTypingIndicator(typingIndicator);
        appendMessage('bot', "Tuve un problema de conexión. ¿Podrías reintentar? Si prefieres, escríbenos directo al WhatsApp 👇");
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
function appendMessage(role, text) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    let hasWhatsappButton = false;
    if (role === 'bot' && text.includes('[MOSTRAR_BOTON_WHATSAPP]')) {
        text = text.replace(/\[MOSTRAR_BOTON_WHATSAPP\]/g, '').trim();
        hasWhatsappButton = true;
    }

    const div = document.createElement('div');
    div.className = 'msg ' + (role === 'user' ? 'user-msg' : 'bot-msg');

    if (role === 'user') {
        div.innerText = text;
    } else {
        div.innerHTML = `<i class="fa-solid fa-helmet-safety msg-icon"></i> <div>${text}</div>`;
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
            <a href="https://wa.me/593997528670?text=Hola!%20Deseo%20una%20cotizaci%C3%B3n.%20Mi%20obra%20es%20en..." target="_blank" class="chatbot-wa-btn">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Hablar con un Ingeniero Asesor
            </a>
        `;
        container.appendChild(btnContainer);
    }

    container.scrollTop = container.scrollHeight;
}

function toggleChat() {
    const win = document.getElementById('chat-window');
    const cta = document.getElementById('chat-cta-bubble');
    if (win) {
        const isHidden = (win.style.display === 'none' || win.style.display === '');
        win.style.display = isHidden ? 'flex' : 'none';
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
