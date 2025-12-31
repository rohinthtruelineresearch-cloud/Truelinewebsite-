"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GooeyNav renders an animated, gooey-style tab selector. It uses a small
 * particle system and a moving blur filter to create the liquid transition.
 * The component is intentionally self-contained so it can be dropped into
 * plain React projects without additional styling dependencies.
 */

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onItemSelect,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isReady, setIsReady] = useState(false);

  // Adds gaussian-esque noise (centered around 0) to avoid mechanical motions.
  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  // Generates a particle descriptor with randomized start/end positions.
  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  // Creates particle DOM nodes for the gooey burst animation.
  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i += 1) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // ignore
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const selectIndex = (index, liElement) => {
    if (!liElement) return;

    setActiveIndex(index);
    updateEffectPosition(liElement);
    setIsReady(true);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((particle) => {
        filterRef.current.removeChild(particle);
      });
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      // force reflow
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    if (typeof onItemSelect === "function") {
      onItemSelect(items[index], index);
    }
  };

  const handleClick = (event, index) => {
    event.preventDefault();
    const liElement = event.currentTarget.closest("li");
    if (!liElement || activeIndex === index) {
      if (typeof onItemSelect === "function" && liElement) {
        onItemSelect(items[index], index);
      }
      return;
    }

    selectIndex(index, liElement);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const liElement = event.currentTarget.closest("li");
      if (liElement) {
        selectIndex(index, liElement);
      }
    }
  };

  useEffect(() => {
    if (typeof controlledActiveIndex === "number") {
      setActiveIndex((prev) => (prev === controlledActiveIndex ? prev : controlledActiveIndex));
    }
  }, [controlledActiveIndex]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const liElements = navRef.current.querySelectorAll("li");
    const activeLi = liElements[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
      setIsReady(true);
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .gooey-nav {
            --color-1: var(--color-green);
            --color-2: var(--color-blue);
            --color-3: var(--color-gray);
            --color-4: rgba(255, 255, 255, 0.85);
            --pill-background: linear-gradient(135deg, var(--color-green, #00a99d), var(--color-blue, #2c3e50));
            --pill-shadow: 0 20px 36px -24px rgba(0, 44, 113, 0.55);
          }
          .gooey-nav ul {
            color: var(--color-blue);
          }
          .gooey-nav li {
            color: inherit;
          }
          .gooey-nav li.active {
            color: var(--color-blue);
          }
          .gooey-nav li > a {
            color: inherit;
            transition: color 0.3s ease;
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: var(--color-blue);
            transition: color 0.3s ease;
          }
          .effect.text.active {
            color: var(--color-blue);
          }
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            background: transparent;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: var(--pill-background, linear-gradient(135deg, #00a99d, #2c3e50));
            box-shadow: var(--pill-shadow, none);
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active {
            text-shadow: none;
          }
          .gooey-ready li.active > a {
            color: transparent;
            opacity: 0;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: var(--pill-background, linear-gradient(135deg, #00a99d, #2c3e50));
            box-shadow: var(--pill-shadow, none);
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
        `}
      </style>
      <div className={`relative gooey-nav ${isReady ? "gooey-ready" : ""}`} ref={containerRef}>
        <nav className="relative flex" style={{ transform: "translate3d(0,0,0.01px)" }}>
          <ul
            ref={navRef}
            className="relative z-[3] m-0 flex list-none gap-6 px-2 py-1 text-[0.95rem] font-semibold tracking-wide"
          >
            {items.map((item, index) => (
              <li
                key={item.href ?? item.label}
                className={`relative cursor-pointer rounded-full transition-[background-color,color,box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <a
                  href={item.href}
                  onClick={(event) => handleClick(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="inline-flex h-full w-full items-center justify-center px-4 py-2 outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;

