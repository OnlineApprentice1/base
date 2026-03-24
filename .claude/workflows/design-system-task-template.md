# Design System Task Template

This is always **Task 1** in every build plan. It runs FIRST (not in parallel) because all subsequent tasks depend on the styles and tokens it establishes.

---

## Task 1: Establish Design System

**Purpose:** Configure the pre-built style assets (profile, typography, colour tokens) for this specific site, create `archetype.css` for site-specific additions, and wire the globals.css import chain.

### Pre-requisites (done by the belt, not the subagent):
- `src/styles/profile.css` — correct profile (warm/cool/earth/bold) already copied
- `src/styles/typography.css` — fluid type scale already copied
- `src/styles/colour-tokens.css` — template already copied (needs palette values)
- `src/components/effects/` — all 6 effect components already copied
- `src/components/layouts/` — all 8 layout templates already copied
- `lucide-react` — already installed

### What the Subagent Does:

#### 1. Fill colour-tokens.css with OKLCH values

Using the brief's palette, fill in ALL 13 colour token values in `src/styles/colour-tokens.css`:

```css
:root {
  --clr-primary: oklch(...);       /* from brief */
  --clr-primary-light: oklch(...); /* +15% lightness from primary */
  --clr-primary-muted: oklch(...); /* -50% chroma from primary */
  --clr-accent: oklch(...);        /* from brief */
  --clr-accent-muted: oklch(...);  /* -40% chroma from accent */
  --clr-surface-1: oklch(...);     /* = base-100, deepest bg */
  --clr-surface-2: oklch(...);     /* = base-200, card bg */
  --clr-surface-3: oklch(...);     /* = base-300, borders */
  --clr-surface-4: oklch(...);     /* hover/elevated states */
  --clr-text-primary: oklch(...);  /* main text */
  --clr-text-secondary: oklch(...); /* ~70% opacity equivalent */
  --clr-text-muted: oklch(...);    /* labels, captions */
}
```

Also fill in the gradient presets with site-specific colours.

#### 2. Create archetype.css for site-specific additions

```css
/* {{Archetype Name}} — Site-Specific Design Additions */
/* This file adds to the profile — it does NOT redefine card/badge/button/divider classes. */

/* Grain overlay (if archetype uses it) */
.grain-overlay { ... }

/* Any archetype-specific decorative classes not covered by the profile */
/* e.g., custom background patterns, themed decorations */

/* Image treatment classes (from icon-mappings.md) */
.img-duotone { ... }
.img-gradient-mask { ... }
.img-elevated { ... }
```

**DO NOT redefine:** `.card-featured`, `.card-standard`, `.card-compact`, `.badge-label`, `.btn-profile`, `.divider-profile`, `.section-bg-*` — these come from profile.css.

#### 3. Configure globals.css import chain

```css
@import "tailwindcss";
@import "../styles/typography.css";
@import "../styles/colour-tokens.css";
@import "../styles/profile.css";
@import "../styles/archetype.css";

@plugin "daisyui/theme" {
  name: "{{themename}}";
  default: true;
  primary: oklch(...);
  secondary: oklch(...);
  accent: oklch(...);
  neutral: oklch(...);
  base-100: oklch(...);   /* = --clr-surface-1 */
  base-200: oklch(...);   /* = --clr-surface-2 */
  base-300: oklch(...);   /* = --clr-surface-3 */
  base-content: oklch(...); /* = --clr-text-primary */
  info: oklch(...);
  success: oklch(...);
  warning: oklch(...);
  error: oklch(...);
}

@theme inline {
  --font-heading: "{{heading font}}", {{fallback}};
  --font-body: "{{body font}}", sans-serif;
}
```

### Verification:
1. `npm run build` passes
2. Profile card tiers render with correct shape language (check border-radius, hover, etc.)
3. Type classes produce fluid scaling at different viewport widths
4. Colour tokens are accessible via `var(--clr-*)` in custom CSS
5. Section background classes produce 3 visually distinct backgrounds

### Acceptance Criteria:
- colour-tokens.css has all 13 tokens filled with OKLCH values
- archetype.css exists and is imported (does NOT duplicate profile classes)
- globals.css imports in correct order: tailwindcss → typography → colour-tokens → profile → archetype → DaisyUI theme
- Build passes
- The 3 section-bg-* classes are visually distinguishable

---

## How Subsequent Tasks Use This:

In every section-building task, the subagent should use:
- **Cards:** `.card-featured`, `.card-standard`, or `.card-compact` (from profile)
- **Badges:** `.badge-label` (from profile)
- **Buttons:** `.btn-profile`, `.btn-profile-ghost` (from profile)
- **Dividers:** `.divider-profile` (from profile) or `<WaveDivider>` (from effects)
- **Section backgrounds:** `.section-bg-deep`, `.section-bg-gradient`, `.section-bg-texture` (from profile)
- **Section spacing:** `.section-spacious`, `.section-standard`, `.section-compact` (from typography)
- **Typography:** `.type-hero`, `.type-section`, `.type-card`, `.type-body`, `.type-small` (from typography)
- **Layouts:** Import from `@/components/layouts/` (SectionBentoGrid, SectionZigzag, etc.)
- **Effects:** Import from `@/components/effects/` (WaveDivider, GradientSweep, etc.)
- **Icons:** Import from `lucide-react` (consult icon-mappings.md for trade-specific names)
