/* ============================================================
   Sara Kafetegia - main.js
   Vanilla JS + GSAP. Progressive enhancement: every feature works
   (or degrades) without JS; reduced-motion fully respected.
   ============================================================ */
(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const $  = (s, c = doc) => c.querySelector(s);
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));
  const onIdle = (cb) => ('requestIdleCallback' in window) ? requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 300);

  /* ---------------- i18n: cadenas según <html lang> ---------------- */
  const I18N = {
    es: { open: 'Abierto · hasta las {h}', opens: 'Cerrado · abre a las {h}', opensTomorrow: 'Cerrado · abre mañana a las {h}', closed: 'Cerrado ahora', prevPhoto: 'Foto anterior', nextPhoto: 'Foto siguiente', enlarge: 'Ampliar: ', map: 'Mapa', locale: 'es-ES' },
    eu: { open: 'Irekita · {h} arte', opens: 'Itxita · {h}etan irekiko dugu', opensTomorrow: 'Itxita · bihar {h}etan irekiko dugu', closed: 'Itxita orain', prevPhoto: 'Aurreko argazkia', nextPhoto: 'Hurrengo argazkia', enlarge: 'Handitu: ', map: 'Mapa', locale: 'eu-ES' },
    en: { open: 'Open · until {h}', opens: 'Closed · opens at {h}', opensTomorrow: 'Closed · opens tomorrow at {h}', closed: 'Closed now', prevPhoto: 'Previous photo', nextPhoto: 'Next photo', enlarge: 'View larger: ', map: 'Map', locale: 'en-GB' },
    fr: { open: 'Ouvert · jusqu’à {h}', opens: 'Fermé · ouvre à {h}', opensTomorrow: 'Fermé · ouvre demain à {h}', closed: 'Fermé actuellement', prevPhoto: 'Photo précédente', nextPhoto: 'Photo suivante', enlarge: 'Agrandir : ', map: 'Carte', locale: 'fr-FR' }
  };
  const T = I18N[(root.lang || 'es').slice(0, 2)] || I18N.es;

  if (hasGSAP && !prefersReduced) root.classList.add('js-motion');

  /* ---------------- Year stamp ---------------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------------- Header scroll state + progreso de lectura ---------------- */
  const header = $('.site-header');
  let progress = null;
  if (!prefersReduced) {
    progress = doc.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(progress);
  }
  if (header || progress) {
    const onScroll = () => {
      if (header) header.setAttribute('data-scrolled', String(window.scrollY > 40));
      if (progress) {
        const max = doc.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
      }
    };
    onScroll();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ---------------- Focus trap reutilizable (WCAG 2.2: no keyboard trap out) ---------------- */
  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const trapTabIn = (container) => {
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const els = $$(FOCUSABLE, container).filter(el => el.getClientRects().length > 0);
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  };

  /* ---------------- Mobile menu ---------------- */
  const toggle = $('.nav-toggle');
  const mobileMenu = $('.mobile-menu');
  if (toggle && mobileMenu) {
    const close = $('.menu-close', mobileMenu);
    const openMenu = (open) => {
      mobileMenu.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      doc.body.style.overflow = open ? 'hidden' : '';
      if (open) { const f = $('a', mobileMenu); f && f.focus(); }
      else if (mobileMenu.contains(doc.activeElement)) toggle.focus();
    };
    trapTabIn(mobileMenu);
    toggle.addEventListener('click', () => openMenu(mobileMenu.getAttribute('data-open') !== 'true'));
    close && close.addEventListener('click', () => openMenu(false));
    $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => openMenu(false)));
    doc.addEventListener('keydown', e => { if (e.key === 'Escape' && mobileMenu.getAttribute('data-open') === 'true') openMenu(false); });
  }

  /* ---------------- Open / closed badge ---------------- */
  // Horario REAL (partido). Cada día = lista de tramos [desde, hasta] en minutos.
  // Lun-Vie 7:30-13:30 y 17:00-20:30 · Sáb-Dom 8:00-14:00 y 17:00-20:30
  const WEEK = [[450, 810], [1020, 1230]];           // L-V
  const WEEKEND = [[480, 840], [1020, 1230]];        // Sáb-Dom
  const HOURS = { 1: WEEK, 2: WEEK, 3: WEEK, 4: WEEK, 5: WEEK, 6: WEEKEND, 0: WEEKEND };
  const fmtHour = (m) => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
  $$('.open-badge').forEach(badge => {
    const now = new Date();
    const day = now.getDay();
    const spans = HOURS[day] || [];
    const mins = now.getHours() * 60 + now.getMinutes();
    const current = spans.find(([from, to]) => mins >= from && mins < to);
    const open = !!current;
    badge.setAttribute('data-open', String(open));
    const label = $('.open-label', badge);
    if (!label) return;
    if (open) {
      label.textContent = T.open.replace('{h}', fmtHour(current[1]));
    } else {
      const next = spans.find(([from]) => mins < from);
      if (next) {
        label.textContent = T.opens.replace('{h}', fmtHour(next[0]));
      } else {
        const tomorrow = HOURS[(day + 1) % 7] || [];
        label.textContent = tomorrow.length
          ? T.opensTomorrow.replace('{h}', fmtHour(tomorrow[0][0]))
          : (badge.dataset.closedText || T.closed);
      }
    }
  });
  // Highlight today's row in hours list
  $$('.hours-list [data-day]').forEach(li => {
    if (Number(li.dataset.day) === new Date().getDay()) li.setAttribute('data-today', 'true');
  });

  /* ---------------- Menu filter (FLIP-ish) ---------------- */
  const filterbar = $('.filterbar');
  if (filterbar) {
    const cards = $$('[data-cat]');
    filterbar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', filterbar).forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        if (hasGSAP && !prefersReduced) {
          if (show) { card.hidden = false; gsap.fromTo(card, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }); }
          else { gsap.to(card, { autoAlpha: 0, y: 8, duration: 0.25, ease: 'power2.in', onComplete: () => { card.hidden = true; } }); }
        } else { card.hidden = !show; }
      });
    });
  }

  /* ---------------- Lazy map ---------------- */
  $$('.map-cover').forEach(cover => {
    const load = () => {
      const wrap = cover.closest('.map-embed');
      const src = cover.dataset.src;
      if (!wrap || !src) return;
      const iframe = doc.createElement('iframe');
      iframe.src = src; iframe.loading = 'lazy'; iframe.title = cover.dataset.title || T.map;
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);
      cover.remove();
    };
    cover.addEventListener('click', load);
    cover.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
  });

  /* ---------------- Lightbox v2 (colección + navegación + swipe) ---------------- */
  const lightbox = $('.lightbox');
  const figures = $$('.gallery figure, .gallery-bento figure, .photo-strip figure');
  if (lightbox && figures.length) {
    const lbImg = $('img', lightbox);
    const lbClose = $('button', lightbox);
    // UI extra construida aquí para no tocar el markup base de cada página
    const SVG_NS = 'http://www.w3.org/2000/svg';
    // La ruta del sprite se toma de un icono ya presente en la página, para
    // respetar rutas relativas (raíz) y absolutas (/en/, /eu/, /fr/) por igual.
    const anyUse = $('use[href*="sprite.svg"]');
    const spriteBase = anyUse ? anyUse.getAttribute('href').split('#')[0] : 'assets/icons/sprite.svg';
    const mkNav = (cls, label) => {
      const b = doc.createElement('button');
      b.className = 'lb-nav ' + cls; b.setAttribute('aria-label', label);
      const svg = doc.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('aria-hidden', 'true');
      const use = doc.createElementNS(SVG_NS, 'use');
      use.setAttribute('href', spriteBase + '#i-chevron');
      svg.appendChild(use); b.appendChild(svg);
      lightbox.appendChild(b); return b;
    };
    const lbPrev = mkNav('lb-prev', T.prevPhoto);
    const lbNext = mkNav('lb-next', T.nextPhoto);
    const lbCount = doc.createElement('span');
    lbCount.className = 'lb-count'; lbCount.setAttribute('aria-hidden', 'true');
    const lbCaption = doc.createElement('p');
    lbCaption.className = 'lb-caption';
    lightbox.append(lbCount, lbCaption);

    const items = figures.map(fig => {
      const img = $('img', fig);
      return { src: fig.dataset.full || (img && (img.currentSrc || img.src)), alt: (img && img.alt) || '' };
    });
    let idx = 0;
    const preload = (i) => { const it = items[(i + items.length) % items.length]; if (it) { const im = new Image(); im.src = it.src; } };
    const show = (i) => {
      idx = (i + items.length) % items.length;
      const it = items[idx];
      lbImg.src = it.src; lbImg.alt = it.alt;
      lbCaption.textContent = it.alt;
      lbCount.textContent = (idx + 1) + ' / ' + items.length;
      preload(idx + 1); preload(idx - 1);
    };
    let lastFocus = null;
    const open = (i) => { lastFocus = doc.activeElement; show(i); lightbox.setAttribute('data-open', 'true'); lbClose.focus(); doc.body.style.overflow = 'hidden'; };
    const close = () => {
      lightbox.setAttribute('data-open', 'false'); doc.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    trapTabIn(lightbox);

    figures.forEach((fig, i) => {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      const img = $('img', fig);
      if (img && img.alt) fig.setAttribute('aria-label', T.enlarge + img.alt);
      const trigger = () => open(i);
      fig.addEventListener('click', trigger);
      fig.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } });
    });
    lbPrev.addEventListener('click', () => show(idx - 1));
    lbNext.addEventListener('click', () => show(idx + 1));
    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    doc.addEventListener('keydown', e => {
      if (lightbox.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
    // Swipe táctil
    let swipeX = null;
    lightbox.addEventListener('pointerdown', e => { swipeX = e.clientX; }, { passive: true });
    lightbox.addEventListener('pointerup', e => {
      if (swipeX === null) return;
      const dx = e.clientX - swipeX; swipeX = null;
      if (Math.abs(dx) > 44) { dx > 0 ? show(idx - 1) : show(idx + 1); }
    }, { passive: true });
  }

  /* ============================================================
     GSAP-driven motion (guarded by hasGSAP + !prefersReduced)
     ============================================================ */
  if (hasGSAP && !prefersReduced) {
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    const mm = gsap.matchMedia();

    /* Reveal-on-scroll: per-element, fitted. Mark .pre then animate.
       Solo se prepara con la pestaña visible: en pestañas en segundo plano el
       rAF está congelado y el contenido quedaría oculto hasta el ScrollTrigger. */
    const setupReveals = () => {
      const reveals = $$('[data-reveal]');
      reveals.forEach(el => el.classList.add('pre'));
      onIdle(() => {
        reveals.forEach(el => {
          const stagger = el.dataset.reveal === 'stagger';
          const targets = stagger ? Array.from(el.children) : [el];
          if (stagger) { Array.from(el.children).forEach(c => c.classList.add('pre')); el.classList.remove('pre'); }
          gsap.to(targets, {
            autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
            stagger: stagger ? 0.06 : 0,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true,
              onEnter: () => { targets.forEach(t => t.classList.remove('pre')); } }
          });
        });
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      });
    };
    if (doc.hidden) {
      const onVisible = () => { if (!doc.hidden) { doc.removeEventListener('visibilitychange', onVisible); setupReveals(); } };
      doc.addEventListener('visibilitychange', onVisible);
    } else {
      setupReveals();
    }

    /* Hero parallax + cursor warmth (desktop pointer only) */
    mm.add('(min-width: 880px) and (pointer: fine)', () => {
      const media = $('.hero-media');
      if (media) {
        gsap.to(media, { yPercent: 14, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        const glow = $('.hero-glow');
        if (glow) {
          const qx = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3' });
          const qy = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3' });
          $('.hero').addEventListener('pointermove', e => {
            glow.classList.add('live');
            qx(e.clientX); qy(e.clientY);
          });
          $('.hero').addEventListener('pointerleave', () => glow.classList.remove('live'));
        }
      }
      return () => {};
    });

    /* Tilt 3D sutil en cards con foto (pointer fine) */
    mm.add('(min-width: 880px) and (pointer: fine)', () => {
      const cards = $$('.menu-card, .moment');
      const handlers = [];
      cards.forEach(card => {
        card.setAttribute('data-tilt', '');
        const move = e => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.setProperty('--ry', (px * 7).toFixed(2) + 'deg');
          card.style.setProperty('--rx', (-py * 5).toFixed(2) + 'deg');
        };
        const enter = () => card.classList.add('tilting');
        const leave = () => {
          card.classList.remove('tilting');
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        };
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        handlers.push([card, enter, move, leave]);
      });
      return () => handlers.forEach(([c, en, m, l]) => {
        c.removeEventListener('pointerenter', en);
        c.removeEventListener('pointermove', m);
        c.removeEventListener('pointerleave', l);
        c.removeAttribute('data-tilt');
        c.style.removeProperty('--rx'); c.style.removeProperty('--ry');
      });
    });

    /* Magnetic buttons */
    mm.add('(min-width: 880px) and (pointer: fine)', () => {
      const mags = $$('.magnetic');
      const handlers = [];
      mags.forEach(btn => {
        const move = e => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          gsap.to(btn, { x: mx * 0.28, y: my * 0.32, duration: 0.5, ease: 'power3.out' });
        };
        const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'expo.out' });
        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerleave', reset);
        handlers.push([btn, move, reset]);
      });
      return () => handlers.forEach(([b, m, r]) => { b.removeEventListener('pointermove', m); b.removeEventListener('pointerleave', r); gsap.set(b, { x: 0, y: 0 }); });
    });

    /* Count-up stats */
    $$('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const obj = { v: 0 };
      window.ScrollTrigger && window.ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString(T.locale) + suffix; } })
      });
    });
  } else {
    // No motion: ensure count-ups show final value
    $$('[data-count]').forEach(el => { el.textContent = Number(el.dataset.count).toLocaleString(T.locale) + (el.dataset.suffix || ''); });
  }
})();
