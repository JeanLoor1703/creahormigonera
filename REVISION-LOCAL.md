# Revisión local de Creacom Hormigonera

Esta versión está en la carpeta principal `C:\Users\User\OneDrive\Desktop\creahormigonera`, la misma que se abre en VS Code. Todavía no se ha subido a GitHub ni se ha publicado en el dominio. Incluye los cambios locales que ya existían en `index.html` y `js/creahormigonera.js` antes de iniciar este trabajo.

## Vista previa

Primero prueba `http://127.0.0.1:8787/hormigon-premezclado/`. Si ya abre, el servidor sigue encendido y no hace falta iniciarlo otra vez. Si muestra «No se puede acceder», abre esta carpeta en VS Code y ejecuta **Terminal → Ejecutar tarea… → Creacom: iniciar vista previa**. Mantén abierta esa terminal mientras revisas la web. También puedes abrir `http://127.0.0.1:8787/` para ver Inicio. Al guardar cambios de HTML, CSS, JavaScript o SVG, el navegador recarga la página automáticamente; después de cambiar fotografías, recarga manualmente. Si apagas el equipo o cierras VS Code, inicia la tarea de nuevo al día siguiente; `127.0.0.1` solo funciona mientras el servidor local está activo. Para detenerlo, pulsa **Ctrl+C** en esa terminal. No necesita la extensión Go Live ni conexión a internet. También puedes iniciarlo con `node tools/preview-server.mjs` desde la terminal de esta carpeta.

## Qué se construyó

| Ruta | Contenido |
| --- | --- |
| `/` | Portada existente, hero íntegro, todas sus secciones y 24 encabezados originales; enlaces a las páginas nuevas después del hero. |
| `/empresa/` | Portada de planta y equipo inspirada en la referencia, galería de tres fotos y video de la planta, quiénes somos, misión, visión, proceso y equipo presentado en conjunto. |
| `/hormigon-premezclado/` | H-180, H-210, H-240 y H-280 con usos orientativos y criterio del profesional responsable. |
| `/proyectos/` | Galería de seis fotografías existentes de planta, equipos y operaciones, sin nombres de clientes ni fichas con datos no autorizados. |
| `/cobertura/` | Entregas en zonas de Guayas, Los Ríos y Manabí desde El Empalme; disponibilidad sujeta a cotización. |
| `/guias/` | Índice de contenido educativo. |
| `/guias/datos-para-cotizar-hormigon/` | Datos necesarios para pedir una cotización. |
| `/guias/como-estimar-volumen-hormigon/` | Cálculo orientativo del volumen. |
| `/guias/preparar-acceso-mixer/` | Preparación del ingreso del mixer. |
| `/cotizar/` | Formulario existente con ajustes de diseño móvil, tipografía y canonical. |

También permanecen `/opiniones/`, `/reseñas/`, `/oferta-hormigon.html`, `/oferta-hormigon-Jean.html` y `/whatsapp.html`. Se corrigieron los canonicals de opiniones y reseñas. Las páginas de campaña y redirección llevan `noindex` y quedan fuera del sitemap.

## SEO protegido

`REVISION-SEO-BASE.json` registra el `title`, descripción, canonical, los 24 encabezados con nivel y orden, las 33 anclas originales, términos regionales y huella del HTML del hero de la portada inicial. La comparación automática confirma que los encabezados, el hero y todas las anclas originales permanecen. No se sustituyó el H1 principal ni los H2 estratégicos. Las nuevas páginas tienen su propio H1, título, descripción, canonical y enlaces HTML entre sí. El sitemap reúne las diez páginas principales indexables. `robots.txt` conserva el enlace al sitemap.

Para repetir la comparación con el registro inicial: `node tools/verify-review.mjs`.

## Identidad y límites de contenido

La paleta y tipografía siguen la guía compartida: rojo `#ED3237`, gris `#4D4D4F`, gris claro `#F2F2F2`, carbón `#151515`, blanco, League Spartan e Inter. Se usaron fotografías locales existentes. El propietario confirmó que los mixers y el equipo de bombeo son de Creacom; aún faltan cantidades, modelos y capacidades si se desean publicar. El pedido mínimo visible es 5 m³ y el WhatsApp principal es `099 752 8670`. Las guías pueden ser útiles fuera de la zona de reparto, pero no prometen entregas fuera de Guayas, Los Ríos y Manabí. La selección de resistencia se remite al diseño de la obra.

