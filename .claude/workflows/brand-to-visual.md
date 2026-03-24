# Brand-to-Visual Mapping

When the brief specifies mood words, use this mapping to translate them into specific design decisions. Mood words drive more than colour — they drive spacing, typography treatment, animation speed, and component styling.

## How to Use

1. Read the brief's 3 mood words
2. Look up each word below
3. Apply the combined design implications to the design context document
4. If words conflict (e.g., "bold" + "gentle"), the first word takes priority

---

## Personality → Design Tokens

### Energy Level

**Calm / Serene / Peaceful / Gentle**
- Animation duration: 0.8s+ (slow, deliberate)
- Stagger delay: 0.15s+ (visible delay between items)
- Section spacing: spacious (use --section-spacious)
- Typography tracking: normal to slightly loose
- Borders: thin (1px) or none — shadow-based depth
- Contrast: moderate (don't use maximum contrast)
- Container: narrower (max-w-5xl, max-w-6xl) for breathing room

**Energetic / Bold / Dynamic / Powerful**
- Animation duration: 0.3-0.5s (snappy)
- Stagger delay: 0.05-0.08s (rapid cascade)
- Section spacing: mixed (tight stats bars + spacious heroes for contrast)
- Typography tracking: tight on headings (-0.02em to -0.03em)
- Borders: thick (2px+) or none — hard edges
- Contrast: maximum (near-white on near-black)
- Container: full-bleed moments mixed with contained sections

### Aesthetic Feeling

**Premium / Luxury / Refined / Elegant**
- Typography weight: lighter headings (500-600, not 700-900)
- Letter-spacing: slightly expanded on labels (+0.05em to +0.1em)
- Section spacing: generous (lots of negative space)
- Card treatment: minimal borders, soft shadows, spacious padding
- Colours: muted/desaturated, low chroma
- Hover effects: subtle (opacity shift, gentle shadow)
- Badge style: understated (no background, subtle border or just text)

**Rugged / Industrial / Raw / Tough**
- Typography weight: heavy (700-900)
- Letter-spacing: tight on headings, wide on labels
- Section spacing: dense — content-packed, less whitespace
- Card treatment: visible borders, no shadows, structural
- Colours: saturated, high chroma, strong primaries
- Hover effects: dramatic (background fill, colour inversion)
- Badge style: bold (inverted background, thick border)

**Warm / Friendly / Approachable / Inviting**
- Typography weight: medium (500-600)
- Border radius: generous (1rem+, pill badges)
- Section spacing: standard, balanced
- Card treatment: rounded, soft shadow, warm backgrounds
- Colours: warm tones, medium chroma
- Hover effects: gentle (shadow grows, slight lift)
- Badge style: pill with soft background tint

**Modern / Clean / Technical / Precise**
- Typography weight: medium-bold (500-700)
- Border radius: minimal (0.25rem or 0)
- Section spacing: systematic, consistent
- Card treatment: sharp edges, thin borders, clean lines
- Colours: cool tones, moderate chroma, strong neutrals
- Hover effects: precise (border colour change, translateY)
- Badge style: underline or border-bottom, no background

### Trust Level

**Trustworthy / Reliable / Established / Solid**
- Layout: symmetrical, predictable, well-structured
- Typography: conservative sizing (don't go extreme)
- Animation: restrained — fade-up only, minimal stagger
- Stats/numbers prominent: show years, projects, clients
- Card treatment: well-defined borders, clear containment

**Innovative / Creative / Unique / Bold**
- Layout: asymmetric, unexpected, rule-breaking
- Typography: dramatic size jumps (huge heroes, tight body)
- Animation: varied — mix of entrance types, scroll effects
- Custom effects: use signature moves prominently
- Card treatment: varied — mix card tiers, break the grid

---

## Quick Reference Table

| Mood Word | Profile Fit | Typography Weight | Spacing Mode | Animation Speed | Border Style |
|-----------|------------|-------------------|--------------|-----------------|-------------|
| Calm | Earth | 400-500 | Spacious | Slow (0.8s+) | None/shadow |
| Bold | Bold | 700-900 | Mixed | Fast (0.3s) | Thick (2px+) |
| Premium | Any | 500-600 | Spacious | Medium (0.6s) | None/subtle |
| Rugged | Warm/Bold | 700-900 | Dense | Fast (0.4s) | Thick |
| Friendly | Warm/Earth | 500-600 | Standard | Medium (0.5s) | Rounded |
| Modern | Cool | 500-700 | Systematic | Medium (0.5s) | Thin/sharp |
| Trustworthy | Any | 500-600 | Standard | Restrained | Clear |
| Creative | Bold | 600-800 | Asymmetric | Varied | Mixed |
| Organic | Earth | 400-500 | Spacious | Slow (0.7s) | Rounded |
| Industrial | Cool/Bold | 700-900 | Dense | Snappy (0.3s) | Hard edges |
| Warm | Warm | 500-600 | Standard | Medium | Soft |
| Precise | Cool | 500-600 | Systematic | Medium | Thin |
| Elegant | Warm/Earth | 400-500 | Generous | Slow (0.8s) | None |
| Powerful | Bold | 800-900 | Tight/mixed | Fast (0.3s) | Thick |
| Grounded | Earth | 500-700 | Standard | Medium | Subtle |
| Inviting | Warm/Earth | 400-500 | Comfortable | Medium | Soft |

---

## Gradient Shape Selection

Don't use the same 4 gradient presets for every site. Match gradient shapes to mood:

### Calm / Serene / Premium / Elegant
- **Use:** Subtle radial only (`--gradient-radial` at low opacity)
- **Avoid:** Conic mesh, steep sweeps, spotlight
- **Angle:** Shallow (90deg-135deg) if using linear
- **Opacity:** 0.08-0.12 — barely there, atmospheric

### Energetic / Bold / Powerful / Dynamic
- **Use:** All 4 — radial + sweep + spotlight + mesh
- **Angle:** Steep (135deg-180deg), aggressive diagonals
- **Opacity:** 0.15-0.25 — bold, visible
- **Bonus:** Layer radial + sweep for depth

### Warm / Friendly / Inviting / Approachable
- **Use:** Radial + soft sweep
- **Angle:** Shallow (90deg-120deg), centered compositions
- **Opacity:** 0.10-0.18 — visible but not overwhelming
- **Centre point:** 50% 40% (slightly above centre — feels like warmth from above)

### Modern / Technical / Precise / Clean
- **Use:** Linear sweep + grid patterns (no organic radials)
- **Angle:** Exact 135deg or 90deg — no odd angles
- **Opacity:** 0.08-0.15 — controlled, systematic
- **Bonus:** Repeating linear gradients for grid/line effects

### Rugged / Industrial / Raw
- **Use:** Mesh + spotlight (dramatic, textural)
- **Angle:** Off-centre origins (30% 70%, 80% 20%) — asymmetric
- **Opacity:** 0.15-0.20 — strong presence
- **Bonus:** Combine with grain overlay at higher opacity (0.06-0.08)

---

## Application in Design Context

When generating the design context document, add a "Brand Token Overrides" section:

```markdown
## Brand Token Overrides (from mood: [word1], [word2], [word3])

Based on the brand mapping:
- Animation base duration: [X]s
- Stagger delay: [X]s
- Heading font-weight override: [weight]
- Preferred section density: [spacious/standard/compact/mixed]
- Border treatment: [thick/thin/none/shadow]
- Hover intensity: [subtle/moderate/dramatic]
- Layout tendency: [symmetric/asymmetric/mixed]
```

This goes into every subagent prompt so they know HOW to style, not just WHAT to style.
