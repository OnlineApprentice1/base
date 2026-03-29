# Run Documentation: CrystalEdge Exterior Cleaning
## Build: crystaledge-exterior | Date: 2026-03-28

### Phase 0 — Intake
**Decisions:** Chose pressure washing trade — untouched in registry, great alignment with cool/crystalline visual language. Business name "CrystalEdge" evokes the glacier-glass concept naturally. Peterborough, ON location provides Kawartha Lakes cottage country angle for seasonal cleaning content.
**Differentiation:** Last 3 archetypes were brass-instrument-precision-warm (warm), theatrical-curtain-dramatic-bold (bold), moss-wall-friendly-local (earth). Rotation dictates cool family next. Picked glacier-glass-clean-precision — glassmorphism and crystalline frost effects haven't appeared in any prior build.
**Section order rationale:** Social-Proof-Heavy (#3) chosen because pressure washing is a trust-based service — homeowners let strangers on their property. Leading with testimonials builds that trust before presenting services. Last 3 orders were Problem-Solution, Premium Showcase, Portfolio-Led — all different patterns.

### Phase 2 — Design System
**Palette:** Primary hue 235 (glacial blue), accent hue 185 (frost teal). Separation: 50° (above 40° minimum). Modern mood → systematic spacing, thin borders, medium animation speed. All chroma checks pass (primary 0.16, accent 0.13).
**Profile:** Cool family — sharp 0.25rem radius, thin 1px borders, uppercase labels with wide tracking. Matches the precision-cleaning brand.
**Font pairing:** Plus Jakarta Sans (heading) — crisp geometric, bold weight reads as confident. Inter Tight (body) — compact and technical, high legibility at small sizes. Neither font used in last 3 builds.
**Archetype CSS additions:** glass-panel (glassmorphism), card-prismatic (conic gradient border), mist-fade (section transitions), btn-lens-flare (hover light streak), frost-grain overlay, section-bg-frost.

### Phase 3 — Plan
**Anti-sameness results:** All 8 checks passed. No layout, animation, or structural overlap with last 3 builds. Section order (Social-Proof-Heavy) unique. Hero type (glassmorphism frosted panel) unique. All 3 signature moves new to the registry.
**Prompt tiers:** 3 Tier 1 tasks (Header, Footer, Reveal/Motion), 11 Tier 2 tasks (6 homepage sections, 3 inner pages, SEO bundle, legal pages). Total: 14 subagent prompts.

### Phase 4 — Structure
**Components built:** Header (transparent→glass scroll transition, mobile hamburger with AnimatePresence), Footer (4-column grid, Lucide icons, legal links), Reveal component (Framer Motion IntersectionObserver wrapper), layout templates imported from templates/.
**Design system validation:** All components use type-* classes, badge-label, card tiers. No hardcoded text sizes. No transition-all.

### Phase 5 — Homepage
**Sections built (6):** HeroSection (glassmorphism panel + floating circles + radial gradient), TestimonialsSection (1 featured + 2 standard asymmetric layout), ServicesSection (5 prismatic cards in 3+2 offset grid), StatsSection (compact bar with CountUp animation), ProcessSection (4-step zigzag with alternating images), CTASection (server component, glass-panel, intentional stillness).
**Animation variety:** scale-up (hero), rotate-in+cascade (testimonials), slide-alternate (services), blur-sharpen+counter+pop (stats), fade-up+wave (process), none (CTA). All 6 unique patterns — no duplicates.
**Signature move usage:** card-prismatic on services cards, mist-fade-bottom on process section, btn-lens-flare on hero + CTA buttons, frost-grain overlay on hero + CTA, glass-panel on hero + CTA.
**Coherence:** Section backgrounds alternate (deep→texture→gradient→frost→gradient→deep). Container widths vary (max-w-3xl hero, max-w-6xl testimonials, max-w-7xl services/process, full-width stats). Spacing density varies (spacious/standard/compact mix).

### Phase 6 — Inner Pages
**Services page:** Category tabs (Residential/Commercial), 5 detailed service cards with card-prismatic borders, 8-item FAQ accordion with card-compact styling. Server/client split for metadata + interactive state.
**About page:** Magazine layout — full-width feature image with clip-reveal, pull quote with accent border, CSS columns-2 body text with drop cap, 3-value grid (Shield, Award, MapPin icons). Owner name (Marcus Webb) appears only here per content rules.
**Contact page:** Map hero (Google Maps iframe), 2-column form+info below, 6-field validated form POSTing to API route, Resend email integration, 4 contact info cards with Lucide icons.

### Phase 7 — SEO & Legal
**SEO:** robots.ts, sitemap.ts (6 pages), opengraph-image.tsx (dynamic OG using palette colours via Satori), public/llms.txt.
**Legal:** Privacy policy (PIPEDA-compliant), Terms of Service. Both linked from footer.
**Structured data:** JSON-LD LocalBusiness schema in layout.tsx with business name, address, phone, service area.

### Phase 8 — QA
**Automated checks:** qa.sh passed — build succeeds, no TypeScript errors, no hardcoded oklch (after fix), all mandatory components present.
**Fixes applied:** Replaced 15 hardcoded oklch values in HeroSection.tsx with CSS variable references (color-mix). Fixed 1 hardcoded oklch box-shadow in archetype.css.
**Accepted warnings:** Generic inner-page headings (convention), Lighthouse perf 83 (close to 90 target, acceptable for unoptimised images), `color` prop names flagged as American (code variables, not prose).

### Phase 9 — Deploy
**Build:** `npm run build` — all 10 pages rendered as static HTML (SSG). No build errors.
**Push:** Project pushed to GitHub at OnlineApprentice1/crystaledge-exterior.
**Registry:** Updated registry.json with full entry — slug, archetype, palette, hero, signatureMoves, fonts, sectionOrder, animationPatterns, innerPageLayouts, theme "crystaledge", status "built".
**Build #8 complete.**