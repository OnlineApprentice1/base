# Registry Schema

Every entry in `registry.json` must follow this exact schema. The deployer validates new entries against this before committing.

## Required Fields

```json
{
  "slug": "string — kebab-case project name (e.g., 'blackwater-marine')",
  "business": "string — full business name",
  "trade": "string — what they do (e.g., 'Boat dock & marine construction')",
  "location": "string — city, province (e.g., 'Kenora, Ontario')",
  "archetype": "string — design archetype (e.g., 'nautical-depth-chart')",
  "palette": {
    "primary": "string — OKLCH value (e.g., 'oklch(45% 0.12 230)')",
    "secondary": "string — OKLCH value",
    "accent": "string — OKLCH value",
    "neutral": "string — OKLCH value"
  },
  "hero": "string — hero style name (e.g., 'horizon-line-split-text')",
  "signatureMoves": ["string[] — array of unique design techniques used"],
  "fonts": {
    "heading": "string — heading font name (e.g., 'Young Serif')",
    "body": "string — body font name (e.g., 'Figtree')"
  },
  "sectionOrder": ["string[] — homepage section order (e.g., ['hero', 'services', 'process', 'stats', 'testimonials', 'cta'])"],
  "animationPatterns": ["string[] — animation types used per section (e.g., ['fade-up', 'slide-left', 'scale-up'])"],
  "repo": "string — GitHub repo path (e.g., 'OnlineApprentice1/blackwater-marine')",
  "date": "string — ISO date of build completion (e.g., '2026-03-23')",
  "status": "string — 'built' | 'in-progress' | 'archived'"
}
```

## Optional Fields

```json
{
  "overrideReason": "string — if client brand colours or archetype override differentiation rules",
  "url": "string — live URL once deployed",
  "commits": {
    "design": "string — commit hash",
    "build": "string — commit hash",
    "deploy": "string — commit hash"
  }
}
```

## Validation Rules

1. `slug` must be unique across all entries
2. `palette` values must be valid OKLCH (format: `oklch(L% C H)`)
3. `archetype` must not repeat within the last 3 builds (see differentiation.md)
4. `hero` must not repeat within the last 2 builds
5. `signatureMoves` must not overlap with the last 3 builds
6. `date` must be a valid ISO date string
7. `sectionOrder` and `animationPatterns` are new fields — add to existing entries when known

## Migration Notes

The 3 existing entries (blackwater-marine, forge-iron-metalworks, frost-mechanical) are consistent and valid. New fields (`sectionOrder`, `animationPatterns`) should be added to existing entries retroactively when the section order and animation information can be determined from the code.
