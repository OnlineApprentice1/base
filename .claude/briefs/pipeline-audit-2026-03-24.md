# PIPELINE AUDIT: Base Website Assembly Line
**Date:** 2026-03-24
**Auditor:** Claude Opus 4.6 (self-audit after building 6+ sites)
**Scope:** End-to-end operational audit of the website-building pipeline

---

## 1. Executive Assessment

**What this is:** A single-operator AI-powered website production system for Canadian trades businesses, built on Claude Code with 29+ skills, 7 station agents, a Superpowers execution layer, and a registry-based differentiation engine.

**Biggest strengths:**
- The iterative audit loop (build → read → score → improve) genuinely works — each site got better
- Registry-based differentiation prevents obvious duplicates
- The skill ecosystem provides real domain knowledge (DaisyUI 5 syntax, Framer Motion patterns)
- Superpowers spec review caught a real content violation the previous 5 builds missed

**Biggest risks:**
- **The pipeline exists mostly on paper.** The 7-station agent architecture, the phase gates, the skill invocation table — none of this actually executes as designed. In practice, you (the operator) write a massive prompt, dispatch one agent, and hope it follows instructions. The station agents have never been invoked independently.
- **Quality depends entirely on prompt quality.** There's no automated enforcement. If your prompt misses a requirement, it ships.
- **No visual QA exists.** Zero screenshot comparison, zero Lighthouse runs, zero device testing. You're shipping sites you've never visually verified.

**Candid verdict:** This is a talented solo developer's personal toolkit, not a production pipeline. It produces good work because YOU are good at writing detailed prompts and doing manual audits. Strip away your involvement, and the system has almost no guardrails.

**Pipeline maturity:** Early prototype. The documentation suggests a mature system. The execution reveals otherwise.

---

## 2. Pipeline Map Understanding

**What the docs say happens:**
```
Intake (discovery) → Scaffold (create-next-app) → Designer (archetype, palette,
components) → Builder (content pages) → QA (a11y, perf) → Deployer (build, push,
registry) → Maintainer (post-launch)
```
With Superpowers layered: brainstorming → writing-plans → subagent-driven-development → verification → finishing-branch.

**What actually happens:**
```
1. You manually decide the business info and design concept
2. You write a 1500-2000 word prompt embedding skill knowledge
3. You dispatch ONE agent that builds the entire site
4. You manually read 3-5 key files and write an audit
5. You apply learnings to the next prompt
6. Git push, start server, done
```

The station agents (intake, scaffold, designer, builder, qa, deployer) have never been invoked as separate steps. The phase gates (npm run dev passes, all pages render, build succeeds) are checked by the monolithic agent, not by a separate gate validator. The skill invocation table (16 skills across 9 phases) is bypassed — you invoke 3-4 skills in the main conversation and embed knowledge into prompts.

The Superpowers integration (Ridgewater build) was the first time the pipeline approached its documented design — with a spec, a plan, per-task dispatch, and spec review. But even then, tasks were batched (2-5 merged into one agent, 6-7 into another), not executed individually as Superpowers prescribes.

---

## 3. Major Structural Weaknesses

### 3.1 The Station Agents Are Dead Code

**Issue:** 7 agent.md files exist at `.claude/agents/<station>/agent.md`. None have ever been invoked.

**Why it matters:** 862 lines of instructions that create the illusion of a structured pipeline but add zero value to execution. They're aspirational documentation, not operational components.

**Symptoms:** The SKILL.md says "you dispatch to station agents and verify their output." In reality, you dispatch a single monolithic agent with the creative brief baked in.

**Risk:** New operators (or future you) may assume these agents work as described and waste time trying to invoke them. The documentation-reality gap erodes trust in the pipeline.

### 3.2 Skills Can't Reach Subagents — The Fundamental Architecture Flaw

**Issue:** Skills are loaded into the main conversation's system prompt via the Skill tool. Subagents (Agent tool) get a fresh context with no skills. The workaround — embedding skill knowledge into agent prompts — is manual, incomplete, and error-prone.

