# Chatbot con Cloudflare Worker

GitHub Pages no puede ocultar una API key. El Worker funciona como backend: el navegador llama al Worker y el Worker llama a Groq. La clave se guarda como secreto de Cloudflare, nunca en este repositorio.

## 1. Crear la cuenta

1. Entra a [Cloudflare](https://dash.cloudflare.com/sign-up) y crea la cuenta.
2. Verifica el correo.
3. Instala Node.js si todavía no está instalado.

## 2. Publicar el Worker

Abre PowerShell en `cloudflare/chat-worker` y ejecuta:

```bash
npx wrangler login
npx wrangler deploy
npx wrangler secret put GROQ_API_KEY
```

Cuando lo solicite, pega la clave nueva de Groq directamente en la terminal. No la pegues en archivos, GitHub, WhatsApp ni este chat.

Después de publicar, Wrangler mostrará una URL parecida a:

`https://creacom-chat-api.<tu-subdominio>.workers.dev`

## 3. Conectar el sitio y usar el preview

El frontend llama a `https://creacom-chat-api.creacom-chat.workers.dev`. En producción, el Worker permite `https://creahormigonera.com` y `https://www.creahormigonera.com`.

Para revisar el chat localmente, inicia la tarea de VS Code **Creacom: iniciar vista previa** o ejecuta `node tools/preview-server.mjs` desde la raíz del repositorio. Abre `http://127.0.0.1:8787/`; ese origen ya está autorizado en el Worker publicado.

El código del Worker también permite los puertos locales 5500 y 5501, pero ese cambio requiere publicar de nuevo el Worker. Si Wrangler indica que la sesión expiró, vuelve a iniciar sesión en Cloudflare y después ejecuta `npx wrangler deploy` desde `cloudflare/chat-worker`.

## 4. Cambiar de Groq a OpenAI

El Worker es compatible con ambos proveedores:

```bash
npx wrangler secret delete GROQ_API_KEY
npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy --keep-vars
```

Luego cambia `CHAT_PROVIDER` y `CHAT_MODEL` en `wrangler.jsonc` y vuelve a desplegar. Groq queda como opción inicial por costo y velocidad; el modelo exacto debe ser uno que aparezca habilitado en tu cuenta.

## Seguridad antes de publicar

- Revoca la clave que fue compartida en el chat y crea una nueva.
- No subas `.dev.vars`; contiene secretos locales.
- Activa una regla de Rate Limiting para `/` del Worker antes de promocionar el chatbot, porque un endpoint público puede recibir abuso aunque la API key esté protegida.
