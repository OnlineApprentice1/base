# Signature Move Implementations

Code-level implementations of reusable signature effects. When a plan task references a signature move, find it here and include the code sketch in the subagent prompt.

**Rules:**
- Gradients on dark backgrounds: minimum **0.15 opacity** (anything below 0.10 is invisible)
- Hover effects: must produce a **visible change** (not just via-white/5 — use /10 minimum)
- Grain textures: **0.04-0.08 opacity** range (0.03 is invisible, 0.10 is too heavy)
- All effects must respect `useReducedMotion` — skip animation for users who prefer it

---

## Cursor Effects

### Spotlight Cursor (Radial Glow Following Mouse)

A radial gradient glow that follows the cursor with spring-dampened movement. Desktop only.

```tsx
"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function SpotlightCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handle = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      <motion.div
        className="absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX, top: springY,
          /* CRITICAL: Use 0.15+ opacity for primary, 0.08+ for secondary ring */
          background: "radial-gradient(circle, oklch(var(--primary) / 0.15) 0%, oklch(var(--accent) / 0.08) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
```

**Variations:**
- Crimson/gold: `oklch(50% 0.22 15 / 0.15)` inner, `oklch(78% 0.10 85 / 0.08)` outer
- Cool blue: `oklch(60% 0.14 230 / 0.15)` inner, `oklch(70% 0.08 180 / 0.08)` outer
- Warm amber: `oklch(70% 0.18 55 / 0.15)` inner, `oklch(85% 0.10 80 / 0.08)` outer

### Crosshair Cursor (Precision Following)

A crosshair-style cursor for industrial/precision trades. Uses two thin intersecting lines.

```tsx
<motion.div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
  {/* Vertical line */}
  <motion.div
    className="absolute w-px h-8 -translate-x-1/2 -translate-y-1/2 bg-accent/40"
    style={{ left: springX, top: springY }}
  />
  {/* Horizontal line */}
  <motion.div
    className="absolute w-8 h-px -translate-x-1/2 -translate-y-1/2 bg-accent/40"
    style={{ left: springX, top: springY }}
  />
  {/* Center dot */}
  <motion.div
    className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
    style={{ left: springX, top: springY }}
  />
</motion.div>
```

---

## Card Hover Effects

### Lacquer-Sheen Sweep (Diagonal Gradient on Hover)

A glossy diagonal highlight sweeps across the card on hover. Must use **via-white/10 minimum** to be visible.

```tsx
<div className="relative group overflow-hidden rounded-xl bg-base-200">
  {/* Lacquer sheen overlay — sweeps left to right on hover */}
  <div
    className="absolute inset-0 z-10 pointer-events-none
      bg-gradient-to-r from-transparent via-white/10 to-transparent
      -translate-x-full group-hover:translate-x-full
      transition-transform duration-700 ease-in-out"
    aria-hidden="true"
  />
  {/* Card content goes here */}
</div>
```

**For dark themes:** Use `via-white/10` to `via-white/15`.
**For light themes:** Use `via-black/5` to `via-black/8`.

### Ember Glow (Pulsing Border on Hover)

Cards that glow from within on hover, like embers. For forge/industrial archetypes.

```tsx
<div className="rounded-xl bg-base-200 border border-base-300
  transition-shadow duration-500
  hover:shadow-[inset_0_0_20px_oklch(70%_0.18_55_/_0.15),_0_0_30px_oklch(70%_0.18_55_/_0.08)]">
  {/* Card content */}
</div>
```

### Frost Crystallization Border

Cards that grow a frosted/crystallized border on hover. For cool/glass archetypes.

```tsx
<div className="rounded-xl bg-base-200/60 backdrop-blur-sm
  border border-transparent
  transition-[border-color,box-shadow] duration-500
  hover:border-accent/30
  hover:shadow-[0_0_15px_oklch(70%_0.08_180_/_0.1)]">
  {/* Card content */}
</div>
```

---

## Dividers

### Gold-Line Divider (Gradient Fade)

Thin horizontal rule that fades from transparent at edges to solid colour in the centre.

```css
/* In globals.css */
.gold-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    oklch(78% 0.10 85 / 0.6) 20%,
    oklch(78% 0.10 85) 50%,
    oklch(78% 0.10 85 / 0.6) 80%,
    transparent 100%
  );
}
```

Usage: `<div className="gold-divider max-w-xs mx-auto" aria-hidden="true" />`

### Jagged/Wave SVG Divider

SVG separator between sections. Vary the shape per archetype.

