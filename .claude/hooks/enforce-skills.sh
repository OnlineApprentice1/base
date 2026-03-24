#!/bin/bash
# PreToolUse hook for Edit/Write tools.
# Blocks code edits on .tsx/.ts/.css files inside projects/ unless required skills
# have been invoked this session.
#
# Required skill: frontend-design (must be invoked before any code editing in projects/)

INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only check Edit and Write on project code files
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only enforce for files inside projects/ directory
case "$FILE_PATH" in
  */projects/*)
    ;;
  *)
    exit 0
    ;;
esac

# Only enforce for code files
case "$FILE_PATH" in
  *.tsx|*.ts|*.css|*.jsx|*.js)
    ;;
  *)
    exit 0
    ;;
esac

# Check if frontend-design skill has been invoked this session
MARKER_DIR="/tmp/claude-skills-${SESSION_ID}"

if [ ! -f "${MARKER_DIR}/frontend-design" ]; then
  cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "BLOCKED: You must invoke the frontend-design skill before editing code files in projects/. Run: /frontend-design"
  }
}
EOF
  exit 0
fi

exit 0
