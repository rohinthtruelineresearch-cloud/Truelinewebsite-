import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_GLOW_COLOR = "0, 169, 157";
const DEFAULT_SPOTLIGHT_RADIUS = 260;
const DEFAULT_CARDS = [
  {
    label: "01",
    title: "Analytics",
    description: "Track user behavior",
    color: "linear-gradient(135deg, #10122b 0%, #05010c 100%)",
    borderColor: "rgba(0,169,157,0.35)",
    textColor: "#f4faff"
  },
  {
    label: "02",
    title: "Dashboard",
    description: "Centralized data view",
    color: "linear-gradient(135deg, #10122b 0%, #05010c 100%)",
    borderColor: "rgba(0,169,157,0.35)",
    textColor: "#f4faff"
  }
];

const createParticles = (count, glowColor) =>
  Array.from({ length: count }, (_, idx) => ({
    id: idx,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    glowColor
  }));

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const MagicBento = ({
  cards = DEFAULT_CARDS,
  glowColor = DEFAULT_GLOW_COLOR,
  textAutoHide = true,
  enableBorderGlow = true,
  enableSpotlight = true,
  enableTilt = true,
  enableMagnetism = true,
  enableStars = true,
  clickEffect = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = 12
}) => {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const isMobile = useIsMobile();

  const particles = useMemo(
    () => (enableStars ? createParticles(particleCount, glowColor) : []),
    [enableStars, particleCount, glowColor]
  );

  useEffect(() => {
    if (!enableSpotlight || isMobile) return;
    const spotlight = document.createElement("div");
    spotlight.className = "magic-bento__spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: ${spotlightRadius * 2}px;
      height: ${spotlightRadius * 2}px;
      pointer-events: none;
      border-radius: 50%;
      opacity: 0;
      mix-blend-mode: screen;
      background: radial-gradient(circle, rgba(${glowColor},0.3) 0%, rgba(${glowColor},0.05) 65%, transparent 100%);
      transform: translate(-50%, -50%);
      z-index: 10;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMove = (event) => {
      if (!sectionRef.current || !spotlightRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      spotlightRef.current.style.opacity = inside ? "0.7" : "0";
      if (inside) {
        spotlightRef.current.style.left = `${event.clientX}px`;
        spotlightRef.current.style.top = `${event.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      spotlightRef.current?.remove();
    };
  }, [enableSpotlight, glowColor, spotlightRadius, isMobile]);

  return (
    <>
      <style>
        {`
          .magic-bento {
            --glow-color: ${glowColor};
          }
          .magic-bento__grid {
            display: grid;
            gap: 0.75rem;
            width: min(1100px, 100%);
            margin: 0 auto;
          }
          @media (min-width: 768px) {
            .magic-bento__grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
          .magic-bento__card {
            transition: transform 250ms ease, box-shadow 250ms ease;
            position: relative;
            overflow: hidden;
          }
          .magic-bento__card::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 24px;
            opacity: 0;
            transition: opacity 200ms ease;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${glowColor},0.4), transparent 60%);
            pointer-events: none;
          }
          .magic-bento__card:hover::after {
            opacity: ${enableBorderGlow ? "1" : "0"};
          }
          .magic-bento__card-particles span {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            animation: float 4s ease-in-out infinite alternate;
            background: rgba(${glowColor},0.8);
            box-shadow: 0 0 8px rgba(${glowColor},0.5);
          }
          @keyframes float {
            from { transform: translate3d(0,0,0); opacity: 1; }
            to { transform: translate3d(12px,-12px,0); opacity: 0.4; }
          }
        `}
      </style>

      <div ref={sectionRef} className="magic-bento">
        <div className="magic-bento__grid">
          {cards.map((card) => (
            <div
              key={card.title}
              className="magic-bento__card rounded-[24px] border px-5 py-6 flex flex-col gap-4"
              style={{
                background: card.color,
                borderColor: card.borderColor || "rgba(255,255,255,0.08)",
                color: card.textColor || "#f8fbff",
                boxShadow: "0 18px 45px -30px rgba(0,0,0,0.65)"
              }}
              onMouseMove={(event) => {
                if (isMobile) return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                event.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                event.currentTarget.style.setProperty("--mouse-y", `${y}%`);
                if (enableTilt) {
                  const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
                  const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
                  event.currentTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
                if (enableMagnetism) {
                  const translateX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
                  const translateY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
                  event.currentTarget.style.translate = `${translateX}px ${translateY}px`;
                }
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.removeProperty("--mouse-x");
                event.currentTarget.style.removeProperty("--mouse-y");
                event.currentTarget.style.transform = "";
                event.currentTarget.style.translate = "";
              }}
              onClick={(event) => {
                if (!clickEffect || isMobile) return;
                const ripple = document.createElement("span");
                const rect = event.currentTarget.getBoundingClientRect();
                const size = rect.width;
                ripple.style.cssText = `
                  position:absolute;
                  width:${size}px;
                  height:${size}px;
                  border-radius:50%;
                  left:${event.clientX - rect.left - size / 2}px;
                  top:${event.clientY - rect.top - size / 2}px;
                  background:radial-gradient(circle, rgba(${glowColor},0.4) 0%, transparent 70%);
                  opacity:0.8;
                  pointer-events:none;
                  transform:scale(0);
                `;
                event.currentTarget.appendChild(ripple);
                requestAnimationFrame(() => {
                  ripple.style.transition = "transform 500ms ease, opacity 500ms ease";
                  ripple.style.transform = "scale(1.8)";
                  ripple.style.opacity = "0";
                });
                ripple.addEventListener("transitionend", () => ripple.remove());
              }}
            >
              {enableStars && (
                <div className="magic-bento__card-particles absolute inset-0 pointer-events-none">
                  {particles.map((particle) => (
                    <span
                      key={particle.id}
                      style={{
                        top: `${particle.top}%`,
                        left: `${particle.left}%`,
                        animationDelay: `${particle.delay}s`
                      }}
                    />
                  ))}
                </div>
              )}
              <div className="relative flex items-center justify-between text-sm font-semibold uppercase tracking-[0.25em]">
                <span className="text-xs">{card.label}</span>
              </div>
              <div className="relative flex flex-col gap-2">
                <h3 className={`text-lg font-semibold ${textAutoHide ? "truncate" : ""}`}>{card.title}</h3>
                <p className={`text-sm/6 opacity-80 ${textAutoHide ? "line-clamp-3" : ""}`}>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MagicBento;
