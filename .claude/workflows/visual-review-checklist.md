# Visual Review Checklist

Walk through every item before approving a build. This is mandatory — not optional. The operator must review the running site and check each item against the brief.

**How to use:** Start the dev server, open the site at each viewport width, and check every item. Mark pass/fail. If any item in a Critical section fails, the build cannot deploy.

---

## 1. Hero Impact (Critical)

- [ ] Hero fills the full viewport on desktop (min-h-screen)
- [ ] Background effects (gradients, textures, glows) are **visually perceptible** — not invisible
- [ ] Heading creates immediate visual impact (dramatic size, clear hierarchy between h1 and subtitle)
- [ ] CTA buttons are prominent, accessible, and have visible hover states
- [ ] Hero feels distinct from a generic dark/light page — the archetype is evident
- [ ] If the brief specifies a signature hero technique, it is implemented and visible

## 2. Section Variety (Critical)

- [ ] No more than 2 consecutive sections use the same layout structure (centered heading + grid)
- [ ] At least 2 homepage sections use non-centered or asymmetric layouts
- [ ] Spacing varies between sections (not every section uses the same py-* value)
- [ ] Visual rhythm exists — sections alternate between dense and spacious content
- [ ] Each section feels like a distinct "moment," not a repeated block
- [ ] At least one section has no entrance animation (intentional stillness)

## 3. Colour & Contrast (Critical)

- [ ] Primary colour is visible and used meaningfully (not just on buttons)
- [ ] Accent colour creates visual highlights that draw the eye
- [ ] Background gradients/glows are **perceptible** (not sub-10% opacity on matching backgrounds)
- [ ] Text contrast meets WCAG AA: 4.5:1 for body text, 3:1 for large text
- [ ] On dark themes: cards/sections have visible depth differentiation (bg-base-100 vs bg-base-200 vs bg-base-300)
- [ ] Palette feels like the mood described in the brief (e.g., "cinematic" ≠ flat grey)

## 4. Cards & Components

- [ ] Cards have visible depth — border, shadow, background differentiation, or some combination
- [ ] Hover effects on interactive cards are **perceptible and satisfying** (not invisible gradient shifts)
- [ ] Badge/label styling is intentional and matches the archetype
- [ ] Image placeholders have appropriate aspect ratios (not squashed or stretched)
- [ ] Signature design moves from the brief are **visible** (not technically present but invisible)

## 5. Typography

- [ ] Heading font is visually distinct from body font
- [ ] Size hierarchy is dramatic and intentional: hero (4xl-8xl) → section headings (2xl-4xl) → card headings (lg-xl) → body (base)
- [ ] Line height and letter spacing feel appropriate for the archetype (tight for modern, relaxed for premium)
- [ ] No text is uncomfortably small on desktop (minimum 14px for body, 12px for labels)
- [ ] Heading font renders correctly (Google Fonts loaded, no fallback font flash)

## 6. Responsive (check at 375px, 768px, 1024px, 1440px)

- [ ] **375px (mobile):** No horizontal overflow. Text is readable. Grid collapses to single column. Images scale. Navigation hamburger works.
- [ ] **768px (tablet):** Grid adjusts (2 columns where appropriate). Spacing reduces. Images don't dominate.
- [ ] **1024px (laptop):** Full desktop layout active. Grid at full columns. Header shows desktop nav.
- [ ] **1440px (wide desktop):** Content is contained (max-w-7xl or similar). No stretched layouts. Readable line lengths.
- [ ] Mobile menu: opens/closes, scrolls properly, links work, body scroll locks

## 7. Content Quality

- [ ] Headlines are specific and trade-relevant ("Roofs That Last" not "Our Services")
- [ ] CTAs are trade-specific and action-oriented ("Get a Free Roofing Estimate" not "Contact Us")
- [ ] Testimonials feel real — specific details about the work, named attribution
- [ ] No placeholder copy ("Lorem ipsum", "coming soon", "[description here]")
- [ ] About preview on homepage doesn't use owner name (owner name = About page only)
- [ ] Canadian English: colour, centre, favourite, metre (spot check 3 instances)

## 8. Brief Compliance (Critical)

- [ ] **Signature moves:** Each signature move from the brief is implemented AND visually visible
- [ ] **Section order:** Homepage sections match the order specified in the brief
- [ ] **Animation types:** Each section uses the animation type assigned in the brief (not all fade-up)
- [ ] **Palette mood:** The site feels like the 3 mood words in the brief
- [ ] **Archetype identity:** The archetype concept is evident (e.g., "midnight showroom" should feel cinematic and dark, not just dark)

## 9. Navigation & Footer

- [ ] Header sticks on scroll with visible backdrop blur
- [ ] Active page or hover state is visible in nav links
- [ ] Footer has all required links: Privacy Policy, Terms of Service
- [ ] Footer contact info matches site config (phone, email, location)
- [ ] Social links are present (even if placeholder # hrefs)

## 10. Inner Pages (spot check 2 pages)

- [ ] Services page: varied layout, not a plain list
- [ ] About page: owner name present, story feels authentic
- [ ] Contact page: Google Maps embed present and responsive
- [ ] Contact form: all fields render, submit button visible
- [ ] Legal pages (privacy/terms): readable, business name correct

---

## Quick Summary

After completing the checklist, answer:

1. **Would I show this to a client right now?** (Yes / With reservations / No)
2. **What are the 3 weakest sections?** (list them)
3. **Does it feel like the brief, or like a template?** (Brief / Template)

If the answer to #1 is "No" or #3 is "Template," the build needs revision before deploy.
