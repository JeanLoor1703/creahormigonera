import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const original = process.argv[2];
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'REVISION-SEO-BASE.json'), 'utf8'));
const oldHome = original ? fs.readFileSync(original, 'utf8') : null;
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const normalize = value => value.replace(/\r\n/g, '\n');
const headings = value => [...value.matchAll(/<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(match => [match[1], match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()]);
const expectedHeadings = baseline.headings.map(({level, text}) => [level.slice(1), text]);
assert.equal(expectedHeadings.length, 24, 'La referencia original debe tener 24 encabezados.');
assert.deepEqual(headings(home), expectedHeadings, 'Los encabezados de Inicio cambiaron.');
if (oldHome) assert.deepEqual(headings(home), headings(oldHome), 'Los encabezados difieren del archivo original indicado.');

const hero = value => value.match(/<section class="hero" id="inicio">[\s\S]*?<\/section>/)?.[0];
assert.ok(hero(home), 'No se encontró el hero.');
assert.equal(crypto.createHash('sha256').update(normalize(hero(home))).digest('hex'), baseline.heroSha256, 'Cambió la estructura del hero.');
if (oldHome) assert.equal(normalize(hero(home)), normalize(hero(oldHome)), 'El hero difiere del archivo original indicado.');
const ids = value => [...value.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
for (const id of baseline.anchors) assert.ok(ids(home).includes(id), `Falta el ancla original #${id}`);
for (const phrase of baseline.regionalTerms) assert.ok(home.includes(phrase), `Falta ${phrase} en Inicio.`);

const urls = ['/', '/empresa/', '/hormigon-premezclado/', '/proyectos/', '/cobertura/', '/guias/', '/guias/datos-para-cotizar-hormigon/', '/guias/como-estimar-volumen-hormigon/', '/guias/preparar-acceso-mixer/', '/cotizar/'];
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const url of urls) {
  const file = path.join(root, url === '/' ? 'index.html' : url.slice(1), url === '/' ? '' : 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `Debe haber un H1 en ${url}`);
  assert.ok(/<title>[^<]+<\/title>/i.test(html), `Falta title en ${url}`);
  assert.ok(/<meta\s+name="description"/i.test(html), `Falta descripción en ${url}`);
  assert.ok(html.includes(`href="https://creahormigonera.com${url}"`), `Canonical incorrecto en ${url}`);
  assert.ok(sitemap.includes(`<loc>https://creahormigonera.com${url}</loc>`), `Falta ${url} en sitemap.`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    const asset = match[1];
    if (asset.endsWith('/')) continue;
    assert.ok(fs.existsSync(path.join(root, asset.slice(1))), `Recurso local faltante en ${url}: ${asset}`);
  }
  for (const match of html.matchAll(/href="(\/[^"#?]+\/)(?:#[^"]*)?"/g)) {
    assert.ok(fs.existsSync(path.join(root, match[1].slice(1), 'index.html')), `Ruta enlazada faltante en ${url}: ${match[1]}`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
for (const route of ['opiniones/', 'reseñas/']) assert.ok(fs.existsSync(path.join(root, route, 'index.html')), `Falta ${route}`);
for (const route of ['oferta-hormigon.html', 'oferta-hormigon-Jean.html', 'whatsapp.html']) assert.ok(fs.existsSync(path.join(root, route)), `Falta ${route}`);
assert.ok(fs.readFileSync(path.join(root, 'reseñas/index.html'), 'utf8').includes('href="https://creahormigonera.com/reseñas/"'));
for (const campaign of ['oferta-hormigon.html', 'oferta-hormigon-Jean.html', 'whatsapp.html']) {
  assert.ok(/noindex/.test(fs.readFileSync(path.join(root, campaign), 'utf8')), `Falta noindex en ${campaign}`);
  assert.ok(!sitemap.includes(campaign), `${campaign} no debe estar en sitemap.`);
}
console.log(`OK: ${headings(home).length} encabezados idénticos, hero idéntico, anclas originales, ${urls.length} rutas indexables, canonicals, sitemap y recursos locales.`);
