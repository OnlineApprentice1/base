"use client";

import { type ReactNode } from "react";

/* Full Bleed — for hero-like impact sections, CTAs, feature showcases
 * Container: NONE (full viewport width)
 * Text container inside: max-w-5xl for readability
 * Desktop: full-width background, content positioned with grid
 * Mobile: same structure, content padding increases
 * Use when: you need a visual break from contained sections
 */

interface SectionFullBleedProps {
  background: ReactNode;
  children: ReactNode;
  contentPosition?: "center" | "left" | "bottom-left";
  minHeight?: string;
  className?: string;
}

const positionClasses = {
  center: "items-center justify-center text-center",
  left: "items-center justify-start text-left",
  "bottom-left": "items-end justify-start text-left pb-12 md:pb-16",
} as const;

export default function SectionFullBleed({
  background,
  children,
  contentPosition = "center",
  minHeight = "min-h-[60vh]",
  className = "",
}: SectionFullBleedProps) {
  return (
    <section className={`relative w-full overflow-hidden ${minHeight} ${className}`}>
      {/* Full-bleed background layer */}
      <div className="absolute inset-0">{background}</div>

      {/* Content overlay */}
      <div
        className={`relative z-10 flex ${positionClasses[contentPosition]} ${minHeight} px-6 sm:px-8 lg:px-12`}
      >
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </div>
    </section>
  );
}
