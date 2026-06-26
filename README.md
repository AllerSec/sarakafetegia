# Sara Kafetegia — Web

Sitio web de **Sara Kafetegia**, cafetería de especialidad en **Bera** (Bera de
Bidasoa, Navarra). Web estática, rápida y optimizada para SEO e IA, lista para
desplegarse en **GitHub Pages** y **Netlify** con rutas relativas.

## Stack

- HTML5 semántico + CSS moderno (sin framework, sin build).
- JavaScript vanilla + **GSAP 3** (vendorizado, self-hosted) para animaciones,
  microinteracciones, reveals al scroll y transiciones de página.
- Fuentes **self-hosted** (woff2): Bricolage Grotesque (display) + Petrona (texto).
- Imágenes en **WebP** (responsive con `srcset`), vídeos hero MP4 + WebM.

## Estructura

```
.
├── index.html               · Inicio (hero 100vh con vídeo + loader 1ª visita)
├── carta.html               · Carta con filtros por categoría
├── sobre-nosotros.html      · Historia + contexto local de Bera (E-E-A-T)
├── contacto.html            · NAP, horario, mapa lazy y formulario
├── 404.html                 · Página de error personalizada (rutas absolutas /)
├── legal/                   · Aviso legal · Privacidad · Cookies (rutas ../)
├── assets/
│   ├── css/                 · base · components · motion
│   ├── js/                  · boot (loader+transiciones) · main · vendor/ (GSAP)
│   ├── fonts/               · woff2 self-hosted + fonts.css
│   ├── icons/sprite.svg     · iconos SVG inline (sin emojis)
│   ├── img/                 · brand · photos · menu · og  (todo WebP)
│   └── video/               · heros MP4 + WebM + poster
├── _source/originals/       · imágenes originales (fuente, no se sirve)
├── robots.txt · sitemap.xml · llms.txt · llms-full.txt
├── site.webmanifest · favicon.ico · apple-touch-icon.png
├── netlify.toml · _redirects · .nojekyll
├── PRODUCT.md · DESIGN.md · IDEAS.md   · contexto de diseño (impeccable)
```

## Despliegue

### GitHub Pages
1. Subir el repo. En *Settings → Pages*, servir desde la rama `main`, carpeta `/`.
2. `.nojekyll` evita el procesado Jekyll. `404.html` se sirve solo en rutas
   no encontradas (usa rutas absolutas `/...` para funcionar a cualquier profundidad).

### Netlify
1. *New site from Git* → seleccionar el repo. Sin build command; *publish directory* `.`.
2. `netlify.toml` configura cabeceras, caché de assets, `text/plain` para
   `llms.txt` y la 404 personalizada. `_redirects` es respaldo.

Todas las rutas internas son **relativas** (excepto `404.html`, absolutas), así
que el sitio funciona igual en Pages y en Netlify.

## Pendiente del dueño del negocio (rellenar)

- **NIF/CIF** real en `legal/aviso-legal.html` (marcado como pendiente).
- Datos reales si cambian: dirección exacta, teléfono, email, horario, redes.
- Dominio definitivo: sustituir `https://sarakafetegia.com` en meta, canonical,
  OG, sitemap y schema si el dominio final es otro.
- Google Business Profile, reseñas y alta en Search Console / Bing / Apple
  Business Connect (ver guía SEO).
- Imágenes reales propias adicionales (interior, equipo) para reforzar E-E-A-T:
  reemplazar las de stock en `assets/img/` por fotos propias cuando estén.

## Otros idiomas

De momento solo **español**. La estructura está preparada para añadir versiones
por idioma en carpetas (`/eu/`, etc.) con HTML real traducido y `hreflang`.

---

Diseñado por [unaxaller.com](https://unaxaller.com).