**Why it matters:** The entire pipeline is built around skills. If the execution layer (subagents) can't access them, the skill system is decorative for builds.

**Symptoms:** The prompt injection approach means you're manually copying DaisyUI 5 syntax, Framer Motion patterns, and OKLCH values into every agent prompt. Miss something, and the agent falls back to training data (which knows DaisyUI 4, not 5).

**Risk:** DaisyUI 5's `@plugin "daisyui/theme"` syntax is NOT in any model's training data. If you forget to inject it, the build breaks with CSS parse errors. This has happened before.

### 3.3 No Visual QA — You're Shipping Blind

**Issue:** The pipeline has zero visual verification. No screenshots, no Lighthouse runs, no responsive testing, no visual diff comparison.

**Why it matters:** You've built 15+ sites across this conversation and have never visually confirmed any of them render correctly. You've audited CODE (reading .tsx files), not VISUALS (looking at the rendered output).

**Symptoms:** The Ridgewater audit scored components 8-9/10 based on code quality. But does the SVG pipe network actually look good? Does the hero water drop animation feel cinematic, or is it janky? Does the pressure gauge gradient render correctly? Unknown.

**Risk:** A site with perfect code and broken visuals ships to a real client. The gradient ID collision I flagged in StatsPressure (all 4 gauges sharing `gauge-gradient`) could cause all gauges to render identically — but nobody would know without looking at the page.

### 3.4 Registry Schema Is Inconsistent

**Issue:** The 3 entries in registry.json have different schemas. Blackwater has `palette` as an object, `signatureMoves` as an array, `fonts` as an object, and `date` as the date field. Earlier builds (from the conversation summary) used `builtDate`, `headingFont`/`bodyFont` as flat strings, `heroStyle` instead of `hero`, and `palette` as flat OKLCH strings.

**Why it matters:** The differentiation engine reads the registry to avoid duplicates. If the schema is inconsistent, the comparison logic can't work reliably.

**Risk:** A new build might use a "duplicate" archetype because the registry entry was stored under a different field name.

---

## 4. Stage-by-Stage Audit

### Phase 0: Intake

**Purpose:** Interview user, produce vibe brief.
**Clarity:** The agent.md is well-structured (3 rounds of questions).
**Reality:** Skipped entirely for all builds in this conversation. You used "fake info, automate everything." The intake questions have never been tested with a real user.
**Failure mode:** If a real user gives vague answers ("make it look good"), the brief will be vague, and every downstream stage inherits that vagueness.
**Fix:** Create a minimum-viable brief checklist. If any field is empty or vague, the pipeline refuses to proceed.

### Phase 1: Scaffold

**Purpose:** Create project, install deps, push to GitHub.
**Clarity:** Well-defined. Mechanical.
**Reality:** Works fine. `create-next-app` + `npm install` + `gh repo create` is reliable.
**Issue:** The starter template reference in CLAUDE.md (`OnlineApprentice1/nextjs-starter-template`) is obsolete — you abandoned the template approach. This is dead documentation.
**Fix:** Remove the starter template section from CLAUDE.md.

### Phase 2: Design

**Purpose:** Archetype, palette, fonts, hero concept, signature moves.
**Clarity:** The differentiation.md workflow is good. The "components first, theme last" rule is clear.
**Reality:** This is where YOUR creative brief writing does all the work. The pipeline doesn't assist with ideation — it relies on you generating concepts like "LIQUID FLOW" or "EDITORIAL CINEMATIC" manually.
**Issue:** No structured decision framework. You freestyle design concepts based on intuition. When you're fresh, the concepts are wild (sonar pings, curtain reveals). When context is running low, they could get conventional.
**Fix:** Create a design concept generator — a structured checklist that forces novel choices: "Pick a non-digital metaphor for this trade", "Pick a layout-breaking technique not used in the last 3 builds", "Pick a font pairing from a curated list of 50+ unusual pairs."

### Phase 2-3: Build (Superpowers)

