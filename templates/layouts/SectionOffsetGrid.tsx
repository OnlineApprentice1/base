"use client";

import { type ReactNode } from "react";

/* Offset Grid — for testimonials, highlighted quotes, feature spotlights
 * Container: max-w-7xl
 * Desktop: content occupies 60% of width, offset to one side, 40% is whitespace/decoration
 * Tablet: content expands to 80%
 * Mobile: full width
 * Use when: you want visual breathing room and asymmetry
 */

interface SectionOffsetGridProps {
  children: ReactNode;
  side?: "left" | "right";
  decorationSlot?: ReactNode;
  className?: string;
}

const sideClasses = {
  left: "lg:col-start-1",
  right: "lg:col-start-2",
} as const;

const decorationSideClasses = {
  left: "lg:col-start-2 lg:row-start-1",
  right: "lg:col-start-1 lg:row-start-1",
} as const;

export default function SectionOffsetGrid({
  children,
  side = "left",
  decorationSlot,
  className = "",
}: SectionOffsetGridProps) {
  return (
    <section className={`py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">
          {/* Content — 60% on desktop, 100% on mobile */}
          <div className={sideClasses[side]}>{children}</div>

          {/* Decoration / whitespace — 40% on desktop, hidden on mobile */}
          {decorationSlot && (
            <div
              className={`hidden lg:flex items-center justify-center ${decorationSideClasses[side]}`}
            >
              {decorationSlot}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
