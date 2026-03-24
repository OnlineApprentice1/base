---
name: site-builder
description: Assembly line orchestrator for building Next.js websites. Invoke when the user wants to build a new site, start a project, run a specific phase, or check build status. Manages the conveyor belt with skill packs, automated QA, and Superpowers methodology.
---

# Site Builder — Conveyor Belt Orchestrator

You are the conveyor belt. You move projects through 10 discrete phases, each with a single job, clear inputs/outputs, and a gate that must pass before proceeding.

## When to Invoke

- User says "build a site", "new site", "new project", or "start a build"
- User wants to run a specific phase
- User wants to resume or continue an in-progress build
- User wants to check what's been built (read registry.json)
- User wants to make changes to an existing site (route to maintenance flow)

## The Assembly Line

```
┌────────┐  ┌────────┐  ┌─────────┐  ┌──────┐  ┌───────────┐  ┌────────┐  ┌───────────┐  ┌───────────┐  ┌────┐  ┌────────┐
│INTAKE  │─▸│SCAFFOLD│─▸│ DESIGN  │─▸│ PLAN │─▸│ STRUCTURE │─▸│HOMEPAGE│─▸│INNER PAGES│─▸│SEO & LEGAL│─▸│ QA │─▸│ DEPLOY │
│Phase 0 │  │Phase 1 │  │ SYSTEM  │  │Phs 3 │  │  Phase 4  │  │Phase 5 │  │  Phase 6  │  │  Phase 7  │  │Ph 8│  │Phase 9 │
└────────┘  └────────┘  │ Phase 2 │  └──────┘  └───────────┘  └────────┘  └───────────┘  └───────────┘  └────┘  └────────┘
                         └─────────┘
     │                                                                                                              │
     ▾                                                                                                              ▾
  Brief saved to                                                                                             registry.json
  .claude/briefs/                                                                                            updated
```

## Phase Execution Model

| Phases | Runs in | Mode |
|--------|---------|------|
| 0-3 | Main conversation | Belt drives directly |
| 4-7 | Subagents | Belt dispatches with skill packs + design context |
| 8-9 | Main conversation | Belt drives directly |

---

## Phase 0 — INTAKE

**Job:** Interview the user and produce a complete vibe brief.

### Sub-steps:
1. **Invoke** `superpowers:brainstorming` for Socratic questioning
2. **Interview round 1** — Business identity: name, trade, location, service area, owner name, contact info
3. **Interview round 2** — Vibe & mood: 3 mood words, colour direction, what makes them different
4. **Interview round 3** — Details: key services (top 5), target customer, local specifics, testimonial style
5. **Read registry.json** — Note last 3 archetypes, last 2 heroes, last 3 section orders, last 2 heading fonts
6. **Consult concept-library.md** — Pick design concept from the correct colour family rotation
7. **Consult section-orders.md** — Pick a section order not used in last 3 builds
8. **Consult animation-library.md** — Assign animation types per section (no more than 2 sections share the same type)
9. **Make design decisions** — Archetype, hero concept, 3 signature moves, palette family, fonts
10. **Save brief** to `.claude/briefs/<slug>-brief.md` using `brief-template.md`

**Input:** User conversation
**Output:** Brief file at `.claude/briefs/<slug>-brief.md`
**Gate:** User confirms brief. Brief file exists with all required fields filled.
**Commit:** Brief file

---

## Phase 0.5 — DOMAIN/HOSTING (Manual)

Not automated. User performs domain registration, DNS, and hosting setup. Checklist at `.claude/workflows/phase-0.5-checklist.md`.

---

## Phase 1 — SCAFFOLD

**Job:** Create the project directory, install dependencies, wire site config.

### Sub-steps:
1. **Invoke** `superpowers:using-git-worktrees` for workspace isolation
2. **Run** `create-next-app` in `projects/<slug>/`
3. **Install deps:** `framer-motion lucide-react daisyui@latest resend gray-matter remark remark-html`
4. **Create GitHub repo:** `gh repo create OnlineApprentice1/<slug> --public --source .`
5. **Wire** `src/config/site.ts` with business data from brief (name, tagline, phone, email, location, map embed URL)
6. **Add Unsplash** to `next.config.ts` remote image patterns

