# Phase 4 — Deploy

## Purpose
Run the production build, commit the build artifact, push to GitHub, and update the site registry.

## Prerequisites
- Phase 3 complete (all pages built, content populated, GEO configured)

## Steps

### 1. Production Build
```bash
cd projects/<slug>
npm run build
```
Must complete with zero errors. Warnings are acceptable but should be reviewed.

### 2. Final Commit
```bash
git add -A
git commit -m "Phase 4: production build for <business-name>"
```

Note: `.next/` is committed as the deploy artifact. `node_modules/` must be in `.gitignore`.

### 3. Push to GitHub
```bash
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' \
  git push origin main
```

### 4. Update Registry
Add the completed site to `../../registry.json`:

```json
{
  "slug": "<slug>",
  "name": "<Business Name>",
  "trade": "<trade>",
  "location": "<city/region>",
  "archetype": "<archetype-name>",
  "heroStyle": "<hero-style>",
  "signatureMoves": ["<move1>", "<move2>"],
  "palette": {
    "primary": "<hex>",
    "secondary": "<hex>",
    "accent": "<hex>",
    "neutral": "<hex>"
  },
  "headingFont": "<font-name>",
  "bodyFont": "<font-name>",
  "pages": ["home", "about", "services", "contact", "faq"],
  "github": "https://github.com/OnlineApprentice1/<slug>",
  "builtDate": "<YYYY-MM-DD>",
  "phase2Commit": "<short-hash>",
  "phase4Commit": "<short-hash>"
}
```

Commit the registry update from the workspace root:
```bash
cd ../..
git add registry.json
git commit -m "registry: add <business-name>"
git push
```

### 5. Build Summary
Print a summary:
```
--- Build Complete ---
Site: <Business Name>
Repo: https://github.com/OnlineApprentice1/<slug>
Archetype: <archetype>
Hero: <hero-style>
Signature Moves: <move1>, <move2>
Pages: home, about, services, contact, faq
```

## Gate
- `npm run build` succeeded
- All changes committed and pushed
- `registry.json` updated with complete site record
- Summary printed