**Purpose:** Execute the plan via subagent-driven development.
**Clarity:** Superpowers provides clear structure.
**Reality:** Used once (Ridgewater). Tasks were batched (2-5 together, 6-7 together), not individual. Spec review worked well but code quality review was skipped.
**Issue:** The plan document for Ridgewater was written by YOU, not by a planning subagent. Superpowers' `writing-plans` skill says the plan should be written by a dedicated agent and reviewed by a plan-document-reviewer. Neither happened.
**Fix:** Actually use the full Superpowers workflow: brainstorming agent → plan agent → plan reviewer → per-task execution → two-stage review per task.

### Phase 4: QA

**Purpose:** a11y, performance, content, Canadian English, banned phrases.
**Clarity:** The qa/agent.md lists checks.
**Reality:** QA is a grep for banned phrases and a `npm run build`. No Lighthouse, no axe-core, no responsive testing, no visual review.
**Issue:** The QA agent has never been invoked independently. QA happens as part of your manual audit (reading code) or the Superpowers spec review (verifying code matches spec). Neither checks visual rendering.
**Fix:** Add automated checks: `npx lighthouse` CLI, `grep -r "transition-all"`, `grep -ri "comprehensive|leverage|cutting-edge"`, responsive screenshot tool. Make these a required gate.

### Phase 4: Deploy

**Purpose:** Build, push, update registry.
**Clarity:** Clear.
**Reality:** Works. `npm run build` + `git push` + registry update.
**Issue:** Registry update is sometimes done by the agent, sometimes manual, sometimes forgotten. No validation that the registry entry matches the actual build.

### Phase 5: Maintainer

**Purpose:** Post-launch changes.
**Clarity:** Well-defined in agent.md.
**Reality:** Never used. No site has been modified post-build.

---

## 5. Handoff and State Management Audit

### What passes between stages:

| Handoff | Mechanism | Reliability |
|---------|-----------|-------------|
| Brief → Design | `.claude/briefs/<slug>-brief.md` | **Weak** — briefs are sometimes skipped, sometimes in memory only |
| Design → Build | Prompt text in agent dispatch | **Fragile** — entire design lives in a single prompt that could be truncated |
| Build → QA | git log + file system | **OK** — code is committed, reviewable |
| QA → Deploy | `npm run build` pass/fail | **OK** — binary gate |
| Build → Registry | Manual or agent-driven JSON edit | **Inconsistent** — schema varies |

### Critical context loss points:

1. **Conversation compaction.** This conversation was compacted, and a 2000-word summary was injected. Design decisions, audit learnings, and creative rationale from early in the session are lossy. If a build spans two conversations, almost everything is lost except what's in memory files.

2. **Brief is ephemeral.** For the Superpowers build (Ridgewater), the spec was saved to a file. For the previous 5 builds, the "brief" was just the agent prompt — never saved. If the agent crashes mid-build, the creative direction is gone.

3. **Audit learnings live in chat only.** The iterative improvement loop (audit → learnings → next prompt) is powerful but ephemeral. The learnings from Site 1 ("testimonials shouldn't use nested scroll") exist only in this conversation's context. Start a new conversation, and you lose all of them.

**Fix:** Save audit learnings to memory. Create a `feedback_build_learnings.md` memory file that accumulates lessons across conversations.

---

## 6. Prompt and Instruction Audit

### Vague instructions:
- CLAUDE.md Rule 11: "Beautiful, not generic. Every site needs 1-2 signature design moves." — What counts as a "signature move"? No definition, no examples, no checklist.
- designer/agent.md: "Choose a design archetype" — from where? No list of archetypes is provided.

### Conflicting instructions:
- CLAUDE.md says "Builds run in the MAIN conversation, not subagents." SKILL.md says "use superpowers:subagent-driven-development." These conflict — you can't do both. In practice you dispatch subagents from the main conversation, but the documentation is confusing.
- CLAUDE.md still references the starter template. The template was abandoned. This is misleading.

