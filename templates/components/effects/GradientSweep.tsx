"use client";

/**
 * GradientSweep — Diagonal gradient that sweeps across a card on hover
 *
 * The "lacquer sheen" effect: a translucent gradient band slides across
 * the element on hover. Subtle but visible, especially on dark backgrounds.
 *
 * Usage:
 *   <GradientSweep color="oklch(0.9 0.05 90)" intensity={0.2}>
 *     <div className="bg-base-300 p-8 rounded-xl">Card content</div>
 *   </GradientSweep>
 */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface GradientSweepProps {
  /** Sweep highlight colour as an OKLCH value */
  color: string;
  /** Sweep angle in degrees */
  angle?: number;
  /** Opacity of the sweep band (0.05 - 0.3) */
  intensity?: number;
  children: ReactNode;
  className?: string;
}

export default function GradientSweep({
  color,
  angle = 135,
  intensity = 0.15,
  children,
  className = "",
}: GradientSweepProps) {
  const prefersReduced = useReducedMotion();

  // Clamp intensity to safe range
  const clampedIntensity = Math.max(0.05, Math.min(0.3, intensity));

  // Build gradient: transparent → colour at intensity → transparent
  const gradient = [
    `linear-gradient(`,
    `${angle}deg,`,
    `transparent 0%,`,
    `color-mix(in oklch, ${color} ${Math.round(clampedIntensity * 100)}%, transparent) 50%,`,
    `transparent 100%`,
    `)`,
  ].join(" ");

  return (
    <motion.div
      className={`${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      initial="rest"
      whileHover={prefersReduced ? undefined : "hover"}
    >
      {/* Sweep overlay */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: gradient,
          backgroundSize: "200% 100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
        variants={{
          rest: { x: "-100%" },
          hover: { x: "100%" },
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />

      {/* Children above the sweep */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.div>
  );
}
