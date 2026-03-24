# Superpowers Workflow Decision

## Two Modes

### Superpowers Full (Quality Build)
Use when: single site, quality matters most, time is not constrained.

- Brainstorming agent refines the brief (Phase 0)
- Plan agent writes the implementation plan (Phase 3)
- Plan reviewer agent validates the plan (Phase 3)
- **Individual task dispatch** — one subagent per task (Phases 4-7)
- **Two-stage review per task** — spec compliance + code quality (Phases 4-7)
- Final code reviewer for entire implementation (Phase 8)

**Time:** ~30-45 min per site
**Quality:** Highest — every task independently verified

### Superpowers Lite (Speed Build)
Use when: multiple sites in one session, time-constrained, or simple sites.

- Operator writes the brief directly (no brainstorming agent) (Phase 0)
- Operator writes the plan (no planning agent) (Phase 3)
- **Batched task dispatch** — 2-5 related tasks per subagent (Phases 4-7)
- **Spec review only** — skip code quality review (Phases 4-7)
- QA script replaces per-task review as quality gate (Phase 8)

**Time:** ~10-15 min per site
**Quality:** Good — automated QA catches most issues, but subtle design quality may slip

## Which to Use

| Situation | Mode | Why |
|-----------|------|-----|
| First build for a new client | Full | Quality impression matters |
| Portfolio/demo site | Lite | Speed over perfection |
| Complex custom design | Full | Signature moves need careful review |
| Simple service business | Lite | Standard patterns work fine |
| Parallel batch (3+ sites) | Lite | Full is too slow for batches |
| Post-launch revision | Lite | Scoped changes, less risk |

## Non-Negotiable in Both Modes

Regardless of which mode:
1. Brief MUST be saved to file (`.claude/briefs/<slug>-brief.md`) — Phase 0
2. Design system MUST be set up before build subagents run — Phase 2 before Phases 4-7
3. Skill packs MUST be injected into every subagent prompt — Phases 4-7
4. `scripts/qa.sh` MUST pass before deploy — Phase 8
5. Registry MUST be updated and validated — Phase 9
6. Operator MUST visually review the site before pushing — Phase 8

## Phase-to-Superpowers Mapping

| Phase | Superpowers Skill | Mode Difference |
|-------|-------------------|-----------------|
| 0 (Intake) | `superpowers:brainstorming` | Full: agent-driven. Lite: operator writes directly |
| 1 (Scaffold) | `superpowers:using-git-worktrees` | Same in both |
| 2 (Design System) | — | Same in both (main conversation) |
| 3 (Plan) | `superpowers:writing-plans` | Full: plan agent + reviewer. Lite: operator writes |
| 4 (Structure) | `superpowers:subagent-driven-development` | Full: 1 task/subagent + 2-stage review. Lite: batched |
| 5 (Homepage) | `superpowers:subagent-driven-development` | Full: 1 section/subagent + review. Lite: batched sections |
| 6 (Inner Pages) | `superpowers:subagent-driven-development` | Full: 1 page/subagent + review. Lite: all 3 pages batched |
| 7 (SEO & Legal) | `superpowers:subagent-driven-development` | Full: individual tasks + review. Lite: single batch |
| 8 (QA) | `superpowers:verification-before-completion` | Same in both |
| 9 (Deploy) | `superpowers:finishing-a-development-branch` | Same in both |
