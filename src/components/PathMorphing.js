"use client";

import { useEffect, useState } from "react";
import { interpolate } from "flubber";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

const shapes = [
  // Manuscript Acceleration (open folio)
  "M5 4 L11.2 6.2 L17 4 L19 6 L19 20 L17 18.5 L11.2 20.5 L5 18.5 Z",
  // IPR Commercialisation (shield)
  "M12 3 L19 7 V13 C19 17.4 15.7 20.9 12 22 C8.3 20.9 5 17.4 5 13 V7 Z",
  // Accreditation Impact (award burst)
  "M12 3.5 L15.5 7.3 L20.5 8.2 L17.4 12.1 L18.2 17.2 L12 15.2 L5.8 17.2 L6.6 12.1 L3.5 8.2 L8.5 7.3 Z",
  // Research Strategy Offices (compass needle)
  "M12 3 L17 12 L12 21 L7 12 Z",
  // Insight & Analytics Pods (bar chart skyline)
  "M5 20 L5 12 L8.5 12 L8.5 20 L10.5 20 L10.5 7 L14 7 L14 20 L16 20 L16 4 L19 4 L19 20 Z",
  // Targeted Growth Campaigns (bullseye)
  "M12 4 A8 8 0 1 1 11.99 4 Z M12 8 A4 4 0 1 0 12.01 8 Z M12 10.5 A1.5 1.5 0 1 1 12 13.5 A1.5 1.5 0 1 1 12 10.5 Z",
  // Loop back to manuscript
  "M5 4 L11.2 6.2 L17 4 L19 6 L19 20 L17 18.5 L11.2 20.5 L5 18.5 Z",
];

const colors = ["#7c3aed", "#2563eb", "#f59e0b", "#0d9488", "#38bdf8", "#f43f5e", "#7c3aed"];

const steps = shapes.map((_, index) => index);

function useFlubber(progress) {
  return useTransform(progress, steps, shapes, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });
}

export default function PathMorphing({ size = 260, className = "" }) {
  const [pathIndex, setPathIndex] = useState(1);
  const progress = useMotionValue(0);
  const fill = useTransform(progress, steps, colors);
  const path = useFlubber(progress);

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 1.5,
      ease: "easeInOut",
      onComplete: () => {
        setPathIndex((current) => {
          if (current >= shapes.length - 1) {
            progress.set(0);
            return 1;
          }
          return current + 1;
        });
      },
    });

    return () => animation.stop();
  }, [pathIndex, progress]);

  return (
    <div className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <motion.path
          fill={fill}
          d={path}
          style={{ filter: "drop-shadow(0 18px 32px rgba(13, 99, 248, 0.25))" }}
        />
      </svg>
    </div>
  );
}
