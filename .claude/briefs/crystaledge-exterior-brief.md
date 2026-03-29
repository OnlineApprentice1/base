# CrystalEdge Exterior Cleaning — Vibe Brief

## Business Info
- **Business name:** CrystalEdge Exterior Cleaning
- **Trade/service:** Pressure Washing & Exterior Cleaning
- **Location (city, province):** Peterborough, Ontario
- **Service area:** Peterborough, Kawartha Lakes, Northumberland County, City of Kawartha Lakes
- **Owner name (About page only):** Marcus Webb
- **Phone:** (705) 555-0147
- **Email:** info@crystaledgecleaning.ca
- **Google Maps embed URL:** https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91799.17665498407!2d-78.39023!3d44.30013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d58c8e0bba0b5b%3A0x5036b2f843a42!2sPeterborough%2C+ON!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca

## Brand Direction
- **Design archetype:** glacier-glass-clean-precision (Cool family, concept #12 — crystalline frost, glassmorphism, refracted light)
- **Colour direction:** Cool (OKLCH hue 220-240)
- **Palette:**
  - Primary: `oklch(55% 0.14 235)` — glacial blue
  - Secondary: `oklch(30% 0.04 240)` — deep slate
  - Accent: `oklch(72% 0.15 185)` — frost teal
  - Neutral: `oklch(96% 0.01 235)` — ice white
- **Heading font:** Plus Jakarta Sans (bold, crisp, modern)
- **Body font:** Inter Tight (compact, technical, legible)
- **Mood/vibe in 3 words:** Pristine, precise, refreshing

## Design Decisions
- **Hero concept:** Glassmorphism frosted panel — a frosted semi-transparent card over a cool gradient background, with text inside the glass panel. Thin white top-left border highlight, transparent bottom-right. Background has subtle animated frost particles (3-5, CSS, very slow drift).
- **Signature moves (3):**
  1. **Prismatic-border cards** — service/testimonial cards with thin multi-colour gradient borders simulating light refracting through ice. Uses `background: conic-gradient(...)` on a pseudo-element behind the card.
  2. **Mist-fade sections** — sections fade into each other through gradient blurs at top/bottom edges, like fog rolling between glacial valleys. No hard section boundaries.
  3. **Lens-flare CTA** — primary CTA button with a horizontal light streak that sweeps across on hover (CSS gradient animation), simulating optical lens flare through crystal.
- **Section order:** Social-Proof-Heavy (#3): `hero → testimonials → services → stats → process → cta`
- **Animation patterns:**
  - Hero: `scale-up+parallax` (content scales in, background gradient shifts)
  - Testimonials: `rotate-in+cascade` (cards rotate in one by one)
  - Services: `slide-alternate` (odd left, even right)
  - Stats: `blur-sharpen+counter+pop` (numbers sharpen from blur, count up, pop)
  - Process: `fade-up+wave` (steps fade up with wave stagger)
  - CTA: `none` (intentional stillness — let the words land)

## Pages
- [x] Home (sections: hero, testimonials, services, stats, process, cta)
- [x] Services (layout: E — Category Tabs, residential vs commercial)
- [x] About (layout: D — Magazine, large feature image + pull quotes + multi-column)
- [x] Contact (layout: B — Map Hero + Form Below)
- [x] Privacy Policy
- [x] Terms of Service
- [ ] Blog (not applicable)
- [ ] Other: none

## Content Direction
- **What makes this business different:** CrystalEdge uses a proprietary soft-wash system that protects surfaces while delivering better results than traditional pressure washing. They're one of few companies in the Kawarthas certified for roof cleaning, and they guarantee streak-free results on every job. Family-owned since 2018, they treat every property like their own.
- **Key services (top 5):**
  1. Pressure Washing (driveways, sidewalks, patios, concrete)
  2. Soft Washing (vinyl siding, stucco, wood, painted surfaces)
  3. Deck & Fence Restoration (cleaning + brightening + sealing prep)
  4. Roof Cleaning (moss, algae, lichen removal — no damage)
  5. Commercial Exterior Cleaning (storefronts, parking lots, fleet washing)
- **Target customer:** Homeowners in Peterborough and Kawartha Lakes who take pride in their property — the "curb appeal matters" crowd. Also property managers and small business owners who need regular exterior maintenance.
- **Local details to include:** Kawartha Lakes cottage country (seasonal cleaning for cottagers), Peterborough's mix of heritage homes and new builds, harsh Ontario winters leaving salt stains and mould growth every spring.
- **Testimonial style:** Direct quotes with star ratings (5 stars) — casual, homeowner voice. Vary between short punchy and medium-length.
- **FAQ count:** 8 (on services page)

## Special Requirements
- Emphasise the "before/after" visual concept throughout — the transformation from dirty to pristine aligns with the crystalline theme
- Stats should include: years in business (8+), properties cleaned (2,500+), 5-star reviews (180+), satisfaction guarantee (100%)
- Process should be simple: 4 steps (inspect → protect → clean → reveal)
- Contact form fields: name, email, phone, service type (dropdown), property type, message
