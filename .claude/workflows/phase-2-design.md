# Phase 2 — Design & Layout

## Purpose
Create the responsive layout structure — header, footer, hero, and section shells — with a unique design direction driven by the brief and differentiation rules.

## Prerequisites
- Phase 1 complete (scaffolded project, passing dev server)
- Vibe brief confirmed

## Before Writing Any Code

1. **Invoke the `frontend-design` skill.** This is mandatory.
2. **Read `../../registry.json`** and `.claude/workflows/differentiation.md`.
3. **Choose design direction** based on the brief + differentiation constraints.

## Design Decisions to Make

### Archetype (pick one, check registry for conflicts)
| Archetype | When to use | Visual character |
|-----------|-------------|-----------------|
| Clean & Reliable | Trust-focused, established businesses | Lots of white space, sharp edges, blue/gray tones |
| Industrial & Bold | Heavy trades (welding, concrete, demolition) | Dark backgrounds, strong typography, textured elements |
| Premium Craft | High-end services (custom homes, fine finishes) | Serif accents, muted earth tones, generous spacing |
| Fast & Direct | Emergency/response services (plumbing, HVAC, towing) | Bright CTAs, compact layout, urgency cues |
| Friendly & Local | Family businesses, community-oriented | Warm colors, rounded elements, approachable imagery |
| Modern Specialist | Tech-forward or niche trades (solar, smart home) | Geometric patterns, cool palette, clean sans-serif |

### Hero Style (pick one, check registry for conflicts)
- **Split** — text left, image/visual right (or reversed)
- **Full-bleed image** — text overlay on real photo (only if client has great photos)
- **Gradient sweep** — bold color gradient with floating elements
- **Minimal** — large text, small accent image, lots of space
- **Asymmetric** — off-grid layout with overlapping elements
- **Video background** — looping ambient video (only if client provides)

### Signature Moves (pick 1-2, must not repeat last 3 builds)
Examples:
- Angled section dividers (diagonal cuts between sections)
- Floating accent shapes (geometric or organic)
- Oversized typography as background texture
- Animated counter/stats bar
- Parallax scroll on a key image
- Color-blocked sections with alternating backgrounds
- Pull-quote callout with distinctive styling
- Staggered card grid (not uniform)
- Full-width testimonial strip with horizontal scroll
- Before/after image slider

### Color Palette
- Must include a custom DaisyUI theme in `tailwind.config.ts`
- Primary: derived from brief's color mood + any existing brand colors
- Accent: unique per site — check registry for recent accent colors
- Neutral: warm gray, cool gray, or off-white depending on archetype

### Typography
- Choose a Google Font pairing (or use the template default if it fits)
- Heading font: should match the archetype personality
- Body font: always highly readable
- Use clear size hierarchy: hero > section headings > subheadings > body

## Layout Structure

Build these components with **responsive behavior at every breakpoint**:

### Header / Navigation
- Logo + business name (left)
- Nav links (center or right, hamburger on mobile)
- CTA button (right, visible on all sizes)
- Sticky on scroll with Framer Motion fade

### Hero Section
- Matches chosen hero style
- Primary CTA prominent
- Framer Motion entrance animation (fade + slide, not bounce)
- Must work at 375px through 1920px

### Section Shells (content filled in Phase 3)
Typical section order (vary based on archetype):
- Services overview
- Why choose us / differentiator
- Testimonials / social proof
- About preview
- CTA / contact strip
- FAQ preview (if applicable)

### Footer
- Business info (name, phone, email, address)
- Nav links repeated
- Social links (if provided)
- Copyright

## Framer Motion Patterns

Use these patterns consistently:

```tsx
// Scroll reveal for sections
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>

// Staggered children
<motion.div variants={container} initial="hidden" whileInView="show">
  {items.map((item, i) => (
    <motion.div key={i} variants={child}>

// Sticky header fade
<motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.3 }}
>
```

Keep animations subtle. No bouncing, no spinning, no dramatic slides. The goal is polish, not spectacle.

## Responsive Checklist

Before completing Phase 2, verify at each breakpoint:

- [ ] **375px (mobile):** Single column, hamburger nav, readable text, CTAs thumb-accessible
- [ ] **768px (tablet):** 2-column where appropriate, nav may still be hamburger or horizontal
- [ ] **1024px (laptop):** Full nav visible, multi-column layouts, comfortable spacing
- [ ] **1440px (desktop):** Max-width container, generous whitespace, no content stretching
- [ ] **1920px (wide):** Content stays centered, doesn't stretch to edges

## Gate
- Layout renders correctly at all 5 breakpoints
- Header, hero, section shells, and footer are built
- Framer Motion animations are working
- Custom DaisyUI theme is applied
- Design direction is documented in a commit message

## Commit
```bash
git add -A
git commit -m "Phase 2: <archetype> layout with <hero-style> hero for <business-name>"
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' git push
```
