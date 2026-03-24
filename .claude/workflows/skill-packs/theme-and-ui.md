# Skill Pack: Theme & UI Components

Inject this into subagent prompts for tasks involving: homepage sections, UI components, theming, DaisyUI configuration, Tailwind setup.

---

## DaisyUI 5 Syntax (CRITICAL — not in training data)

```css
/* In app/globals.css or your main CSS file */
@import "tailwindcss";

/* DaisyUI 5 theme — THIS IS THE CORRECT SYNTAX */
@plugin "daisyui/theme" {
  name: "mytheme";
  default: true;
  primary: oklch(45% 0.12 230);
  secondary: oklch(65% 0.12 70);
  accent: oklch(50% 0.08 185);
  neutral: oklch(15% 0.04 250);
  base-100: oklch(98% 0.005 230);
  base-200: oklch(95% 0.01 230);
  base-300: oklch(90% 0.015 230);
  base-content: oklch(20% 0.02 230);
  info: oklch(65% 0.15 230);
  success: oklch(65% 0.15 145);
  warning: oklch(75% 0.15 80);
  error: oklch(60% 0.2 25);
}

/* WRONG (DaisyUI 4 — DO NOT USE):
   module.exports = { daisyui: { themes: [...] } }
   This will cause CSS parse errors.
*/

/* Custom tokens via Tailwind v4 */
@theme inline {
  --color-brand: oklch(45% 0.12 230);
  --font-heading: "Young Serif", serif;
  --font-body: "Figtree", sans-serif;
}
```

## Tailwind CSS v4 Patterns

```css
/* Import syntax (NOT @tailwind) */
@import "tailwindcss";

/* Custom utilities */
@theme inline {
  /* Design tokens go here */
}

/* OKLCH colour format — always use this, not hex or HSL */
/* oklch(Lightness% Chroma Hue) */
/* Lightness: 0-100%, Chroma: 0-0.4, Hue: 0-360 */
```

## DaisyUI Semantic Classes

```
Backgrounds: bg-primary, bg-secondary, bg-accent, bg-base-100, bg-base-200, bg-base-300, bg-neutral
Text: text-primary-content, text-secondary-content, text-base-content, text-neutral-content
Buttons: btn btn-primary, btn btn-secondary, btn btn-accent, btn btn-ghost, btn btn-outline
Cards: card bg-base-100 shadow-xl
Badges: badge badge-primary, badge badge-secondary
```

## Archetype Profile System

Each site uses a structural profile (one of: warm, cool, earth, bold) that defines card shapes, badges, buttons, dividers, and section backgrounds. The profile CSS is at `src/styles/profile.css`.

**Use profile classes, NOT generic DaisyUI card/badge classes:**

```tsx
// Cards — use the profile's 3 tiers based on visual importance
<div className="card-featured p-8">...</div>   // portfolio items, hero cards
<div className="card-standard p-6">...</div>    // service cards, testimonials
<div className="card-compact">...</div>         // FAQ items, list items

// Badges — use the profile's badge style
<span className="badge-label">Section Label</span>

// Buttons — use profile buttons for archetype-matched styling
<button className="btn-profile">Primary CTA</button>
<button className="btn-profile-ghost">Secondary CTA</button>

// Dividers — use between sections
<div className="divider-profile" />

// Section backgrounds — use 3 different backgrounds across sections
<section className="section-bg-deep">...</section>      // darkest
<section className="section-bg-gradient">...</section>   // gradient
<section className="section-bg-texture">...</section>    // textured
```

**NEVER use the old `.card-archetype` class.** Use `.card-featured`, `.card-standard`, or `.card-compact`.

## Colour Token System

The expanded colour system is in `src/styles/colour-tokens.css`. Use these tokens:

```css
var(--clr-primary)        /* main brand colour */
var(--clr-primary-light)  /* highlights, lighter variant */
var(--clr-primary-muted)  /* subtle backgrounds */
var(--clr-accent)         /* pop colour */
var(--clr-accent-muted)   /* accent backgrounds */
var(--clr-surface-1)      /* deepest background */
var(--clr-surface-2)      /* card backgrounds */
var(--clr-surface-3)      /* borders, elevated */
var(--clr-surface-4)      /* hover states */
var(--clr-text-primary)   /* main text */
var(--clr-text-secondary) /* secondary text */
var(--clr-text-muted)     /* labels, captions */
```

Gradient presets: `var(--gradient-radial)`, `var(--gradient-sweep)`, `var(--gradient-spotlight)`.

## Icons — Lucide React (NOT emoji)

```tsx
import { Hammer, Wrench, Phone, MapPin } from "lucide-react";

// Standard size in cards
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
  <Hammer className="w-6 h-6 text-primary" />
</div>

// NEVER use emoji (🔧 ❄️ 🏠) in production components
```

Consult `icon-mappings.md` for trade-specific icon names.

## Frontend Design Principles

- **Bold aesthetic direction, not generic.** Every section should feel intentional.
- **Use layout templates** — import from `src/components/layouts/`. Vary container widths.
- **Use effect components** — import from `src/components/effects/` for signature moves.
- **Grain textures, gradient meshes, atmospheric backgrounds** — add depth using section-bg-* classes.
- **One well-orchestrated animation per section** — not animation on every element.
- **Typography:** use type classes (type-hero, type-section, type-card, type-body) from typography.css.
- **Shadows:** subtle and purposeful — not on every card. Use profile card tiers for depth.
- **No symmetrical 3-column service grids** — use SectionBentoGrid, SectionZigzag, or SectionOffsetGrid.
- **Section background variety:** use at least 3 different section-bg-* classes across homepage sections.

## Rules
- NEVER use `transition-all`
- NEVER use emoji icons — use Lucide React
- NEVER use `.card-archetype` — use `.card-featured`, `.card-standard`, `.card-compact`
- Always use OKLCH for colour values
- Check the design plan for THIS section's assigned animation type (don't default to fade-up)
- Google Maps embed on contact page (use iframe with proper responsive wrapper)
- Every section needs an image — use curated Unsplash URLs from placeholder-images.md (NOT placehold.co)
- Use section density classes (section-spacious, section-standard, section-compact) — NOT hardcoded py-20 everywhere
