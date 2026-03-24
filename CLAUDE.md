# Base — Website Assembly Line (Superpowers Edition)

This workspace builds Next.js websites for Canadian trades businesses using an assembly line of specialized AI agents, powered by **Superpowers** for plan-driven, review-gated execution. Each phase does one job well, and the conveyor belt moves projects through them.

## Architecture

```
INTAKE → SCAFFOLD → DESIGN SYSTEM → PLAN → STRUCTURE → HOMEPAGE → INNER PAGES → SEO & LEGAL → QA → DEPLOY
  0         1            2            3        4           5           6              7           8      9
```

- **Conveyor Belt:** `.agents/skills/site-builder/SKILL.md` — orchestrates the line
- **Station Agents (planned):** `.claude/agents/_future/<station>/agent.md` — aspirational per-station agents (not yet operational)
- **Skill Packs:** `.claude/workflows/skill-packs/` — condensed knowledge injected into subagent prompts
- **Workflows:** `.claude/workflows/` — shared rules (copywriting, differentiation, section orders, animation library)
- **Registry:** `registry.json` — tracks every site built for differentiation
- **Superpowers:** Plugin providing plan-driven methodology, subagent dispatch, two-stage review

## Phases

| Phase | Name | Does what | Runs in |
|-------|------|-----------|---------|
| 0 | Intake | Interviews user, produces vibe brief | Main conversation |
| 1 | Scaffold | Creates repo, installs deps, wires site config | Main conversation |
| 2 | Design System | Generates palette, archetype CSS, profile, globals, layout.tsx | Main conversation |
| 3 | Plan | Writes design context doc + implementation plan + self-review | Main conversation |
| 4 | Structure | Header, Footer, Reveal/Motion, effect components, layout templates | Subagent |
| 5 | Homepage | All homepage sections + coherence review | Subagent(s) |
| 6 | Inner Pages | Services, About, Contact pages | Subagent(s) |
| 7 | SEO & Legal | robots, sitemap, JSON-LD, OG image, privacy, terms, llms.txt | Subagent |
| 8 | QA | Automated qa.sh + visual review + brief compliance | Main conversation |
| 9 | Deploy | Production build, push, update registry | Main conversation |

**Current workflow:** Phases 0-3 run in the main conversation. Phases 4-7 dispatch subagents with skill packs injected. Phases 8-9 run in the main conversation.

**Planned station agents** live at `.claude/agents/_future/` — they represent the target multi-agent architecture but are not yet operational.

Phase 0.5 (domain/hosting) is a manual checklist: `.claude/workflows/phase-0.5-checklist.md`

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + DaisyUI 5
- **Animation:** Framer Motion
- **Blog:** Markdown in `content/blog/` with gray-matter + remark (SSG + ISR)
- **Email:** Resend API (contact form API route in template)
- **OG Images:** Next.js `opengraph-image.tsx` route convention
- **Hosting:** Namecheap Nebula (cPanel with Node.js — ISR works)
- **No DB, no auth, no CMS**

## Project Creation

Each new site is scaffolded fresh with `create-next-app` (no shared template). The scaffold phase installs deps, creates a GitHub repo, and wires `config/site.ts`.

## Superpowers Integration

Superpowers (plugin) provides the **execution methodology** — structured plans, per-task subagent dispatch, and two-stage review. Our pipeline skills provide the **domain knowledge** — how to build beautiful trades websites.

### Superpowers Workflow per Build

| Step | Superpowers Skill | What It Does |
|------|-------------------|-------------|
| Brief refinement | `superpowers:brainstorming` | Socratic questioning, design in digestible chunks |
| Workspace isolation | `superpowers:using-git-worktrees` | Isolated branch for the build |
| Implementation plan | `superpowers:writing-plans` | Exact files, exact code, 2-5 min tasks, verification steps |
| Build execution | `superpowers:subagent-driven-development` | Fresh subagent per task + two-stage review |
| Per-task review | `superpowers:requesting-code-review` | Stage 1: spec compliance. Stage 2: code quality |
| Final verification | `superpowers:verification-before-completion` | Systematic check everything works |
| Branch completion | `superpowers:finishing-a-development-branch` | Verify → merge/PR → cleanup |

### How Subagents Get Skill Knowledge

Subagents can't invoke skills (skills live in main conversation). The belt **injects** relevant skill knowledge from **skill packs** (`.claude/workflows/skill-packs/`) into each implementer prompt:
- Structural tasks get: `skill-packs/structural.md`
- Section/UI tasks get: `skill-packs/theme-and-ui.md`
- Content tasks get: `skill-packs/content.md`
- SEO tasks get: `skill-packs/seo.md`

