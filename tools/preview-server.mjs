import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 8787);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.mp4':'video/mp4', '.vtt':'text/vtt', '.pdf':'application/pdf' };

const viewers = new Set();
const liveReload = `<script>(()=>{const source=new EventSource('/__preview_events');source.addEventListener('change',()=>location.reload());})();</script>`;
let reloadTimer;

fs.watch(root, { recursive: true }, (_event, filename) => {
  if (!filename || /(^|[\\/])(\.git|\.agents|\.vscode|\.playwright-mcp|node_modules)([\\/]|$)/.test(filename)) return;
  if (!/\.(html|css|js|svg)$/i.test(filename)) return;
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    for (const viewer of viewers) viewer.write('event: change\ndata: reload\n\n');
  }, 250);
});

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  if (pathname === '/__preview_events') {
    response.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    response.write('retry: 1000\n\n');
    viewers.add(response);
    request.on('close', () => viewers.delete(response));
    return;
  }
  const target = path.resolve(root, `.${pathname}`);
  if (!target.startsWith(root + path.sep) && target !== root) {
    response.writeHead(403); response.end(); return;
  }
  const file = fs.existsSync(target) && fs.statSync(target).isDirectory() ? path.join(target, 'index.html') : target;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); response.end('No encontrado'); return;
  }
  if (path.extname(file).toLowerCase() === '.html') {
    const html = fs.readFileSync(file, 'utf8');
    response.writeHead(200, { 'Content-Type': types['.html'], 'Cache-Control': 'no-cache' });
    response.end(html.replace(/<\/body>/i, `${liveReload}</body>`));
    return;
  }
  response.writeHead(200, {'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache'});
  fs.createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Vista local: http://127.0.0.1:${port}/`));
