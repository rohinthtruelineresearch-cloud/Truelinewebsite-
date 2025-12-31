// Dependency-free subtle parallax rows
// Usage: const destroy = initParallaxRows(containerEl, { itemSelector: '.parallax-item' })

export function initParallaxRows(container, options = {}) {
  if (!container) return () => {};

  const settings = {
    itemSelector: '.parallax-item',
    evenSpeed: 0.06, // smaller = subtler movement
    oddSpeed: 0.03,
    maxTranslate: 18, // px clamp
    direction: 'same', // 'same' | 'alternate'
    ...options,
  };

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(container.querySelectorAll(settings.itemSelector));
  if (!items.length || prefersReduced) return () => {};

  let rafId = null;
  let didResize = true;
  const rowMap = new Map(); // element -> rowIndex

  function groupRows() {
    rowMap.clear();
    const rows = [];
    const threshold = 2; // px tolerance
    // Build rows grouped by offsetTop (within tolerance)
    items
      .map((el) => ({ el, top: Math.round(el.offsetTop) }))
      .sort((a, b) => a.top - b.top)
      .forEach(({ el, top }) => {
        let rowIndex = rows.findIndex((t) => Math.abs(t - top) <= threshold);
        if (rowIndex === -1) {
          rows.push(top);
          rowIndex = rows.length - 1;
        }
        rowMap.set(el, rowIndex);
      });
  }

  function applySpeeds() {
    items.forEach((el) => {
      const rowIndex = rowMap.get(el) ?? 0;
      const isEven = rowIndex % 2 === 0;
      let speed = isEven ? settings.evenSpeed : settings.oddSpeed;
      if (settings.direction === 'alternate' && !isEven) speed = -speed;
      el.__parallaxSpeed = speed; // attach for quick access
      el.style.willChange = 'transform';
      el.style.backfaceVisibility = 'hidden';
      el.style.transform = el.style.transform || 'translateZ(0)';
    });
  }

  function onFrame() {
    rafId = null;
    const viewportH = window.innerHeight || 0;
    const centerY = viewportH / 2;

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only animate when near viewport for perf
      if (rect.bottom < -64 || rect.top > viewportH + 64) return;

      const speed = el.__parallaxSpeed || 0;
      const elemCenter = rect.top + rect.height / 2;
      const distanceFromCenter = centerY - elemCenter; // px
      let translateY = distanceFromCenter * speed;

      // Clamp for subtle effect
      if (translateY > settings.maxTranslate) translateY = settings.maxTranslate;
      if (translateY < -settings.maxTranslate) translateY = -settings.maxTranslate;

      el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
    });
  }

  function requestTick() {
    if (rafId == null) rafId = requestAnimationFrame(onFrame);
  }

  function onScroll() {
    requestTick();
  }

  function onResize() {
    didResize = true;
    groupRows();
    applySpeeds();
    requestTick();
  }

  // Initial
  groupRows();
  applySpeeds();
  requestTick();

  // Observe layout changes
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  let ro;
  if (window.ResizeObserver) {
    ro = new ResizeObserver(() => onResize());
    ro.observe(container);
  }

  return function destroy() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    if (ro) ro.disconnect();
    if (rafId != null) cancelAnimationFrame(rafId);
    items.forEach((el) => {
      el.style.transform = '';
      el.style.willChange = '';
      delete el.__parallaxSpeed;
    });
  };
}

