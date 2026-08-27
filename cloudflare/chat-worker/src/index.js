const DEFAULT_ORIGIN = "https://creahormigonera.com";

const SYSTEM_PROMPT = `Eres el Asesor Virtual de Creacom Hormigonera. Habla como un experto cercano, empático y profesional.

REGLA DE ORO: Cada respuesta debe tener MÁXIMO 2 o 3 líneas cortas. El cliente lee desde el celular.

ESCUCHA ACTIVA: Revisa todo el historial. Si el cliente ya mencionó ciudad, tipo de obra u otro dato, no lo vuelvas a preguntar; úsalo para avanzar.

RESISTENCIAS: Contra pisos → H-180. Pisos residenciales o comerciales → H-210. Losas y muros estructurales → H-240. Pavimentación de calzadas → H-280.

CÁLCULO: Si no sabe cuánto necesita, pide en un solo mensaje el área en m² y el espesor en cm. Calcula internamente área × (espesor / 100) × 1.05 y redondea a 2 decimales. No menciones el factor ni la fórmula; entrega solo el resultado en m³.

COBERTURA: Planta en El Empalme. Zonas autorizadas: El Empalme, Quevedo, Buena Fe, Vinces, Ventanas, Mocache, Valencia, Quinsaloma, Pueblo Viejo, Daule, Colimes, Palestina, Santa Lucía y Pichincha. Para zonas lejanas como Guayaquil o Cuenca, explica amablemente que el tiempo de viaje afectaría la calidad.

CIERRE: Activa el cierre si preguntan por precios/cotización, si se frustran, o si ya tienes ciudad y uso. Detén preguntas adicionales y termina con [MOSTRAR_BOTON_WHATSAPP]. Si calculaste volumen, incluye ciudad, uso, volumen y resistencia. Nunca des precios: la proforma la prepara un ingeniero por WhatsApp.

No inventes disponibilidad, precios ni datos técnicos que no estén aquí. Responde siempre en español.`;

function allowedOrigins(env) {
  return new Set([
    env.ALLOWED_ORIGIN || DEFAULT_ORIGIN,
    "https://www.creahormigonera.com",
    "http://localhost:8787",
    "http://127.0.0.1:8787",
  ]);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const headers = {
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (origin && allowedOrigins(env).has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function jsonResponse(body, status, request, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request, env),
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
    },
  });
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  return !origin || allowedOrigins(env).has(origin);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Método no permitido" }, 405, request, env);
    }

    if (!isAllowedOrigin(request, env)) {
      return jsonResponse({ error: "Origen no permitido" }, 403, request, env);
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 30000) {
      return jsonResponse({ error: "Solicitud demasiado grande" }, 413, request, env);
    }

    try {
      const body = await request.json();
      const incoming = Array.isArray(body?.messages) ? body.messages : [];
      const messages = incoming
        .filter((message) =>
          (message?.role === "user" || message?.role === "assistant") &&
          typeof message?.content === "string" && message.content.trim(),
        )
        .slice(-12)
        .map((message) => ({
          role: message.role,
          content: message.content.trim().slice(0, 1200),
        }));

      if (!messages.length || messages[messages.length - 1].role !== "user") {
        return jsonResponse({ error: "Mensaje inválido" }, 400, request, env);
      }

      const provider = env.CHAT_PROVIDER || "groq";
      const isOpenAI = provider === "openai";
      const apiKey = isOpenAI ? env.OPENAI_API_KEY : env.GROQ_API_KEY;
      const endpoint = isOpenAI
        ? "https://api.openai.com/v1/chat/completions"
        : "https://api.groq.com/openai/v1/chat/completions";
      const model = env.CHAT_MODEL ||
        (isOpenAI ? "gpt-4o-mini" : "openai/gpt-oss-120b");

      if (!apiKey) {
        console.error("Chat provider is not configured", { provider });
        return jsonResponse({ error: "Chat no configurado" }, 503, request, env);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);
      let upstream;

      try {
        upstream = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            temperature: 0.4,
            max_completion_tokens: 220,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        console.error("Chat provider error", { status: upstream.status, provider });
        return jsonResponse({ error: "El proveedor no pudo responder" }, upstream.status >= 500 ? 502 : upstream.status, request, env);
      }

      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return jsonResponse({ error: "Respuesta vacía del proveedor" }, 502, request, env);
      }

      return jsonResponse({ reply }, 200, request, env);
    } catch (error) {
      console.error("Chat worker error", error);
      return jsonResponse({ error: "Solicitud inválida o tiempo agotado" }, 400, request, env);
    }
  },
};
