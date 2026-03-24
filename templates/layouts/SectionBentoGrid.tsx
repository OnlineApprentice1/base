"use client";

import { type ReactNode } from "react";

/* Bento Grid — for services, portfolio, features
 * Container: max-w-6xl (narrower for visual density)
 * Desktop: CSS grid with named areas, items span different rows/cols
 * Tablet: 2-column simplified grid
 * Mobile: single column stack
 * Use when: items have different importance levels or sizes
 *
 * Children should use col-span-* and row-span-* to control sizing.
 * Example: <div className="col-span-2 row-span-2">Featured</div>
 */

interface SectionBentoGridProps {
  children: ReactNode;
  columns?: 3 | 4;
  className?: string;
}

const columnClasses = {
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export default function SectionBentoGrid({
  children,
  columns = 3,
  className = "",
}: SectionBentoGridProps) {
  return (
    <section className={`py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 ${columnClasses[columns]} gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