### Missing constraints:
- No maximum page count for inner pages (how detailed should services be? 200 lines? 500?)
- No minimum animation count per section
- No constraint on CTA placement or quantity
- No image dimension requirements (placehold.co images vary wildly)

### Instructions that invite generic outputs:
- The builder agent.md says "Write content for all pages." This is an invitation to produce generic marketing copy. A stronger instruction would be: "Write content as if you're the business owner explaining your work to a neighbour. Include at least one specific local detail per page."

---

## 7. Failure Modes and Brittleness

| Failure Mode | How It Happens | Severity | Detectability | Prevention |
|---|---|---|---|---|
| **DaisyUI 5 syntax wrong** | Agent uses DaisyUI 4 syntax from training data | High (build fails) | Easy (build error) | Always inject exact syntax in prompt |
| **Gradient ID collision** | SVG `id` reused across multiple instances | Medium (visual bug) | Low (requires visual check) | Append index to all SVG IDs |
| **Owner name on homepage** | Agent writes "John's crew" in testimonial | Low (content rule) | Medium (spec review catches it) | Add to banned-phrase grep |
| **Flat/generic design** | Agent ignores creative brief, produces standard layout | High (defeats purpose) | Low (requires visual review) | Spec review against design doc |
| **Agent crashes mid-build** | Context limit, rate limit, network error | High | High (obvious) | Superpowers checkpoints per task |
| **Registry not updated** | Agent forgets or uses wrong schema | Medium | Low (manual check) | Automated registry validation |
| **Canadian English missed** | "color" instead of "colour" in CSS classes | None (CSS uses American) | N/A | Only check content, not code |
| **Conversation context loss** | Compaction drops audit learnings | High | Low (you don't know what's gone) | Save learnings to memory files |
| **Port conflicts** | Previous dev servers still running | Low | High (error message) | Kill all ports before build |
| **Placeholder images in production** | placehold.co URLs ship to live site | High | Low (visual only) | Grep for placehold.co in deploy gate |

---

## 8. Quality Control Audit

| QA Layer | Exists? | Automated? | Effective? |
|----------|---------|------------|------------|
| Design quality | Manual audit (code reading) | No | Partial — can't judge visuals from code |
| Content quality | Grep for banned phrases | Semi | Good for phrases, bad for tone/depth |
| Technical/frontend QA | `npm run build` | Yes | Catches compile errors only |
| SEO/metadata QA | Spec review checks JSON-LD | Semi | Good when spec review runs |
| Responsiveness | None | No | **Total gap** |
| Visual review | None | No | **Total gap** |
| Lighthouse/performance | None | No | **Total gap** — Rule 12 says "target 90+" but never measures it |
| Build/runtime errors | Dev server check | Manual | Catches obvious crashes |
| Launch readiness | None | No | No checklist exists |

**Where poor work slips through:** Visual rendering, responsive layout, animation timing/feel, colour contrast, image sizing, touch target sizes. Essentially anything that requires LOOKING AT the website rather than READING the code.

---

## 9. Efficiency and Scalability Audit

### Wasted steps:
- Hooks (skill-activation-prompt, enforce-skills, track-skill) were built but add friction without proven value. The skill activation hook fires on every prompt but the suggestions are often irrelevant.
- The 7 station agent files (862 lines total) are never used.

### Scaling bottlenecks:
- **Context window.** Each build consumes massive context (the Ridgewater build used 4 agent dispatches + 2 spec reviews = 6 context-heavy operations). At 10 sites per session, you'll hit compaction.
- **Sequential builds.** The Superpowers methodology is high-quality but slow (~15 min per site). Parallel builds are fast but skip skills and reviews.
- **Manual creative direction.** Every site requires YOU to invent a design concept. This doesn't scale — you'll run out of ideas or start repeating.

