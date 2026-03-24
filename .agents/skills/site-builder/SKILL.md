---
name: site-builder
description: Assembly line orchestrator for building Next.js websites. Invoke when the user wants to build a new site, start a project, run a specific phase, or check build status. Manages the conveyor belt that moves projects through specialized station agents. Now powered by Superpowers for plan-driven, review-gated builds.
---

# Site Builder — Conveyor Belt Orchestrator (Superpowers Edition)

You are the conveyor belt. You move projects through specialized stations, managing handoffs and validating gates between each one. **Superpowers** provides the execution methodology: structured plans, per-task subagent dispatch, and two-stage review (spec compliance + code quality).

## When to Invoke

- User says "build a site", "new site", "new project", or "start a build"
- User wants to run a specific station/phase
- User wants to resume or continue an in-progress build
- User wants to check what's been built (read registry.json)
- User wants to make changes to an existing site (route to Maintainer)

## The Assembly Line

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐    ┌────┐    ┌──────────┐
│ INTAKE   │───▸│ SCAFFOLD │───▸│ DESIGNER │───▸│ BUILDER │───▸│ QA │───▸│ DEPLOYER │
│ Phase 0  │    │ Phase 1  │    │ Phase 2  │    │ Phase 3 │    │    │    │ Phase 4  │
└─────────┘    └──────────┘    └──────────┘    └─────────┘    └────┘    └──────────┘
     │                                                                        │
     │              ┌────────────┐                                            │
     │              │ MAINTAINER │◂───────────── (post-launch) ───────────────│
     │              │ Phase 5    │                                            │
     │              └────────────┘                                            │
     ▾                                                                        ▾
  User confirms                                                        registry.json
  vibe brief                                                           updated
```

## Superpowers Integration

Superpowers skills are invoked alongside our pipeline skills. They provide the **methodology** (how to plan, execute, and review), while our skills provide the **domain knowledge** (how to build Next.js sites with DaisyUI, Framer Motion, etc.).

### How Superpowers Maps to Our Phases

| Pipeline Phase | Superpowers Skill | What It Does |
|----------------|-------------------|-------------|
| Phase 0 (Intake) | `superpowers:brainstorming` | Socratic refinement of the brief — asks questions, explores alternatives, presents design in digestible chunks |
| Phase 1 (Scaffold) | `superpowers:using-git-worktrees` | Creates isolated workspace on a new branch for the build |
| Phase 2 (Design) | `superpowers:writing-plans` | Creates detailed implementation plan with exact files, code, and verification steps |
| Phase 2-3 (Build) | `superpowers:subagent-driven-development` | Dispatches fresh subagent per task with two-stage review |
| Per task | `superpowers:requesting-code-review` | Spec compliance review, then code quality review after each task |
| Phase 4 (QA) | `superpowers:verification-before-completion` | Systematic verification that everything actually works |
| Phase 4 (Deploy) | `superpowers:finishing-a-development-branch` | Verify tests → present options → merge/PR → cleanup |

### The New Build Flow

```
Phase 0 — INTAKE + BRAINSTORMING
  ├── Invoke: superpowers:brainstorming
  ├── Refine brief through Socratic questioning
  ├── Present design in digestible sections for validation
  └── Save brief to .claude/briefs/<slug>-brief.md
  Gate: User confirms brief

Phase 0.5 — DOMAIN/HOSTING (manual checklist)

Phase 1 — SCAFFOLD + WORKTREE
  ├── Invoke: superpowers:using-git-worktrees
  ├── Invoke: nextjs-app-router-patterns, nextjs-best-practices
  ├── Create project, install deps, create GitHub repo
  └── Verify clean workspace
  Gate: npm run dev passes