**Input:** Brief file
**Output:** Working project at `projects/<slug>/` + GitHub repo
**Gate:** `npm run dev` passes without errors
**Commit:** Initial scaffold

---

## Phase 2 — DESIGN SYSTEM

**Job:** Set up all CSS/theme files so that build subagents have a complete design system to work with.

### Sub-steps:
1. **Run** `generate-palette.mjs` with brief's palette parameters → produces `colour-tokens.css`, `palette.ts`, `daisyui-theme.css`
2. **Move generated files** to correct locations (`src/styles/`, `src/lib/`)
3. **Copy profile CSS:** `cp templates/styles/profile-{family}.css src/styles/profile.css`
4. **Copy typography CSS:** `cp templates/styles/typography.css src/styles/typography.css`
5. **Create archetype CSS** at `src/styles/archetype.css` — signature visual patterns, dividers, animations, grain overlay
6. **Wire globals.css** — imports (tailwindcss, typography, colour-tokens, profile, archetype), DaisyUI 5 theme plugin, `@theme inline` brand tokens, base body styles
7. **Wire layout.tsx** — Google Font imports (`next/font/google`), `data-theme` on `<html>`, font CSS variables, JSON-LD LocalBusiness schema, page metadata
8. **Verify** colour token selector matches the data-theme attribute (e.g., `spectrum-light` not just `light`)
9. **Copy effect components** from `templates/components/effects/` → `src/components/effects/`
10. **Copy layout templates** from `templates/layouts/` → `src/components/layouts/`

**Input:** Brief file + palette parameters
**Output:** Complete design system files in project
**Gate:** `npm run dev` still passes. All CSS files import correctly. DaisyUI theme renders.
**Commit:** Design system setup

---

## Phase 3 — PLAN

**Job:** Write the implementation plan and generate the per-build design context document.

### Sub-steps:
1. **Invoke** `superpowers:writing-plans`
2. **Generate design context document** using `.claude/workflows/design-context-template.md` — includes palette tokens, typography, visual language, signature effect code sketches, layout rules, anti-patterns, existing components
3. **Consult** `brand-to-visual.md` — turn brief mood words into brand token overrides (animation speed, heading weight, spacing density, border treatment)
4. **Write implementation plan** — one task per file/component, each with ALL 6 required fields:
   - Component name and file path
   - Layout structure (explicit: "asymmetric 7/5 grid", not "build the services section")
   - Animation assignment (entrance type + stagger pattern from brief)
   - Anti-pattern (what this section must NOT look like)
   - Responsive behaviour (how layout changes at mobile/tablet/desktop)
   - Acceptance criteria (visual, testable)
5. **Assign tasks to phases** — tag each task as Phase 4 (structure), Phase 5 (homepage), Phase 6 (inner page), or Phase 7 (SEO/legal)
6. **Run anti-sameness self-review** (see "Anti-Sameness Guard" below)
7. **Save plan** to PLAN.md

**Input:** Brief file + design context template + brand-to-visual mapping
**Output:** PLAN.md + design context document
**Gate:** Plan saved. Self-review passed. All tasks have 6 required fields. Tasks tagged by phase.
**Commit:** Plan file

---

## Phase 4 — STRUCTURE

**Job:** Build the site shell — navigation, footer, and shared components.

### Sub-steps:
1. **Read** skill pack: `skill-packs/structural.md`
2. **Dispatch subagent** with: structural skill pack + design context + brief Brand Direction/Design Decisions
3. **Subagent builds:**
   - `src/components/Header.tsx` — responsive nav, mobile menu, CTA button
   - `src/components/Footer.tsx` — multi-column layout, quick links, service area, contact info, legal links
   - `src/components/Reveal.tsx` — Framer Motion wrapper with 6+ animation variants
   - Any additional shared components from the plan (e.g., StaggerGroup)
4. **Spec review** — verify: profile classes used, Lucide icons (not emoji), type classes, responsive

**Input:** Plan (Phase 4 tasks) + skill pack + design context + brief
**Output:** Working Header, Footer, and animation components
**Gate:** Site shell renders. Nav links work. Footer has legal page links. Mobile menu works.
**Commit:** Site structure

---

## Phase 5 — HOMEPAGE

**Job:** Build all homepage sections and verify coherence.

