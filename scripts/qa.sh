#!/bin/bash
# QA Gate Script — run before every deploy
# Usage: ./scripts/qa.sh <project-dir>
# Example: ./scripts/qa.sh projects/blackwater-marine
#
# Exit codes:
#   0 = all checks passed
#   1 = critical failure (build fails, banned content, missing files)
#   (warnings don't cause failure but are printed)
#
# Checks:
#   1. npm run build
#   2. transition-all search
#   3. Banned phrases
#   4. Required files
#   5. Placeholder images
#   6. Canadian English spot check
#   7. DaisyUI 5 syntax
#   8. Brief validation
#   9. Owner name leak check
#  10. Generic heading check
#  11. Lighthouse scores (if server running)
#  12. Screenshot capture (if playwright available)
#  13. Registry validation
#  14. Signature move detection
#  15. Emoji ban
#  16. Layout variety
#  17. Visual review gate
#  18. Profile/typography system check
#  19. Colour token hygiene
#  20. WCAG contrast validation

set -e

# --- Configuration ---
PROJECT_DIR="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAIL=0
WARN=0

red='\033[0;31m'
yellow='\033[0;33m'
green='\033[0;32m'
bold='\033[1m'
reset='\033[0m'

pass() { echo -e "${green}✓${reset} $1"; }
fail() { echo -e "${red}✗ FAIL:${reset} $1"; FAIL=$((FAIL + 1)); }
warn() { echo -e "${yellow}⚠ WARN:${reset} $1"; WARN=$((WARN + 1)); }

echo ""
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo -e "${bold}  QA GATE — Pre-Deploy Checks${reset}"
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo -e "  Project: ${PROJECT_DIR}"
echo ""

# --- Check 1: Project directory exists ---
if [ ! -d "$PROJECT_DIR" ]; then
  fail "Project directory does not exist: $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"
SLUG=$(basename "$(pwd)")

# --- Detect src/ directory structure ---
# Scaffold uses --src-dir, so app/ may be under src/app/
if [ -d "src/app" ]; then
  APP_DIR="src/app"
  COMP_DIR="src/components"
  CSS_FILE="src/app/globals.css"
else
  APP_DIR="app"
  COMP_DIR="components"
  CSS_FILE="app/globals.css"
fi

# --- Check 2: npm run build ---
TOTAL_CHECKS=20
echo -e "${bold}[1/$TOTAL_CHECKS] Build check${reset}"
if [ -f "package.json" ]; then
  if npm run build > /tmp/qa-build-output.log 2>&1; then
    pass "npm run build succeeded"
  else
    fail "npm run build failed (see /tmp/qa-build-output.log)"
  fi
else
  fail "No package.json found"
fi

