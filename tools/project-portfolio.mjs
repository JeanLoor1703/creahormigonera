const asset = '/imagenes/imagenes-proyectos/';
const projects = [
  {
    id: 'pisos', label: 'Pisos', place: 'El Empalme', title: 'El trabajo toma forma, a nivel de piso.', shortTitle: 'Pisos en El Empalme', layout: 'landscape',
    copy: 'Suministro de hormigón para pisos en El Empalme. Desde el aire se aprecia el mixer junto al equipo de colocación y la superficie donde el personal distribuye la mezcla.',
    detail: 'Una vista del suministro y otra del frente de trabajo.',
    photos: [
      ['pisos-El-Empalme-obra.webp', 'Mixer de Creacom y equipo de colocación junto a un piso en ejecución en El Empalme', 1600, 900, 'Mixer y colocación'],
      ['pisos-El-Empalme-vista-aerea.webp', 'Vista aérea de la entrega de hormigón para pisos en El Empalme', 1280, 764, 'La obra desde el aire']
    ]
  },
  {
    id: 'ducto', label: 'Ducto cajón', place: 'El Empalme', title: 'Hormigón para dar forma al ducto.', shortTitle: 'Ducto cajón en El Empalme', layout: 'portraits',
    copy: 'Suministro de hormigón para un ducto cajón en El Empalme. Las fotografías muestran el encofrado, al personal en el frente de trabajo y el mixer en el acceso a la obra.',
    detail: 'Dos perspectivas de una misma etapa de trabajo.',
    photos: [
      ['obra-ducto_cajon-ElEmpalme.2.webp', 'Personal junto al encofrado de un ducto cajón y mixer de Creacom al fondo en El Empalme', 941, 1672, 'El frente de trabajo'],
      ['obra-ducto_cajon-ElEmpalme.webp', 'Mixer de Creacom junto al acceso de la obra del ducto cajón en El Empalme', 941, 1672, 'El acceso del mixer']
    ]
  },
  {
    id: 'aceras', label: 'Aceras', place: 'El Empalme', title: 'Cada tramo empieza con una entrega.', shortTitle: 'Aceras en El Empalme', layout: 'single',
    copy: 'Suministro de hormigón para aceras en El Empalme. El mixer descarga junto al encofrado mientras el personal distribuye la mezcla en el tramo de obra.',
    detail: 'La descarga, junto al punto de colocación.',
    photos: [
      ['obra-aceras-El-Empalme.webp', 'Mixer descargando hormigón junto al encofrado de una acera en El Empalme', 941, 1672, 'Descarga para aceras']
    ]
  },
  {
    id: 'zapatas', label: 'Zapatas de muro', place: 'Quevedo', title: 'El suministro llega a la base de la obra.', shortTitle: 'Zapatas de muro en Quevedo', layout: 'mixed',
    copy: 'Suministro de hormigón para zapatas de muro en Quevedo. Las vistas aéreas muestran las excavaciones y los encofrados, con un mixer de Creacom junto al área de trabajo.',
    detail: 'El contexto de la obra y el detalle de la entrega.',
    photos: [
      ['zapatas_de_muro_Quevedo-vista-general.webp', 'Vista aérea de excavaciones y encofrados para zapatas de muro en Quevedo', 720, 1280, 'Vista general de la obra'],
      ['zapatas_de_muro_Quevedo-detalle.webp', 'Mixer de Creacom junto a los encofrados de zapatas de muro en Quevedo', 501, 436, 'Detalle del suministro']
    ]
  },
  {
    id: 'san-luis', label: 'San Luis · Video', place: 'San Luis', title: 'Otra perspectiva del trabajo en obra.', shortTitle: 'Obra en San Luis', layout: 'video',
    copy: 'Una mirada aérea a una obra en San Luis donde Creacom suministró hormigón. El recorrido muestra el frente de trabajo, los elementos en construcción y el mixer en el sitio.',
    detail: 'Un recorrido de 48 segundos desde el aire.', photos: []
  }
];

function photoMarkup(photo, index, projectIndex) {
  const [file, alt, width, height, caption] = photo;
  return `<figure class="project-photo project-photo--${index + 1}"><a class="project-photo__open" href="${asset}${file}" data-project-photo aria-label="Ampliar: ${caption}"><img src="${asset}${file}" alt="${alt}" width="${width}" height="${height}" loading="${projectIndex === 0 && index === 0 ? 'eager' : 'lazy'}"${projectIndex === 0 && index === 0 ? ' fetchpriority="high"' : ''}><span class="project-photo__expand" aria-hidden="true">↗</span></a><figcaption>${caption}</figcaption></figure>`;
}

