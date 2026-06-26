# Sara Kafetegia — 50+ ideas creativas (impeccable ideation)

> Banco de ideas para una web de cafetería de pueblo con alma de especialidad en
> Bera. Mirando qué hacen en 2026 los cafés más modernos (vídeo hero, parallax
> narrativo, reveals de carta al scroll, ≤6 ítems de menú, prueba social IG),
> pero filtrado por la voz **cálida · artesana · sin prisa** y los anti-slop de
> DESIGN.md. No todas se implementan al 100%; son el repertorio del que tira la
> construcción. Marcadas ★ las imprescindibles.

## Hero / Inicio (100vh)
1. ★ Hero 100vh con **vídeo en bucle** de café cayendo / vapor subiendo / molido, overlay espresso para legibilidad analizada por foto.
2. ★ **Loader de primera visita** (sessionStorage): el logo se "dibuja" (stroke draw SVG), sube vapor, y una "cortina" de color café se levanta. Nunca se repite.
3. Titular hero con la palabra clave + Bera; subrayado amber que se "dibuja" al entrar.
4. **Vapor reactivo al ratón**: una capa de vapor/luz cálida sigue el cursor (solo pointer-fine).
5. Taza SVG en el hero cuyo nivel de café "sube" con un micro-scroll inicial.
6. Indicador de scroll = gota de café que cae rítmicamente.
7. Badge "Abierto ahora / Cerrado" calculado en vivo desde el horario (JS, con schema).
8. Parallax sutil de 2–3 capas (grano de fondo, taza, vapor) al mover el hero.

## Navegación / microinteracciones
9. ★ Nav transparente sobre hero que **solidifica a espresso** al hacer scroll.
10. ★ Menú móvil overlay a pantalla completa con **revelado escalonado** de enlaces.
11. CTA "Cómo llegar" **magnético** (se acerca suavemente al cursor).
12. Underline de enlaces que se "dibuja" de izquierda a derecha al hover.
13. Botón CTA donde una **taza se llena** de café al hover.
14. Cambio de página con **prefetch al hover** + transición cortina/cross-fade (sin precargar toda la web).
15. Tooltip cálido en iconos (horario, alérgenos) que aparece suave.
16. Scroll progress como **borde de taza que se llena** arriba.

## Carta / Menú
17. ★ Carta con **reveals al scroll** por categoría (café, desayunos, dulces, salado), stagger fitted.
18. Cada categoría = página propia (requisito: separar inicio del resto), enlazadas y entre sí.
19. Tarjetas de producto con foto WebP propia/generada, precio, alérgenos en SVG, descripción única (anti-duplicado SEO).
20. Filtro/segmented control (Todo · Café · Dulce · Salado · Vegano) con transición FLIP.
21. **Coffee origin map / ritual**: mini-sección "del grano a la taza" en 3 pasos reales (no scaffolding numérico gratuito — es secuencia real).
22. Carrusel de "especialidades de la casa" (embla/scroll-snap), una tarjeta destacada.
23. Etiquetas "Favorito de Bera", "De temporada", "Sin gluten" como chips reales.
24. Hover de tarjeta: la foto hace un leve zoom-in y aparece "Pídelo en barra".

## Sobre nosotros / E-E-A-T / local
25. ★ Sección **Bera**: foto real del pueblo + texto local auténtico (Bidasoa, Bortziriak, Itzea/Baroja, San Esteban, Larun 905m, frontera con Francia).
26. Timeline "nuestra historia" como ruta de café (desde [año]) — secuencia real, con scroll-draw de la línea.
27. Galería del interior (bombillas Edison, plantas, granos) con **lightbox** y grid 3×2 sin huérfanos.
28. Mapa de proximidad: "a X min de Lesaka / Etxalar / Sara (FR)" como señal de cercanía.
29. Cita/quote del local con tipografía Petrona italic (sin caer en editorial-broadsheet).
30. "Tostado de especialidad" explicado simple y cálido (expertise sin frialdad de tercera ola).
31. Tarjeta de equipo / "quién te atiende" (foto del equipo trabajando = señal de experiencia).

## Contacto / conversión
32. ★ Mapa **lazy-load** (no carga Google Maps hasta pedirlo) + botón "Cómo llegar".
33. Horario estructurado con día actual resaltado y estado abierto/cerrado en vivo.
34. Botones grandes táctiles: Llamar · Cómo llegar · Instagram · WhatsApp.
35. Formulario de contacto antispam (honeypot), labels visibles, validación on-blur, estados de envío.
36. NAP visible y coherente en cabecera, pie y contacto (schema LocalBusiness/CafeOrCoffeeShop).
37. Bloque "Reserva tu mesa / Eventos" (cumpleaños, meriendas de grupo) si aplica.

## Atmósfera / detalles de marca (delight)
38. ★ **Grain/textura sutil** sobre las bandas espresso (opacity ≤0.05).
39. Motivo **mancha/aro de café** SVG como separador de secciones (no side-stripe).
40. Iconos SVG propios animados con intención: taza, croissant, grano, hoja, vapor, reloj, pin (stroke 1.75).
41. Vapor que sube en bucle lento sobre la taza del hero/footer.
42. Count-up de cifras reales (años, variedades de café, tazas servidas) al entrar en vista.
43. Croissant que suelta una "escama" al hover (partícula sutil).
44. Cursor personalizado tipo gota/grano en zonas clave (solo desktop, discreto).
45. Modo "tarde" automático: paleta vira un punto más ámbar según hora local (sin toggle).
46. Hoja de planta que se mece muy levemente (biophilic, --leaf, mínimo).

## Footer / cierre
47. ★ Footer espresso drenched con logo, NAP, horario, redes, idiomas, y copyright **unaxaller.com** (enlace).
48. "Vuelve a subir" como taza que se vacía/llena.
49. Mini-FAQ atómica (40–60 palabras) en home y carta para AEO/IA.
50. Newsletter "novedades de la casa" sencillo (sin pop-up agresivo).

## Técnicas / 404 / sistema
51. ★ **404 personalizada**: "taza vacía" — café derramado SVG + "Esta taza está vacía" + CTA a inicio; redirección global a 404 para rutas inexistentes.
52. ★ Detección de idioma por navegador/país (sin pedir ubicación), **nunca euskera por defecto**.
53. Prefers-reduced-motion: todo con alternativa; loader saltado; vídeo→póster.
54. Páginas reales por idioma en carpetas (/eu/, etc.) cuando se apruebe el diseño (de momento ES).
55. Skip-link, foco visible, targets ≥44px, contraste verificado en ambos mundos (claro/espresso).

## SEO / IA infra
56. Schema CafeOrCoffeeShop + FAQPage + Breadcrumb + Organization + WebSite(SearchAction).
57. robots.txt (con bots IA + ref a llms.txt), sitemap.xml, llms.txt + llms-full.txt muy completos.
58. OG/Twitter cards con foto real del local; favicon = logo (solo imagen).
59. Geo meta (región Navarra, ciudad Bera, coordenadas), hreflang preparado.
60. Copy con keyword local en primeras 100 palabras, alt descriptivos, títulos únicos por página.
