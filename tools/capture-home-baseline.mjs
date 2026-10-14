import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = process.argv[2];
if (!source) throw new Error('Indica la ruta del index.html original.');
const html = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const match = expression => html.match(expression)?.[1] ?? null;
const hero = match(/(<section class="hero" id="inicio">[\s\S]*?<\/section>)/);
const baseline = {
  source: 'index.html original con cambios locales previos',
  title: match(/<title>([\s\S]*?)<\/title>/i)?.trim(),
  description: match(/<meta\s+name="description"\s+content="([^"]*)"/i),
  canonical: match(/<link rel="canonical" href="([^"]*)"/i),
  headings: [...html.matchAll(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m => ({level:`h${m[1]}`, text:m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()})),
  anchors: [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]),
  heroSha256: crypto.createHash('sha256').update(hero).digest('hex'),
  regionalTerms: ['Guayas','Los Ríos','Manabí','El Empalme'].filter(term => html.includes(term))
};
fs.writeFileSync(path.join(root, 'REVISION-SEO-BASE.json'), `${JSON.stringify(baseline, null, 2)}\n`);
console.log(`Registrados ${baseline.headings.length} encabezados y ${baseline.anchors.length} anclas originales.`);
