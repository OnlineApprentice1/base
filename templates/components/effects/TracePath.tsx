"use client";

/**
 * TracePath — SVG path that draws itself on scroll
 *
 * Used for process/timeline sections. The stroke draws from nothing to full
 * as the element scrolls into and through the viewport.
 *
 * Usage:
 *   <div className="relative">
 *     <TracePath
 *       color="oklch(0.6 0.18 250)"
 *       path="M20,0 C20,100 20,100 20,200 C20,300 20,300 20,400"
 *       height={400}
 *       width={40}
 *     />
 *     {/* Timeline items positioned alongside *\/}
 *   </div>
 */

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useRef } from "react";

interface TracePathProps {
  /** Stroke colour as an OKLCH value */
  color: string;
  /** SVG path d attribute — the shape of the line */
  path: string;
  /** Stroke width in px */
  strokeWidth?: number;
  /** SVG viewBox height */
  height?: number;
  /** SVG viewBox width */
  width?: number;
  className?: string;
}

export default function TracePath({
  color,
  path,
  strokeWidth = 2,
  height = 400,
  width = 40,
  className = "",
}: TracePathProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Track scroll progress of the container through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  });

  // Map scroll progress 0→1 to dashoffset 1→0 (fraction of pathLength)
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track — faint version of the path */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ opacity: 0.1 }}
          pathLength={1}
        />

        {/* Animated draw-on stroke */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          pathLength={1}
          style={{
            // If reduced motion or not in view, show full path
            strokeDasharray: 1,
            strokeDashoffset: prefersReduced ? 0 : dashOffset,
            opacity: isInView || prefersReduced ? 1 : 0,
          }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { opacity: { duration: 0.3, ease: "easeOut" } }
          }
        />
      </svg>
    </div>
  );
}
