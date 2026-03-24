#!/bin/bash
# Screenshot Capture Script
# Usage: ./scripts/screenshots.sh <project-dir>
# Captures screenshots at key viewports for visual review.
# Requires: npx playwright (auto-installed on first run)
#
# Output: <project-dir>/screenshots/*.png

set -e

PROJECT_DIR="${1:-.}"
SCREENSHOTS_DIR="$PROJECT_DIR/screenshots"
BASE_URL="http://localhost:3000"

# Check if server is running
if ! curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" 2>/dev/null | grep -q "200"; then
  echo "Error: No server running at $BASE_URL"
  echo "Start the dev server first: cd $PROJECT_DIR && npm run dev"
  exit 1
fi

# Create screenshots directory
mkdir -p "$SCREENSHOTS_DIR"

# Viewports to capture
VIEWPORTS="375 768 1024 1440"

# Pages to capture
PAGES="/ /fleet /services /about /contact"

echo "Capturing screenshots..."

# Use Playwright to capture screenshots
npx --yes playwright install chromium 2>/dev/null || true

for page in $PAGES; do
  PAGE_NAME=$(echo "$page" | sed 's/^\///' | sed 's/\//-/g')
  if [ -z "$PAGE_NAME" ]; then
    PAGE_NAME="home"
  fi

  for width in $VIEWPORTS; do
    OUTPUT_FILE="$SCREENSHOTS_DIR/${PAGE_NAME}-${width}px.png"

    npx --yes playwright screenshot \
      --browser chromium \
      --viewport-size="${width},900" \
      --full-page \
      "${BASE_URL}${page}" \
      "$OUTPUT_FILE" 2>/dev/null

    if [ -f "$OUTPUT_FILE" ]; then
      echo "  Captured: ${PAGE_NAME}-${width}px.png"
    fi
  done
done

echo ""
echo "Screenshots saved to: $SCREENSHOTS_DIR/"
echo "Review these before deploying."
