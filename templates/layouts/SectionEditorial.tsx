"use client";

import { type ReactNode } from "react";

/* Editorial — for about sections, story sections, long testimonials
 * Container: max-w-3xl (deliberately narrow for reading comfort)
 * Desktop: centered text column, generous vertical spacing
 * All breakpoints: single column, just width changes
 * Use when: content is text-dominant and needs reading focus
 */

interface SectionEditorialProps {
  children: ReactNode;
  align?: "center" | "left";
  className?: string;
}

const alignClasses = {
  center: "text-center mx-auto",
  left: "text-left mx-auto",
} as const;

export default function SectionEditorial({
  children,
  align = "left",
  className = "",
}: SectionEditorialProps) {
  return (
    <section className={`py-16 md:py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className={`${alignClasses[align]} space-y-6 md:space-y-8 [&>p]:text-base [&>p]:md:text-lg [&>p]:leading-relaxed`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
