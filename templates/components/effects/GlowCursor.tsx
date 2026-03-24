"use client";

/**
 * GlowCursor — Radial glow that follows the mouse cursor
 *
 * A page-level ambient effect: a soft radial gradient tracks the pointer
 * with a spring-smoothed follow. Sits behind all content (z-index: 0).
 *
 * Usage:
 *   // Place once in your layout, outside main content
 *   <GlowCursor color="oklch(0.6 0.2 270)" size={400} intensity={0.12} />
 */

import { useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useCallback, useRef } from "react";

interface GlowCursorProps {
  /** Glow colour as an OKLCH value */
  color: string;
  /** Glow radius in px */
  size?: number;
  /** Opacity of the glow (0 - 1) */
  intensity?: number;
  className?: string;
}

export default function GlowCursor({
  color,
  size = 300,
  intensity = 0.15,
  className = "",
}: GlowCursorProps) {
  const prefersReduced = useReducedMotion();
  const elRef = useRef<HTMLDivElement>(null);

  // Raw mouse position
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  // Spring-smoothed position (instant if reduced motion)
  const springConfig = prefersReduced
    ? { stiffness: 1000, damping: 100, mass: 0.1 }
    : { stiffness: 150, damping: 15 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Update CSS custom properties via subscription to spring values
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const unsubX = smoothX.on("change", (v) => {
      el.style.setProperty("--mouse-x", `${v}px`);
    });
    const unsubY = smoothY.on("change", (v) => {
      el.style.setProperty("--mouse-y", `${v}px`);
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY]);

  // Don't render at all if user prefers reduced motion
  if (prefersReduced) return null;

  const gradient = [
    `radial-gradient(`,
    `${size}px circle at var(--mouse-x, -${size}px) var(--mouse-y, -${size}px),`,
    `color-mix(in oklch, ${color} ${Math.round(intensity * 100)}%, transparent),`,
    `transparent`,
    `)`,
  ].join(" ");

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: gradient,
        willChange: "background",
        ["--mouse-x" as string]: `-${size}px`,
        ["--mouse-y" as string]: `-${size}px`,
      }}
    />
  );
}
