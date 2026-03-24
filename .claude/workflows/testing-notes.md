# Testing Notes — Untested Pipeline Components

## Intake Station (Phase 0)

**Status:** Never tested with a real user.

All builds to date used pre-determined business info ("fake info, automate everything"). The 3-round interview flow in the intake agent has never been exercised with a real human giving vague or unexpected answers.

**What to test on next real build:**
- Does the Socratic questioning flow feel natural?
- Are the questions too many, too few, or redundant?
- Does a vague answer ("make it look good") get refined into actionable detail?
- Does the brief template get filled completely from the conversation?
- How long does intake take with a real user? (Target: 5-10 min)

**Test plan:**
1. Next real client build, run the full intake flow
2. Time it
3. Compare the resulting brief to the briefs from manual prompt-writing
4. Note any questions that confused the user or produced unhelpful answers
5. Update the intake agent instructions based on findings

**Agent location:** `.claude/agents/_future/intake/agent.md`

---

## Maintainer Station (Phase 5)

**Status:** Never used. No site has been modified post-build.

The maintainer agent has instructions for handling blog posts, content updates, and design tweaks, but these have never been tested.

**What to test:**
- Can it add a blog post without breaking existing code?
- Can it update content on an existing page without disrupting the layout?
- Does it respect the existing theme, fonts, and design decisions?
- Can it handle a design tweak (e.g., "change the hero colour") without cascading breakage?

**Test plan:**
1. Pick a completed site (recommend: Ridgewater or Blackwater Marine — most complete)
2. Give it a real maintenance task: "Add a blog post about winter plumbing tips"
3. Verify: post renders correctly, no existing pages break, styles are consistent
4. Then try a design tweak: "Change the accent colour to a warmer tone"
5. Verify: all instances of the old accent are updated, no broken references

**Agent location:** `.claude/agents/_future/maintainer/agent.md`

---

## QA Script (`scripts/qa.sh`)

**Status:** Newly created. Not yet run against a real project.

**Test plan:**
1. Run against one of the 3 existing built projects
2. Verify each check produces correct output
3. Confirm it catches intentionally introduced failures (add a `transition-all`, add a banned phrase, delete robots.ts)
4. Verify exit codes are correct (0 for pass, 1 for fail)
