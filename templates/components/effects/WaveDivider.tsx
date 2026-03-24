"use client";

/**
 * WaveDivider — SVG wave section divider
 *
 * Renders a full-width decorative wave between page sections.
 * Three variants: gentle (smooth sine), sharp (angular zigzag), organic (asymmetric blob).
 *
 * Usage:
 *   <WaveDivider color="oklch(0.7 0.15 250)" variant="organic" />
 *   <WaveDivider color="oklch(0.3 0.1 30)" flip height={64} />
 */

import { useReducedMotion } from "framer-motion";

interface WaveDividerProps {
  /** Fill colour as an OKLCH value, e.g. "oklch(0.7 0.15 250)" */
  color: string;
  /** Wave shape variant */
  variant?: "gentle" | "sharp" | "organic";
  /** Flip the wave vertically */
  flip?: boolean;
  /** SVG height in px */
  height?: number;
  className?: string;
}

const wavePaths: Record<"gentle" | "sharp" | "organic", string> = {
  // Smooth sine wave with 2 peaks
  gentle:
    "M0,0 C160,80 320,80 480,40 C640,0 800,0 960,40 C1120,80 1280,80 1440,0 L1440,100 L0,100 Z",
  // Angular zigzag with 5 points
  sharp:
    "M0,50 L192,10 L384,60 L576,5 L768,55 L960,10 L1152,60 L1344,15 L1440,40 L1440,100 L0,100 Z",
  // Irregular asymmetric blob curve
  organic:
    "M0,40 C120,65 200,10 360,35 C520,60 580,15 720,45 C860,75 1000,5 1140,30 C1280,55 1380,20 1440,50 L1440,100 L0,100 Z",
};

export default function WaveDivider({
  color,
  variant = "gentle",
  flip = false,
  height = 48,
  className = "",
}: WaveDividerProps) {
  useReducedMotion(); // Called per hook rules; wave is static so no motion to disable

  const pathD = wavePaths[variant];

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: `${height}px`,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathD} fill={color} />
      </svg>
    </div>
  );
}
