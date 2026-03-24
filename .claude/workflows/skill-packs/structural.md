# Skill Pack: Structural Components

Inject this into subagent prompts for tasks involving: Header, Footer, Motion.tsx, layout shells, responsive structure.

---

## Framer Motion Patterns

```tsx
// REQUIRED: Always check for reduced motion preference
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

// Reveal component — wrap sections for scroll-triggered entrance
// NOTE: Use the animation type specified in the plan, NOT always fade-up
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Reveal({ children, animation = "fade-up", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Animation variants — pick based on plan
  const variants = {
    "fade-up": { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    "slide-left": { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    "slide-right": { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    "scale-up": { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
    "blur-sharpen": { hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
    "rotate-in": { hidden: { opacity: 0, rotate: -3 }, visible: { opacity: 1, rotate: 0 } },
  };

  if (prefersReducedMotion) return <div ref={ref}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}

// Stagger group — wrap parent of multiple animated children
function StaggerGroup({ children, staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: staggerDelay }}
    >
      {children}
    </motion.div>
  );
}

// Spring physics defaults
// Subtle: { type: "spring", stiffness: 100, damping: 20 }
// Snappy: { type: "spring", stiffness: 300, damping: 24 }
// Bouncy: { type: "spring", stiffness: 400, damping: 15 }
```

## Typography System

Use the fluid type scale from `src/styles/typography.css`. Never hardcode font sizes — use type classes or CSS custom properties:

```tsx
// Headings — use type classes for fluid scaling
<h1 className="type-hero">...</h1>
<h2 className="type-section">...</h2>
<h3 className="type-card">...</h3>

// Or use CSS variables directly
style={{ fontSize: 'var(--type-hero)' }}

// Section density — use padding classes, NOT hardcoded py-20 everywhere
<section className="section-spacious"> // heroes, CTAs
<section className="section-standard"> // services, testimonials
<section className="section-compact">  // stats bars, FAQs
```

## Layout Templates

Pre-built layout shells exist at `src/components/layouts/`. Use them instead of building grid structures from scratch:

```tsx
import SectionBentoGrid from "@/components/layouts/SectionBentoGrid";
import SectionZigzag from "@/components/layouts/SectionZigzag";
import SectionFullBleed from "@/components/layouts/SectionFullBleed";
import SectionStatsBar from "@/components/layouts/SectionStatsBar";
import SectionAsymmetricSplit from "@/components/layouts/SectionAsymmetricSplit";
import SectionEditorial from "@/components/layouts/SectionEditorial";
import SectionOffsetGrid from "@/components/layouts/SectionOffsetGrid";
import SectionStackedCards from "@/components/layouts/SectionStackedCards";
```

Layout selection rule: at least 2 different `max-w-*` widths must be used across homepage sections. Not everything should be max-w-7xl.

## Effect Components

Pre-built signature effects at `src/components/effects/`. Import and use with colour props:

```tsx
import WaveDivider from "@/components/effects/WaveDivider";
import GradientSweep from "@/components/effects/GradientSweep";
import RingBorder from "@/components/effects/RingBorder";
import TracePath from "@/components/effects/TracePath";
import GlowCursor from "@/components/effects/GlowCursor";
import ParticleField from "@/components/effects/ParticleField";

// Wave divider between sections
<WaveDivider color="oklch(0.6 0.18 250)" variant="organic" />

// Lacquer-sheen hover effect on cards
<GradientSweep color="oklch(0.9 0.05 90)">
  <div className="card-standard p-6">...</div>
</GradientSweep>

// Concentric rings around featured items
<RingBorder color="oklch(0.5 0.15 140)" ringCount={3}>
  <div>...</div>
</RingBorder>

// Scroll-driven timeline path
<TracePath color="oklch(0.6 0.18 250)" path="M20,0 C20,100..." />
```

## Responsive Design

```
Mobile-first: base styles = mobile, scale up
Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px
Test at: 375px, 768px, 1024px, 1440px, 1920px

Patterns:
- Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Padding: px-4 sm:px-6 lg:px-8
- Container: VARY width (max-w-3xl, max-w-5xl, max-w-6xl, max-w-7xl, or full-bleed)
- Text: use type classes (type-body, type-body-lg) — they scale fluidly
- Hide/show: hidden md:block / md:hidden
- Mobile-specific: consider thumb reach zones, tap target size (min 44px), content priority
```

## Rules
- NEVER use `transition-all` — use specific properties: `transition-colors`, `transition-opacity`, `transition-transform`
- Always use `useReducedMotion` for every animated component
- SVG components rendered multiple times: append index to all `id` attributes to prevent gradient/filter collisions
- Header: sticky, backdrop-blur, mobile hamburger menu with AnimatePresence
- Footer: responsive grid, links to /privacy and /terms
