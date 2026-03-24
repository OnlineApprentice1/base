# Design Context Template

Generate this document at the start of Phase 2-3 (Build) for every project. Fill in all fields from the brief, concept library, brand-to-visual.md, and signature-implementations.md. This replaces generic skill pack injection — every subagent receives this site-specific context.

---

```markdown
# Design Context — {{BUSINESS_NAME}}

## Archetype
- **Name:** {{archetype name from brief}}
- **Colour family:** {{warm / cool / earth / bold}}
- **Profile:** {{profile-warm.css / profile-cool.css / profile-earth.css / profile-bold.css}}
- **Visual identity:** {{1-2 sentence description of what this archetype looks and feels like}}
- **This site should feel:** {{3 mood words from brief}}
- **This site should NOT feel:** {{3 anti-descriptors — e.g., "generic, flat, corporate"}}

## Brand Token Overrides (from mood words)

Consult brand-to-visual.md with the brief's mood words and fill in:
- **Animation base duration:** {{e.g., 0.5s for energetic, 0.8s for calm}}
- **Stagger delay:** {{e.g., 0.08s for fast cascade, 0.15s for deliberate}}
- **Heading font-weight override:** {{e.g., 500 for elegant, 800 for rugged}}
- **Preferred section density:** {{spacious / standard / compact / mixed}}
- **Border treatment:** {{thick / thin / none / shadow-only}}
- **Hover intensity:** {{subtle / moderate / dramatic}}
- **Layout tendency:** {{symmetric / asymmetric / mixed}}

## Expanded Colour Tokens

Fill these in `src/styles/colour-tokens.css` with OKLCH values derived from the brief's palette:

| Token | Value | Use For |
|-------|-------|---------|
| --clr-primary | `oklch(...)` | Main brand colour: CTA buttons, key highlights |
| --clr-primary-light | `oklch(...)` | +15% lightness: hover states, emphasis |
| --clr-primary-muted | `oklch(...)` | -50% chroma: subtle backgrounds |
| --clr-accent | `oklch(...)` | Pop colour: badges, dividers, text highlights |
| --clr-accent-muted | `oklch(...)` | -40% chroma: accent backgrounds |
| --clr-surface-1 | `oklch(...)` | Deepest background (= DaisyUI base-100) |
| --clr-surface-2 | `oklch(...)` | Card backgrounds (= DaisyUI base-200) |
| --clr-surface-3 | `oklch(...)` | Borders, elevated surfaces (= DaisyUI base-300) |
| --clr-surface-4 | `oklch(...)` | Highest elevation, hover states |
| --clr-text-primary | `oklch(...)` | Main text |
| --clr-text-secondary | `oklch(...)` | Secondary text (~70% equivalent) |
| --clr-text-muted | `oklch(...)` | Labels, captions |

### Opacity Rules
- Gradient overlays on dark backgrounds: **minimum 0.15 opacity** (0.10 and below are invisible)
- Text on dark backgrounds: use `var(--clr-text-secondary)` minimum for readable text
- Subtle backgrounds: `bg-primary/10` to `bg-primary/20` (not /5)
- Card borders: `border-base-300` or `border-accent/20` (visible, not invisible)

### Colour Quality Minimums
- Primary chroma: minimum 0.12 (below this, primary looks grey)
- Accent chroma: minimum 0.12 (below this, accent fails to pop)
- Primary–accent hue separation: minimum 40°
- For muted palettes: reduce **lightness**, not chroma

### Semantic Colours (adapt to colour family)
Don't copy-paste the same info/success/warning/error for every site. Match them to the palette family:

| Semantic | Warm (hue 20-80) | Cool (hue 200-270) | Earth (hue 90-180) | Bold (hue 280-360+0-20) |
|----------|-------------------|---------------------|---------------------|--------------------------|
| info | `oklch(65% 0.15 210)` | `oklch(65% 0.15 230)` | `oklch(65% 0.12 200)` | `oklch(65% 0.18 240)` |
| success | `oklch(65% 0.15 145)` | `oklch(65% 0.15 160)` | `oklch(65% 0.15 140)` | `oklch(65% 0.18 150)` |
| warning | `oklch(75% 0.15 70)` | `oklch(75% 0.15 85)` | `oklch(75% 0.12 75)` | `oklch(75% 0.18 80)` |
| error | `oklch(60% 0.2 20)` | `oklch(60% 0.2 10)` | `oklch(60% 0.18 25)` | `oklch(60% 0.22 15)` |

Warm shifts semantics warm; Cool shifts cool; Earth mutes chroma slightly; Bold cranks chroma up.

### Hardcoded Colour Rules
- **CSS keyframes:** Use `color-mix(in oklch, var(--clr-primary) 40%, transparent)` — NOT raw `oklch(60% 0.22 30 / 0.4)`
- **Inline JSX styles:** Use `var(--clr-primary)` via CSS or reference `palette.ts` — NOT duplicated OKLCH values
- **OG images:** Use values from `src/config/palette.ts` (server-side can't read CSS vars, but CAN read TS constants)

## Typography
- **Heading:** `var(--font-heading)` — {{character description + recommended weight from brand mapping}}
- **Body:** `var(--font-body)` — {{character description}}
- **Scale:** Use type classes from `src/styles/typography.css`:
  - Hero headline: `type-hero` (fluid 40px → 80px)
  - Hero subtitle: `type-hero-sub` (fluid 24px → 40px)
  - Section headings: `type-section` (fluid 28px → 40px)
  - Card headings: `type-card` (fluid 18px → 24px)
  - Body large: `type-body-lg` (fluid 17px → 20px)
  - Body: `type-body` (fluid 16px → 18px)
  - Labels: `type-small` (fluid 12px → 14px)
- **DO NOT hardcode text-4xl, text-2xl, etc. — use the type classes.**

## Signature Effects

Use pre-built effect components from `src/components/effects/`. These are tested and production-ready.

### {{Signature Move 1 Name}}
{{Which effect component to use + specific props:}}
```tsx
// Example: wave divider between sections
<WaveDivider color="oklch(...)" variant="organic" height={56} />
```

### {{Signature Move 2 Name}}
{{Which effect component to use + specific props}}

### {{Signature Move 3 Name (if applicable)}}
{{If no pre-built component exists, paste the FULL code sketch from signature-implementations.md, adapted with this site's palette values}}

## Layout Rules for This Build
- **Hero layout:** {{specific: "text in lower-left quadrant" — use SectionFullBleed with contentPosition="bottom-left"}}
- **Primary card pattern:** {{specific: "asymmetric bento grid" — use SectionBentoGrid with 3 columns}}
- **Container width variety:** Use at least 2 different max-w-* widths:
  - Narrow sections (editorial, stats): `max-w-3xl` to `max-w-5xl`
  - Standard sections: `max-w-6xl`
  - Wide sections: `max-w-7xl`
  - Impact sections: full-bleed via SectionFullBleed
- **Section spacing:** Use density classes:
  - `section-spacious` for hero, CTA
  - `section-standard` for services, testimonials, about
  - `section-compact` for stats bar, FAQ
- **Section dividers:** {{what goes between sections: "WaveDivider organic" or "divider-profile" or "none — whitespace only"}}
- **Section backgrounds:** Use at least 3 different backgrounds:
  - `section-bg-deep` for {{which sections}}
  - `section-bg-gradient` for {{which sections}}
  - `section-bg-texture` for {{which sections}}

## Anti-Patterns for This Build
- Do NOT center every heading — at least 2 sections should have left-aligned or asymmetric text placement
- Do NOT use symmetrical 3-column card grids for more than 1 section — use layout templates instead
- Do NOT use the same section-bg-* class for every section — alternate between the 3 backgrounds
- Do NOT make all sections the same density — mix section-spacious, section-standard, and section-compact
- Do NOT use `text-base-content/50` for anything meant to be read — use `var(--clr-text-secondary)` minimum
- Do NOT use emoji icons — use Lucide React (consult icon-mappings.md)
- Do NOT use `.card-archetype` — use `.card-featured`, `.card-standard`, or `.card-compact`
- Do NOT hardcode max-w-7xl on every section — vary container widths

## What Already Exists (do not rebuild)
- `Reveal.tsx` — scroll-triggered animation wrapper. Import from `@/components/Reveal`.
- `StaggerGroup.tsx` — wraps groups of children with stagger delay. Import from `@/components/StaggerGroup`.
- `src/styles/profile.css` — structural profile (card tiers, badges, buttons, dividers, section backgrounds).
- `src/styles/typography.css` — fluid type scale and section density classes.
- `src/styles/colour-tokens.css` — expanded colour tokens (filled with this site's OKLCH values).
- `src/styles/archetype.css` — per-site design system additions (grain overlay, custom effects).
- `src/components/effects/` — WaveDivider, GradientSweep, RingBorder, TracePath, GlowCursor, ParticleField.
- `src/components/layouts/` — SectionBentoGrid, SectionZigzag, SectionFullBleed, SectionStatsBar, SectionAsymmetricSplit, SectionEditorial, SectionOffsetGrid, SectionStackedCards.
- `globals.css` — DaisyUI theme, font tokens, and base styles already configured.
- `config/site.ts` — business info (name, phone, email, location). Import from `@/config/site`.
- `lib/palette.ts` — colour values as TS constants (hex + OKLCH). Import from `@/lib/palette` for OG images and server components.

## Palette Generation
Run `node scripts/generate-palette.mjs` to generate colour-tokens.css, DaisyUI theme, and palette.ts in one step:
```bash
node scripts/generate-palette.mjs \
  --family cool --primary-hue 240 --accent-hue 175 \
  --mood energetic --name volt --light \
  --output-dir src/
