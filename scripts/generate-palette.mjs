#!/usr/bin/env node

/**
 * generate-palette.mjs — Deterministic palette generator
 *
 * Generates 13 OKLCH colour tokens + 4 gradient presets + DaisyUI theme
 * block + palette.ts from brief inputs.
 *
 * Usage:
 *   node scripts/generate-palette.mjs --family cool --primary-hue 240 --accent-hue 175 --mood energetic --name volt
 *   node scripts/generate-palette.mjs --family bold --primary-hue 30 --mood rugged --name ironflow
 *   node scripts/generate-palette.mjs --family warm --primary-hue 55 --accent-hue auto --mood premium --name example
 *
 * Options:
 *   --family        warm | cool | earth | bold (required)
 *   --primary-hue   0-360 OKLCH hue angle (required)
 *   --accent-hue    0-360 or "auto" (default: auto — primary + 55°)
 *   --mood          calm | energetic | premium | rugged | friendly | modern | trustworthy | creative (required)
 *   --name          Theme name for DaisyUI (required)
 *   --output-dir    Write files to this directory (optional — prints to stdout if omitted)
 *   --light         Also generate light theme variant (flag)
 */

// ─── Argument parsing ──────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return args[idx + 1];
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const family = getArg("family");
const primaryHue = parseFloat(getArg("primary-hue"));
let accentHue = getArg("accent-hue") || "auto";
const mood = getArg("mood");
const name = getArg("name");
const outputDir = getArg("output-dir");
const generateLight = hasFlag("light");

if (!family || isNaN(primaryHue) || !mood || !name) {
  console.error(`Usage: node generate-palette.mjs --family <warm|cool|earth|bold> --primary-hue <0-360> --mood <mood> --name <theme-name>`);
  console.error(`       [--accent-hue <0-360|auto>] [--output-dir <path>] [--light]`);
  process.exit(1);
}

if (!["warm", "cool", "earth", "bold"].includes(family)) {
  console.error(`Error: --family must be one of: warm, cool, earth, bold`);
  process.exit(1);
}

const VALID_MOODS = ["calm", "energetic", "premium", "rugged", "friendly", "modern", "trustworthy", "creative"];
if (!VALID_MOODS.includes(mood)) {
  console.error(`Error: --mood must be one of: ${VALID_MOODS.join(", ")}`);
  process.exit(1);
}

// ─── Mood → design parameter mapping ───────────────────────────────
const MOOD_PARAMS = {
  calm:        { lightness: 0.50, chroma: 0.14, accentLightness: 0.72, surfaceStart: 0.10, density: "spacious" },
  energetic:   { lightness: 0.60, chroma: 0.20, accentLightness: 0.78, surfaceStart: 0.12, density: "mixed" },
  premium:     { lightness: 0.48, chroma: 0.15, accentLightness: 0.70, surfaceStart: 0.09, density: "spacious" },
  rugged:      { lightness: 0.58, chroma: 0.22, accentLightness: 0.76, surfaceStart: 0.12, density: "dense" },
  friendly:    { lightness: 0.60, chroma: 0.17, accentLightness: 0.75, surfaceStart: 0.11, density: "standard" },
  modern:      { lightness: 0.55, chroma: 0.16, accentLightness: 0.73, surfaceStart: 0.11, density: "systematic" },
  trustworthy: { lightness: 0.55, chroma: 0.15, accentLightness: 0.72, surfaceStart: 0.11, density: "standard" },
  creative:    { lightness: 0.58, chroma: 0.20, accentLightness: 0.78, surfaceStart: 0.12, density: "asymmetric" },
};

// ─── Family → surface hue mapping ──────────────────────────────────
function getSurfaceHue(family, primaryHue) {
  switch (family) {
    case "warm": return 260;  // cool neutral for contrast
    case "cool": return primaryHue;  // tinted surfaces
    case "earth": return 250;  // neutral cool
    case "bold": return 260;   // cool neutral for contrast
  }
}

