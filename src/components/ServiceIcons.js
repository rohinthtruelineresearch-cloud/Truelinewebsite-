"use client";

import { Award, Compass, FileText, LineChart, ShieldCheck, Target } from "lucide-react";

const mergeClassNames = (base, extra) => (extra ? `${base} ${extra}` : base);

export function ManuscriptsIcon({ className, ...props }) {
  return <FileText strokeWidth={1.6} className={mergeClassNames("h-12 w-12 text-purple-600", className)} {...props} />;
}

export function IPRIcon({ className, ...props }) {
  return <ShieldCheck strokeWidth={1.6} className={mergeClassNames("h-12 w-12 text-blue-600", className)} {...props} />;
}

export function AccreditationIcon({ className, ...props }) {
  return <Award strokeWidth={1.6} className={mergeClassNames("h-12 w-12 text-amber-500", className)} {...props} />;
}

export function StrategyIcon({ className, ...props }) {
  return <Compass strokeWidth={1.6} className={mergeClassNames("h-12 w-12 text-teal-500", className)} {...props} />;
}

export function AnalyticsIcon({ className, ...props }) {
  return <LineChart strokeWidth={1.6} className={mergeClassNames("h-12 w-12 text-sky-500", className)} {...props} />;
}

export function Targeticon({ className, ...props }) {
  return <Target strokeWidth={1.6} className={mergeClassNames("h-12 w-12 text-rose-500", className)} {...props} />;
}
