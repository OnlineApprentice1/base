# Phase 1 — Scaffold

## Purpose
Set up the project directory, clone the starter template, create the GitHub repo, and wire in the brief data so the project is ready for design work.

## Prerequisites
- Confirmed vibe brief at `.claude/briefs/<slug>-brief.md`

## Steps

### 1. Create Project Directory
```bash
mkdir -p projects/<slug>
```

### 2. Clone Starter Template
```bash
cd projects/<slug>
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' \
  git clone git@github.com:OnlineApprentice1/nextjs-starter-template.git .
rm -rf .git
git init
```

### 3. Install Dependencies
```bash
npm install
npm install framer-motion
```

### 4. Create GitHub Repo
```bash
gh repo create OnlineApprentice1/<slug> --private --source=. --push
```
Set the remote to use SSH:
```bash
git remote set-url origin git@github.com:OnlineApprentice1/<slug>.git
```

### 5. Wire Config
Update `config/site.ts` with data from the vibe brief:
- Business name
- Phone number
- Email
- Location / service area
- Meta description (craft from the differentiator)

### 6. Copy Brief into Project
```bash
cp ../../.claude/briefs/<slug>-brief.md ./BRIEF.md
```

### 7. Initial Commit
```bash
git add -A
git commit -m "Phase 1: scaffold <business-name> from starter template"
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' \
  git push -u origin main
```

## Gate
- `npm run dev` starts without errors
- GitHub repo exists and has the initial commit
- `config/site.ts` contains correct business data
- `BRIEF.md` exists in project root