// ─── Auto accent hue calculation ───────────────────────────────────
function calculateAccentHue(primaryHue, family) {
  const offsets = { warm: 55, cool: -65, earth: 60, bold: 55 };
  let accent = (primaryHue + offsets[family]) % 360;
  if (accent < 0) accent += 360;

  // Ensure minimum 40° separation
  const sep = Math.min(Math.abs(accent - primaryHue), 360 - Math.abs(accent - primaryHue));
  if (sep < 40) {
    accent = (primaryHue + 60) % 360;
  }
  return Math.round(accent);
}

if (accentHue === "auto") {
  accentHue = calculateAccentHue(primaryHue, family);
} else {
  accentHue = parseFloat(accentHue);
  // Validate minimum separation
  const sep = Math.min(Math.abs(accentHue - primaryHue), 360 - Math.abs(accentHue - primaryHue));
  if (sep < 40) {
    console.error(`Warning: primary-accent hue separation is ${sep.toFixed(0)}° (minimum 40°). Adjusting accent.`);
    accentHue = calculateAccentHue(primaryHue, family);
  }
}

// ─── Generate 13 dark-theme tokens ─────────────────────────────────
const mp = MOOD_PARAMS[mood];
const surfaceHue = getSurfaceHue(family, primaryHue);

// Enforce chroma minimums (Rule 4b)
const primaryChroma = Math.max(mp.chroma, 0.12);
const accentChroma = Math.max(primaryChroma * 0.80, 0.12);

const tokens = {
  // Primary scale
  primary:      { l: mp.lightness,        c: primaryChroma,             h: primaryHue },
  primaryLight: { l: mp.lightness + 0.15, c: primaryChroma,             h: primaryHue },
  primaryMuted: { l: mp.lightness - 0.10, c: primaryChroma * 0.50,      h: primaryHue },

  // Accent scale
  accent:       { l: mp.accentLightness,       c: accentChroma,          h: accentHue },
  accentMuted:  { l: mp.accentLightness - 0.20, c: accentChroma * 0.60,  h: accentHue },

  // Surface scale (dark theme)
  surface1: { l: mp.surfaceStart,         c: 0.010, h: surfaceHue },
  surface2: { l: mp.surfaceStart + 0.04,  c: 0.015, h: surfaceHue },
  surface3: { l: mp.surfaceStart + 0.12,  c: 0.020, h: surfaceHue },
  surface4: { l: mp.surfaceStart + 0.18,  c: 0.025, h: surfaceHue },

  // Text scale
  textPrimary:   { l: 0.95, c: 0.005, h: primaryHue },
  textSecondary: { l: 0.75, c: 0.020, h: primaryHue },
  textMuted:     { l: 0.55, c: 0.020, h: surfaceHue },
};

// ─── Generate light theme tokens ───────────────────────────────────
const lightTokens = {
  // Primary: darken for contrast on white
  primary:      { l: Math.max(mp.lightness - 0.10, 0.35), c: primaryChroma + 0.02, h: primaryHue },
  primaryLight: { l: Math.max(mp.lightness - 0.05, 0.40), c: primaryChroma,        h: primaryHue },
  primaryMuted: { l: mp.lightness + 0.20,                  c: primaryChroma * 0.30, h: primaryHue },

  // Accent: darken slightly
  accent:       { l: Math.max(mp.accentLightness - 0.15, 0.45), c: accentChroma + 0.02, h: accentHue },
  accentMuted:  { l: mp.accentLightness + 0.05,                 c: accentChroma * 0.25, h: accentHue },

  // Surface scale (light theme — inverted)
  surface1: { l: 0.97, c: 0.005, h: surfaceHue },
  surface2: { l: 0.93, c: 0.008, h: surfaceHue },
  surface3: { l: 0.88, c: 0.012, h: surfaceHue },
  surface4: { l: 0.83, c: 0.015, h: surfaceHue },

  // Text scale (dark on light)
  textPrimary:   { l: 0.12, c: 0.010, h: primaryHue },
  textSecondary: { l: 0.35, c: 0.015, h: primaryHue },
  textMuted:     { l: 0.50, c: 0.015, h: surfaceHue },
};

