/* Native swipe and scroll-snap, enhanced by manual button and keyboard navigation. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-testimonials-carousel]').forEach(section => {
    const rail = section.querySelector('[data-testimonials-rail]');
    const cards = [...section.querySelectorAll('[data-testimonial-card]')];
    const previous = section.querySelector('[data-testimonials-previous]');
    const next = section.querySelector('[data-testimonials-next]');
    const controls = section.querySelector('[data-testimonials-controls]');
    const status = section.querySelector('[data-testimonials-status]');
    if (!rail || !cards.length || !previous || !next || !controls || !status) return;

    let active = Math.min(cards.length - 1, Math.max(0, Number(section.dataset.initialSlide) || 0));
    let requested = null;
    let settleTimer;
    let scrollFrame;

    const clamp = index => Math.min(cards.length - 1, Math.max(0, index));

    function update(index, announce = false) {
      active = clamp(index);
      previous.disabled = active === 0;
      next.disabled = active === cards.length - 1;
      if (announce) {
        const author = cards[active].querySelector('strong').textContent;
        status.textContent = `Depoimento ${active + 1} de ${cards.length}: ${author}.`;
      }
    }

    function center(index, smooth = true) {
      const card = cards[index].getBoundingClientRect();
      const viewport = rail.getBoundingClientRect();
      const left = rail.scrollLeft + card.left - viewport.left - rail.clientLeft
        - (rail.clientWidth - card.width) / 2;
      rail.scrollTo({ left, behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant' });
    }

    function nearest() {
      const viewport = rail.getBoundingClientRect();
      const middle = viewport.left + rail.clientLeft + rail.clientWidth / 2;
      let distance = Infinity;
      let index = active;
      cards.forEach((card, candidate) => {
        const bounds = card.getBoundingClientRect();
        const delta = Math.abs(bounds.left + bounds.width / 2 - middle);
        if (delta < distance) { distance = delta; index = candidate; }
      });
      return index;
    }

    function goTo(index) {
      requested = clamp(index);
      update(requested, true);
      center(requested);
    }

    function settle() {
      clearTimeout(settleTimer);
      requested = null;
      update(nearest(), true);
    }

    previous.addEventListener('click', () => goTo((requested ?? active) - 1));
    next.addEventListener('click', () => goTo((requested ?? active) + 1));

    rail.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey
        || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = requested ?? active;
      goTo(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1
        : index + (event.key === 'ArrowRight' ? 1 : -1));
    });

    // Let the browser own touch movement, inertia, trackpad scrolling and snapping.
    rail.addEventListener('pointerdown', () => { requested = null; }, { passive: true });
    rail.addEventListener('wheel', () => { requested = null; }, { passive: true });
    rail.addEventListener('scroll', () => {
      if (!scrollFrame) {
        scrollFrame = requestAnimationFrame(() => {
          scrollFrame = null;
          if (requested === null) update(nearest());
        });
      }
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 180);
    }, { passive: true });
    rail.addEventListener('scrollend', settle);

    // Keep the selected quote centered when rotation or resizing changes the rail.
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => center(requested ?? active, false)).observe(rail);
    } else {
      window.addEventListener('resize', () => center(requested ?? active, false), { passive: true });
    }
    reducedMotion.addEventListener('change', () => center(requested ?? active, false));

    controls.hidden = cards.length < 2;
    update(active);
    center(active, false);
  });
})();
