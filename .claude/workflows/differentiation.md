# Differentiation Engine

## Purpose
Ensure every site built through this pipeline looks and feels distinct. No two consecutive sites should share the same visual DNA.

## When to Check
**Always read `registry.json` before starting Phase 2.** Parse the `sites` array and apply the rules below.

## Rules

### Rule 1 — No Archetype Repeat Within 3 Builds
If the last 3 sites used "Clean & Reliable", "Industrial & Bold", and "Premium Craft", the next site CANNOT use any of those three. Pick from the remaining options or create a hybrid.

Available archetypes:
1. Clean & Reliable
2. Industrial & Bold
3. Premium Craft
4. Fast & Direct
5. Friendly & Local
6. Modern Specialist

### Rule 2 — No Hero Style Repeat Within 2 Builds
If the last 2 sites used "Split" and "Gradient sweep", pick something else.

Available hero styles: Split, Full-bleed image, Gradient sweep, Minimal, Asymmetric, Video background

### Rule 3 — No Signature Move Repeat Within 3 Builds
Check the `signatureMoves` arrays of the last 3 sites. Do not reuse any of those moves.

### Rule 4 — Color Family Rotation
Group colors into families:
- **Warm:** red, orange, yellow, amber, warm-brown
- **Cool:** blue, teal, cyan, indigo, slate
- **Earth:** green, olive, brown, terracotta, sage
- **Bold:** purple, magenta, hot-pink, crimson, electric

If the last site used a Warm primary, the next should use Cool, Earth, or Bold. Avoid the same family back-to-back.

Exception: if the client has established brand colors, those take priority. Note the override in the registry entry.

### Rule 4b — Colour Quality Minimums
These OKLCH minimums prevent washed-out, generic-looking palettes:
- **Primary chroma:** minimum 0.12 (below this, the primary looks grey)
- **Accent chroma:** minimum 0.12 (below this, the accent fails to "pop" against dark backgrounds)
- **Primary–accent hue separation:** minimum 40° (closer hues blend together and lose contrast)
- **Surface hue:** must match primary hue ±30° OR use a neutral cool hue (240–260°). Random surface hues break palette coherence.

If a concept library entry suggests a muted/desaturated palette (e.g., "calm" or "premium" mood), reduce **lightness** rather than chroma to keep colours identifiable. Example: `oklch(45% 0.14 230)` reads as "muted blue" while `oklch(60% 0.06 230)` reads as "grey."

### Rule 5 — Layout Variation
Vary these structural choices across consecutive builds:
- **Section count on home page:** alternate between 5-6 and 7-8 sections
- **Service display:** cards vs list vs grid vs tabbed — don't repeat the last build
- **Testimonial style:** carousel vs static grid vs single-spotlight — rotate
- **Footer style:** minimal vs detailed vs multi-column — vary it

### Rule 6 — Typography Contrast
Don't use the same heading font two builds in a row. Maintain a mental palette:
- **Sans-serif options:** Inter, DM Sans, Plus Jakarta Sans, Outfit, Space Grotesk, Urbanist
- **Serif options:** Playfair Display, Lora, Merriweather, Source Serif 4
- **Display options:** Syne, Clash Display, Cabinet Grotesk

Pair intentionally. Serif heading + sans body = premium. Bold sans heading + light sans body = modern. Display heading + neutral body = distinctive.

## How to Document

When making design decisions in Phase 2, explicitly note in the commit message:
- Which archetype was chosen and why
- Which alternatives were excluded due to recent use
- The signature moves selected

This creates a searchable git history for design rationale.

## Edge Cases

- **First build ever (empty registry):** Free choice on everything. Set a strong baseline.
- **Client insists on a specific direction that conflicts:** Client preference wins. Note the override in the registry with `"overrideReason": "<why>"`.
- **Running out of options:** After 6 builds, archetypes will cycle. That's fine — the combination of archetype + hero + signature moves + palette creates enough variation. Focus on signature moves being genuinely different.

## Quick Reference — Decision Matrix

Before Phase 2, fill this out mentally:

```
Last 3 archetypes: ___, ___, ___
Available archetypes: ___
Last 2 hero styles: ___, ___
Available heroes: ___
Last 3 signature moves: ___, ___, ___, ___, ___
Forbidden moves: ^^^
Last palette family: ___
Available families: ___
Last heading font: ___
Available fonts: ___
```

Then pick the combination that best serves the current client's brief while respecting these constraints.
