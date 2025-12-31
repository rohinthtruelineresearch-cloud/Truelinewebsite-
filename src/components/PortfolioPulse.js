"use client";

import { useEffect, useState, useMemo } from "react";
import * as motion from "motion/react-client";

const DEFAULT_ITEMS = [
  { id: "prior-art", color: "#ff0088", title: "Prior Art", caption: "48 scans" },
  { id: "draft-pods", color: "#dd00ee", title: "Draft Pods", caption: "12 specs" },
  { id: "claims", color: "#9911ff", title: "Claims Tune", caption: "38 reviews" },
  { id: "filings", color: "#0d63f8", title: "Filings", caption: "24 queued" },
  { id: "prosecution", color: "#0cbaba", title: "Prosecution", caption: "16 actions" },
  { id: "licensing", color: "#f97316", title: "Licensing", caption: "9 leads" },
  { id: "analytics", color: "#14b8a6", title: "Analytics", caption: "6 reports" },
  { id: "compliance", color: "#6366f1", title: "Compliance", caption: "11 checkpoints" },
  { id: "innovation", color: "#ec4899", title: "Innovation", caption: "5 pilots" },
];

const SPRING = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const containerStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
  width: "100%",
  maxWidth: "420px",
  justifyItems: "center",
};

const itemStyles = {
  width: "110px",
  height: "110px",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  color: "#ffffff",
  fontWeight: 600,
  textAlign: "center",
  padding: "14px",
  boxShadow: "0 16px 32px -28px rgba(0,0,0,0.55)",
};

function shuffle(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

export default function PortfolioPulse({ items = DEFAULT_ITEMS, delay = 1800 }) {
  const initialItems = useMemo(() => items, [items]);
  const [order, setOrder] = useState(initialItems);

  useEffect(() => {
    setOrder(initialItems);
  }, [initialItems]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrder((prev) => shuffle(prev));
    }, delay);

    return () => clearTimeout(timeout);
  }, [order, delay]);

  return (
    <ul style={containerStyles}>
      {order.map((box) => (
        <motion.li
          key={box.id}
          layout
          transition={SPRING}
          style={{ ...itemStyles, backgroundColor: box.color }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            {box.caption}
          </span>
          <span style={{ fontSize: "1rem", lineHeight: 1.15 }}>{box.title}</span>
        </motion.li>
      ))}
    </ul>
  );
}