// ─── OKLCH → sRGB hex conversion ───────────────────────────────────
function oklchToHex(l, c, h) {
  // OKLCH → OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // OKLab → LMS (cubed roots)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  // Cube to get LMS
  const lms_l = l_ * l_ * l_;
  const lms_m = m_ * m_ * m_;
  const lms_s = s_ * s_ * s_;

  // LMS → Linear sRGB
  let r =  4.0767416621 * lms_l - 3.3077115913 * lms_m + 0.2309699292 * lms_s;
  let g = -1.2684380046 * lms_l + 2.6097574011 * lms_m - 0.3413193965 * lms_s;
  let bl = -0.0041960863 * lms_l - 0.7034186147 * lms_m + 1.7076147010 * lms_s;

  // Linear sRGB → sRGB (gamma)
  function linearToSrgb(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  }

  r = linearToSrgb(r);
  g = linearToSrgb(g);
  bl = linearToSrgb(bl);

  // Clamp and convert to hex
  const toHex = (v) => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

function oklchToRgba(l, c, h, alpha) {
  const hex = oklchToHex(l, c, h);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Format helpers ────────────────────────────────────────────────
function oklchStr(t) {
  return `oklch(${(t.l * 100).toFixed(0)}% ${t.c.toFixed(t.c < 0.01 ? 3 : 2)} ${Math.round(t.h)})`;
}

function hexStr(t) {
  return oklchToHex(t.l, t.c, t.h);
}

// ─── Gradient presets (mood-aware) ─────────────────────────────────
function generateGradients(mood) {
  const gradConfigs = {
    calm:        { radialOp: 0.10, sweepOp: 0.00, spotOp: 0.00, meshOp: 0.00 },
    premium:     { radialOp: 0.10, sweepOp: 0.06, spotOp: 0.00, meshOp: 0.00 },
    energetic:   { radialOp: 0.18, sweepOp: 0.12, spotOp: 0.20, meshOp: 0.10 },
    rugged:      { radialOp: 0.18, sweepOp: 0.00, spotOp: 0.15, meshOp: 0.12 },
    friendly:    { radialOp: 0.14, sweepOp: 0.08, spotOp: 0.00, meshOp: 0.00 },
    modern:      { radialOp: 0.00, sweepOp: 0.10, spotOp: 0.00, meshOp: 0.00 },
    trustworthy: { radialOp: 0.10, sweepOp: 0.06, spotOp: 0.00, meshOp: 0.00 },
    creative:    { radialOp: 0.15, sweepOp: 0.10, spotOp: 0.18, meshOp: 0.08 },
  };
  return gradConfigs[mood];
}

const gc = generateGradients(mood);

// Sweep angle varies by mood
const sweepAngles = {
  calm: 90, premium: 120, energetic: 150, rugged: 135,
  friendly: 110, modern: 135, trustworthy: 120, creative: 145,
};
const sweepAngle = sweepAngles[mood];

// ─── Output: colour-tokens.css ─────────────────────────────────────
function generateColourTokensCSS(tokenSet, label) {
  const lines = [];
  if (label) lines.push(`/* ${label} */`);
  lines.push(`:root${label === "Light Theme" ? '[data-theme="light"]' : ""} {`);
  lines.push(`  /* PRIMARY SCALE */`);
  lines.push(`  --clr-primary:       ${oklchStr(tokenSet.primary)};`);
  lines.push(`  --clr-primary-light: ${oklchStr(tokenSet.primaryLight)};`);
  lines.push(`  --clr-primary-muted: ${oklchStr(tokenSet.primaryMuted)};`);
  lines.push(``);
  lines.push(`  /* ACCENT SCALE */`);
  lines.push(`  --clr-accent:        ${oklchStr(tokenSet.accent)};`);
  lines.push(`  --clr-accent-muted:  ${oklchStr(tokenSet.accentMuted)};`);
  lines.push(``);
  lines.push(`  /* SURFACE SCALE */`);
  lines.push(`  --clr-surface-1:     ${oklchStr(tokenSet.surface1)};`);
  lines.push(`  --clr-surface-2:     ${oklchStr(tokenSet.surface2)};`);
  lines.push(`  --clr-surface-3:     ${oklchStr(tokenSet.surface3)};`);
  lines.push(`  --clr-surface-4:     ${oklchStr(tokenSet.surface4)};`);
  lines.push(``);
  lines.push(`  /* TEXT SCALE */`);
  lines.push(`  --clr-text-primary:   ${oklchStr(tokenSet.textPrimary)};`);
  lines.push(`  --clr-text-secondary: ${oklchStr(tokenSet.textSecondary)};`);
  lines.push(`  --clr-text-muted:     ${oklchStr(tokenSet.textMuted)};`);

  // Gradients only for dark theme (primary)
  if (!label || label !== "Light Theme") {
    lines.push(``);
    lines.push(`  /* GRADIENT PRESETS */`);
    if (gc.radialOp > 0) {
      lines.push(`  --gradient-radial: radial-gradient(`);
      lines.push(`    ellipse at 50% 50%,`);
      lines.push(`    var(--clr-primary) / ${gc.radialOp},`);
      lines.push(`    transparent 60%`);
      lines.push(`  );`);
    } else {
      lines.push(`  --gradient-radial: none;`);
    }
    if (gc.sweepOp > 0) {
      lines.push(`  --gradient-sweep: linear-gradient(`);
      lines.push(`    ${sweepAngle}deg,`);
      lines.push(`    var(--clr-primary) / ${gc.sweepOp},`);
      lines.push(`    transparent 50%,`);
      lines.push(`    var(--clr-accent) / ${(gc.sweepOp * 0.75).toFixed(2)}`);
      lines.push(`  );`);
    } else {
      lines.push(`  --gradient-sweep: none;`);
    }
    if (gc.spotOp > 0) {
      lines.push(`  --gradient-spotlight: radial-gradient(`);
      lines.push(`    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),`);
      lines.push(`    var(--clr-primary) / ${gc.spotOp},`);
      lines.push(`    transparent 40%`);
      lines.push(`  );`);
    } else {
      lines.push(`  --gradient-spotlight: none;`);
    }
    if (gc.meshOp > 0) {
      lines.push(`  --gradient-mesh: conic-gradient(`);
      lines.push(`    from 180deg at 50% 50%,`);
      lines.push(`    var(--clr-primary) / ${gc.meshOp},`);
      lines.push(`    var(--clr-accent) / ${(gc.meshOp * 0.75).toFixed(2)},`);
      lines.push(`    var(--clr-primary) / ${gc.meshOp}`);
      lines.push(`  );`);
    } else {
      lines.push(`  --gradient-mesh: none;`);
    }
  }

  lines.push(`}`);
  return lines.join("\n");
}

// ─── Output: DaisyUI theme block ───────────────────────────────────
function generateDaisyUITheme(tokenSet, themeName, isLight = false) {
  const lines = [];
  lines.push(`@plugin "daisyui/theme" {`);
  lines.push(`  name: "${themeName}${isLight ? "-light" : ""}";`);
  lines.push(`  default: ${!isLight};`);
  lines.push(`  prefersdark: ${!isLight};`);
  lines.push(`  color-scheme: ${isLight ? "light" : "dark"};`);
  lines.push(``);
  lines.push(`  primary: ${oklchStr(tokenSet.primary)};`);
  lines.push(`  primary-content: ${isLight ? oklchStr({ l: 0.98, c: 0.005, h: tokenSet.primary.h }) : oklchStr({ l: 0.95, c: 0.005, h: tokenSet.primary.h })};`);
  lines.push(`  secondary: ${oklchStr(tokenSet.surface3)};`);
  lines.push(`  secondary-content: ${oklchStr(tokenSet.textPrimary)};`);
  lines.push(`  accent: ${oklchStr(tokenSet.accent)};`);
  lines.push(`  accent-content: ${isLight ? oklchStr({ l: 0.10, c: 0.01, h: tokenSet.accent.h }) : oklchStr({ l: 0.95, c: 0.005, h: tokenSet.accent.h })};`);
  lines.push(`  neutral: ${oklchStr(tokenSet.surface2)};`);
  lines.push(`  neutral-content: ${oklchStr(tokenSet.textSecondary)};`);
  lines.push(`  base-100: ${oklchStr(tokenSet.surface1)};`);
  lines.push(`  base-200: ${oklchStr(tokenSet.surface2)};`);
  lines.push(`  base-300: ${oklchStr(tokenSet.surface3)};`);
  lines.push(`  base-content: ${oklchStr(tokenSet.textPrimary)};`);
  lines.push(`}`);
  return lines.join("\n");
}

// ─── Output: palette.ts ────────────────────────────────────────────
function generatePaletteTS(tokenSet, lightTokenSet) {
  const entries = [
    ["primary",       tokenSet.primary],
    ["primaryLight",  tokenSet.primaryLight],
    ["primaryMuted",  tokenSet.primaryMuted],
    ["accent",        tokenSet.accent],
    ["accentMuted",   tokenSet.accentMuted],
    ["surface1",      tokenSet.surface1],
    ["surface2",      tokenSet.surface2],
    ["surface3",      tokenSet.surface3],
    ["surface4",      tokenSet.surface4],
    ["textPrimary",   tokenSet.textPrimary],
    ["textSecondary", tokenSet.textSecondary],
    ["textMuted",     tokenSet.textMuted],
  ];

  const lines = [];
  lines.push(`/**`);
  lines.push(` * Palette — Single source of truth for colour values`);
  lines.push(` *`);
  lines.push(` * Used by:`);
  lines.push(` * - opengraph-image.tsx (server-side, can't read CSS vars)`);
  lines.push(` * - Any server component needing colour values`);
  lines.push(` *`);
  lines.push(` * Generated by: scripts/generate-palette.mjs`);
  lines.push(` * CSS tokens in: src/styles/colour-tokens.css (keep in sync)`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`export const palette = {`);
  for (const [key, t] of entries) {
    lines.push(`  ${key}: { oklch: "${oklchStr(t)}", hex: "${hexStr(t)}" },`);
  }
  lines.push(`} as const;`);
  lines.push(``);

  if (lightTokenSet) {
    const lightEntries = [
      ["primary",       lightTokenSet.primary],
      ["primaryLight",  lightTokenSet.primaryLight],
      ["primaryMuted",  lightTokenSet.primaryMuted],
      ["accent",        lightTokenSet.accent],
      ["accentMuted",   lightTokenSet.accentMuted],
      ["surface1",      lightTokenSet.surface1],
      ["surface2",      lightTokenSet.surface2],
      ["surface3",      lightTokenSet.surface3],
      ["surface4",      lightTokenSet.surface4],
      ["textPrimary",   lightTokenSet.textPrimary],
      ["textSecondary", lightTokenSet.textSecondary],
      ["textMuted",     lightTokenSet.textMuted],
    ];
    lines.push(`export const paletteLight = {`);
    for (const [key, t] of lightEntries) {
      lines.push(`  ${key}: { oklch: "${oklchStr(t)}", hex: "${hexStr(t)}" },`);
    }
    lines.push(`} as const;`);
    lines.push(``);
  }

  // OG image gradients (hex-based for Satori compatibility)
  const s1Hex = hexStr(tokenSet.surface1);
  const s2Hex = hexStr(tokenSet.surface2);
  const s3Hex = hexStr(tokenSet.surface3);
  const primaryRgba02 = oklchToRgba(tokenSet.primary.l, tokenSet.primary.c, tokenSet.primary.h, 0.2);
  const accentRgba09 = oklchToRgba(tokenSet.accent.l, tokenSet.accent.c, tokenSet.accent.h, 0.9);
  const primaryRgba008 = oklchToRgba(tokenSet.primary.l, tokenSet.primary.c, tokenSet.primary.h, 0.08);

  lines.push(`/** OG image gradients — hex/rgba for Satori compatibility */`);
  lines.push(`export const ogGradients = {`);
  lines.push(`  background: "linear-gradient(150deg, ${s1Hex} 0%, ${s2Hex} 50%, ${s3Hex} 100%)",`);
  lines.push(`  glow: "radial-gradient(circle, ${primaryRgba02} 0%, transparent 60%)",`);
  lines.push(`  accentText: "${accentRgba09}",`);
  lines.push(`  gridLine: "${primaryRgba008}",`);
  lines.push(`} as const;`);
  lines.push(``);
  lines.push(`export type PaletteToken = keyof typeof palette;`);

  return lines.join("\n");
}

// ─── Output ────────────────────────────────────────────────────────
const darkCSS = generateColourTokensCSS(tokens);
const darkDaisyUI = generateDaisyUITheme(tokens, name);
const paletteTS = generatePaletteTS(tokens, generateLight ? lightTokens : null);

let lightCSS = "";
let lightDaisyUI = "";
if (generateLight) {
  lightCSS = generateColourTokensCSS(lightTokens, "Light Theme");
  lightDaisyUI = generateDaisyUITheme(lightTokens, name, true);
}

// ─── Write or print ────────────────────────────────────────────────
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

if (outputDir) {
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

  let cssContent = `/* Generated by generate-palette.mjs */\n/* Family: ${family} | Mood: ${mood} | Primary hue: ${primaryHue} | Accent hue: ${accentHue} */\n\n${darkCSS}`;
  if (generateLight) cssContent += `\n\n${lightCSS}`;
  writeFileSync(join(outputDir, "colour-tokens.css"), cssContent);

  let daisyContent = `/* DaisyUI theme — paste into globals.css */\n\n${darkDaisyUI}`;
  if (generateLight) daisyContent += `\n\n${lightDaisyUI}`;
  writeFileSync(join(outputDir, "daisyui-theme.css"), daisyContent);

  writeFileSync(join(outputDir, "palette.ts"), paletteTS);

  console.log(`✓ Written to ${outputDir}/`);
  console.log(`  - colour-tokens.css (${Object.keys(tokens).length} tokens${generateLight ? " + light variant" : ""})`);
  console.log(`  - daisyui-theme.css`);
  console.log(`  - palette.ts`);
} else {
  console.log("/* ═══════════════════════════════════════════════════════════ */");
  console.log(`/* PALETTE: ${name} | Family: ${family} | Mood: ${mood}        */`);
  console.log(`/* Primary hue: ${primaryHue} | Accent hue: ${accentHue}              */`);
  console.log("/* ═══════════════════════════════════════════════════════════ */\n");

  console.log("/* ── colour-tokens.css ── */\n");
  console.log(darkCSS);
  if (generateLight) {
    console.log("\n" + lightCSS);
  }

  console.log("\n\n/* ── DaisyUI theme (globals.css) ── */\n");
  console.log(darkDaisyUI);
  if (generateLight) {
    console.log("\n" + lightDaisyUI);
  }

  console.log("\n\n/* ── palette.ts ── */\n");
  console.log(paletteTS);
}

// ─── Validation report ─────────────────────────────────────────────
console.log("\n/* ── Validation ── */");
const hueSep = Math.min(Math.abs(accentHue - primaryHue), 360 - Math.abs(accentHue - primaryHue));
const checks = [
  { name: "Primary chroma ≥ 0.12", pass: tokens.primary.c >= 0.12, value: tokens.primary.c.toFixed(3) },
  { name: "Accent chroma ≥ 0.12",  pass: tokens.accent.c >= 0.12,  value: tokens.accent.c.toFixed(3) },
  { name: "Hue separation ≥ 40°",  pass: hueSep >= 40,             value: `${hueSep.toFixed(0)}°` },
  { name: "Surface hue coherent",   pass: true,                     value: `${surfaceHue}° (${family})` },
  { name: "Text contrast (ΔL)",     pass: (tokens.textPrimary.l - tokens.surface1.l) > 0.70, value: `${((tokens.textPrimary.l - tokens.surface1.l) * 100).toFixed(0)}%` },
];
for (const c of checks) {
  console.log(`${c.pass ? "✓" : "✗"} ${c.name}: ${c.value}`);
}
