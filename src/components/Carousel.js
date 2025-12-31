import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

function useResizeObserver(target, onResize) {
  useEffect(() => {
    if (!target?.current || !window.ResizeObserver) return;
    const ro = new ResizeObserver(() => onResize?.());
    ro.observe(target.current);
    return () => ro.disconnect();
  }, [target, onResize]);
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function Carousel({
  children,
  className = '',
  ariaLabel = 'carousel',
  gapClass = 'gap-6', // tailwind gap utility between slides
  showDots = true,
  showArrows = true,
  autoplay = false,
  autoplayMs = 0,
}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [slideW, setSlideW] = useState(1);
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return;
    const first = tr.querySelector('[data-slide]');
    const width = first ? first.getBoundingClientRect().width : vp.clientWidth;
    setSlideW(Math.max(1, width));
    setCount(tr.querySelectorAll('[data-slide]').length || slides.length);
  }, [slides.length]);

  useEffect(() => {
    measure();
  }, [measure]);

  useResizeObserver(viewportRef, measure);
  useResizeObserver(trackRef, measure);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(vp.scrollLeft / slideW);
        setIndex(clamp(i, 0, Math.max(0, count - 1)));
      });
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      vp.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [slideW, count]);

  const scrollToIndex = useCallback((i) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const target = clamp(i, 0, Math.max(0, count - 1));
    vp.scrollTo({ left: target * slideW, behavior: 'smooth' });
  }, [slideW, count]);

  const next = useCallback(() => scrollToIndex(index + 1), [index, scrollToIndex]);
  const prev = useCallback(() => scrollToIndex(index - 1), [index, scrollToIndex]);

  useEffect(() => {
    if (!autoplay || !autoplayMs) return;
    const id = setInterval(() => {
      const last = Math.max(0, count - 1);
      scrollToIndex(index >= last ? 0 : index + 1);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [autoplay, autoplayMs, index, count, scrollToIndex]);

  return (
    <div className={`relative ${className}`.trim()} aria-label={ariaLabel}>
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white shadow p-2"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white shadow p-2"
          >
            ›
          </button>
        </>
      )}
      <div
        ref={viewportRef}
        className={`overflow-x-auto overflow-y-hidden snap-x snap-mandatory ${gapClass} scroll-smooth`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div ref={trackRef} className={`flex ${gapClass}`}>
          {slides.map((child, i) => (
            <div
              key={i}
              data-slide
              className="snap-start shrink-0 basis-full md:basis-1/2 lg:basis-1/3"
              aria-roledescription="slide"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {showDots && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: Math.max(1, count) }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            />)
          )}
        </div>
      )}
    </div>
  );
}