En Empresa, la portada usa una sola imagen, `Planta-CREACOM-portada.webp`, con panel oscuro y diagonales translúcidas, además de engranajes técnicos en las esquinas. Los seis pictogramas de esta portada se dibujaron en SVG con trazo uniforme. A petición del propietario, la fila inferior reproduce los rótulos de su referencia: «Industrial premium», «Técnica», «Fraguado seguro» y «Alta calidad». Estos rótulos no representan una certificación; el respaldo técnico y documental sigue pendiente de revisión. Los enlaces blancos llevan a Planta y Equipo. En «Quiénes somos», el panel del logo es un libro de cinco hojas con fotografías reales, los cinco logos de clientes autorizados (All In Construction, DIPAC, CELEP EP, Prefectura del Guayas y BI Cacao) y cierre hacia WhatsApp. Las hojas giran automáticamente cada cinco segundos cuando el libro está visible. El cambio se detiene al pasar el cursor, enfocar sus controles, salir de pantalla o cambiar de pestaña. También ofrece flechas y teclado. Con movimiento reducido, el cambio es manual e inmediato. La foto amplia del grupo aparece una sola vez en «Nuestro equipo». Las tres fotografías y el video vertical entregados están en la sección de planta. El pie de las páginas internas usa fondo claro y enlaces de mayor contraste.

## Información necesaria antes de publicar o ampliar afirmaciones

- Certificado: archivo íntegro, emisor, titular, alcance, vigencia y mezclas cubiertas. Con ello se revisará la frase de certificación que ya estaba en Inicio; no se ha extendido a las páginas nuevas.
- Denominación legal y RUC que se desea publicar para precisar la relación con CREACOM S.A.
- Fichas técnicas aprobadas de H-180, H-210, H-240 y H-280, condiciones de ensayo y documentos que puedan mostrarse al público.
- Para cada proyecto identificable: nombre de cliente, ubicación, fecha, volumen, resistencia, fotografía y autorización expresa de publicación. La galería actual omite identidades.
- Relación comprobada de localidades atendidas, condiciones de distancia y acceso; cantidad y características de mixers y bombas, alcance del servicio de bombeo, capacidad y plazos si se desean comunicar con evidencia.
- Para ampliar la galería con nuevos mixers, bombas, personal u obras: identificación del lugar, fecha, descripción de lo mostrado y permiso de publicación cuando corresponda. Las tres fotos y el video vertical de planta ya están incorporados.
- Empresas, proveedores o verificadores que se desee mencionar: nombre, tipo de relación, documento de respaldo y autorización para usar el nombre o logotipo. No se publican como avales hasta revisarlos.

No se incluyen contratos, facturas ni documentos comerciales en bruto. La revisión visual local y la prueba del formulario no equivalen a publicar ni validar afirmaciones comerciales pendientes.

## Hormigón: producto y entrega en obra

El H1 de Hormigón usa el texto de la nueva referencia: «La mezcla que impulsa tu obra»; se conservaron los H2. El hero tiene fondo blanco, título en carbón y rojo, y la imagen seleccionada `Hero_Creacom_Hormigonera.png`, convertida a WebP para la vista. El botón «Ver resistencias» baja a las cuatro opciones en la misma página. Debajo figuran tres iconos con los rótulos confirmados por Creacom: «Camión mixer», «Monitoreo del mixer» y «Bombeo incluido». No se añadió «Bombeo gratis». El texto y los enlaces quedan accesibles y rastreables en HTML. Las cuatro mezclas conservan sus textos breves y enlaces a cotización; el pedido mínimo es 5 m³. La selección de resistencia sigue el diseño del profesional responsable.

El bloque «Mixers y bombeo para tu obra» se divide en dos áreas. Mixers destaca la foto aérea de obra elegida por Creacom, más fotos de descarga y acceso; Bombeo alterna dos fotografías del equipo de bombeo entregadas en la carpeta nueva, con transición suave y control para pausar. La alternancia se detiene fuera de pantalla y con movimiento reducido. La imagen del hero permanece fija. Estas fotos podrán sustituirse o ampliarse con futuras imágenes. La imagen de «Ten listos los datos de tu obra» es la vista aérea de la planta con un mixer.

El video entregado el 6 de octubre se revisó por fotogramas: muestra mixer, bombeo y colocación en obra. El video completo permanece en `imagenes/hormigon/entrega-en-obra.mp4` en Bombeo. En Mixers se usa un fragmento de unos 12 segundos, `imagenes/hormigon/mixer-en-obra.mp4`, extraído aproximadamente entre los segundos 23,5 y 35,5, con su propia imagen previa. No se identifica lugar ni cliente. Los videos se cargan al acercarse a pantalla, se reproducen sin sonido cuando son visibles y se pausan al salir; si ambos están a la vista, solo se reproduce el más visible. Con movimiento reducido se mantiene reproducción manual.

Comprobación: sin desbordamiento horizontal en escritorio y móvil de 390 px; orden Mixers, Bombeo y preparación en móvil; reproducción, pausa y alternancia por visibilidad verificadas. El control SEO confirmó los 24 encabezados y el hero de Inicio intactos, canonicals, sitemap y recursos locales. Siguen pendientes fichas, respaldo de certificaciones y cifras de capacidad si se desean publicar.