Each skill pack is a condensed, copy-pasteable block of critical knowledge extracted from the full skills. This replaces manual copy-pasting of skill knowledge into prompts.

## Skills — How They're Used

Skills are invoked in the **main conversation** at the start of each phase. Subagents receive **skill packs** (condensed knowledge) injected into their prompts.

| Phase | Name | Main Conversation Skills | Subagent Injection |
|-------|------|-------------------------|-------------------|
| 0 | Intake | `superpowers:brainstorming` | — |
| 1 | Scaffold | `nextjs-app-router-patterns`, `superpowers:using-git-worktrees` | — |
| 2 | Design System | `frontend-design`, `color-palette` | — |
| 3 | Plan | `superpowers:writing-plans` | — |
| 4 | Structure | `superpowers:subagent-driven-development` | `skill-packs/structural.md` |
| 5 | Homepage | `superpowers:subagent-driven-development` | `skill-packs/theme-and-ui.md` + `skill-packs/content.md` |
| 6 | Inner Pages | `superpowers:subagent-driven-development` | `skill-packs/theme-and-ui.md` + `skill-packs/content.md` |
| 7 | SEO & Legal | `superpowers:subagent-driven-development` | `skill-packs/seo.md` + `skill-packs/content.md` |
| 8 | QA | `superpowers:verification-before-completion` | — |
| 9 | Deploy | `superpowers:finishing-a-development-branch` | — |

Skill packs live at `.claude/workflows/skill-packs/`. They contain the critical patterns from full skills in a format that can be directly injected into subagent prompts.

## Key Rules

1. **Registry before Design System.** Read `registry.json` before Phase 2. No duplicate archetype/palette/hero within last 3 builds.
2. **Discovery is mandatory.** Never skip Intake. The brief drives everything downstream.
3. **Brief-as-file is mandatory.** Every build MUST save a brief to `.claude/briefs/<slug>-brief.md` using the template before any code is written. No brief file = no build.
4. **Mobile-first responsive.** Base = mobile, scale up. Test at 375px, 768px, 1024px, 1440px, 1920px.
5. **Canadian English.** Colour, centre, metre, neighbour. See `copywriting.md`.
6. **No AI-sounding copy.** Banned phrases in `copywriting.md`. Write like a human.
7. **Vary section order.** Don't use the same homepage section order as the last 3 builds. Consult `.claude/workflows/section-orders.md`.
8. **Vary animations.** Assign specific animation types per section — don't default everything to fade-up Reveal. Consult `.claude/workflows/animation-library.md`.
9. **Read before editing.** Never modify unread code.
10. **No `transition-all`.** Specific transition properties only.
11. **Framer Motion for animations.** Varied and purposeful, not uniform reveals.
12. **Git is the state system.** Each phase commits. Recovery = git log + git pull.
13. **Beautiful, not generic.** Every site needs 1-2 signature design moves. Consult `.claude/workflows/concept-library.md`.
14. **Performance matters.** Target Lighthouse 90+ across all categories.
15. **QA gate before deploy.** Run `scripts/qa.sh` before every deploy. Build must pass all automated checks.
16. **Inject skill packs + design context into subagents.** Every subagent prompt must include: skill pack, design context document, and brief's Brand Direction + Design Decisions sections.
17. **Design system is Phase 2.** Phase 2 configures colour-tokens.css, creates archetype.css, copies profile + typography, and wires globals.css + layout.tsx. This runs BEFORE any build subagents. See `design-system-task-template.md`.
18. **Layout specs in plans.** Every plan task must specify layout structure, anti-pattern, responsive behaviour, and acceptance criteria. No vague "build X section" tasks.
19. **Coherence review after Phase 5.** After all homepage sections are built, run the coherence review prompt to check layout variety, spacing rhythm, and animation correctness.
20. **Visual review checklist before deploy.** Walk through every item in `visual-review-checklist.md` — not optional.
21. **Signature moves must be visible.** Gradients on dark backgrounds: minimum 0.15 opacity. Hover effects: minimum via-white/10. If an effect is technically present but invisible, it doesn't count.
22. **No placehold.co.** Use curated Unsplash URLs from `placeholder-images.md` instead of solid-colour rectangles.
23. **No emoji icons.** Use Lucide React for all icons. Consult `.claude/workflows/icon-mappings.md` for trade-specific icon names.
24. **Use profile card tiers.** `.card-featured`, `.card-standard`, `.card-compact` — NEVER `.card-archetype` (deprecated).
25. **Use type classes.** `.type-hero`, `.type-section`, `.type-card`, `.type-body` — NOT hardcoded `text-4xl md:text-7xl`.
26. **Use layout templates.** Import from `src/components/layouts/` — NOT ad-hoc grid structures for every section.
27. **Use effect components for signature moves.** Import from `src/components/effects/` — NOT hand-built from code sketches.
28. **Brand-to-visual mapping.** Consult `.claude/workflows/brand-to-visual.md` to turn brief mood words into specific design tokens (animation speed, heading weight, spacing density, border treatment).
29. **Profile per colour family.** Copy the correct profile-{warm,cool,earth,bold}.css during build setup. Each family has structurally different shapes.