```
Add `--light` flag to also generate `:root[data-theme="light"]` overrides.

## Light Theme (Optional)
If the brief requests light mode, the palette generator creates it automatically (`--light` flag).
- Light tokens use `data-theme="light"` attribute selector
- Add a second DaisyUI theme block with `name: "<theme>-light"` and `color-scheme: light`
- Surface scale inverts: 97% → 83% lightness (vs dark's 10% → 30%)
- Text scale inverts: 12% → 50% lightness
- Primary/accent darken for contrast on white backgrounds

## DaisyUI 5 Syntax Reminder (CRITICAL)
```css
/* CORRECT — CSS-based theme in globals.css */
@plugin "daisyui/theme" {
  name: "themename";
  primary: oklch(...);
  /* ... */
}

/* WRONG — JS config does not work in DaisyUI 5 */
module.exports = { daisyui: { themes: [...] } }
```

## Tailwind CSS v4 Reminder
- Use `@import "tailwindcss"` not `@tailwind base; @tailwind components; @tailwind utilities`
- Custom tokens go in `@theme inline { }` blocks
- Use OKLCH colour format everywhere, not hex or HSL

## globals.css Import Order
```css
@import "tailwindcss";
@import "../styles/typography.css";
@import "../styles/colour-tokens.css";
@import "../styles/profile.css";
@import "../styles/archetype.css";

@plugin "daisyui/theme" { ... }
@theme inline { ... }
```
```
