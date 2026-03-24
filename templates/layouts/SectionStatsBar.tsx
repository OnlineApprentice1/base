"use client";

import { type ReactNode } from "react";

/* Stats Bar — for social proof, key numbers, trust indicators
 * Container: max-w-5xl
 * Section density: COMPACT (py-8 to py-12, not py-20)
 * Desktop: horizontal row of 3-5 stats
 * Tablet: 2x2 grid
 * Mobile: 2-column grid or vertical stack
 * Use when: you need a visual break between heavy sections
 */

interface SectionStatsBarProps {
  children: ReactNode;
  columns?: 3 | 4 | 5;
  className?: string;
}

const columnClasses = {
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
} as const;

export default function SectionStatsBar({
  children,
  columns = 4,
  className = "",
}: SectionStatsBarProps) {
  return (
    <section className={`py-8 md:py-10 lg:py-12 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`grid ${columnClasses[columns]} gap-6 md:gap-8`}>
          {children}
        </div>
      </div>
    </section>
  );
}
