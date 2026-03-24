# Future Station Agents

These agents represent the **planned multi-station architecture** where each pipeline phase is handled by an independent, invokable agent with its own context and instructions.

**Current status:** NOT operational. These have never been invoked independently. The current workflow uses the main conversation for phases 0-2, subagent dispatch for phase 2-3 (build), and the main conversation for phase 4 (QA + deploy).

**Plan:** One station at a time, validate and activate each agent. Priority order:
1. **QA** — easiest to validate (clear pass/fail criteria)
2. **Designer** — highest creative leverage
3. **Intake** — test with real users
4. **Builder** — most complex, needs skill pack injection
5. **Scaffold** — mechanical, low priority
6. **Deployer** — mechanical, low priority
7. **Maintainer** — test when post-launch changes are needed

When a station agent is validated and ready for use, move it back to `.claude/agents/<station>/`.
