"use client";

import { type ReactNode } from "react";

/* Asymmetric Split — for about previews, feature highlights
 * Container: max-w-7xl
 * Desktop: 7-col / 5-col (or 8/4) grid
 * Tablet: stack, content on top
 * Mobile: single column, full width
 * Use when: one side has more content than the other
 */

interface SectionAsymmetricSplitProps {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
  ratio?: "7-5" | "8-4";
  className?: string;
}

const ratioClasses = {
  "7-5": "lg:grid-cols-[7fr_5fr]",
  "8-4": "lg:grid-cols-[8fr_4fr]",
} as const;

const ratioClassesReverse = {
  "7-5": "lg:grid-cols-[5fr_7fr]",
  "8-4": "lg:grid-cols-[4fr_8fr]",
} as const;

export default function SectionAsymmetricSplit({
  left,
  right,
  reverse = false,
  ratio = "7-5",
  className = "",
}: SectionAsymmetricSplitProps) {
  const gridCols = reverse ? ratioClassesReverse[ratio] : ratioClasses[ratio];

  return (
    <section className={`py-16 md:py-20 lg:py-24 ${className}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 ${gridCols} gap-8 lg:gap-12 items-center`}>
        <div className={reverse ? "lg:order-2" : ""}>{left}</div>
        <div className={reverse ? "lg:order-1" : ""}>{right}</div>
      </div>
    </section>
  );
}