## Rendering Strategy

- **Pages:** SSG — fully static at build time
- **Blog posts:** SSG + ISR — `revalidate: 3600`
- **Contact form:** Server-side API route (Node.js on cPanel)

## Responsive Breakpoints

```
Mobile:  < 640px   (base styles)
Tablet:  640-1023px (sm: and md:)
Laptop:  1024-1279px (lg:)
Desktop: 1280px+    (xl: and 2xl:)
```

## File Locations

- **Projects:** `projects/<slug>/`
- **Briefs:** `.claude/briefs/<slug>-brief.md` (MANDATORY — every build must save a brief file before code)
- **Brief template:** `.claude/workflows/brief-template.md`
- **Registry:** `registry.json`
- **Registry schema:** `.claude/workflows/registry-schema.md`
- **Planned station agents:** `.claude/agents/_future/<station>/agent.md`
- **Skill packs:** `.claude/workflows/skill-packs/`
- **Workflows:** `.claude/workflows/`
- **Signature implementations:** `.claude/workflows/signature-implementations.md`
- **Design context template:** `.claude/workflows/design-context-template.md`
- **Design system task template:** `.claude/workflows/design-system-task-template.md`
- **Visual review checklist:** `.claude/workflows/visual-review-checklist.md`
- **Coherence review prompt:** `.claude/workflows/coherence-review-prompt.md`
- **Placeholder images:** `.claude/workflows/placeholder-images.md`
- **Boilerplate templates:** `templates/`
- **Archetype profiles:** `templates/styles/profile-{warm,cool,earth,bold}.css`
- **Typography system:** `templates/styles/typography.css`
- **Colour token template:** `templates/styles/colour-tokens.css`
- **Effect components:** `templates/components/effects/` (WaveDivider, GradientSweep, RingBorder, TracePath, GlowCursor, ParticleField)
- **Layout templates:** `templates/layouts/` (8 section shells: BentoGrid, Zigzag, FullBleed, StatsBar, etc.)
- **Icon mappings:** `.claude/workflows/icon-mappings.md`
- **Brand-to-visual mapping:** `.claude/workflows/brand-to-visual.md`
- **QA script:** `scripts/qa.sh`
- **Screenshot capture:** `scripts/screenshots.sh`
- **Scaffold script:** `scripts/scaffold.sh`

## Git & GitHub

- GitHub: `OnlineApprentice1`
- SSH: `GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes'`
- `gh repo create` for new repos
- Phase 9 commits `.next/` build output (excluding `node_modules/`)

## Content Rules

- Canadian English throughout (see `copywriting.md`)
- Owner name: **About page only**. Everywhere else: "we", "our team", business name.
- Every section needs an image — use curated Unsplash URLs from `placeholder-images.md` (NOT `placehold.co`). User swaps in real images.
- User is the co-builder, not the client.
- Claude generates all copy following `copywriting.md` rules.

## Anti-Generic Design Rules

- No default DaisyUI theme without customization
- No centred-text-over-stock-photo heroes (unless real photos)
- No symmetrical 3-column service grids (use layout templates: BentoGrid, Zigzag, OffsetGrid)
- Subtle, purposeful shadows — not on every card
- Typography: use fluid type classes (type-hero, type-section, etc.) — NOT hardcoded text-4xl
- Unique accent colour per site — check registry
- No emoji icons — use Lucide React (consult icon-mappings.md)
- No `.card-archetype` — use profile card tiers: `.card-featured`, `.card-standard`, `.card-compact`
- Vary container widths across sections (not all max-w-7xl)
- Vary section density: mix section-spacious, section-standard, section-compact
- Use at least 3 different section-bg-* backgrounds per homepage
- Use effect components for signature moves (not hand-built from scratch)
- Google Maps embed on every contact page
- Dynamic OG image matching palette and archetype

## Analytics (Optional — Not Enforced)

Google Analytics and Search Console should be hooked up post-launch. Not part of the pipeline build.
- GA4: add measurement ID to `app/layout.tsx` when ready
- Search Console: verify via DNS or HTML file during Phase 0.5

## Legal Pages

Every site must include:
- **Privacy Policy** (`app/privacy/page.tsx`) — PIPEDA compliance, update with business name
- **Terms of Service** (`app/terms/page.tsx`) — basic service business terms
- Both linked from footer