### Opportunities:
- **Design concept library.** Create a file of 30-50 pre-researched design concepts with: metaphor, colour direction, font pair, hero technique, unique components. Draw from this during Phase 2 instead of inventing from scratch.
- **Canonical Motion.tsx.** Every site rebuilds Reveal, StaggerGroup, CountUp from scratch. Create a canonical version that gets copied in during scaffold.
- **Automated QA script.** A bash script that runs: `npm run build`, greps for banned phrases, checks for `transition-all`, verifies robots.ts/sitemap.ts/opengraph-image.tsx exist, confirms Canadian English in meta tags.

---

## 10. Output Quality and Differentiation Audit

**Are the sites genuinely different?** Yes — across the 6 audited builds, the design concepts are wildly different (editorial, nautical, papercraft, industrial, thermal glass, liquid flow). The technique roster (27+ unique techniques) shows real variety.

**Where sameness creeps in:**
- **Section structure.** Every site has: Hero → Services → Process → Stats → Testimonials → About → CTA. The ORDER is identical across all 6. A real design firm would vary the page flow.
- **Inner page quality.** Services pages all follow the same pattern: alternating image/text strips. About pages all have: story + values + service area. Contact pages all have: form + sidebar + map. The HOMEPAGE is unique; the INNER PAGES are templates.
- **Animation pattern.** Every site uses: Reveal (fade+slide on scroll) for everything. The hero has a unique entrance, but sections 2-7 are all "fade up on scroll." This creates a rhythm that feels samey across sites.
- **Copy structure.** Every testimonial is 2-3 sentences. Every FAQ has exactly 10 questions. Every about page tells the owner's story. The STRUCTURE is identical even when the content differs.

**How to reduce it:**
- Vary section ORDER between sites (sometimes stats before services, sometimes testimonials in the middle)
- Give some sites different PAGE COUNTS (not every site needs FAQ, not every site needs a separate services page)
- Vary animation TYPES per section (some sections slide in from left, some scale up, some use parallax, some have no animation at all)
- Vary testimonial FORMAT (some quotes, some video placeholders, some case studies, some Google Review embeds)

---

## 11. Priority Fixes

### Immediate (do now, high leverage):

| Fix | Why | Effort | Impact |
|-----|-----|--------|--------|
| **Save audit learnings to memory** | Prevents losing iteration insights across conversations | Low | High |
| **Remove dead code** (starter template ref, unused station agents, or mark them as "planned") | Reduces confusion | Low | Medium |
| **Create an automated QA script** (`npm run build` + grep checks + file existence) | Catches 60% of quality issues automatically | Low | High |
| **Standardize registry schema** | Makes differentiation engine reliable | Low | Medium |
| **Fix the CLAUDE.md contradiction** (main conversation vs. subagents) | Reduces operator confusion | Low | Medium |

### Medium-term (next week):

| Fix | Why | Effort | Impact |
|-----|-----|--------|--------|
| **Design concept library** (30-50 pre-researched concepts) | Scales creative direction, reduces ideation bottleneck | Medium | High |
| **Canonical Motion.tsx** (copy during scaffold, not rebuild) | Saves 15 min per build, ensures quality baseline | Medium | Medium |
| **Visual QA** (even basic — `npx lighthouse` CLI for performance scores) | Fills the biggest QA gap | Medium | High |
| **Brief-as-file requirement** (every build must save spec to docs/) | Prevents context loss | Low | High |
| **Vary section order + page count per site** | Breaks structural sameness | Low | High |

### Deeper architectural (next month):

| Fix | Why | Effort | Impact |
|-----|-----|--------|--------|
| **Actually use Superpowers per-task dispatch** (not batched) | Gets the full quality benefit of two-stage review | High | High |
| **Build a real QA gate** (Lighthouse 90+, axe-core 0 violations, responsive screenshots) | Makes quality objective, not subjective | High | Very High |
| **Pre-built component variants** (3-4 hero variants, 3-4 service layouts, etc.) | Speeds builds without sacrificing uniqueness | High | High |
| **Webhook/notification system** for build completion | Enables true async multi-project work | Medium | Medium |

---

## 12. Ideal Future-State Architecture

### Stages (redesigned):