### Sub-steps:
1. **Read** skill packs: `skill-packs/theme-and-ui.md` + `skill-packs/content.md`
2. **For each homepage section** (from brief's section order):
   - Dispatch subagent with: UI + content skill packs, design context, brief sections, full task spec from plan
   - If task references a signature move: include code sketch from `signature-implementations.md`
   - Subagent builds the section component + adds it to `page.tsx`
   - Spec review: profile card tiers, type classes, layout template used, no emoji, no card-archetype, no transition-all, animation matches plan
3. **Assemble page.tsx** — wire all sections in brief's section order (if not already assembled by subagents)
4. **Run coherence review** using `.claude/workflows/coherence-review-prompt.md`:
   - Layout variety (no more than 2 centered, no more than 2 card grids)
   - Spacing rhythm (varied section density)
   - Animation correctness (matches plan assignments)
   - Signature moves visible (not invisible CSS)
5. **Fix coherence issues** if any found

**Input:** Plan (Phase 5 tasks) + skill packs + design context + brief
**Output:** Complete homepage with all sections
**Gate:** All homepage sections built. Coherence review passed. Page renders without errors.
**Commit:** Homepage sections (can be multiple commits — one per section or batched)

### Parallelization:
Homepage sections that don't depend on each other can be dispatched to parallel subagents. Group by independence:
- **Batch A:** Hero + Testimonials + Stats (no shared state)
- **Batch B:** Services + Process + CTA (may reference each other's layout for contrast)

---

## Phase 6 — INNER PAGES

**Job:** Build all inner pages (services, about, contact).

### Sub-steps:
1. **Read** skill packs: `skill-packs/theme-and-ui.md` + `skill-packs/content.md`
2. **For each inner page** from the brief (e.g., Services E-tabs, About D-magazine, Contact B-map-hero):
   - Dispatch subagent with: UI + content skill packs, design context, brief sections, full task spec from plan
   - Brief specifies layout variant for each page (A through F options in inner-page-layouts.md)
   - Subagent builds the page + any page-specific components (e.g., ServiceTabs.tsx, ContactForm.tsx)
3. **Services page** — matches brief's layout variant, includes all services from brief, FAQ section
4. **About page** — owner name appears here (and ONLY here), origin story, values, team
5. **Contact page** — Google Maps embed (MANDATORY), contact form, API route at `src/app/api/contact/route.ts`
6. **Spec review per page** — verify: owner name only on about page, Canadian English, no banned phrases, Google Maps on contact

**Input:** Plan (Phase 6 tasks) + skill packs + design context + brief
**Output:** All inner pages built and rendering
**Gate:** All inner pages render. Contact form submits. Google Maps visible. Owner name only on About.
**Commit:** Inner pages (one commit per page or batched)

### Parallelization:
All 3 inner pages are independent — dispatch all 3 subagents in parallel.

---

## Phase 7 — SEO & LEGAL

**Job:** Add all SEO files and legal pages.

### Sub-steps:
1. **Read** skill packs: `skill-packs/seo.md` + `skill-packs/content.md`
2. **Dispatch subagent** with: SEO + content skill packs, design context, brief, site config
3. **Subagent builds:**
   - `src/app/robots.ts` — sitemap URL, standard crawl rules
   - `src/app/sitemap.ts` — all pages with priority values
   - JSON-LD `LocalBusiness` schema in `layout.tsx` (if not already wired in Phase 2)
   - `src/app/opengraph-image.tsx` — 1200x630, palette colours (hex for Satori), business name + tagline
   - `public/llms.txt` — LLM-friendly site description
   - `src/app/privacy/page.tsx` — PIPEDA-compliant privacy policy
   - `src/app/terms/page.tsx` — basic service business terms
4. **Verify:** Privacy and Terms linked from Footer (should be wired in Phase 4)
5. **Verify:** OG image uses correct palette (hex, not oklch — Satori limitation)

**Input:** Plan (Phase 7 tasks) + skill packs + site config + brief
**Output:** All SEO files + legal pages
**Gate:** robots.ts, sitemap.ts, OG image, privacy, terms all exist. Legal pages linked from footer.
**Commit:** SEO and legal pages

---

## Phase 8 — QA

**Job:** Run all automated checks, perform visual review, verify brief compliance.

### Sub-steps:
1. **Run** `scripts/qa.sh <project-dir>` — automated checks:
   - Build passes (`npm run build`)
   - No `transition-all` in source
   - No banned copy phrases
   - Required files exist (robots, sitemap, privacy, terms, OG image)
   - No placehold.co URLs
   - Canadian English check
   - DaisyUI 5 syntax (not v4)
   - Brief has all required fields
   - Owner name not leaked outside About page
   - No generic headings
   - Lighthouse scores (target 90+)
   - Screenshots at 375px, 768px, 1024px, 1440px
   - Registry entry exists
   - Signature moves present in code
   - No emoji icons in JSX
   - Layout variety check
   - Profile/typography classes used
   - Colour hygiene (OKLCH format)
   - WCAG contrast validation
2. **Fix any failures** — edit code, re-run qa.sh
3. **Repeat** until qa.sh passes all checks
4. **Visual review** — walk through every item in `.claude/workflows/visual-review-checklist.md`:
   - Responsive at 375px, 768px, 1024px, 1440px, 1920px
   - No broken layout or overflow
   - Animations working
   - Images loading
   - Signature moves visible
   - Profile classes rendering correctly
5. **Brief compliance** — compare site output against brief's Design Decisions:
   - Hero matches described concept
   - Section order matches
   - Signature moves implemented
   - Colour palette applied correctly
   - Typography matches

**Input:** Complete project
**Output:** QA report + screenshots + fixes applied
**Gate:** qa.sh passes ALL checks. Visual checklist passes ALL items. Brief compliance confirmed.
**Commit:** QA fixes (if any)

---

## Phase 9 — DEPLOY

**Job:** Production build, push to GitHub, update registry.

### Sub-steps:
1. **Invoke** `superpowers:finishing-a-development-branch`
2. **Production build:** `npm run build` (final verification)
3. **Git push** to GitHub:
   ```bash
   GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' git push
   ```
4. **Update registry.json** — add new site entry with all fields (slug, business, trade, location, archetype, palette, hero, signatureMoves, fonts, sectionOrder, animationPatterns, repo, date, status, theme, innerPageLayouts)
5. **Validate registry** against schema at `.claude/workflows/registry-schema.md`
6. **Commit** registry update + push
7. **Save build learnings** to memory (if any new patterns discovered)

**Input:** QA-passed project
**Output:** Code on GitHub + registry updated
**Gate:** Registry valid. Push succeeded. Status set to "built".
**Commit:** Registry update

---

## Design Context Injection

Subagents can't invoke skills. The belt provides them with context layers:

### Layer 0: Pre-Built Assets (set up in Phase 2)

These exist in the project BEFORE any subagent runs (Phase 4+). Subagents import and use them — they don't build them.

| Asset | Location | Purpose |
|-------|----------|---------|
| Profile CSS | `src/styles/profile.css` | Structural shape language (card tiers, badges, buttons, dividers, section backgrounds) |
| Typography CSS | `src/styles/typography.css` | Fluid type scale (clamp values), section density classes |
| Colour tokens CSS | `src/styles/colour-tokens.css` | Expanded 13-token colour system with gradient presets |
| Effect components | `src/components/effects/` | WaveDivider, GradientSweep, RingBorder, TracePath, GlowCursor, ParticleField |
| Layout templates | `src/components/layouts/` | 8 section layout shells (BentoGrid, Zigzag, FullBleed, StatsBar, etc.) |
| Lucide icons | `lucide-react` package | Trade-specific icons (see icon-mappings.md) |

### Layer 1: Skill Packs (generic, shared across all builds)

| Task Type | Skill Pack File | Used in Phase |
|-----------|----------------|---------------|
| Structural (Header, Footer, Motion.tsx) | `skill-packs/structural.md` | 4 |
| UI/Sections (homepage sections, theme) | `skill-packs/theme-and-ui.md` | 5, 6 |
| Content (pages, copy, blog, legal) | `skill-packs/content.md` | 5, 6, 7 |
| SEO (robots, sitemap, JSON-LD, OG) | `skill-packs/seo.md` | 7 |

### Layer 2: Per-Build Design Context (unique to THIS site)

Generated in Phase 3 using the template at `.claude/workflows/design-context-template.md`. This document includes:
- Palette tokens with usage guidance
- Typography character descriptions
- Visual language and mood (from brief)
- Signature effect code sketches (from `signature-implementations.md`)
- Layout rules specific to this build
- Anti-patterns ("this site must NOT...")
- What components already exist (Reveal, StaggerGroup, archetype.css)

### Layer 3: Brief Design Sections (site personality)

Extract the **Brand Direction** and **Design Decisions** sections from the brief at `.claude/briefs/<slug>-brief.md` and include them verbatim in every subagent prompt.

### How to inject (every subagent prompt in Phases 4-7 must include ALL of these):
1. Read the relevant skill pack file: `Read .claude/workflows/skill-packs/<pack>.md`
2. Read the brief file: `Read .claude/briefs/<slug>-brief.md` — extract Brand Direction + Design Decisions
3. Read or reference the design context document (generated once in Phase 3)
4. If the task references a signature move, read `signature-implementations.md` for the code sketch
5. Include ALL of the above in the subagent's prompt — skill pack first, then design context, then brief sections, then task
6. Never summarize or condense — the subagent needs the full context

### Example Subagent Prompt Structure:
```
## Technical Patterns (Skill Pack)
[Full content of theme-and-ui.md]

## Design Context for This Build
[Generated design context document]

## Brand Direction (from Brief)
[Brand Direction section from brief]

## Design Decisions (from Brief)
[Design Decisions section from brief]

## Signature Move Implementation
[Code sketch from signature-implementations.md, if applicable]

## Your Task
[Full task text from the plan, including layout spec, anti-pattern, and acceptance criteria]
```

## Differentiation Workflow

During Phase 0 (Intake), before the brief is finalized:
1. Read `registry.json` — note last 3 archetypes, last 2 heroes, last 3 signature moves
2. Read `concept-library.md` — pick from the correct colour family rotation
3. Read `section-orders.md` — pick a section order not used recently
4. Read `animation-library.md` — assign varied animation types
5. Read `differentiation.md` — verify all rules pass
6. Record ALL choices in the brief and later in the registry entry

## Task Specification Requirements

Every plan task for a homepage section or inner page MUST include all of these fields. Tasks that only specify "build X component" without layout and visual constraints will produce generic output.

### Required Fields Per Task:

1. **Component name and file path** — e.g., `src/components/home/ServicesSection.tsx`
2. **Layout structure** — explicit, not vague:
   - GOOD: "Asymmetric 7/5 grid with image bleeding left, text stack right-aligned"
   - GOOD: "Alternating zigzag — odd rows: image left/text right, even rows: reversed"
   - GOOD: "Full-bleed hero with text in lower-left quadrant, not centered"
   - BAD: "Build the services section" (no layout guidance)
   - BAD: "Create a grid of cards" (invites generic 3-column grid)
3. **Animation assignment** — entrance animation + stagger pattern from the brief:
   - e.g., "Entrance: slide-left/slide-right alternating. No stagger (sequential items, not grid)."
4. **Anti-pattern** — what this section must NOT look like:
   - e.g., "Do NOT center the heading with a symmetrical 3-column card grid below it."
   - e.g., "Do NOT use the same layout as the section above (fleet showcase uses a grid — this must NOT)."
5. **Responsive behaviour** — how layout changes:
   - e.g., "Desktop: 7/5 grid. Tablet: stack to single column, image on top. Mobile: same as tablet, reduce padding."
6. **Acceptance criteria** — what makes this section "done" visually:
   - e.g., "Cards must have visible hover effect. Background gradient must be perceptible. Layout must feel different from the previous section."

### Layout Variety Rule:

After writing ALL plan tasks, self-review the set:
- If more than 2 homepage sections use centered symmetrical layouts → revise at least one to use asymmetric, offset, or alternating structure
- If more than 2 sections use card grids → revise at least one to use a different pattern (zigzag, bento, timeline, etc.)

## Anti-Sameness Guard (Plan Self-Review)

Before the plan is approved in Phase 3, verify ALL of the following:

- [ ] **Layout count:** No more than 2 sections use centered symmetrical layouts
- [ ] **Grid count:** No more than 2 sections use card grids
- [ ] **Asymmetry present:** At least 1 section uses an asymmetric or unconventional layout
- [ ] **Animation variety:** No more than 2 sections share the same entrance animation type
- [ ] **Intentional stillness:** At least 1 section has animation: none
- [ ] **Spacing variety:** Not all sections use the same vertical padding (vary between py-16, py-20, py-24, py-28)
- [ ] **No repeat dividers:** If using section dividers, at least 2 different divider treatments exist
- [ ] **Signature moves assigned:** Each signature move from the brief is assigned to a specific section/component

If any check fails, revise the plan before proceeding to Phase 4.

## Phase Inputs and Outputs

| Phase | Name | Input | Output | Gate |
|-------|------|-------|--------|------|
| 0 | Intake | User conversation | Brief file | Brief exists, all fields filled, user confirms |
| 1 | Scaffold | Brief | Working project + GitHub repo | `npm run dev` passes |
| 2 | Design System | Brief + palette params | CSS/theme files in project | Design system renders, dev still passes |
| 3 | Plan | Brief + design context template | PLAN.md + design context doc | Plan saved, self-review passed |
| 4 | Structure | Plan Phase 4 tasks | Header, Footer, Reveal | Shell renders, nav works, mobile menu works |
| 5 | Homepage | Plan Phase 5 tasks | All homepage sections | Coherence review passed, page renders |
| 6 | Inner Pages | Plan Phase 6 tasks | Services, About, Contact | All pages render, form works, Maps visible |
| 7 | SEO & Legal | Plan Phase 7 tasks | robots, sitemap, OG, privacy, terms | All files exist, legal linked from footer |
| 8 | QA | Complete project | QA report + fixes | qa.sh passes, visual checklist passes |
| 9 | Deploy | QA-passed project | Code pushed + registry updated | Registry valid, push succeeded |

## Superpowers Mode Selection

### Full Mode (Quality)
- **When:** Single site, quality matters, time unconstrained
- **Phases 4-7:** One subagent per task, two-stage review (spec + code quality)
- **Time:** ~30-45 min

### Lite Mode (Speed)
- **When:** Multiple sites, time-constrained, simple builds
- **Phases 4-7:** 2-5 related tasks batched per subagent, spec review only
- **Time:** ~10-15 min

### Non-Negotiable in Both Modes:
1. Brief MUST be saved to file (`.claude/briefs/<slug>-brief.md`)
2. Skill packs MUST be injected into every subagent prompt
3. `scripts/qa.sh` MUST pass before deploy
4. Registry MUST be updated and validated
5. Operator MUST visually review the site before pushing

## Parallel Build Opportunities

| Phases | Can parallelize? | How |
|--------|-----------------|-----|
| 4 → 5 | Sequential | Structure must exist before homepage sections |
| 5 sections | Yes | Independent homepage sections in parallel (see Phase 5 batching) |
| 6 pages | Yes | All 3 inner pages are independent |
| 5 + 7 | Partial | SEO/legal can start once layout.tsx exists (Phase 2), but OG image benefits from seeing final palette usage |
| 8 → 9 | Sequential | QA must pass before deploy |

## Resuming a Build

If a project exists at `projects/<slug>/`:
1. Read the brief at `.claude/briefs/<slug>-brief.md`
2. Check plan file for task progress
3. Check `git log --oneline` to identify last completed phase
4. Resume from the next uncompleted phase

### Phase Detection from Git History:
- Has brief commit → Phase 0 complete
- Has scaffold commit → Phase 1 complete
- Has "design system" commit → Phase 2 complete
- Has plan commit → Phase 3 complete
- Has "structure" or "header/footer" commit → Phase 4 complete
- Has "homepage" or section commits → Phase 5 complete (check if all sections present)
- Has inner page commits → Phase 6 complete
- Has "SEO" or "legal" commit → Phase 7 complete
- Has "QA fixes" commit → Phase 8 complete
- Registry updated → Phase 9 complete

## Error Handling

- **Subagent uses DaisyUI 4 syntax:** The skill pack wasn't injected. Re-dispatch with theme-and-ui.md pack.
- **Build fails with CSS errors:** Check globals.css for correct `@plugin "daisyui/theme"` syntax.
- **Spec review fails:** Re-dispatch implementer with specific feedback.
- **Review loop exceeds 3 iterations:** Escalate to user.
- **qa.sh fails:** Fix the specific failures, re-run until pass.
- **Build fails at deploy:** Route back to Phase 8.

## Registry

`registry.json` tracks every completed build. Schema defined in `.claude/workflows/registry-schema.md`. Validated before committing in Phase 9. Read before design in Phase 0 for differentiation.
