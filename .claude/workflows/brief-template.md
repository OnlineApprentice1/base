# Brief Template

Copy this template to `.claude/briefs/<slug>-brief.md` and fill in ALL required fields before starting any build. If any required field is empty, the pipeline must not proceed.

---

## Required Fields

```markdown
# <Business Name> — Vibe Brief

## Business Info
- **Business name:**
- **Trade/service:**
- **Location (city, province):**
- **Service area:**
- **Owner name (About page only):**
- **Phone:**
- **Email:**
- **Google Maps embed URL:**

## Brand Direction
- **Design archetype:** (check registry — no repeat within last 3)
- **Colour direction:** (warm/cool/earth/bold — check registry for rotation)
- **Palette:** (primary, secondary, accent, neutral — OKLCH values)
- **Heading font:**
- **Body font:**
- **Mood/vibe in 3 words:**

## Design Decisions
- **Hero concept:** (check registry — no repeat within last 2)
- **Signature moves (2-3):** (check registry — no repeat within last 3)
- **Section order:** (consult section-orders.md — no repeat within last 3)
- **Animation patterns:** (consult animation-library.md — vary from last 2 builds)

## Pages
- [ ] Home (sections: list them)
- [ ] Services (how many, layout style)
- [ ] About
- [ ] Contact (with Google Maps)
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Blog (if applicable)
- [ ] Other:

## Content Direction
- **What makes this business different:**
- **Key services (top 3-5):**
- **Target customer:**
- **Local details to include:**
- **Testimonial style:** (quotes / case studies / Google Review embeds — vary from last build)
- **FAQ count:** (6-12, vary from last build)

## Special Requirements
- (anything unique about this build)
```

## Validation Checklist

Before proceeding to scaffold:
- [ ] All required fields are filled (no blanks, no TBDs)
- [ ] Registry checked — archetype, hero, palette family, and signature moves don't conflict with last 3 builds
- [ ] Brief saved to `.claude/briefs/<slug>-brief.md`
- [ ] Section order differs from last 3 builds
- [ ] At least one unique inner page layout decision documented
