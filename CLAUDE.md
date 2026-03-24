# Base — Website Assembly Line (Superpowers Edition)

This workspace builds Next.js websites for Canadian trades businesses using an assembly line of specialized AI agents, powered by **Superpowers** for plan-driven, review-gated execution. Each station does one job well, and the conveyor belt moves projects through them.

## Architecture

```
INTAKE → SCAFFOLD → DESIGNER → BUILDER → QA → DEPLOYER
  │          │          │          │       │        │
brainstorm  worktree  write-plan  subagent-driven  verify  finish-branch
(superpowers methodology layer)
```

- **Conveyor Belt:** `.agents/skills/site-builder/SKILL.md` — orchestrates the line
- **Station Agents:** `.claude/agents/<station>/agent.md` — each station's instructions
- **Workflows:** `.claude/workflows/` — shared rules (copywriting, differentiation)
- **Registry:** `registry.json` — tracks every site built for differentiation
- **Superpowers:** Plugin providing plan-driven methodology, subagent dispatch, two-stage review

## Stations

| Station | Agent | Phase | Does what |
|---------|-------|-------|-----------|
| Intake | `.claude/agents/intake/` | 0 | Interviews user, produces vibe brief |
| Scaffold | `.claude/agents/scaffold/` | 1 | Clones template, creates repo, wires config |
| Designer | `.claude/agents/designer/` | 2 | Archetype, layout, theme, animations, OG image |
| Builder | `.claude/agents/builder/` | 3 | Content, pages, GEO, legal, Google Maps |
| QA | `.claude/agents/qa/` | - | a11y, performance, content check |
| Deployer | `.claude/agents/deployer/` | 4 | Production build, push, update registry |
| Maintainer | `.claude/agents/maintainer/` | 5 | Post-launch changes, blog posts, updates |

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

## Starter Template

GitHub: `OnlineApprentice1/nextjs-starter-template`

Already includes: config/site.ts, Framer Motion components, section components (Hero, TrustBar, ServicesGrid, etc.), Resend API route, blog setup, GEO (robots, sitemap, llms.txt), archetypes, locale en_CA.

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

Subagents can't invoke skills (skills live in main conversation). The belt **injects** relevant skill knowledge into each implementer prompt:
- Structural tasks get: framer-motion-animator + responsive-design patterns
- Section tasks get: frontend-design + daisyui + tailwind-design-system patterns
- Content tasks get: web-accessibility + landing-page patterns
- SEO tasks get: seo-local-business patterns
- Theme task gets: tailwind-theme-builder patterns (DaisyUI 5 @plugin syntax)

## Skills — Phase-Specific Invocation

Invoke the FULL skill (not condensed) at the start of each phase. Each phase gets pipeline skills + superpowers skills.

| Phase | What | Pipeline Skills | Superpowers Skills |
|-------|------|----------------|-------------------|
| 0 | Intake | — | `superpowers:brainstorming` |
| 1 | Scaffold | `nextjs-app-router-patterns`, `nextjs-best-practices` | `superpowers:using-git-worktrees` |
| 2 | Design + Plan | `frontend-design`, `color-palette` | `superpowers:writing-plans` |
| 2-3 | Build (per task) | Injected per task type (see above) | `superpowers:subagent-driven-development` |
| 4 | QA | `web-accessibility`, `performance`, `core-web-vitals`, `ux-audit` | `superpowers:verification-before-completion` |
| 4 | Deploy | — | `superpowers:finishing-a-development-branch` |
| 5 | Maintainer | `ux-audit` | — |

**Do NOT condense skills into a knowledge pack.** Invoke them fully at the right phase.

## Key Rules

1. **Registry before Designer.** Read `registry.json` before Phase 2. No duplicate archetype/palette/hero within last 3 builds.
2. **Discovery is mandatory.** Never skip Intake. The brief drives everything downstream.
3. **Mobile-first responsive.** Base = mobile, scale up. Test at 375px, 768px, 1024px, 1440px, 1920px.
4. **Canadian English.** Colour, centre, metre, neighbour. See `copywriting.md`.
5. **No AI-sounding copy.** Banned phrases in `copywriting.md`. Write like a human.
6. **Stations stay in their lane.** Intake doesn't design. Designer doesn't write content. Builder doesn't redesign. QA doesn't rewrite.
7. **Read before editing.** Never modify unread code.
8. **No `transition-all`.** Specific transition properties only.
9. **Framer Motion for animations.** Subtle reveals, not spectacle.
10. **Git is the state system.** Each station commits + pushes. Recovery = git log + git pull.
11. **Beautiful, not generic.** Every site needs 1-2 signature design moves.
12. **Performance matters.** Target Lighthouse 90+ across all categories.

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
- **Briefs:** `.claude/briefs/<slug>-brief.md`
- **Registry:** `registry.json`
- **Station agents:** `.claude/agents/<station>/agent.md`
- **Workflows:** `.claude/workflows/`

## Git & GitHub

- GitHub: `OnlineApprentice1`
- SSH: `GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes'`
- `gh repo create` for new repos
- Phase 4 commits `.next/` build output (excluding `node_modules/`)

## Content Rules

- Canadian English throughout (see `copywriting.md`)
- Owner name: **About page only**. Everywhere else: "we", "our team", business name.
- Every section needs an image — `placehold.co` as placeholder (user swaps in real images).
- User is the co-builder, not the client.
- Claude generates all copy following `copywriting.md` rules.

## Anti-Generic Design Rules

- No default DaisyUI theme without customization
- No centred-text-over-stock-photo heroes (unless real photos)
- No symmetrical 3-column service grids (vary layout)
- Subtle, purposeful shadows — not on every card
- Typography: intentional size hierarchy
- Unique accent colour per site — check registry
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
