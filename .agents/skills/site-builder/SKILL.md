---
name: site-builder
description: End-to-end pipeline for building unique Next.js websites. Invoke when the user wants to build a new site, start a project, or run any pipeline phase. Handles discovery, scaffolding, design, build, and deployment with built-in differentiation tracking.
---

# Site Builder Pipeline

This skill orchestrates the full website build pipeline from discovery to deployment.

## When to Use

Invoke this skill when the user:
- Says "build a site", "new site", "new project", or "start a build"
- Wants to run a specific phase (e.g., "run discovery", "scaffold", "deploy")
- Asks to continue or resume work on an existing project
- Wants to check what's been built or what's available

## Pipeline Overview

The pipeline runs in 5 sequential phases. Each phase has its own workflow file.

### Phase 0 — Discovery (`.claude/workflows/phase-0-discovery.md`)
**Input:** User conversation
**Output:** Vibe brief at `.claude/briefs/<slug>-brief.md`
**Gate:** Brief must exist and be confirmed before proceeding

Ask the user targeted questions that directly impact design decisions. Don't ask generic questions — every question should map to a specific design or content choice. Group questions into 2-3 rounds to keep it conversational, not like a form.

### Phase 1 — Scaffold (`.claude/workflows/phase-1-scaffold.md`)
**Input:** Confirmed vibe brief
**Output:** Working Next.js project at `projects/<slug>/` with GitHub repo
**Gate:** `npm run dev` must start without errors

Clone the starter template, create the GitHub repo, wire up `config/site.ts` with brief data, install Framer Motion, initial commit + push.

### Phase 2 — Design & Layout (`.claude/workflows/phase-2-design.md`)
**Input:** Scaffolded project + vibe brief
**Output:** Responsive layout with header, footer, hero, and section structure
**Gate:** Layout renders correctly at 375px, 768px, 1024px, 1440px

**MUST invoke `frontend-design` skill before writing any layout code.**

Read `registry.json` and apply differentiation rules. Choose an archetype, color palette, hero style, and signature moves that don't repeat recent builds. Use Framer Motion for scroll reveals and entrance animations.

### Phase 3 — Pages & Polish (`.claude/workflows/phase-3-build.md`)
**Input:** Layout-complete project
**Output:** All pages built, content populated, GEO configured
**Gate:** All pages render, no console errors, screenshots reviewed

**MUST invoke `frontend-design` skill before writing page code.**

Build all pages (Home, About, Services, Contact, FAQ). Populate content from the brief. Set up all GEO elements (JSON-LD, meta tags, Open Graph, llms.txt). Visual polish pass.

### Phase 4 — Deploy (`.claude/workflows/phase-4-deploy.md`)
**Input:** Complete, polished project
**Output:** Built artifact committed and pushed to GitHub
**Gate:** `npm run build` succeeds, all changes committed and pushed

Run the production build. Commit everything (including `.next/`, excluding `node_modules/`). Push to GitHub. Update `registry.json` with the completed build record.

## Registry System

`registry.json` at the workspace root tracks every site that's been built. Before Phase 2, ALWAYS read this file and check:

1. What archetypes have been used recently
2. What color palettes are in rotation
3. What hero styles have been deployed
4. What signature moves have been used

The differentiation workflow (`.claude/workflows/differentiation.md`) defines the rules for ensuring each site feels distinct.

After Phase 4, update `registry.json` with the new site's complete design record.

## Starting a New Build

```
1. Read registry.json to see what's been built
2. Run Phase 0 — ask discovery questions
3. Generate and confirm the vibe brief
4. Run Phase 1 — scaffold the project
5. Run Phase 2 — design the layout (check differentiation)
6. Run Phase 3 — build pages and polish
7. Run Phase 4 — deploy and update registry
```

## Resuming Work

If a project already exists at `projects/<slug>/`:
1. Check git log to see what phase was last completed
2. Read the brief at `.claude/briefs/<slug>-brief.md`
3. Continue from the next phase

## Tech Stack Reference

- Next.js (App Router) + TypeScript
- Tailwind CSS + DaisyUI (custom theme per site)
- Framer Motion (scroll reveals, entrance animations, hover states)
- Responsive: mobile-first, tested at 375px / 768px / 1024px / 1440px / 1920px
