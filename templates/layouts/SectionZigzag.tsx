"use client";

import { type ReactNode } from "react";

/* Zigzag Alternating — for services, process steps
 * Container: max-w-6xl
 * Desktop: alternating flex rows (content left/right, visual opposite)
 * Tablet: same alternation at reduced gap
 * Mobile: stack to single column (visual always on top)
 * Use when: items need equal visual weight with image support
 */

interface ZigzagItem {
  content: ReactNode;
  visual: ReactNode;
}

interface SectionZigzagProps {
  items: ZigzagItem[];
  gap?: "tight" | "standard" | "loose";
  className?: string;
}

const gapClasses = {
  tight: "gap-8 lg:gap-10",
  standard: "gap-12 lg:gap-16",
  loose: "gap-16 lg:gap-24",
} as const;

const rowGapClasses = {
  tight: "gap-6 lg:gap-8",
  standard: "gap-8 lg:gap-12",
  loose: "gap-10 lg:gap-16",
} as const;

export default function SectionZigzag({
  items,
  gap = "standard",
  className = "",
}: SectionZigzagProps) {
  return (
    <section className={`py-16 md:py-20 lg:py-24 ${className}`}>
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col ${gapClasses[gap]}`}>
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex flex-col lg:flex-row ${rowGapClasses[gap]} items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
            >
              <div className="w-full lg:w-1/2 order-1 lg:order-none">{item.visual}</div>
              <div className="w-full lg:w-1/2 order-2 lg:order-none">{item.content}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
