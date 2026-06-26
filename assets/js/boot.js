/* ============================================================
   Sara Kafetegia — boot.js  (loaded early, before main.js)
   First-visit loader + prefetch + soft page transitions.
   Loader shows ONLY on first visit of the session.
   ============================================================ */
(() => {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('.loader');
  const FIRST_KEY = 'sara_visited';

  /* ---------- Loader ---------- */
  if (loader) {
    const seen = sessionStorage.getItem(FIRST_KEY);
    if (seen || prefersReduced) {
      loader.setAttribute('hidden', '');
    } else {
      document.documentElement.style.overflow = 'hidden';
      const finish = () => {
        document.documentElement.style.overflow = '';
        loader.classList.add('is-done');
        sessionStorage.setItem(FIRST_KEY, '1');
        setTimeout(() => loader.setAttribute('hidden', ''), 700);
      };
      const run = () => {
        if (window.gsap) {
          const tl = window.gsap.timeline({ onComplete: () => setTimeout(finish, 350) });
          const strokes = loader.querySelectorAll('path, circle, line');
          strokes.forEach(s => { const len = s.getTotalLength ? s.getTotalLength() : 600; s.style.setProperty('--len', len); s.style.strokeDasharray = len; s.style.strokeDashoffset = len; });
          tl.to(strokes, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut', stagger: 0.05 })
            .to(loader.querySelector('.loader-steam'), { autoAlpha: 1, y: -8, duration: 0.5 }, '-=0.3')
            .to(loader.querySelector('.loader-text'), { autoAlpha: 1, duration: 0.4 }, '-=0.3');
        } else {
          setTimeout(finish, 900);
        }
      };
      // run after gsap ready (it's loaded defer); poll briefly
      if (window.gsap) run(); else {
        let tries = 0;
        const iv = setInterval(() => { if (window.gsap || tries++ > 30) { clearInterval(iv); run(); } }, 50);
      }
      // hard safety: never trap the user
      setTimeout(finish, 3500);
    }
  }

  /* ---------- Prefetch on hover/touch (same-origin internal links) ---------- */
  const prefetched = new Set();
  const prefetch = (href) => {
    if (prefetched.has(href)) return;
    prefetched.add(href);
    const l = document.createElement('link');
    l.rel = 'prefetch'; l.href = href; l.as = 'document';
    document.head.appendChild(l);
  };
  const internal = (a) => {
    if (!a || !a.href || a.target === '_blank' || a.hasAttribute('download')) return false;
    try { const u = new URL(a.href); return u.origin === location.origin && !u.hash.startsWith('#') || (u.origin === location.origin && u.pathname !== location.pathname); }
    catch { return false; }
  };
  document.addEventListener('pointerover', e => {
    const a = e.target.closest('a');
    if (a && internal(a)) { try { const u = new URL(a.href); if (u.pathname !== location.pathname) prefetch(a.href); } catch {} }
  }, { passive: true });

  /* ---------- Soft page transition (curtain) ---------- */
  if (!prefersReduced) {
    const curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(curtain));
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (!internal(a)) return;
      let u; try { u = new URL(a.href); } catch { return; }
      if (u.pathname === location.pathname || a.getAttribute('href').startsWith('#')) return;
      e.preventDefault();
      if (window.gsap && document.body.contains(curtain)) {
        document.documentElement.classList.add('page-transitioning');
        window.gsap.fromTo(curtain, { scaleY: 0, transformOrigin: 'bottom' },
          { scaleY: 1, duration: 0.42, ease: 'power3.in', onComplete: () => { location.href = a.href; } });
      } else { location.href = a.href; }
    });
    // reveal curtain up on bfcache restore / back
    window.addEventListener('pageshow', (ev) => {
      if (window.gsap && document.body.contains(curtain)) {
        document.documentElement.classList.remove('page-transitioning');
        window.gsap.fromTo(curtain, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 0.5, ease: 'power3.out' });
      }
    });
  }
})();