export function projectPortfolio() {
  return `<div class="projects-page">
    <header class="projects-intro wrap">
      <div><span class="eyebrow">Proyectos / Creacom Hormigonera</span><h1>El hormigón se ve <span>en acción</span></h1></div>
      <div class="projects-intro__aside"><p>De la descarga a la colocación.<br>Conoce las obras a las que llevamos nuestro hormigón.</p><a href="/cotizar/">Solicitar suministro <span aria-hidden="true">↗</span></a></div>
    </header>
    <div class="wrap projects-breadcrumb"><a href="/">Inicio</a><span aria-hidden="true">/</span><span>Proyectos</span></div>
    <section class="project-portfolio wrap" aria-labelledby="portfolio-title" data-project-portfolio>
      <div class="portfolio-heading"><h2 id="portfolio-title">Nuestra operación en imágenes</h2><span>El Empalme · Quevedo · San Luis</span></div>
      <div class="project-selectors" aria-label="Elegir una obra" hidden>${projects.map((p, i) => `<button type="button" data-project-select="${i}" aria-controls="project-${p.id}" aria-pressed="${i === 0}">${p.label}</button>`).join('')}</div>
      <div class="project-stage" data-project-stage>
        ${projects.map((p, i) => `<article class="project-story project-story--${p.layout}" id="project-${p.id}" data-project-story aria-labelledby="project-title-${p.id}" data-project-name="${p.shortTitle}">
          <header class="project-story__heading"><span class="project-location"><span aria-hidden="true">●</span> ${p.place}</span><p class="project-story__category">${p.label.replace(' · Video', '')}</p><h3 id="project-title-${p.id}">${p.title}</h3></header>
          <div class="project-media project-media--${p.layout}">${p.photos.map((photo, index) => photoMarkup(photo, index, i)).join('')}${p.layout === 'video' ? `<figure class="project-video"><video controls muted playsinline preload="none" width="360" height="636" poster="${asset}san-luis-portada.webp" aria-label="Recorrido aéreo de una obra en San Luis con suministro de Creacom"><source src="${asset}san-luis-web.mp4" type="video/mp4">Tu navegador no puede reproducir este video. <a href="${asset}san-luis-web.mp4">Abrir video de San Luis</a>.</video><figcaption>San Luis desde el aire <span>00:48</span></figcaption></figure>` : `<p class="project-media__note"><span aria-hidden="true">↗</span> Pulsa una foto para verla completa</p>`}</div>
          <div class="project-story__body"><p>${p.copy}</p><p class="project-story__detail">${p.detail}</p><div class="project-story__credit"><span>Suministro de hormigón</span><strong>CREACOM</strong></div></div>
        </article>`).join('')}
      </div>
      <div class="project-progress" data-project-progress role="progressbar" aria-label="Progreso de la historia actual" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" hidden><span data-project-progress-fill></span></div>
      <div class="portfolio-controls" hidden><div class="portfolio-position"><span data-project-count aria-hidden="true">01 <span>/ 05</span></span><p data-project-status role="status" aria-live="polite" aria-atomic="true">Pisos en El Empalme · 1 de 5</p></div><div class="portfolio-actions"><button class="portfolio-toggle" type="button" data-project-toggle aria-pressed="true">Pausar recorrido</button><div class="portfolio-arrows"><button type="button" data-project-prev aria-label="Obra anterior"><span aria-hidden="true">←</span></button><button type="button" data-project-next aria-label="Obra siguiente"><span aria-hidden="true">→</span></button></div></div></div>
    </section>
    <section class="project-invitation wrap"><div><span class="eyebrow">La próxima entrega puede ser para tu obra</span><h2>Cuéntanos qué necesitas construir</h2></div><div><p>Comparte ubicación, fecha, resistencia solicitada y volumen estimado. Te ayudamos a preparar el suministro.</p><a class="button" href="/cotizar/">Preparar solicitud <span aria-hidden="true">↗</span></a></div></section>
    <dialog class="project-viewer" data-project-viewer aria-labelledby="project-viewer-title"><div class="project-viewer__header"><p id="project-viewer-title">Fotografías de la obra</p><button type="button" data-viewer-close aria-label="Cerrar visor">Cerrar <span aria-hidden="true">×</span></button></div><figure><img data-viewer-image alt=""><figcaption data-viewer-caption></figcaption></figure><div class="project-viewer__controls"><button type="button" data-viewer-prev aria-label="Fotografía anterior">←</button><span data-viewer-count role="status" aria-live="polite"></span><button type="button" data-viewer-next aria-label="Fotografía siguiente">→</button></div></dialog>
  </div>`;
}
