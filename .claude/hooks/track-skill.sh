#!/bin/bash
# PostToolUse hook for the Skill tool.
# When a skill is invoked, write a marker file so enforce-skills.sh can check it.

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')

if [ -z "$SKILL_NAME" ]; then
  exit 0
fi

MARKER_DIR="/tmp/claude-skills-${SESSION_ID}"
mkdir -p "$MARKER_DIR"
touch "${MARKER_DIR}/${SKILL_NAME}"

exit 0
