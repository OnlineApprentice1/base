# Section Coherence Review Prompt

Run this review after all homepage sections are built (before QA). Dispatch a subagent with this prompt to check whether independently-built sections work together as a cohesive page.

---

## Prompt Template

```
You are reviewing a completed homepage for structural variety and visual coherence. The sections were built by independent agents who could not see each other's output.

Read ALL files in src/components/home/ and evaluate the following. For every issue found, include the exact file path, line number, and a concrete fix suggestion.

## 1. LAYOUT VARIETY

For each section file, identify the layout pattern:
- "centered-heading-grid": centered h2 → centered p → symmetrical grid/flexbox of cards
- "zigzag-alternating": content alternates left/right across rows
- "asymmetric-split": unequal column widths (e.g., 7/5, 8/4)
- "full-bleed": content or image extends edge-to-edge
- "bento-masonry": varied-size cards in a non-uniform grid
- "timeline-vertical": vertical progression with alternating content
- "single-focus": one large element (image, stat, quote) dominates
- "other": describe

List every section and its pattern. Then check:
- [ ] No more than 2 sections use "centered-heading-grid"
- [ ] At least 1 section uses an asymmetric or unconventional layout
- [ ] Consecutive sections do NOT use the same pattern

If violated: suggest specific layout changes for the repeated sections, with code-level restructuring guidance.

## 2. SPACING RHYTHM

Extract the vertical padding (py-*) from each section's outermost element:
- List all values
- Check: at least 2 different py-* values are used
- Ideal: 3 different values (py-16/py-20/py-24 or py-20/py-24/py-28)

If all sections use the same padding: suggest which sections should be tighter and which should be more spacious.

## 3. ANIMATION CORRECTNESS

Read the brief at .claude/briefs/{{SLUG}}-brief.md for the animation assignments.

For each section, check:
- What animation type is assigned in the brief?
- What animation is actually used in the code? (Look for Reveal animation= prop or motion.div variants)
- Do they match?

Flag any section using "fade-up" that should use something else per the brief.
Flag any section missing its stagger pattern.

## 4. VISUAL DEPTH

For each section, check:
- Do cards/panels have visible depth? (border, shadow, or bg differentiation from the section background)
- Are gradient/glow opacities sufficient? (flag anything below 0.10 opacity)
- Would this section look identical to another section if you swapped the text content? If yes, flag it.

Specifically check:
- Cards using only bg-base-200 on a bg-base-100 section (barely visible on dark themes — needs border or shadow)
- Gradient overlays with opacity below 0.15 on dark backgrounds (invisible)
- Hover effects using via-white/5 or similar (imperceptible)

## 5. CONTENT QUALITY (quick scan)

- Flag any section heading that is generic: "Our Services", "What We Do", "About Us", "What Our Clients Say"
- Flag any CTA that is generic: "Learn More", "Contact Us", "Get Started", "Read More"
- Flag any section where the copy could apply to ANY business (not trade-specific)
- Flag if more than 1 testimonial uses the exact same sentence structure

## 6. DESIGN SYSTEM USAGE

Check if sections are using the archetype.css classes:
- Are cards using .card-archetype or .lacquer-sheen (or equivalent)?
- Are dividers using .section-divider (or equivalent)?
- Are any sections re-implementing styles that exist in archetype.css?

If sections are ignoring the design system: flag the specific instances.

## OUTPUT FORMAT

For each issue found:
```
ISSUE: [category] — [brief description]
FILE: [path]:[line]
CURRENT: [what the code does now]
FIX: [specific code change to make]
SEVERITY: high | medium | low
```

Then provide a summary:
- Total issues found
- High severity count
- Whether the homepage passes coherence review (yes / needs fixes)
```

---

## When to Run

- After ALL homepage section tasks are complete
- Before running qa.sh
- Before the visual review checklist

## What to Do with Results

- **High severity issues:** Fix before proceeding to QA
- **Medium severity:** Fix if time allows, otherwise note for post-launch revision
- **Low severity:** Skip — nice-to-have improvements
