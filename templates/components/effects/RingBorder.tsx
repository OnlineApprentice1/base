"use client";

/**
 * RingBorder — Concentric ring decoration for cards
 *
 * Wraps children in concentric coloured rings using layered box-shadows.
 * Works for both circular and rectangular containers.
 *
 * Usage:
 *   <RingBorder color="oklch(0.6 0.2 280)" ringCount={4} shape="circular">
 *     <img src="/avatar.jpg" className="rounded-full w-32 h-32" />
 *   </RingBorder>
 *
 *   <RingBorder color="oklch(0.7 0.15 150)" shape="rectangular" size="lg">
 *     <div className="p-6">Card content</div>
 *   </RingBorder>
 */

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RingBorderProps {
  /** Ring colour as an OKLCH value */
  color: string;
  /** Number of concentric rings (1-5) */
  ringCount?: number;
  /** Ring spacing scale */
  size?: "sm" | "md" | "lg";
  /** Circular (50% radius) or rectangular (1rem radius) */
  shape?: "circular" | "rectangular";
  children: ReactNode;
  className?: string;
}

/** Spread radius and opacity for each ring layer */
const ringSpecs = [
  { spread: 4, opacity: 0.3 },
  { spread: 8, opacity: 0.2 },
  { spread: 14, opacity: 0.12 },
  { spread: 22, opacity: 0.08 },
  { spread: 32, opacity: 0.05 },
];

/** Multiplier applied to spread values per size */
const sizeMultiplier: Record<"sm" | "md" | "lg", number> = {
  sm: 0.7,
  md: 1,
  lg: 1.5,
};

function buildBoxShadow(
  color: string,
  count: number,
  multiplier: number
): string {
  const clamped = Math.max(1, Math.min(5, count));
  return ringSpecs
    .slice(0, clamped)
    .map((ring) => {
      const spread = Math.round(ring.spread * multiplier);
      return `0 0 0 ${spread}px color-mix(in oklch, ${color} ${Math.round(ring.opacity * 100)}%, transparent)`;
    })
    .join(", ");
}

export default function RingBorder({
  color,
  ringCount = 3,
  size = "md",
  shape = "rectangular",
  children,
  className = "",
}: RingBorderProps) {
  useReducedMotion(); // Static decoration — no motion to gate

  const multiplier = sizeMultiplier[size];
  const boxShadow = buildBoxShadow(color, ringCount, multiplier);
  const borderRadius = shape === "circular" ? "50%" : "1rem";

  // Calculate padding so children aren't clipped by the outermost ring
  const clamped = Math.max(1, Math.min(5, ringCount));
  const outerSpread = Math.round(ringSpecs[clamped - 1].spread * multiplier);

  return (
    <div
      className={className}
      style={{
        borderRadius,
        boxShadow,
        /* Ensure rings aren't cut off by parent overflow */
        margin: `${outerSpread}px`,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}