```tsx
<div className="w-full overflow-hidden" aria-hidden="true">
  <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
    <path d="M0,30 Q300,0 600,30 Q900,60 1200,30 L1200,60 L0,60 Z" fill="oklch(12% 0.01 280)" />
  </svg>
</div>
```

### Grain-Line Divider (Wood Grain)

For warm/timber archetypes. Multiple thin lines with subtle randomness.

```tsx
<div className="w-full py-4 overflow-hidden" aria-hidden="true">
  {[0, 1, 2].map((i) => (
    <div key={i} className="h-px bg-accent/15 mx-auto"
      style={{ width: `${70 + i * 10}%`, marginTop: i > 0 ? '3px' : 0 }} />
  ))}
</div>
```

---

## Background Textures

### Grain/Noise Texture Overlay

Adds subtle grain to any section. **Opacity range: 0.04-0.08** (adjust per archetype darkness).

```tsx
<div
  className="absolute inset-0 z-[1] pointer-events-none opacity-[0.06]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
    backgroundSize: "128px 128px",
  }}
  aria-hidden="true"
/>
```

### Radial Glow Background

A radial gradient behind section content. **Minimum 0.15 opacity** on dark backgrounds.

```tsx
<section className="relative py-24 px-4">
  <div className="absolute inset-0 z-0" style={{
    background: "radial-gradient(ellipse at 50% 40%, oklch(50% 0.22 15 / 0.15) 0%, transparent 60%)"
  }} aria-hidden="true" />
  <div className="relative z-10">
    {/* Section content */}
  </div>
</section>
```

### Glassmorphism Panel

Frosted glass effect. For cool/modern archetypes.

```tsx
<div className="bg-base-200/40 backdrop-blur-md border border-white/10 rounded-2xl p-8
  shadow-[0_8px_32px_oklch(0%_0_0_/_0.15)]">
  {/* Panel content */}
</div>
```

---

## Scroll-Linked Effects

### Parallax Background Shift

Background moves slower than foreground content on scroll.

```tsx
"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function ParallaxSection({ children }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: prefersReducedMotion ? 0 : bgY }}
      >
        {/* Background content (gradient, image, etc.) */}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
```

### Count-Up Stats

Numbers that count up when scrolled into view. Uses requestAnimationFrame with ease-out cubic.

```tsx
function CountUp({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const duration = 2000;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [end]);

  useEffect(() => {
    if (prefersReducedMotion) { setCount(end); return; }
    if (isInView) animate();
  }, [isInView, prefersReducedMotion, end, animate]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
```

---

## Component Patterns

### Torn-Edge Paper Cards (Weathered/Heritage)

Cards with irregular top edges evoking torn paper. For heritage/nautical archetypes.

```tsx
<div className="relative bg-base-200 rounded-b-xl p-6 mt-4">
  {/* Torn edge top */}
  <div className="absolute -top-3 left-0 right-0 h-3 overflow-hidden" aria-hidden="true">
    <svg viewBox="0 0 400 12" preserveAspectRatio="none" className="w-full h-full">
      <path d="M0,12 L0,4 Q20,0 40,6 Q60,2 80,5 Q100,0 120,4 Q140,8 160,3 Q180,0 200,5 Q220,8 240,3 Q260,0 280,6 Q300,2 320,5 Q340,8 360,3 Q380,0 400,4 L400,12 Z"
        fill="oklch(12% 0.01 280)" />
    </svg>
  </div>
  {/* Card content */}
</div>
```

### Iron Stamp Badge (Verification/Trust)

A small stamped badge for testimonials or certifications. For industrial archetypes.

```tsx
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm
  bg-accent/10 border border-accent/30 text-accent text-xs tracking-wider uppercase">
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
  Verified
</div>
```

### Compass Navigation Indicator (Fixed Side Rail)

A small fixed-position element showing which section is active. For nautical/precision archetypes.

```tsx
<nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
  aria-label="Section navigation">
  {sections.map((section, i) => (
    <a key={section.id} href={`#${section.id}`}
      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
        activeSection === i ? "bg-accent scale-125" : "bg-base-content/20 hover:bg-base-content/40"
      }`}
      aria-label={section.label}
    />
  ))}
</nav>
```

### Temperature Bar Navigation (Scroll Progress)

A vertical bar that fills with colour as the user scrolls. For HVAC/thermal archetypes.

```tsx
"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed right-2 top-1/4 bottom-1/4 w-1 bg-base-300 rounded-full z-40 hidden lg:block">
      <motion.div
        className="w-full rounded-full origin-bottom"
        style={{
          scaleY: scrollYProgress,
          background: "linear-gradient(to top, oklch(60% 0.14 230), oklch(65% 0.15 30))",
        }}
      />
    </div>
  );
}
```
