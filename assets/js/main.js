/* ============================================================
   Sara Kafetegia — main.js
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

  if (hasGSAP && !prefersReduced) root.classList.add('js-motion');

  /* ---------------- Year stamp ---------------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------------- Header scroll state ---------------- */
  const header = $('.site-header');
  if (header) {
    const setScrolled = () => header.setAttribute('data-scrolled', String(window.scrollY > 40));
    setScrolled();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(() => { setScrolled(); ticking = false; }); ticking = true; }
    }, { passive: true });
  }

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
    };
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
  $$('.open-badge').forEach(badge => {
    const now = new Date();
    const spans = HOURS[now.getDay()] || [];
    const mins = now.getHours() * 60 + now.getMinutes();
    const open = spans.some(([from, to]) => mins >= from && mins < to);
    badge.setAttribute('data-open', String(open));
    const label = $('.open-label', badge);
    if (label) label.textContent = open ? (badge.dataset.openText || 'Abierto ahora') : (badge.dataset.closedText || 'Cerrado ahora');
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
      iframe.src = src; iframe.loading = 'lazy'; iframe.title = cover.dataset.title || 'Mapa';
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.allowFullscreen = true;
      wrap.appendChild(iframe);
      cover.remove();
    };
    cover.addEventListener('click', load);
    cover.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
  });

  /* ---------------- Lightbox ---------------- */
  const lightbox = $('.lightbox');
  if (lightbox) {
    const lbImg = $('img', lightbox);
    const lbClose = $('button', lightbox);
    const open = (src, alt) => { lbImg.src = src; lbImg.alt = alt || ''; lightbox.setAttribute('data-open', 'true'); lbClose.focus(); doc.body.style.overflow = 'hidden'; };
    const close = () => { lightbox.setAttribute('data-open', 'false'); doc.body.style.overflow = ''; };
    $$('.gallery figure').forEach(fig => {
      const img = $('img', fig);
      const full = fig.dataset.full || (img && img.currentSrc) || (img && img.src);
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      const trigger = () => open(full, img && img.alt);
      fig.addEventListener('click', trigger);
      fig.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); } });
    });
    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    doc.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.getAttribute('data-open') === 'true') close(); });
  }

  /* ---------------- Contact form (antispam + validation) ---------------- */
  const form = $('.form[data-validate]');
  if (form) {
    const status = $('.form-status', form);
    const setErr = (field, msg) => {
      field.classList.toggle('error', !!msg);
      const m = $('.error-msg', field);
      if (m) m.textContent = msg || '';
      const input = $('input,textarea', field);
      if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };
    const validateField = (field) => {
      const input = $('input,textarea', field); if (!input) return true;
      const v = input.value.trim();
      if (input.required && !v) { setErr(field, input.dataset.msgRequired || 'Este campo es obligatorio.'); return false; }
      if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setErr(field, 'Introduce un email válido.'); return false; }
      setErr(field, ''); return true;
    };
    $$('.field', form).forEach(field => {
      const input = $('input,textarea', field);
      input && input.addEventListener('blur', () => validateField(field));
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if ($('.hp', form) && $('.hp input', form) && $('.hp input', form).value) return; // honeypot
      let ok = true; let firstBad = null;
      $$('.field', form).forEach(field => { if (!validateField(field)) { ok = false; firstBad = firstBad || field; } });
      if (!ok) { firstBad && ($('input,textarea', firstBad) || {}).focus && $('input,textarea', firstBad).focus(); return; }
      const btn = $('button[type="submit"]', form);
      btn && (btn.disabled = true);
      if (status) { status.textContent = 'Enviando…'; }
      // Static site: simulate success (no backend). Real wiring left to host/Netlify forms.
      setTimeout(() => {
        if (status) status.textContent = '¡Gracias! Te responderemos muy pronto. También puedes llamarnos.';
        form.reset(); btn && (btn.disabled = false);
      }, 700);
    });
  }

  /* ============================================================
     GSAP-driven motion (guarded by hasGSAP + !prefersReduced)
     ============================================================ */
  if (hasGSAP && !prefersReduced) {
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    const mm = gsap.matchMedia();

    /* Reveal-on-scroll: per-element, fitted. Mark .pre then animate. */
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
          $('.hero').addEventListener('pointermove', e => { qx(e.clientX); qy(e.clientY); });
        }
      }
      return () => {};
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
        const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.6)' });
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
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('es-ES') + suffix; } })
      });
    });
  } else {
    // No motion: ensure count-ups show final value
    $$('[data-count]').forEach(el => { el.textContent = Number(el.dataset.count).toLocaleString('es-ES') + (el.dataset.suffix || ''); });
  }
})();
