#!/bin/bash
# Scaffold Script — automates project creation
# Usage: ./scripts/scaffold.sh <slug> <business-name>
# Example: ./scripts/scaffold.sh bluewater-pools "Bluewater Pools"
#
# Creates a new Next.js project with all standard deps and boilerplate.

set -e

# --- Args ---
SLUG="${1}"
BUSINESS_NAME="${2}"

if [ -z "$SLUG" ] || [ -z "$BUSINESS_NAME" ]; then
  echo "Usage: ./scripts/scaffold.sh <slug> <business-name>"
  echo "Example: ./scripts/scaffold.sh bluewater-pools \"Bluewater Pools\""
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_DIR="$BASE_DIR/projects/$SLUG"
TEMPLATES_DIR="$BASE_DIR/templates"

# Ensure PATH includes node
export PATH="/opt/homebrew/bin:$PATH"

# Colours
bold='\033[1m'
green='\033[0;32m'
red='\033[0;31m'
reset='\033[0m'

yellow='\033[0;33m'

pass() { echo -e "${green}✓${reset} $1"; }
fail() { echo -e "${red}✗${reset} $1"; exit 1; }
warn() { echo -e "${yellow}⚠${reset} $1"; }

echo ""
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo -e "${bold}  SCAFFOLD — $BUSINESS_NAME${reset}"
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo ""

# --- Check project doesn't already exist ---
if [ -d "$PROJECT_DIR" ]; then
  fail "Project already exists at $PROJECT_DIR"
fi

# --- Step 1: Create Next.js app ---
echo -e "${bold}[1/6] Creating Next.js app...${reset}"
mkdir -p "$BASE_DIR/projects"
cd "$BASE_DIR/projects"
yes "" | npx create-next-app@latest "$SLUG" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack 2>/dev/null
pass "Next.js app created"

# --- Step 2: Install dependencies ---
echo ""
echo -e "${bold}[2/6] Installing dependencies...${reset}"
cd "$PROJECT_DIR"
npm install daisyui@5 framer-motion @tailwindcss/typography gray-matter remark remark-html resend lucide-react 2>/dev/null
pass "Dependencies installed"

# --- Step 3: Create site config ---
echo ""
echo -e "${bold}[3/6] Creating site config...${reset}"
mkdir -p src/config
cat > src/config/site.ts << SITEEOF
export const siteConfig = {
  name: "${BUSINESS_NAME}",
  tagline: "",
  description: "",
  url: "https://example.com",
  owner: "",
  phone: "",
  email: "",
  location: {
    city: "",
    province: "Ontario",
    serviceArea: "",
    mapEmbedUrl: "",
  },
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
} as const;
SITEEOF
pass "site.ts created (fill in details from brief)"

# --- Step 4: Copy boilerplate templates ---
echo ""
echo -e "${bold}[4/6] Copying boilerplate templates...${reset}"
if [ -d "$TEMPLATES_DIR" ]; then
  # Copy component templates
  if [ -d "$TEMPLATES_DIR/components" ]; then
    mkdir -p src/components
    cp "$TEMPLATES_DIR/components/"*.tsx src/components/ 2>/dev/null && \
      pass "Copied Reveal.tsx, StaggerGroup.tsx, Header.tsx, Footer.tsx" || true
  fi

  # Copy style templates (typography + colour tokens)
  if [ -d "$TEMPLATES_DIR/styles" ]; then
    mkdir -p src/styles
    cp "$TEMPLATES_DIR/styles/typography.css" src/styles/ 2>/dev/null && \
      pass "Copied typography.css (fluid type scale)" || true
    cp "$TEMPLATES_DIR/styles/colour-tokens.css" src/styles/ 2>/dev/null && \
      pass "Copied colour-tokens.css (fill in palette values)" || true
  fi

  # Copy effect components
  if [ -d "$TEMPLATES_DIR/components/effects" ]; then
    mkdir -p src/components/effects
    cp "$TEMPLATES_DIR/components/effects/"*.tsx src/components/effects/ 2>/dev/null && \
      pass "Copied effect components (WaveDivider, GradientSweep, etc.)" || true
  fi

  # Copy layout templates
  if [ -d "$TEMPLATES_DIR/layouts" ]; then
    mkdir -p src/components/layouts
    cp "$TEMPLATES_DIR/layouts/"*.tsx src/components/layouts/ 2>/dev/null && \
      pass "Copied layout templates (SectionBentoGrid, SectionFullBleed, etc.)" || true
  fi

  # Copy app templates (with placeholder replacement)
  for template_file in "$TEMPLATES_DIR/app/"**/page.tsx "$TEMPLATES_DIR/app/"*.ts "$TEMPLATES_DIR/app/"*.tsx; do
    if [ -f "$template_file" ]; then
      # Get relative path from templates/app/
      rel_path="${template_file#$TEMPLATES_DIR/app/}"
      target_dir="src/app/$(dirname "$rel_path")"
      mkdir -p "$target_dir"
      # Copy and replace placeholders
      sed -e "s/{{BUSINESS_NAME}}/${BUSINESS_NAME}/g" \
          -e "s/{{SLUG}}/${SLUG}/g" \
          "$template_file" > "src/app/$rel_path"
    fi
  done 2>/dev/null
  pass "Copied app templates"

  # Copy lib templates
  if [ -d "$TEMPLATES_DIR/lib" ]; then
    mkdir -p src/lib
    cp "$TEMPLATES_DIR/lib/"* src/lib/ 2>/dev/null && \
      pass "Copied lib utilities (blog, palette)" || true
  fi

  # Copy public templates
  if [ -d "$TEMPLATES_DIR/public" ]; then
    sed -e "s/{{BUSINESS_NAME}}/${BUSINESS_NAME}/g" \
        -e "s/{{SLUG}}/${SLUG}/g" \
        "$TEMPLATES_DIR/public/llms.txt" > public/llms.txt 2>/dev/null && \
      pass "Copied llms.txt" || true
  fi
else
  echo "  No templates directory found at $TEMPLATES_DIR — skipping boilerplate copy"
  echo "  (Create templates/ to automate this in future builds)"
fi

# --- Step 5: Create GitHub repo ---
echo ""
echo -e "${bold}[5/6] Creating GitHub repo...${reset}"
export GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes'

if command -v gh &> /dev/null; then
  gh repo create "OnlineApprentice1/$SLUG" --public --source=. --remote=origin 2>/dev/null && \
    pass "GitHub repo created: OnlineApprentice1/$SLUG" || \
    warn "GitHub repo creation failed — create manually"
else
  echo "  gh CLI not found — create repo manually"
fi

# --- Step 6: Verify build ---
echo ""
echo -e "${bold}[6/6] Verifying build...${reset}"
if npm run build > /tmp/scaffold-build.log 2>&1; then
  pass "npm run build succeeded"
else
  echo "  Build failed — check /tmp/scaffold-build.log"
  echo "  This is expected if globals.css hasn't been configured yet"
fi

# --- Done ---
echo ""
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo -e "${green}${bold}  SCAFFOLD COMPLETE${reset}"
echo -e "  Project: $PROJECT_DIR"
echo -e "  Next: Copy the correct profile (warm/cool/earth/bold) to src/styles/profile.css"
echo -e "  Then: Run generate-palette.mjs to fill colour-tokens.css + palette.ts + DaisyUI theme"
echo -e "  Then: Fill in site.ts, configure globals.css, start Phase 2"
echo -e "${bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
