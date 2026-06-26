# Design — Sara Kafetegia

> Visual system. Brand register. Anchored on the real logo (deep espresso /
> oxblood brown, hand-drawn croissant + cup). Static multi-page site, ES first,
> GitHub Pages + Netlify, relative paths, GSAP motion, self-hosted fonts.

## Theme / Mood

One-sentence scene: *"Las siete de la tarde de octubre en Bera: entras del frío
de la montaña a una cafetería con las paredes color café tostado, bombillas
Edison ámbar colgando, plantas, el olor del grano recién molido y un croissant
en el plato."*

Color strategy: **Committed → Drenched in places.** The deep espresso brown is
the brand and carries large surfaces (hero overlay, footer, feature bands),
*not* a beige near-white body. Warmth comes from the brown + amber accent +
real photography, never from a tinted cream canvas (the AI cliché we ban).
Light sections use a disciplined warm off-white; dark sections drench in
espresso. Two worlds, one voice.

Mode: light-primary with rich dark espresso sections (not a toggle dark mode —
art-directed per section).

## Color Palette (OKLCH)

Anchored on logo sample `#541818 / #48180c / #3c180c` → deep warm
espresso-oxblood. Amber/honey accent = the Edison-bulb light + crema.

```css
:root {
  /* Brand core — espresso/oxblood from the logo */
  --espresso:        oklch(0.30 0.072 35);    /* #3f231a-ish · primary brand, dark bands, footer */
  --espresso-deep:   oklch(0.22 0.060 33);    /* near-black coffee · deepest surfaces */
  --espresso-ink:    oklch(0.26 0.066 34);    /* body ink on light */
  --espresso-soft:   oklch(0.42 0.075 38);    /* hover / secondary brown */

  /* Accent — Edison amber / honey / crema */
  --amber:           oklch(0.74 0.135 66);    /* warm honey · primary accent + CTA */
  --amber-deep:      oklch(0.64 0.140 55);    /* amber pressed / on light for AA */
  --crema:           oklch(0.88 0.060 78);    /* coffee crema foam · soft accent */

  /* Surfaces — DISCIPLINED warm off-white, NOT cream-near-white slop.
     Light bg is a true warm-paper but kept high-L + very low C so it reads
     "clean", warmth carried by brand+photos. Dark surface is the brand drench. */
  --surface:         oklch(0.985 0.006 70);   /* main light bg — warm but restrained */
  --surface-raised:  oklch(1.000 0.000 0);    /* pure white cards/inputs */
  --surface-sand:    oklch(0.945 0.012 72);   /* subtle warm band for rhythm (used sparingly) */
  --surface-dark:    var(--espresso);         /* dark sections */
  --surface-darker:  var(--espresso-deep);

  /* Ink / text */
  --ink:             oklch(0.24 0.030 40);    /* primary text on light ≥ 4.5:1 */
  --ink-muted:       oklch(0.44 0.028 42);    /* secondary text on light, still ≥4.5:1 on surface */
  --on-dark:         oklch(0.96 0.012 78);    /* text on espresso */
  --on-dark-muted:   oklch(0.82 0.020 72);    /* secondary on espresso ≥4.5:1 */

  /* Lines / supporting */
  --line:            oklch(0.88 0.012 60);    /* hairline borders on light */
  --line-dark:       oklch(0.40 0.040 38);    /* borders on espresso */
  --leaf:            oklch(0.52 0.070 140);   /* muted plant green — tiny biophilic accent only */
  --destructive:     oklch(0.55 0.180 27);
}
```

Pairs verified: `--ink` on `--surface` ≈ 12:1; `--ink-muted` on `--surface`
≈ 5.3:1; `--on-dark` on `--espresso` ≈ 11:1; `--on-dark-muted` on `--espresso`
≈ 5.6:1; `--amber-deep` text on `--surface` ≈ 4.6:1; CTA = `--ink`/`--espresso`
text on `--amber` ≈ 7:1.

Bans honored: NO `--cream/--sand/--parchment` as the body bg hue trap (surface
is L .985, C .006 — reads clean, not "warm sand"); warmth lives in brand+amber+
photos. No purple/pink AI gradients. No gradient text.

## Typography

Selection procedure done (brand words: warm · hand-crafted · unhurried). Reflex
picks (Playfair / Fraunces / Cormorant) rejected — all on the reflex-reject
list. Final, self-hosted (woff2), on a real contrast axis (irregular grotesque
display vs warm humanist serif text):

- **Display / Headings → `Bricolage Grotesque`** (variable opsz 12–96, wght
  200–800). Warm, slightly irregular, hand-made-modern character; carries the
  "artesana" voice without the editorial-serif cliché.
- **Body / Long-form → `Petrona`** (variable serif, wght 300–700 + italic).
  Warm, readable text serif; gives the café its unhurried, hospitable reading
  texture. Contrast axis vs the grotesque display = legitimate pairing.
