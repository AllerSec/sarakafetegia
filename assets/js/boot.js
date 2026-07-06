/* ============================================================
   Sara Kafetegia - boot.js  (loaded early, before main.js)
   First-visit loader + prefetch + soft page transitions.
   Loader shows ONLY on first visit of the session.
   ============================================================ */
(() => {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('.loader');
  const FIRST_KEY = 'sara_visited';

  /* ---------- Loader (logo real; entrada 100% CSS, salida GSAP) ---------- */
  if (loader) {
    const seen = sessionStorage.getItem(FIRST_KEY);
    if (seen || prefersReduced) {
      loader.setAttribute('hidden', '');
    } else {
      document.documentElement.style.overflow = 'hidden';
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        document.documentElement.style.overflow = '';
        sessionStorage.setItem(FIRST_KEY, '1');
        const hardHide = () => loader.setAttribute('hidden', '');
        if (window.gsap && !document.hidden) {
          // cortina: el loader entero se levanta y descubre la página
          window.gsap.to(loader, {
            yPercent: -100, duration: 0.65, ease: 'expo.inOut',
            onComplete: hardHide
          });
          const card = loader.querySelector('.loader-card');
          if (card) window.gsap.to(card, { yPercent: 18, autoAlpha: 0.6, duration: 0.65, ease: 'expo.inOut' });
          // si el rAF se congela (pestaña pasa a 2º plano a mitad), ocultar igualmente
          setTimeout(hardHide, 1500);
        } else {
          // sin GSAP o pestaña en segundo plano: fundido CSS y fuera
          loader.classList.add('is-done');
          setTimeout(hardHide, 700);
        }
      };
      // La barra ámbar termina de llenarse a ~1.4s: salimos justo después.
      setTimeout(finish, 1550);
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
        // rAF puede quedar acelerado/pausado en pestañas en segundo plano:
        // garantía dura de que la cortina nunca se queda a medias tapando la página
        setTimeout(() => { if (window.gsap) window.gsap.set(curtain, { scaleY: 0 }); }, 1400);
      }
    });
  }
})();
