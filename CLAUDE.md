# Base — Website Pipeline Workspace

This workspace builds Next.js websites for clients using an AI-driven pipeline.
Every conversation in this directory should follow these rules.

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Animation:** Framer Motion
- **Package manager:** npm
- **Hosting:** Namecheap Nebula (cPanel)
- **Email:** Resend API
- **No DB, no auth, no backend services**

## Starter Template

GitHub: `OnlineApprentice1/nextjs-starter-template`
Config entrypoint: `config/site.ts`
GEO baked in: robots.txt, sitemap.xml, llms.txt, LocalBusiness JSON-LD, FAQPage schema

## Pipeline Phases

| Phase | Name | What happens |
|-------|------|-------------|
| 0 | Discovery | Ask targeted questions, produce a vibe brief |
| 1 | Scaffold | Clone template, create GitHub repo, wire config |
| 2 | Design & Layout | Choose archetype, build responsive layout, add animations |
| 3 | Pages & Polish | Build all pages, content, GEO, visual audit |
| 4 | Deploy | Build, commit, push to GitHub |

Workflow files: `.claude/workflows/phase-*.md`
Differentiation rules: `.claude/workflows/differentiation.md`

## Key Rules

1. **Read `registry.json` before Phase 2.** Never duplicate an archetype, color palette, or hero style from the last 3 builds.
2. **Discovery is mandatory.** Never skip Phase 0. The brief drives everything.
3. **Mobile-first responsive.** Base styles = mobile. Scale up with `sm:`, `md:`, `lg:`, `xl:`. Every page must look good at 375px, 768px, 1024px, 1440px.
4. **Invoke `frontend-design` skill** at the start of Phase 2 and Phase 3.
5. **Read before editing.** Never modify code you haven't read.
6. **Minimal changes only.** No unsolicited improvements or refactors.
7. **No `transition-all`.** Use specific transition properties.
8. **Framer Motion for animations.** Use `motion` components, not CSS keyframes, for entrance animations, scroll reveals, and interactive elements.
9. **Git is the state system.** Each phase ends with a structured commit + push. No `.state/` files.
10. **Beautiful, not generic.** Sites must not look AI-generated. No default gradients, no cookie-cutter hero patterns, no generic stock photo layouts. Every site needs 1-2 signature design moves.

## Responsive Breakpoints

```
Mobile:  < 640px   (base styles)
Tablet:  640-1023px (sm: and md:)
Laptop:  1024-1279px (lg:)
Desktop: 1280px+    (xl: and 2xl:)
```

Test at: 375px, 768px, 1024px, 1440px, 1920px

## File Locations

- **Site projects:** `projects/<slug>/`
- **Vibe briefs:** `.claude/briefs/<slug>-brief.md`
- **Site registry:** `registry.json`
- **Workflows:** `.claude/workflows/`

## Git & GitHub

- GitHub user: `OnlineApprentice1`
- SSH key: `~/.ssh/github_onlineapprentice`
- SSH command: `GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes'`
- Use `gh repo create` for new repos
- Phase 4 commits `.next/` build output (excluding `node_modules/`)

## Content Rules

- Owner name in rendered copy: **About page only**. All other pages use "we", "our team", or business name.
- Every visual section must have an image — use `placehold.co` if no real image provided.
- User is the co-builder, not the client. Speak as a collaborator.

## Anti-Generic Design Rules

- No default DaisyUI theme colors without customization
- No centered-text-over-stock-photo heroes (unless the photo is real and specific)
- No perfectly symmetrical 3-column grids for services (vary the layout)
- Shadows should be subtle and purposeful, not slapped on every card
- Typography: use font size contrast (large headings, small body) with intentional hierarchy
- Color: every site needs a unique accent color that isn't blue or green
- Animations: subtle Framer Motion reveals, not flashy entrance effects
