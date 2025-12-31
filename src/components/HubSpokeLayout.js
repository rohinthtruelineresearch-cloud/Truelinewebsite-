import React, { useEffect, useMemo, useRef, useState } from "react";

function useSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export default function HubSpokeLayout({
  hubItems = [], // [{ icon, title }]
  spokes = [], // [{ title, summary, highlights }]
  className = "",
  hubTitle = "Services Hub",
  // sizing controls
  hubDiameter = 420,
  ringPadding = 180, // distance from hub edge to spoke ring
  spokeWidth = 320,
  minHeight = 900,
  mobileHubDiameter = 288, // ~w-72
}) {
  const containerRef = useRef(null);
  const size = useSize(containerRef);

  // Layout constants for large screens
  const hubRadius = hubDiameter / 2;

  // Arrange spokes in a circle on large screens
  const spokePositions = useMemo(() => {
    const n = spokes.length || 1;
    const cx = size.width / 2;
    const cy = size.height / 2;
    const ringRadius = Math.max(hubRadius + ringPadding, Math.min(cx, cy) - 40);
    return spokes.map((_, i) => {
      const angleDeg = -90 + (360 / n) * i; // start top, clockwise
      const a = (angleDeg * Math.PI) / 180;
      const x = cx + ringRadius * Math.cos(a);
      const y = cy + ringRadius * Math.sin(a);
      return { x, y, angleDeg };
    });
  }, [spokes, size.width, size.height]);

  // Compute connector lines from hub edge to each spoke center
  const connectors = useMemo(() => {
    const cx = size.width / 2;
    const cy = size.height / 2;
    return spokePositions.map((pos) => {
      const vx = pos.x - cx;
      const vy = pos.y - cy;
      const len = Math.max(1, Math.hypot(vx, vy));
      const ux = vx / len;
      const uy = vy / len;
      const startX = cx + ux * (hubRadius + 8);
      const startY = cy + uy * (hubRadius + 8);
      const endX = pos.x - ux * 20; // stop slightly before card center
      const endY = pos.y - uy * 20;
      return { x1: startX, y1: startY, x2: endX, y2: endY };
    });
  }, [spokePositions, size.width, size.height]);

  return (
    <section className={`relative w-full ${className}`.trim()}>
      {/* Large screens: hub + radial spokes */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full "
        style={{ minHeight }}
      >
        {/* Connectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none " role="presentation">
          <defs>
            <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {connectors.map((c, i) => (
            <line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="url(#connGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.35))" }}
            />
          ))}
        </svg>

        {/* Hub circle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-50 text-black border border-gray-200 shadow-2xl flex items-center justify-center"
          style={{ width: hubDiameter, height: hubDiameter, boxShadow: "0 0 80px rgba(0,0,0,0.08)" }}
        >
          <div className="text-center px-6">
            <h3 className="text-2xl font-semibold mb-6 text-black">{hubTitle}</h3>
            <div className="grid grid-cols-3 gap-4">
              {hubItems.slice(0, 9).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl px-3 py-4 flex flex-col items-center justify-center border border-gray-200"
                >
                  <div className="text-blue-600 mb-2">{item.icon}</div>
                  <div className="text-xs text-black text-center leading-tight">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spoke cards */}
        {spokes.map((svc, i) => {
          const p = spokePositions[i] || { x: 0, y: 0 };
          return (
            <div
              key={svc.title}
              className="absolute bg-green-400 rounded-2xl shadow-lg border border-green-500 p-5"
              style={{ left: p.x, top: p.y, transform: "translate(-50%, -50%)" }}
            >
              <div style={{ width: spokeWidth }}>
              <h4 className="text-lg font-semibold text-black mb-2">{svc.title}</h4>
              <p className="text-sm text-black mb-3">{svc.summary}</p>
              <ul className="space-y-1 text-sm text-black list-disc list-inside">
                {(svc.highlights || []).slice(0, 3).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Small/medium screens: stacked hub then list of spokes */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-xl">
          <div className="relative mx-auto my-8 rounded-full bg-gray-50 text-black border border-gray-200 shadow-lg flex items-center justify-center"
               style={{ width: mobileHubDiameter, height: mobileHubDiameter, boxShadow: "0 0 60px rgba(0,0,0,0.08)" }}>
            <div className="text-center px-4">
              <h3 className="text-xl font-semibold mb-4 text-black">{hubTitle}</h3>
              <div className="grid grid-cols-3 gap-2">
                {hubItems.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg px-2 py-3 flex flex-col items-center border border-gray-200">
                    <div className="text-blue-600 mb-1">{item.icon}</div>
                    <div className="text-[10px] text-black text-center leading-tight">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {spokes.map((svc) => (
            <div key={svc.title} className="mx-4 rounded-xl bg-white border border-green-500 p-4">
              <h4 className="text-lg font-semibold text-black mb-1">{svc.title}</h4>
              <p className="text-sm text-black mb-2">{svc.summary}</p>
              <ul className="list-disc list-inside text-sm text-black space-y-1">
                {(svc.highlights || []).slice(0, 3).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