# --- Check 3: transition-all ---
echo ""
echo -e "${bold}[2/$TOTAL_CHECKS] transition-all check${reset}"
TRANSITION_ALL=$(grep -r "transition-all" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.css" --include="*.jsx" -l 2>/dev/null || true)
if [ -n "$TRANSITION_ALL" ]; then
  fail "Found 'transition-all' in:"
  echo "$TRANSITION_ALL" | while read -r f; do echo "       $f"; done
else
  pass "No transition-all found"
fi

# --- Check 4: Banned phrases ---
echo ""
echo -e "${bold}[3/$TOTAL_CHECKS] Banned phrases check${reset}"
BANNED_PHRASES=(
  "In today's fast-paced world"
  "When it comes to"
  "Look no further"
  "Welcome to"
  "We pride ourselves"
  "Your trusted partner"
  "In the heart of"
  "we believe"
  "Nestled in"
  "Are you looking for"
  "Whether you need"
  "Don't hesitate to"
  "Feel free to"
  "team of experienced professionals"
  "State-of-the-art"
  "Cutting-edge"
  "Seamless"
  "Leverage"
)

BANNED_FOUND=0
for phrase in "${BANNED_PHRASES[@]}"; do
  MATCHES=$(grep -ri "$phrase" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" -l 2>/dev/null || true)
  if [ -n "$MATCHES" ]; then
    fail "Banned phrase \"$phrase\" found in:"
    echo "$MATCHES" | while read -r f; do echo "       $f"; done
    BANNED_FOUND=$((BANNED_FOUND + 1))
  fi
done
if [ "$BANNED_FOUND" -eq 0 ]; then
  pass "No banned phrases found"
fi

# --- Check 5: Required files ---
echo ""
echo -e "${bold}[4/$TOTAL_CHECKS] Required files check${reset}"
REQUIRED_FILES=(
  "${APP_DIR}/robots.ts"
  "${APP_DIR}/sitemap.ts"
  "${APP_DIR}/opengraph-image.tsx"
  "${APP_DIR}/privacy/page.tsx"
  "${APP_DIR}/terms/page.tsx"
  "${APP_DIR}/layout.tsx"
  "${APP_DIR}/page.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    pass "$file exists"
  else
    fail "$file is missing"
  fi
done

# --- Check 6: Placeholder images ---
echo ""
echo -e "${bold}[5/$TOTAL_CHECKS] Placeholder image check${reset}"
PLACEHOLDERS=$(grep -r "placehold.co" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" -c 2>/dev/null | awk -F: '{sum += $2} END {print sum}')
if [ -n "$PLACEHOLDERS" ] && [ "$PLACEHOLDERS" -gt 0 ]; then
  warn "Found $PLACEHOLDERS placehold.co references — replace with real images before going live"
else
  pass "No placeholder images found"
fi

# --- Check 7: Canadian English spot check ---
echo ""
echo -e "${bold}[6/$TOTAL_CHECKS] Canadian English spot check${reset}"
# Check for American spellings in content (not in code/CSS — 'color' is valid CSS)
AMERICAN_SPELLINGS=$(grep -ri "\bcolor\b" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.jsx" 2>/dev/null | grep -v "className" | grep -v "style" | grep -v "color:" | grep -v "Color" | grep -v "color=" | grep -v "bg-" | grep -v "text-" | grep -v "border-" | grep -v "from-" | grep -v "to-" | grep -v "via-" | grep -v "ring-" | grep -v "shadow-" | grep -v "accent-" | grep -v "primary" | grep -v "secondary" | grep -v "neutral" | grep -v "import" | grep -v "const " | grep -v "interface" | grep -v "type " || true)
if [ -n "$AMERICAN_SPELLINGS" ]; then
  warn "Possible American English 'color' in content (verify these are in prose, not code):"
  echo "$AMERICAN_SPELLINGS" | head -5
else
  pass "No obvious American English issues"
fi

# --- Check 7b: DaisyUI 5 syntax ---
echo ""
echo -e "${bold}[7/$TOTAL_CHECKS] DaisyUI 5 syntax check${reset}"
if [ -f "$CSS_FILE" ]; then
  if grep -q '@plugin "daisyui' "$CSS_FILE" 2>/dev/null; then
    pass "DaisyUI 5 @plugin syntax found in globals.css"
  elif grep -q "daisyui" "$CSS_FILE" 2>/dev/null; then
    fail "DaisyUI reference found but not using v5 @plugin syntax"
  else
    warn "No DaisyUI theme found in globals.css"
  fi
else
  warn "No globals.css found at $CSS_FILE — check CSS setup"
fi

# --- Check 8: Brief validation ---
echo ""
echo -e "${bold}[8/$TOTAL_CHECKS] Brief validation${reset}"
BRIEF_FILE="$SCRIPT_DIR/../.claude/briefs/${SLUG}-brief.md"
if [ -f "$BRIEF_FILE" ]; then
  # Check for truly blank required fields: lines like "- **Field:**" followed immediately by another "- **"
  # Multi-line fields (palette, signature moves) have content on next lines, so we only flag
  # fields where the NEXT non-empty line is also a field header
  BLANK_FIELDS=$(awk '
    /^- \*\*[^:]+:\*\*\s*$/ { blank_line = NR; blank_text = $0; next }
    blank_line && /^- \*\*/ { count++; blank_line = 0 }
    blank_line && /^[[:space:]]+- / { blank_line = 0 }
    blank_line && /\S/ { blank_line = 0 }
    END { print count+0 }
  ' "$BRIEF_FILE" 2>/dev/null || echo "0")
  TBD_FIELDS=$(grep -ci "TBD\|TODO\|FIXME" "$BRIEF_FILE" 2>/dev/null || echo "0")
  if [ "$BLANK_FIELDS" -gt 0 ]; then
    fail "Brief has $BLANK_FIELDS blank required fields"
  elif [ "$TBD_FIELDS" -gt 0 ]; then
    warn "Brief has $TBD_FIELDS TBD/TODO placeholders"
  else
    pass "Brief exists and has no blank fields"
  fi
else
  warn "No brief found at $BRIEF_FILE"
fi

# --- Check 9: Owner name leak check ---
echo ""
echo -e "${bold}[9/$TOTAL_CHECKS] Owner name leak check${reset}"
if [ -f "$BRIEF_FILE" ]; then
  OWNER_NAME=$(grep "Owner name" "$BRIEF_FILE" 2>/dev/null | sed 's/.*\*\*[[:space:]]*//' | sed 's/^[[:space:]]*//' || true)
  if [ -n "$OWNER_NAME" ] && [ "$OWNER_NAME" != "N/A" ]; then
    # Check all pages EXCEPT about/ for the owner name
    OWNER_LEAKS=$(grep -ri "$OWNER_NAME" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" -l 2>/dev/null | grep -v "/about/" | grep -v "site.ts" || true)
    if [ -n "$OWNER_LEAKS" ]; then
      fail "Owner name '$OWNER_NAME' found outside About page:"
      echo "$OWNER_LEAKS" | while read -r f; do echo "       $f"; done
    else
      pass "Owner name only appears on About page (or in site config)"
    fi
  else
    pass "No owner name to check (or N/A)"
  fi
else
  warn "No brief — skipping owner name check"
fi

# --- Check 10: Generic heading check ---
echo ""
echo -e "${bold}[10/$TOTAL_CHECKS] Generic heading check${reset}"
GENERIC_HEADINGS=(
  "Our Services"
  "What We Do"
  "About Us"
  "What Our Clients Say"
  "Our Process"
  "Get In Touch"
  "Contact Us"
  "Why Choose Us"
  "Our Team"
  "Our Mission"
)
GENERIC_FOUND=0
for heading in "${GENERIC_HEADINGS[@]}"; do
  MATCHES=$(grep -ri ">$heading<" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.jsx" -l 2>/dev/null || true)
  if [ -n "$MATCHES" ]; then
    warn "Generic heading \"$heading\" found in:"
    echo "$MATCHES" | while read -r f; do echo "       $f"; done
    GENERIC_FOUND=$((GENERIC_FOUND + 1))
  fi
done
if [ "$GENERIC_FOUND" -eq 0 ]; then
  pass "No generic headings found"
fi

# --- Check 11: Lighthouse scores ---
echo ""
echo -e "${bold}[11/$TOTAL_CHECKS] Lighthouse scores${reset}"
# Check if a dev server is running on port 3000
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
  if command -v npx &> /dev/null; then
    echo "  Running Lighthouse (this may take 30-60 seconds)..."
    LIGHTHOUSE_OUTPUT=$(npx --yes lighthouse http://localhost:3000 \
      --output=json \
      --chrome-flags="--headless --no-sandbox --disable-gpu" \
      --only-categories=performance,accessibility,best-practices,seo \
      --quiet 2>/dev/null) || true

    if [ -n "$LIGHTHOUSE_OUTPUT" ]; then
      PERF=$(echo "$LIGHTHOUSE_OUTPUT" | node -pe "Math.round(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).categories.performance.score*100)" 2>/dev/null || echo "")
      A11Y=$(echo "$LIGHTHOUSE_OUTPUT" | node -pe "Math.round(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).categories.accessibility.score*100)" 2>/dev/null || echo "")
      BP=$(echo "$LIGHTHOUSE_OUTPUT" | node -pe "Math.round(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).categories['best-practices'].score*100)" 2>/dev/null || echo "")
      SEO_SCORE=$(echo "$LIGHTHOUSE_OUTPUT" | node -pe "Math.round(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).categories.seo.score*100)" 2>/dev/null || echo "")

      if [ -n "$PERF" ] && [ -n "$A11Y" ] && [ -n "$BP" ] && [ -n "$SEO_SCORE" ]; then
        echo "  Performance:    ${PERF}/100"
        echo "  Accessibility:  ${A11Y}/100"
        echo "  Best Practices: ${BP}/100"
        echo "  SEO:            ${SEO_SCORE}/100"

        LIGHTHOUSE_FAIL=0
        for score_name in "Performance:$PERF" "Accessibility:$A11Y" "Best Practices:$BP" "SEO:$SEO_SCORE"; do
          name="${score_name%%:*}"
          val="${score_name##*:}"
          if [ "$val" -lt 80 ]; then
            fail "Lighthouse $name score is $val (minimum: 80)"
            LIGHTHOUSE_FAIL=1
          elif [ "$val" -lt 90 ]; then
            warn "Lighthouse $name score is $val (target: 90+)"
          fi
        done
        if [ "$LIGHTHOUSE_FAIL" -eq 0 ]; then
          pass "Lighthouse scores all above 80"
        fi
      else
        warn "Could not parse Lighthouse output"
      fi
    else
      warn "Lighthouse run produced no output"
    fi
  else
    warn "npx not available — skipping Lighthouse"
  fi
else
  warn "No server running on localhost:3000 — skipping Lighthouse (start dev server first)"
fi

# --- Check 9: Screenshot capture ---
echo ""
echo -e "${bold}[12/$TOTAL_CHECKS] Screenshot capture${reset}"
# SCRIPT_DIR already captured at top of script
# Start a dev server if one isn't running, then capture screenshots
STARTED_SERVER=0
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
  echo "  Starting dev server for screenshot capture..."
  npm run dev -- --port 3000 > /tmp/qa-dev-server.log 2>&1 &
  DEV_PID=$!
  STARTED_SERVER=1
  # Wait for server to be ready (max 30 seconds)
  for i in $(seq 1 30); do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
      break
    fi
    sleep 1
  done
fi

if [ -f "$SCRIPT_DIR/screenshots.sh" ]; then
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
    bash "$SCRIPT_DIR/screenshots.sh" "$(pwd)" 2>/dev/null && \
      pass "Screenshots captured to screenshots/ directory" || \
      warn "Screenshot capture failed (non-blocking)"
  else
    warn "Server failed to start — skipping screenshots"
  fi
else
  warn "screenshots.sh not found — skipping screenshot capture"
fi

# Clean up dev server if we started it
if [ "$STARTED_SERVER" -eq 1 ] && [ -n "$DEV_PID" ]; then
  kill "$DEV_PID" 2>/dev/null || true
  wait "$DEV_PID" 2>/dev/null || true
fi

# --- Check 10: Registry validation ---
echo ""
echo -e "${bold}[13/$TOTAL_CHECKS] Registry validation${reset}"
# SLUG already captured at top of script
REGISTRY_FILE="$(cd "$SCRIPT_DIR/.." && pwd)/registry.json"

if [ -f "$REGISTRY_FILE" ]; then
  if command -v node &> /dev/null; then
    REGISTRY_CHECK=$(node -e "
      const reg = JSON.parse(require('fs').readFileSync('$REGISTRY_FILE', 'utf8'));
      const entry = reg.sites.find(s => s.slug === '$SLUG');
      if (!entry) { console.log('NOT_FOUND'); process.exit(0); }
      const required = ['slug','business','trade','location','archetype','palette','hero','signatureMoves','fonts','repo','date','status'];
      const recommended = ['sectionOrder','animationPatterns'];
      const missing = required.filter(f => !entry[f]);
      const missingRec = recommended.filter(f => !entry[f]);
      if (missing.length) console.log('MISSING:' + missing.join(','));
      else if (missingRec.length) console.log('WARN:' + missingRec.join(','));
      else console.log('OK');
    " 2>/dev/null || echo "ERROR")

    case "$REGISTRY_CHECK" in
      OK)
        pass "Registry entry for '$SLUG' has all required fields"
        ;;
      NOT_FOUND)
        warn "No registry entry found for '$SLUG' — add before deploy"
        ;;
      MISSING:*)
        fail "Registry entry missing required fields: ${REGISTRY_CHECK#MISSING:}"
        ;;
      WARN:*)
        pass "Registry entry has required fields"
        warn "Registry entry missing recommended fields: ${REGISTRY_CHECK#WARN:}"
        ;;
      *)
        warn "Could not validate registry"
        ;;
    esac
  else
    warn "Node.js not available — skipping registry validation"
  fi
else
  warn "registry.json not found at $REGISTRY_FILE"
fi

# --- Check 14: Signature move detection ---
echo ""
echo -e "${bold}[14/$TOTAL_CHECKS] Signature move detection${reset}"
if [ -f "$BRIEF_FILE" ]; then
  # Extract signature moves from brief (lines under "Signature moves" field)
  SIG_MOVES=$(awk '
    /\*\*Signature moves?\*\*/ { found=1; next }
    found && /^- \*\*/ { found=0 }
    found && /^[[:space:]]*- / { print }
    found && /^[[:space:]]*$/ { found=0 }
  ' "$BRIEF_FILE" 2>/dev/null || true)

  if [ -n "$SIG_MOVES" ]; then
    SIG_MISSING=0
    while IFS= read -r move; do
      # Strip leading whitespace and "- " prefix
      move_text=$(echo "$move" | sed 's/^[[:space:]]*- //' | sed 's/^[[:space:]]*//')
      [ -z "$move_text" ] && continue

      # Extract 2-3 keywords: split on spaces/hyphens, take meaningful words (4+ chars)
      keywords=$(echo "$move_text" | tr '[:upper:]' '[:lower:]' | tr ' /-' '\n' | awk 'length >= 4 && !/^(with|from|that|this|into|have|been|will|each|than|more|over|also|they|them|their|when|what|were|your|card|cards)$/' | head -3)

      if [ -z "$keywords" ]; then
        continue
      fi

      # Search for any keyword in source files
      KEYWORD_FOUND=0
      while IFS= read -r kw; do
        [ -z "$kw" ] && continue
        if grep -rli "$kw" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.css" --include="*.jsx" 2>/dev/null | head -1 > /dev/null 2>&1; then
          MATCH=$(grep -rli "$kw" "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.css" --include="*.jsx" 2>/dev/null | head -1)
          if [ -n "$MATCH" ]; then
            KEYWORD_FOUND=1
            break
          fi
        fi
      done <<< "$keywords"

      if [ "$KEYWORD_FOUND" -eq 0 ]; then
        warn "Signature move may be missing: \"$move_text\" (no keyword matches in source)"
        SIG_MISSING=$((SIG_MISSING + 1))
      fi
    done <<< "$SIG_MOVES"
    if [ "$SIG_MISSING" -eq 0 ]; then
      pass "All signature moves have matching keywords in source"
    fi
  else
    warn "Could not extract signature moves from brief"
  fi
else
  warn "No brief — skipping signature move detection"
fi

# --- Check 15: Emoji ban ---
echo ""
echo -e "${bold}[15/$TOTAL_CHECKS] Emoji ban${reset}"
# Search for common emoji Unicode ranges in .tsx/.ts source files
# Covers most emoji blocks: emoticons, dingbats, transport/map symbols, misc symbols,
# supplemental symbols, flags, skin tone modifiers, etc.
EMOJI_FILES=$(grep -rlP '[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}\x{1F1E0}-\x{1F1FF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{1F900}-\x{1F9FF}\x{1FA00}-\x{1FA6F}\x{1FA70}-\x{1FAFF}]' "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" 2>/dev/null || true)
if [ -n "$EMOJI_FILES" ]; then
  EMOJI_COUNT=$(echo "$EMOJI_FILES" | wc -l | tr -d ' ')
  warn "Emoji characters found in $EMOJI_COUNT file(s):"
  echo "$EMOJI_FILES" | while read -r f; do echo "       $f"; done
else
  pass "No emoji characters found in source files"
fi

# --- Check 16: Layout variety ---
echo ""
echo -e "${bold}[16/$TOTAL_CHECKS] Layout variety${reset}"
HOME_SECTIONS_DIR="$COMP_DIR/home"
if [ -d "$HOME_SECTIONS_DIR" ]; then
  SECTION_COUNT=$(ls "$HOME_SECTIONS_DIR"/*.tsx 2>/dev/null | wc -l | tr -d ' ')
  if [ "$SECTION_COUNT" -gt 0 ]; then
    # Count sections using max-w-7xl
    MAX_W_7XL_COUNT=$(grep -l "max-w-7xl" "$HOME_SECTIONS_DIR"/*.tsx 2>/dev/null | wc -l | tr -d ' ')
    if [ "$MAX_W_7XL_COUNT" -eq "$SECTION_COUNT" ] && [ "$SECTION_COUNT" -gt 2 ]; then
      warn "All $SECTION_COUNT homepage sections use max-w-7xl — vary container widths for visual interest"
    else
      pass "Container width variety OK ($MAX_W_7XL_COUNT/$SECTION_COUNT sections use max-w-7xl)"
    fi

    # Count sections that center headings (text-center on h1/h2/h3 or parent div)
    CENTER_HEADING_COUNT=$(grep -l "text-center" "$HOME_SECTIONS_DIR"/*.tsx 2>/dev/null | wc -l | tr -d ' ')
    if [ "$CENTER_HEADING_COUNT" -gt 3 ]; then
      warn "$CENTER_HEADING_COUNT sections use text-center — vary heading alignment for layout diversity"
    else
      pass "Heading alignment variety OK ($CENTER_HEADING_COUNT sections use text-center)"
    fi
  else
    warn "No .tsx files found in $HOME_SECTIONS_DIR"
  fi
else
  warn "No home sections directory at $HOME_SECTIONS_DIR — skipping layout variety check"
fi

# --- Check 17: Visual review gate ---
echo ""
echo -e "${bold}[17/$TOTAL_CHECKS] Visual review gate${reset}"
if [ -f ".screenshots/APPROVED" ]; then
  pass "Visual review approved (.screenshots/APPROVED exists)"
else
  echo ""
  echo -e "${yellow}${bold}  ╔══════════════════════════════════════════════════════════════╗${reset}"
  echo -e "${yellow}${bold}  ║  ⚠ VISUAL REVIEW REQUIRED                                  ║${reset}"
  echo -e "${yellow}${bold}  ║  Run visual review checklist and create                     ║${reset}"
  echo -e "${yellow}${bold}  ║  .screenshots/APPROVED to proceed                           ║${reset}"
  echo -e "${yellow}${bold}  ╚══════════════════════════════════════════════════════════════╝${reset}"
  echo ""
  warn "Visual review not yet approved — run visual review checklist"
fi

# --- Check 18: Profile/Typography system check ---
echo ""
echo -e "${bold}[18/$TOTAL_CHECKS] Profile/Typography system check${reset}"
PROFILE_CSS=""
TYPO_CSS=""
if [ -d "src/styles" ]; then
  STYLE_DIR="src/styles"
elif [ -d "styles" ]; then
  STYLE_DIR="styles"
else
  STYLE_DIR=""
fi

PROFILE_TYPO_ISSUES=0
if [ -n "$STYLE_DIR" ]; then
  if [ -f "$STYLE_DIR/typography.css" ]; then
    pass "Typography system found at $STYLE_DIR/typography.css"
  else
    warn "No typography.css found at $STYLE_DIR/typography.css — design system may be incomplete"
    PROFILE_TYPO_ISSUES=1
  fi
  if [ -f "$STYLE_DIR/profile.css" ]; then
    pass "Archetype profile found at $STYLE_DIR/profile.css"
  else
    warn "No profile.css found at $STYLE_DIR/profile.css — design system may be incomplete"
    PROFILE_TYPO_ISSUES=1
  fi
else
  # Also check for these in src/app/ or root-level alternatives
  if [ -f "src/styles/typography.css" ] || [ -f "src/app/typography.css" ]; then
    pass "Typography system found"
  else
    warn "No typography.css found — design system may be incomplete"
    PROFILE_TYPO_ISSUES=1
  fi
  if [ -f "src/styles/profile.css" ] || [ -f "src/app/profile.css" ]; then
    pass "Archetype profile found"
  else
    warn "No profile.css found — design system may be incomplete"
    PROFILE_TYPO_ISSUES=1
  fi
fi
if [ "$PROFILE_TYPO_ISSUES" -eq 0 ] && [ -z "$STYLE_DIR" ]; then
  pass "Profile and typography system files present"
fi

# --- Check 19: Colour token hygiene ---
echo ""
echo -e "${bold}[19/$TOTAL_CHECKS] Colour token hygiene${reset}"
COLOUR_ISSUES=0

# 19a: Hardcoded OKLCH values in components (should use var(--clr-*) or color-mix())
HARDCODED_OKLCH=$(grep -rn "oklch(" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" 2>/dev/null || true)
if [ -n "$HARDCODED_OKLCH" ]; then
  OKLCH_COUNT=$(echo "$HARDCODED_OKLCH" | wc -l | tr -d ' ')
  warn "Found $OKLCH_COUNT hardcoded oklch() value(s) in components — use CSS variables instead:"
  echo "$HARDCODED_OKLCH" | head -5 | while read -r line; do echo "       $line"; done
  COLOUR_ISSUES=$((COLOUR_ISSUES + 1))
fi

# 19b: Hex colour values in source (should use OKLCH tokens)
HEX_COLOURS=$(grep -rn '#[0-9a-fA-F]\{6\}' "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" 2>/dev/null | grep -v "node_modules" || true)
if [ -n "$HEX_COLOURS" ]; then
  HEX_COUNT=$(echo "$HEX_COLOURS" | wc -l | tr -d ' ')
  warn "Found $HEX_COUNT hex colour value(s) — use OKLCH tokens instead:"
  echo "$HEX_COLOURS" | head -5 | while read -r line; do echo "       $line"; done
  COLOUR_ISSUES=$((COLOUR_ISSUES + 1))
fi

# 19c: rgba/hsla values in source (should use OKLCH tokens)
LEGACY_COLOURS=$(grep -rn 'rgba\|hsla' "$APP_DIR/" "$COMP_DIR/" --include="*.tsx" --include="*.ts" --include="*.jsx" 2>/dev/null | grep -v "node_modules" || true)
if [ -n "$LEGACY_COLOURS" ]; then
  LEGACY_COUNT=$(echo "$LEGACY_COLOURS" | wc -l | tr -d ' ')
  warn "Found $LEGACY_COUNT rgba/hsla value(s) — use OKLCH tokens instead:"
  echo "$LEGACY_COLOURS" | head -5 | while read -r line; do echo "       $line"; done
  COLOUR_ISSUES=$((COLOUR_ISSUES + 1))
fi

# 19d: Hardcoded OKLCH in archetype.css keyframes (should use color-mix())
if [ -n "$STYLE_DIR" ] && [ -f "$STYLE_DIR/archetype.css" ]; then
  ARCHETYPE_HARDCODED=$(grep -n "oklch(" "$STYLE_DIR/archetype.css" 2>/dev/null | grep -v "var(" || true)
  if [ -n "$ARCHETYPE_HARDCODED" ]; then
    ARCH_COUNT=$(echo "$ARCHETYPE_HARDCODED" | wc -l | tr -d ' ')
    warn "Found $ARCH_COUNT hardcoded oklch() in archetype.css — use color-mix(in oklch, var(--clr-*) %, transparent):"
    echo "$ARCHETYPE_HARDCODED" | while read -r line; do echo "       $line"; done
    COLOUR_ISSUES=$((COLOUR_ISSUES + 1))
  fi
fi

# 19e: colour-tokens.css exists and has all required tokens
if [ -n "$STYLE_DIR" ] && [ -f "$STYLE_DIR/colour-tokens.css" ]; then
  REQUIRED_TOKENS=("--clr-primary:" "--clr-primary-light:" "--clr-primary-muted:" "--clr-accent:" "--clr-accent-muted:" "--clr-surface-1:" "--clr-surface-2:" "--clr-surface-3:" "--clr-surface-4:" "--clr-text-primary:" "--clr-text-secondary:" "--clr-text-muted:")
  MISSING_TOKENS=0
  for token in "${REQUIRED_TOKENS[@]}"; do
    if ! grep -qF -- "$token" "$STYLE_DIR/colour-tokens.css" 2>/dev/null; then
      fail "Missing colour token: $token in colour-tokens.css"
      MISSING_TOKENS=$((MISSING_TOKENS + 1))
    fi
  done
  if [ "$MISSING_TOKENS" -eq 0 ]; then
    pass "All 12 required colour tokens present in colour-tokens.css"
  fi
else
  warn "No colour-tokens.css found — colour system may be incomplete"
  COLOUR_ISSUES=$((COLOUR_ISSUES + 1))
fi

# 19f: palette.ts exists (single source of truth for OG images / server components)
if [ -f "src/lib/palette.ts" ]; then
  pass "palette.ts found — OG images can import colours from single source"
else
  warn "No src/lib/palette.ts — OG images may hardcode hex values. Run generate-palette.mjs."
  COLOUR_ISSUES=$((COLOUR_ISSUES + 1))
fi

if [ "$COLOUR_ISSUES" -eq 0 ]; then
  pass "Colour token hygiene clean — no hardcoded values found"
fi

# --- Check 20: WCAG contrast validation ---
echo ""
echo -e "${bold}[20/$TOTAL_CHECKS] WCAG contrast validation${reset}"
CONTRAST_SCRIPT="$SCRIPT_DIR/check-contrast.mjs"
if [ -f "$CONTRAST_SCRIPT" ] && [ -n "$STYLE_DIR" ] && [ -f "$STYLE_DIR/colour-tokens.css" ]; then
  CONTRAST_OUTPUT=$(node "$CONTRAST_SCRIPT" "$STYLE_DIR/colour-tokens.css" 2>&1) || true
  CONTRAST_EXIT=$?
  # Print each line with proper indentation
  echo "$CONTRAST_OUTPUT" | while read -r line; do
    if echo "$line" | grep -q "^FAIL"; then
      fail "$line"
    elif echo "$line" | grep -q "^WARN"; then
      warn "$line"
    elif echo "$line" | grep -q "^PASS"; then
      pass "$line"
    elif [ -n "$line" ]; then
      echo "  $line"
    fi
  done
  if [ "$CONTRAST_EXIT" -ne 0 ]; then
    fail "WCAG contrast check failed — text may be unreadable on some backgrounds"
  fi
elif [ ! -f "$CONTRAST_SCRIPT" ]; then
  warn "check-contrast.mjs not found — skipping WCAG contrast validation"
else
  warn "No colour-tokens.css found — skipping WCAG contrast validation"
fi

# --- Summary ---
echo ""
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
if [ "$FAIL" -gt 0 ]; then
  echo -e "${red}${bold}  FAILED: $FAIL critical issue(s), $WARN warning(s)${reset}"
  echo -e "  ${red}DO NOT DEPLOY until failures are resolved.${reset}"
  echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
  exit 1
else
  echo -e "${green}${bold}  PASSED: 0 failures, $WARN warning(s)${reset}"
  if [ "$WARN" -gt 0 ]; then
    echo -e "  ${yellow}Warnings should be addressed before going live.${reset}"
  fi
  echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
  exit 0
fi
