"use client";

import { Children, type ReactNode } from "react";

/* Stacked Cards — for testimonials, team members, before/after
 * Container: max-w-5xl
 * Desktop: 3-4 cards slightly overlapping with offset and z-index
 * Tablet: reduced overlap
 * Mobile: no overlap, vertical stack with slight offset
 * Use when: you want to break the flat grid pattern with depth
 */

interface SectionStackedCardsProps {
  children: ReactNode;
  overlap?: number;
  className?: string;
}

export default function SectionStackedCards({
  children,
  overlap = 20,
  className = "",
}: SectionStackedCardsProps) {
  const items = Children.toArray(children);
  const count = items.length;

  return (
    <section className={`py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: vertical stack with subtle left offset */}
        <div className="flex flex-col gap-4 md:hidden">
          {items.map((child, i) => (
            <div key={i} style={{ marginLeft: i * 8 }}>
              {child}
            </div>
          ))}
        </div>

        {/* Tablet+: overlapping horizontal layout */}
        <div className="hidden md:flex justify-center items-start">
          {items.map((child, i) => (
            <div
              key={i}
              className="transition-transform duration-300 hover:-translate-y-2"
              style={{
                marginLeft: i === 0 ? 0 : -overlap,
                zIndex: count - i,
                position: "relative",
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