Phase 2 — DESIGN + PLAN
  ├── Invoke: frontend-design, color-palette
  ├── Read registry.json for differentiation
  ├── Make design decisions (archetype, palette, fonts, hero, signature moves)
  ├── Invoke: superpowers:writing-plans
  ├── Write implementation plan with EXACT file paths, code, and verification steps
  ├── Plan covers: Motion.tsx, Header, Footer, all sections, all pages, SEO, theme
  ├── Each task is 2-5 minutes, bite-sized, independently verifiable
  └── Plan reviewed by plan-document-reviewer subagent
  Gate: Plan approved
  Save plan to: docs/superpowers/plans/<date>-<slug>.md

Phase 2-3 — BUILD (Subagent-Driven Development)
  ├── Invoke: superpowers:subagent-driven-development
  ├── For EACH task in the plan:
  │   ├── Dispatch implementer subagent with:
  │   │   ├── Full task text (don't make subagent read plan)
  │   │   ├── Relevant skill knowledge injected into prompt
  │   │   ├── Context about where this fits in the build
  │   │   └── Working directory
  │   ├── Implementer builds + tests + commits + self-reviews
  │   ├── Dispatch spec reviewer subagent
  │   │   └── Verifies code matches spec (nothing missing, nothing extra)
  │   ├── Dispatch code quality reviewer subagent
  │   │   └── Verifies code is clean, tested, maintainable
  │   └── Mark task complete
  ├── Skills injected into implementer prompts per task:
  │   ├── Structural shell tasks: framer-motion-animator, responsive-design
  │   ├── Homepage section tasks: daisyui, tailwind-design-system, frontend-design
  │   ├── Content page tasks: frontend-design, web-accessibility, landing-page
  │   ├── SEO tasks: seo-local-business, performance
  │   └── Theme task: tailwind-theme-builder
  └── After all tasks: dispatch final code reviewer for entire implementation
  Gate: All tasks pass both reviews

Phase 4 — QA + VERIFICATION
  ├── Invoke: superpowers:verification-before-completion
  ├── Invoke: web-accessibility, performance, core-web-vitals, ux-audit
  ├── Run npm run build
  ├── Check: a11y, performance, Canadian English, banned phrases
  ├── Fix any issues found
  └── Verify fixes
  Gate: Zero critical issues, build passes

Phase 4 — DEPLOY + FINISH
  ├── Invoke: superpowers:finishing-a-development-branch
  ├── Git push to GitHub
  ├── Update registry.json
  └── Present options: merge, PR, keep, discard
  Gate: Registry updated, build pushed
```

## Skill Injection for Subagents

Since subagents can't invoke skills directly, the belt INJECTS skill knowledge into each implementer's prompt. The key knowledge to inject per task type:

### For structural components (Header, Footer, Motion.tsx):
```
Inject from framer-motion-animator:
- useInView + spring reveals
- useReducedMotion for all animations
- AnimatePresence for exit animations
- Spring physics: { type: "spring", stiffness: 300, damping: 24 }

Inject from responsive-design:
- Mobile-first (base styles = mobile)
- Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px
```

### For homepage sections:
```
Inject from frontend-design:
- Bold aesthetic direction, not generic
- Unexpected layouts, asymmetry, overlap
- Grain textures, gradient meshes, atmospheric backgrounds
- One well-orchestrated animation per section

Inject from daisyui:
- DaisyUI 5 syntax: @plugin "daisyui/theme" { name: "..."; ... }
- Semantic classes: bg-primary, text-base-content, etc.
- Custom themes with OKLCH colours

Inject from tailwind-design-system:
- @import "tailwindcss" (not @tailwind)
- @theme inline { } for custom tokens
- OKLCH colour values
```

### For content pages:
```
Inject from web-accessibility:
- Semantic HTML (nav, main, article, section)
- Proper heading hierarchy
- Focus-visible styles
- ARIA labels where needed

Inject from landing-page:
- Section composition patterns
- CTA placement and copy patterns
```

### For SEO files:
```
Inject from seo-local-business:
- LocalBusiness JSON-LD schema
- robots.ts allowing all crawlers
- sitemap.ts with all pages
- OG image generation
```

## Station Registry

| # | Station | Agent | Input | Output | Gate |
|---|---------|-------|-------|--------|------|
| 1 | Intake | `.claude/agents/intake/` | User conversation | Vibe brief | User confirms brief |
| 2 | Scaffold | `.claude/agents/scaffold/` | Confirmed brief | Working project + GitHub repo | `npm run dev` passes |
| 3 | Designer | `.claude/agents/designer/` | Scaffolded project + brief + registry | Implementation plan + design decisions | Plan reviewed + approved |
| 4 | Builder | `.claude/agents/builder/` | Plan | All files built via subagent-driven-development | All tasks pass two-stage review |
| 5 | QA | `.claude/agents/qa/` | Complete project | Fixes + QA report | Zero critical issues, build passes |
| 6 | Deployer | `.claude/agents/deployer/` | QA-passed project | Production build pushed + registry updated | Build succeeds, registry updated |
| 7 | Maintainer | `.claude/agents/maintainer/` | Existing project + change request | Updated project pushed | Change works, no regressions |

## The Belt's Job

### Before Each Station
1. **Verify the previous station's gate passed.**
2. **Prepare context.** Tell the station agent what it needs from upstream.
3. **Inject relevant skill knowledge** into the station's prompt.

### After Each Station
1. **Validate the gate.**
2. **If gate fails:** Send back with specific feedback.
3. **If gate passes:** Move to the next station.

### Between Stations (The Belt's Value)
- **Before Intake:** Read `registry.json` for differentiation awareness.
- **Before Designer:** Summarize brief + differentiation constraints + pass to writing-plans.
- **Before Builder:** The plan IS the handoff — full task list with exact code.
- **Before QA:** List what was built so QA knows where to focus.
- **Before Deployer:** Confirm QA passed, summarize for registry.

## Parallel Builds

For parallel builds (multiple sites at once), use `superpowers:dispatching-parallel-agents`:
- Each site is an independent domain (no shared state)
- Dispatch one agent per site with the full plan
- Review and integrate results
- Skip two-stage review for speed (audit manually instead)

## Skills — Phase-Specific Invocation

| Phase | Pipeline Skills | Superpowers Skills |
|-------|----------------|-------------------|
| 0 Intake | — | `superpowers:brainstorming` |
| 1 Scaffold | `nextjs-app-router-patterns`, `nextjs-best-practices` | `superpowers:using-git-worktrees` |
| 2 Design + Plan | `frontend-design`, `color-palette` | `superpowers:writing-plans` |
| 2-3 Build | `framer-motion-animator`, `responsive-design`, `daisyui`, `tailwind-design-system`, `frontend-design`, `web-accessibility`, `landing-page`, `seo-local-business`, `performance`, `tailwind-theme-builder` | `superpowers:subagent-driven-development`, `superpowers:requesting-code-review` |
| 4 QA | `web-accessibility`, `performance`, `core-web-vitals`, `ux-audit` | `superpowers:verification-before-completion` |
| 4 Deploy | — | `superpowers:finishing-a-development-branch` |

## Resuming a Build

If a project exists at `projects/<slug>/`:
1. Check plan file at `docs/superpowers/plans/` for task progress
2. Check `git log --oneline` to identify last completed task
3. Resume from the next uncompleted task via subagent-driven-development

## Error Handling

- **Task implementer reports BLOCKED:** Provide more context and re-dispatch, or escalate to user
- **Task implementer reports NEEDS_CONTEXT:** Provide missing info and re-dispatch
- **Spec review fails:** Implementer fixes, spec reviewer re-reviews
- **Code quality review fails:** Implementer fixes, quality reviewer re-reviews
- **Review loop exceeds 3 iterations:** Escalate to user
- **Build fails at deploy:** Route back to QA

## Registry

`registry.json` tracks every completed build. Updated by the Deployer. Read by the Designer for differentiation.