- **Brand signature → the logo asset itself** (the hand-script "Sara
  Kafetegia"), used as image, never faked with a script font.

Scale: fluid `clamp()`, ratio ≥1.25. Hero display max ≤ 6rem. Display
letter-spacing ≥ -0.03em (warm, not cramped). `text-wrap: balance` on h1–h3;
`text-wrap: pretty` on prose. Body line-length 60–72ch. Body 18px base, lh 1.6;
light-on-dark +0.05 lh.

```
--font-display: 'Bricolage Grotesque', 'Segoe UI', system-ui, sans-serif;
--font-body:    'Petrona', Georgia, 'Times New Roman', serif;
--step--1: clamp(0.83rem, 0.78rem + 0.25vw, 0.95rem);
--step-0:  clamp(1.06rem, 1.00rem + 0.30vw, 1.20rem);
--step-1:  clamp(1.30rem, 1.18rem + 0.60vw, 1.62rem);
--step-2:  clamp(1.62rem, 1.40rem + 1.05vw, 2.30rem);
--step-3:  clamp(2.05rem, 1.65rem + 1.90vw, 3.30rem);
--step-4:  clamp(2.55rem, 1.90rem + 3.10vw, 4.60rem);
--step-5:  clamp(3.10rem, 2.10rem + 4.70vw, 5.80rem);  /* hero, ≤6rem */
```

## Spacing & Layout

- Spacing scale (8pt rhythm, fluid): 4 8 12 16 24 32 48 64 96 128.
- Container max ~ `min(92vw, 1200px)`; reading column ~68ch.
- Flex for 1D, Grid for 2D. Breakpoint-free grids:
  `repeat(auto-fit, minmax(280px, 1fr))`. **No orphaned last row** — counts
  chosen so rows fill (galleries 6 items → 3×2 / 2×3; never a lone tile). On
  mobile collapse to 1 col + "Ver más" so nothing saturates.
- Symmetric containers everywhere (user requirement). Asymmetry only as a
  deliberate single accent (hero), never accidental.
- Z-index scale: base 0, raised 10, sticky-nav 100, dropdown 200,
  backdrop 800, modal 900, toast 1000, loader 1100.
- Breakpoints: 375 / 640 / 768 / 1024 / 1280 / 1440.

## Components & Effects

- **Nav**: sticky, transparent over hero → solidifies to espresso on scroll;
  logo (image) left, links center/right, one amber "Cómo llegar" CTA. Mobile:
  full-screen hamburger overlay, staggered link reveal.
- **Buttons**: filled amber (primary, espresso text), outline espresso
  (secondary); 150–220ms ease-out; subtle scale 0.97 press; never bounce;
  cursor-pointer; ≥44px.
- **Cards** used only when the right affordance (menu items, gallery). No nested
  cards. Hairline `--line`, soft natural shadow `0 6px 24px rgba(40,22,16,.10)`,
  radius 14px (slightly organic, not pill).
- **Texture**: very subtle grain overlay on dark espresso bands (opacity ≤0.05)
  + soft steam/coffee-ring SVG motifs. No glassmorphism by default.
- **Imagery**: real photos first (interior, Bera, logo), then generated WebP for
  menu items / services / textures. Full-bleed hero with video, overlaid menu +
  centered headline (canonical image-led move). 6 images per page minimum.
- **Icons**: custom inline SVG (cup, croissant, bean, leaf, steam, clock, pin),
  consistent 1.75px stroke, animated subtly with intention — never emojis.

## Motion (GSAP)

- Ease-out exponential (`expo`/`quart`/`quint`). No bounce/elastic.
- One orchestrated page-load on **first visit only** (loader: logo draws in,
  steam rises, curtain lifts) — sessionStorage-gated, never repeated.
- ScrollTrigger reveals: per-section, fitted to content (stagger lists 40–60ms),
  not one uniform fade on everything. Reveals enhance already-visible defaults.
- Hero: looping coffee/steam video + subtle parallax; mouse-reactive warmth
  (light/steam follows cursor) on pointer-fine devices only.
- Microinteractions: cup "fills" on CTA hover, croissant flake, menu underline
  draw, count-up on stats, magnetic CTA.
- Page transitions: prefetch on hover + cross-fade/curtain barba-style (no full
  preload; protect LCP).
- `prefers-reduced-motion: reduce` → crossfade/instant everywhere; loader
  skipped; video → poster.

## Anti-slop guardrails (must-hold)

- No cream/sand/parchment near-white body bg. Surface is clean warm-white;
  brown + amber + photos carry warmth.
- No tiny uppercase tracked eyebrow above every section. No 01/02/03 numbered
  section scaffolding unless a real sequence.
- No display-serif-italic + drop-cap editorial broadsheet look.
- No side-stripe borders, no gradient text, no decorative glassmorphism, no
  hero-metric template, no identical icon-card grids, no emoji icons.
- No mono-as-costume (café isn't a dev tool).
- Test heading copy at every breakpoint — no overflow.
