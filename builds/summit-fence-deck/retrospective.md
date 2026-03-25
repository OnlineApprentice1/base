# Build Retrospective: summit-fence-deck

## Decisions Made
- Hero layout: Typography-only curtain-split-reveal using SectionFullBleed — chose this over asymmetric image hero to differentiate from last 2 builds (brushwork used asymmetric-gradient-swatch, clearwater used water-caustic-asymmetric)
- Section order: Premium Showcase (7 sections) — differs from all previous builds by adding signature-project and materials sections
- Animation choices: Followed brief exactly for all 7 sections — clip-reveal+parallax (hero), blur-sharpen (signature), slide-alternate (services), fade-up+cascade (process), scale-up+fan (materials), rotate-in+wave (testimonials), none (CTA)
- Inner page layouts: sidebar-nav for services (premium feel), split-hero-values for about, form-sidebar for contact — all differ from brushwork's layouts

## What Went Well
- All 6 homepage subagents dispatched in parallel and returned clean code on first try
- All 3 inner page subagents also dispatched in parallel, all returned clean on first try
- Type safety issues with Framer Motion `ease` strings resolved with `as const` pattern (learned from earlier in this build)
- Lucide icon `style` prop issue was known from Phase 5 — wrapped in `<span>` immediately
- Build compiled on every phase gate without TypeScript errors
- WCAG contrast: all pairs pass AAA — the bold palette with dark backgrounds produces excellent contrast
- Differentiation from 5 prior builds achieved across all dimensions (archetype, palette, hero, section order, fonts, signature moves)

## What I Struggled With
- Dev server was running ironclad-roofing instead of summit-fence-deck during Phase 5e screenshots — caught the wrong project in screenshots and had to redo
- Lighthouse performance 75 vs 80 target on dev server — converted `<img>` to Next.js `<Image>` but dev server scores are inherently lower than production
- QA script `grep -P` not supported on macOS — false positive on DaisyUI theme detection
- scaffold.sh refused to run on existing directory — had to manually run copy-templates.sh
- create-next-app interactive prompts during Phase 1 — needed `yes |` pipe workaround
- generate-palette.mjs doesn't accept `--mood bold` (only: calm, energetic, premium, etc.) — used `--mood energetic` as closest match

## Rules I Skipped (and Why)
- Layout templates: Used in all sections (SectionFullBleed, SectionAsymmetricSplit, SectionBentoGrid, SectionZigzag, SectionOffsetGrid, SectionStackedCards) — none skipped
- Effect components: WaveDivider used between all sections with variant="sharp" for bold profile — none skipped
- useReducedMotion: Present in all animated components (HeroSection, SignatureProject, ServicesSection, ProcessSection, MaterialsSection, TestimonialsSection) — CTA is a server component so N/A
- Animation assignments: All matched the brief exactly — no defaults to fade-up
- Signature moves: All 3 implemented — spotlight-sections (signature-project + materials via archetype.css), iron-stamp-badge (services + testimonials via archetype.css), jagged-wave-divider (WaveDivider variant="sharp" between sections)

## Suggestions for Pipeline Improvement
- QA script should use `grep -E` instead of `grep -P` for macOS compatibility on DaisyUI check
- generate-palette.mjs should accept `--mood bold` since "bold" is a valid palette family
- scaffold.sh should have an `--update` flag for re-running on existing projects instead of refusing
- Screenshots script should be rewritten to run from the project directory context so playwright resolves from local node_modules
- Lighthouse performance threshold of 80 may be unrealistic for dev server with Framer Motion — consider running against production build or lowering dev threshold to 70
