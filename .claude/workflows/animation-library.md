# Animation Library

Don't default every section to the same fade-up Reveal. Assign a **specific animation type** to each section during the design phase. Check `registry.json` `animationPatterns` field — don't reuse the same set as the last 2 builds.

## Available Animation Types

### Entrance Animations (for section reveals)

| # | Name | Motion | Best For | Framer Motion |
|---|------|--------|----------|---------------|
| 1 | **Fade Up** | Fade in + slide up 30px | Default fallback, subtle | `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}` |
| 2 | **Slide Left** | Slide in from left | Alternating content blocks | `initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}` |
| 3 | **Slide Right** | Slide in from right | Alternating with Slide Left | `initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}` |
| 4 | **Scale Up** | Grow from 90% to 100% + fade | Cards, stats, featured items | `initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}` |
| 5 | **Clip Reveal** | CSS clip-path wipe (top to bottom) | Hero sections, full-bleed images | `initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0)" }}` |
| 6 | **Blur Sharpen** | Start blurred + faded, sharpen in | Premium/luxury sections | `initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}` |
| 7 | **Rotate In** | Subtle rotation (-3° to 0°) + fade | Testimonial cards, playful sections | `initial={{ opacity: 0, rotate: -3 }} animate={{ opacity: 1, rotate: 0 }}` |
| 8 | **None (Intentional)** | No animation — static presence | Heavy content, legal pages, grounding sections | No motion wrapper |

### Stagger Patterns (for groups of items)

| # | Name | Behaviour | Best For |
|---|------|-----------|----------|
| A | **Cascade** | Children appear one by one, top-down | Service cards, feature lists |
| B | **Fan Out** | Children scale from center outward | Stats, icon grids |
| C | **Wave** | Sinusoidal delay across items | Grid layouts, gallery |
| D | **Pop** | Quick overshoot scale (1.0 → 1.05 → 1.0) | CTAs, badges, counts |

### Scroll-Linked Animations (for continuous effects)

| # | Name | Behaviour | Best For |
|---|------|-----------|----------|
| i | **Parallax** | Background moves slower than foreground | Hero backgrounds, section dividers |
| ii | **Progress Bar** | Element fills/grows with scroll position | Stats, skills, timelines |
| iii | **Sticky Reveal** | Section sticks, content reveals within | Process/timeline sections |
| iv | **Counter** | Number counts up when in view | Stats sections |

## Composition Rules

1. **Assign one entrance animation per section.** Don't animate every element — animate the section container.
2. **Use stagger patterns for groups of 3+ items** within a section (service cards, stats, etc.).
3. **Maximum 2 scroll-linked animations per page.** They're expensive and attention-grabbing.
4. **At least 2 different entrance types per homepage.** If the hero uses Clip Reveal, don't also clip-reveal the services.
5. **Include at least one "None" section per site.** Intentional stillness creates contrast.
6. **Hero always gets a unique entrance** — never the same as any other section on the page.
7. **Spring physics for all entrances:** `transition: { type: "spring", stiffness: 100, damping: 20 }` (adjust per feel).
8. **Always include `useReducedMotion`** — skip all animations for users who prefer reduced motion.

## Example Assignment

```
Hero:          Clip Reveal + Parallax background
Services:      Fade Up (container) + Cascade (cards)
Process:       Slide Left (odd steps) + Slide Right (even steps)
Stats:         Scale Up (container) + Counter (numbers) + Fan Out (items)
Testimonials:  Rotate In + Wave stagger
About Preview: Blur Sharpen
CTA:           None (intentional stillness — let the words land)
```

## Recording

Add your animation assignment to the registry entry's `animationPatterns` field as an array:
```json
"animationPatterns": ["clip-reveal", "fade-up+cascade", "slide-alternate", "scale-up+counter", "rotate-in+wave", "blur-sharpen", "none"]
```
