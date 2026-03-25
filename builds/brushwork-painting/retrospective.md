# Build Retrospective: brushwork-painting

## Decisions Made
- Hero layout: SectionAsymmetricSplit 7/5 with paint swatch chips and parallax background — chosen to reinforce the "colour" identity and show craft immediately
- Section order: portfolio-led (gallery right after hero) — differentiates from the last 4 builds which all led with stats/pain-points/about-preview; gallery-first sells a painting company visually
- Animation choices: followed brief assignments closely — blur-sharpen+parallax on hero, scale-up+wave on gallery, slide-left+cascade on services, fade-up+fan on testimonials, clip-reveal on about-preview, none on CTA (server component)
- Inner page layouts: timeline-journey for services (differentiates from card grids), story-image for about, map-hero-form-below for contact

## What Went Well
- Earth palette + moss-wall archetype created a warm, organic feel distinct from the previous 4 builds
- All 3 signature moves (gold-line-divider, frost-border, radial-glow) rendered visible in components
- Lighthouse scores excellent on first pass: 94 performance, 96 accessibility, 96 best practices, 100 SEO
- WCAG contrast all AAA — the dark surface + light text combo worked well with earth tones
- Parallel subagent dispatch for homepage sections (6 sections) and inner pages (3 pages) completed efficiently
- SectionBentoGrid with featured card (col-span-2) for specialty finishes worked well for services
- Gallery section masonry grid with frost-border cards gave portfolio sections visual weight

## What I Struggled With
- CtaSection initially used wrong SectionFullBleed API — passed style/className directly instead of using the `background` prop (ReactNode). Had to read the layout template source to discover the correct API.
- ServicesSection subagent output used non-existent colour tokens (var(--clr-neutral-600), var(--clr-neutral-900)) — needed manual fix to var(--clr-text-secondary) and var(--clr-text-primary)
- copy-templates.sh overwrote site.ts during scaffold — had to rewrite the config after template copy
- generate-palette.mjs initial invocation used wrong argument format, then wrong mood keyword — took 3 attempts

## Rules I Skipped (and Why)
- Layout templates: used (SectionAsymmetricSplit for hero + about-preview, SectionBentoGrid for services, SectionFullBleed for CTA, SectionStackedCards for testimonials). Gallery used custom masonry CSS grid — no existing layout template matched the masonry pattern.
- Effect components: WaveDivider used between all homepage sections. Frost-border and gold-line-divider from archetype.css used throughout.
- useReducedMotion: present in all animated client components (HeroSection, GallerySection, ServicesSection, TestimonialsSection, AboutPreview, ServicesContent, AboutContent, ContactContent)
- Animation assignments: matched the brief for all 6 homepage sections
- Signature moves: all 3 implemented — gold-line-divider (footer + archetype.css), frost-border (hero image, gallery cards, testimonial cards), radial-glow (testimonials section bg, CTA bg)

## Suggestions for Pipeline Improvement
- copy-templates.sh should not overwrite site.ts if it already has custom content — check for a sentinel comment or skip if file differs from template
- generate-palette.mjs usage instructions should be more prominent — the --mood flag options aren't obvious
- The qa.sh "Canadian English" check flags CSS `color-mix()` function calls as American English — should exclude CSS function names from the check
- The qa.sh brief extraction for signature moves and section order failed — the regex patterns need updating to match the current brief template format
- Screenshot capture in qa.sh failed (non-blocking) — likely needs puppeteer/playwright dependency or headless Chrome configuration
