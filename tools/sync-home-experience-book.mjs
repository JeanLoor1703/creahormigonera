import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');
const explore = `<nav class="review-explore" aria-label="Conoce más de Creacom Hormigonera">
            <div class="container review-explore__inner">
                <span>Conoce Creacom</span>
                <a href="/empresa/">Empresa y planta</a>
                <a href="/hormigon-premezclado/">Hormigón</a>
                <a href="/proyectos/">Trabajos</a>
                <a href="/cobertura/">Cobertura</a>
                <a href="/guias/">Guías</a>
            </div>
        </nav>`;

if (/<section class="review-explore"/.test(html)) {
  html = html.replace(/<section class="review-explore"[\s\S]*?<\/section>/, explore);
}
html = html.replace(/\s*<dialog class="experience-book" id="creacom-experience-book"[\s\S]*?<\/dialog>/, '');
html = html.replace(/\s*<script defer src="\/js\/experience-book\.js(?:\?[^"]*)?"><\/script>/g, '');
html = html.replace(/\s*<link rel="stylesheet" href="\/styles\/experience-book\.css(?:\?[^"]*)?">/g, '');
fs.writeFileSync(file, html, 'utf8');
console.log('Inicio: franja compacta restaurada; libro disponible solo en Empresa.');
