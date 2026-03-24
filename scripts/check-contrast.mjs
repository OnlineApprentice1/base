#!/usr/bin/env node

/**
 * check-contrast.mjs — WCAG contrast ratio checker for OKLCH colour tokens
 *
 * Reads colour-tokens.css, extracts OKLCH values, converts to relative
 * luminance, and checks WCAG AA (4.5:1) and AAA (7:1) contrast ratios
 * for critical text-on-surface pairs.
 *
 * Usage:
 *   node scripts/check-contrast.mjs <path-to-colour-tokens.css>
 *
 * Exit codes:
 *   0 = all required pairs pass WCAG AA
 *   1 = one or more critical pairs fail WCAG AA
 */

import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node check-contrast.mjs <path-to-colour-tokens.css>");
  process.exit(1);
}

let css;
try {
  css = readFileSync(file, "utf-8");
} catch {
  console.error(`Error: Cannot read ${file}`);
  process.exit(1);
}

// ─── Parse OKLCH values from CSS ───────────────────────────────────
function parseTokens(css) {
  const tokens = {};
  // Match: --clr-token-name: oklch(L% C H);
  const re = /--clr-([\w-]+)\s*:\s*oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/g;
  let match;
  while ((match = re.exec(css)) !== null) {
    const name = match[1];
    const l = parseFloat(match[2]) / (match[2].includes(".") && parseFloat(match[2]) <= 1 ? 1 : 100);
    const c = parseFloat(match[3]);
    const h = parseFloat(match[4]);
    tokens[name] = { l: l > 1 ? l / 100 : l, c, h };
  }
  return tokens;
}

// ─── OKLCH → sRGB → Relative Luminance ────────────────────────────
function oklchToLinearRGB(l, c, h) {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const lms_l = l_ * l_ * l_;
  const lms_m = m_ * m_ * m_;
  const lms_s = s_ * s_ * s_;

  let r =  4.0767416621 * lms_l - 3.3077115913 * lms_m + 0.2309699292 * lms_s;
  let g = -1.2684380046 * lms_l + 2.6097574011 * lms_m - 0.3413193965 * lms_s;
  let bl = -0.0041960863 * lms_l - 0.7034186147 * lms_m + 1.7076147010 * lms_s;

  return { r: Math.max(0, Math.min(1, r)), g: Math.max(0, Math.min(1, g)), b: Math.max(0, Math.min(1, bl)) };
}

function relativeLuminance(linearR, linearG, linearB) {
  return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
}

function contrastRatio(lum1, lum2) {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(token) {
  const rgb = oklchToLinearRGB(token.l, token.c, token.h);
  return relativeLuminance(rgb.r, rgb.g, rgb.b);
}

// ─── Token pairs to check ──────────────────────────────────────────
// [foreground, background, minRatio, label]
const CRITICAL_PAIRS = [
  ["text-primary",   "surface-1", 4.5, "Body text on page background"],
  ["text-primary",   "surface-2", 4.5, "Body text on card background"],
  ["text-secondary", "surface-1", 4.5, "Secondary text on page background"],
  ["text-secondary", "surface-2", 3.0, "Secondary text on card background"],
  ["text-muted",     "surface-1", 3.0, "Muted text on page background"],
  ["primary",        "surface-1", 3.0, "Primary colour on page background"],
  ["accent",         "surface-1", 3.0, "Accent colour on page background"],
];

// Nice-to-have pairs (warn only, don't fail)
const RECOMMENDED_PAIRS = [
  ["text-primary",   "surface-3", 4.5, "Body text on elevated surface"],
  ["text-muted",     "surface-2", 3.0, "Muted text on card background"],
  ["primary-light",  "surface-1", 3.0, "Primary-light on page background"],
];

// ─── Run checks ────────────────────────────────────────────────────
const tokens = parseTokens(css);

const required = ["text-primary", "text-secondary", "text-muted", "surface-1", "surface-2", "primary", "accent"];
const missing = required.filter(t => !tokens[t]);
if (missing.length > 0) {
  console.error(`Missing tokens: ${missing.join(", ")}`);
  process.exit(1);
}

let failures = 0;
let warnings = 0;

function check(pairs, isCritical) {
  for (const [fg, bg, minRatio, label] of pairs) {
    if (!tokens[fg] || !tokens[bg]) continue;
    const fgLum = getLuminance(tokens[fg]);
    const bgLum = getLuminance(tokens[bg]);
    const ratio = contrastRatio(fgLum, bgLum);
    const pass = ratio >= minRatio;
    const level = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA-lg" : "FAIL";

    if (pass) {
      console.log(`PASS  ${ratio.toFixed(1)}:1 (${level}) — ${label}`);
    } else if (isCritical) {
      console.log(`FAIL  ${ratio.toFixed(1)}:1 (need ${minRatio}:1) — ${label}`);
      failures++;
    } else {
      console.log(`WARN  ${ratio.toFixed(1)}:1 (want ${minRatio}:1) — ${label}`);
      warnings++;
    }
  }
}

check(CRITICAL_PAIRS, true);
check(RECOMMENDED_PAIRS, false);

// ─── Summary ───────────────────────────────────────────────────────
console.log("");
if (failures > 0) {
  console.log(`CONTRAST: ${failures} failure(s), ${warnings} warning(s)`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`CONTRAST: All critical pairs pass, ${warnings} warning(s)`);
  process.exit(0);
} else {
  console.log(`CONTRAST: All pairs pass`);
  process.exit(0);
}