```
BRIEF (mandatory file output, minimum fields enforced)
  ↓
DESIGN DECISION (pull from concept library, registry check automated)
  ↓
PLAN (Superpowers writing-plans, reviewed by plan-reviewer agent)
  ↓
SCAFFOLD (create-next-app + canonical Motion.tsx + config/site.ts)
  ↓
BUILD (per-task subagent-driven-development, skill knowledge injected per task type)
  ↓
QA (automated: build + Lighthouse + grep + file checks + visual screenshot)
  ↓
DEPLOY (git push + registry update + validation)
```

### State management:
- Every build produces: `docs/superpowers/specs/<slug>-design.md`, `docs/superpowers/plans/<slug>-plan.md`, and `registry.json` entry
- Audit learnings saved to memory after each build
- Design concept library at `.claude/workflows/concept-library.md` — drawn from, not invented each time

### QA:
- Automated script runs before deploy: build, lighthouse, grep, file existence
- Spec review runs on EVERY build (not optional)
- Visual review is the ONE manual step — operator looks at the dev server before pushing

### Reuse:
- Canonical `Motion.tsx` with Reveal, StaggerGroup, CountUp, useReducedMotion (copied during scaffold)
- Canonical `config/site.ts` template (filled from brief)
- Canonical SEO files (robots.ts, sitemap.ts templates)
- Component variant library for heroes, service layouts, process sections (3-4 variants each, chosen during design)

---

## 13. Brutal Conclusion

**What this pipeline is good at:**
- Producing visually distinctive websites through detailed creative briefs
- Iterating on quality through audit loops
- Preventing duplicate designs via registry
- Maintaining Canadian English and content rules

**What is holding it back most:**
- The pipeline's documented architecture and its actual execution are two different things. You have 7 station agents, 16 skill invocations per build, and phase gates — on paper. In reality, you write a big prompt and dispatch one agent. The gap between documentation and execution is the single biggest problem.

**Is it ready to scale?**
No. It works because you manually compensate for every gap. Your creative brief writing IS the pipeline. Your code audits ARE the QA. Your prompt engineering IS the skill injection. Remove you from the loop, and the system produces generic sites with possible DaisyUI syntax errors and no visual verification.

**What must be fixed before relying on it heavily:**
1. Automated QA gate (build + grep + lighthouse + file checks)
2. Spec-as-file requirement (no more ephemeral briefs)
3. Audit learnings saved to memory (no more losing lessons to compaction)
4. Fix the documentation-reality gap (either make the station agents work, or remove them and document what actually happens)
5. Visual verification as a required step (even just "look at it")

---

## Scores

| Dimension | Score | Why |
|-----------|-------|-----|
| **Clarity** | 6/10 | Docs are detailed but contradict reality. Station agents described but unused. CLAUDE.md references abandoned template. |
| **Robustness** | 4/10 | One person's prompt quality is the only guardrail. No automated checks. Agent crashes lose creative context. |
| **Scalability** | 3/10 | Every build requires manual creative direction. Sequential Superpowers is slow. Parallel skips quality checks. Context window limits throughput. |
| **Output quality potential** | 8/10 | The sites ARE good. The iterative audit loop works. The design concepts are genuinely unique. |
| **Differentiation potential** | 8/10 | Registry + 27 unique techniques + varied aesthetics. Inner page sameness is the weak spot. |
| **QA maturity** | 2/10 | `npm run build` + code reading. No visual QA, no Lighthouse, no accessibility scanning, no responsive testing. |
| **Handoff reliability** | 4/10 | Briefs are ephemeral. Registry schema varies. Audit learnings live in chat only. |
| **Resistance to context loss** | 3/10 | Conversation compaction kills learnings. Briefs not always saved. Memory system exists but is underused. |
| **Efficiency** | 5/10 | Superpowers adds quality but triples build time. 862 lines of dead station agent code. Hooks add friction. |
| **Overall readiness** | 4/10 | Produces great work in your hands. Would produce mediocre work in anyone else's. Not a system yet — it's a talented person with good tools. |

---

*End of audit report.*
