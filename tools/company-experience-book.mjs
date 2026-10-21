const photo = (src, alt, className = '') => `<img${className ? ` class="${className}"` : ''} src="/imagenes/${src}" alt="${alt}" loading="lazy" decoding="async">`;
const title = (label, heading, copy) => `<span class="experience-book__label">${label}</span><h3>${heading}</h3><p>${copy}</p>`;
const sheet = (content, modifier = '') => `<div class="experience-book__sheet ${modifier}">${content}</div>`;
const figure = (src, caption, className = '') => `<figure${className ? ` class="${className}"` : ''}>${photo(src, caption)}<figcaption>${caption}</figcaption></figure>`;
const logos = [
  ['DIPAC_logo.png', 'DIPAC'], ['CELEP_EP_logo.png', 'CELEC EP'],
  ['Prefectura_del_Guayas_logo.png', 'Prefectura del Guayas'], ['ALL-IN_CONSTRUCCIONS_logo.png', 'ALL-IN Constructions'],
  ['Construction_company_logo_.png', 'Construction Company Abrilpro'], ['BI_Cacao_logo.png', 'BI Cacao'],
  ['procacao_logo.png', 'Procacao'], ['AB_Murillo_logo.png', 'Ab. Gary Murillo'],
  ['ING_Kleber_logo.png', 'Ing. Kleber Montiel'], ['kauri_logo.png', 'Kauri Arquitectura']
];
export function companyExperienceBook() {
  const spreads = [
    ['Nuestra historia en imágenes',
      sheet(`${photo('imagenes-empresa/Planta-CREACOM-portada.webp', 'Mixer frente a la planta de Creacom en El Empalme', 'experience-book__image--cover experience-book__image--focal-high experience-book__image--plant-cover')}<div class="experience-book__cover-copy"><span>CREACOM HORMIGONERA</span><h3>De nuestra planta<br>a tu próxima obra.</h3><p>Un recorrido por quiénes somos y lo que hacemos.</p></div>`, 'experience-book__cover'),
      sheet(`${photo('creahormigoneralogo.png', 'Creacom Hormigonera', 'experience-book__logo experience-book__logo--large')}${title('Conoce Creacom', 'Toda obra empieza<br>con una idea.', 'Somos una empresa dedicada a la producción y distribución de hormigón premezclado. Trabajamos junto a constructores, ingenieros, arquitectos, instituciones y empresas privadas.')}<p>Desde El Empalme, acompañamos la preparación del pedido y la coordinación de la entrega.</p><div class="experience-book__signature">Personas, planta y hormigón.<br><strong>Un mismo compromiso con tu obra.</strong></div>`, 'experience-book__intro')],
    ['Planta y proceso',
      sheet(`${title('El Empalme · Guayas', 'Aquí comienza<br>el recorrido.', 'Nuestra planta es el punto de partida del hormigón que llevamos a cada obra.')}${figure('imagenes-empresa/planta-hormigon.webp', 'Nuestra operación en planta')}`),
      sheet(`${figure('imagenes-empresa/planta-hormigon-premezclado.webp', 'Planta de hormigón premezclado de Creacom')}${title('De la planificación a la entrega', 'Cada pedido tiene<br>su propio recorrido.', 'Ubicación, volumen, especificaciones y fecha nos ayudan a coordinar el suministro. Después, organizamos el despacho y el acceso para la descarga.')}`)],
    ['Mixers y entregas',
      sheet(`${photo('imagenes-hormigon/mixer-hormigon.webp', 'Mixer de Creacom', 'experience-book__image--cover experience-book__image--focal-high')}<div class="experience-book__cover-copy"><span>CREACOM EN CAMINO</span><h3>El siguiente destino:<br>tu obra.</h3></div>`, 'experience-book__cover'),
      sheet(`${title('Mixers y entregas', 'Conectamos la planta<br>con tu proyecto.', 'Coordinamos entregas en Guayas, Los Ríos y Manabí. La ubicación y las condiciones de acceso forman parte de la preparación de cada pedido.')}${figure('HormigoneraQuevedoH-210.jpg', 'Mixer durante una entrega en obra')}<a href="/cobertura/">Conoce nuestra cobertura <span aria-hidden="true">↗</span></a>`)],
    ['Obras en imágenes',
      sheet(`${title('El hormigón en acción', 'Parte de obras<br>que toman forma.', 'Una mirada al suministro de Creacom en distintos frentes de trabajo.')}${figure('imagenes-proyectos/pisos-El-Empalme-obra.webp', 'Pisos · El Empalme', 'experience-book__figure--work')}<a href="/proyectos/">Explora los proyectos <span aria-hidden="true">↗</span></a>`),
      sheet(`<div class="experience-book__projects">${figure('imagenes-proyectos/obra-ducto_cajon-ElEmpalme.webp', 'Ducto cajón · El Empalme', 'experience-book__figure--work')}${figure('imagenes-proyectos/obra-aceras-El-Empalme.webp', 'Aceras · El Empalme', 'experience-book__figure--work')}${figure('imagenes-proyectos/zapatas_de_muro_Quevedo-vista-general.webp', 'Zapatas de muro · Quevedo', 'experience-book__figure--work')}${figure('imagenes-proyectos/san-luis-portada.webp', 'Obra en San Luis', 'experience-book__figure--work')}</div>`, 'experience-book__gallery')],
    ['Empresas e instituciones',
      sheet(`${title('Relaciones de trabajo', 'Distintos proyectos.<br>Un trabajo compartido.', 'Trabajamos junto a empresas, instituciones y profesionales que desarrollan sus proyectos en la región.')}${figure('Equipo-CreacomHormigonera-Hormigon.jpg', 'El equipo de Creacom Hormigonera')}`),
      sheet(`<span class="experience-book__label">Empresas, instituciones y profesionales</span><h3>Con quienes<br>trabajamos.</h3><div class="experience-book__partners">${logos.map(([file, name]) => `<figure>${photo(file, name, 'experience-book__logo')}<figcaption>${name}</figcaption></figure>`).join('')}</div>`, 'experience-book__clients')],
    ['Tu próxima obra',
      sheet(`${photo('imagenes-empresa/puerta-entrada-planta.webp', 'Entrada a la planta de Creacom', 'experience-book__image--cover experience-book__image--focal-high')}<div class="experience-book__cover-copy"><span>DESDE EL EMPALME</span><h3>Gracias por conocer<br>lo que hay detrás.</h3></div>`, 'experience-book__cover'),
      sheet(`${title('Sigamos construyendo', 'La próxima historia<br>puede ser la tuya.', 'Ya conoces nuestra planta, nuestros mixers y algunas de las obras de las que formamos parte. Ahora nos gustaría conocer tu proyecto.')}<p>Cuéntanos dónde vas a construir y qué necesitas. Nuestro equipo te ayudará a preparar el pedido.</p><a class="experience-book__cta" href="https://wa.me/593997528670?text=Hola%2C%20quiero%20contarles%20sobre%20mi%20proyecto%20y%20cotizar%20hormig%C3%B3n." target="_blank" rel="noopener noreferrer">Hablemos por WhatsApp <span aria-hidden="true">↗</span></a>${photo('creahormigoneralogo.png', 'Creacom Hormigonera', 'experience-book__logo experience-book__logo--large')}`, 'experience-book__closing')]
  ];
  return `<dialog class="experience-book" id="creacom-experience-book" aria-labelledby="experience-book-title">
    <header class="experience-book__toolbar"><h2 id="experience-book-title">Creacom <span>· Libro de experiencias</span></h2><button type="button" data-experience-close aria-label="Cerrar libro">Cerrar <span aria-hidden="true">×</span></button></header>
    <div class="experience-book__stage">${spreads.map(([name, left, right], index) => `<section class="experience-book__spread" data-experience-spread data-title="${name}" aria-label="${name}"${index ? ' hidden' : ''}>${left}${right}</section>`).join('')}</div>
    <footer class="experience-book__navigation"><button type="button" data-experience-previous aria-label="Apertura anterior">←</button><p data-experience-status aria-live="polite" aria-atomic="true">1 / 6 · Nuestra historia en imágenes</p><button type="button" data-experience-next aria-label="Apertura siguiente">→</button></footer>
  </dialog>`;
}
