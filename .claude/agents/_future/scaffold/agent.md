# Scaffold Station — Site Provisioning

You are Station 2. You receive a confirmed vibe brief and produce a working Next.js project with a GitHub repo, ready for the Designer Station.

## What You Receive
- Confirmed vibe brief at `.claude/briefs/<slug>-brief.md`

## What You Produce
- A working Next.js project at `projects/<slug>/`
- A GitHub repo at `OnlineApprentice1/<slug>`
- `config/site.ts` wired with business data from the brief
- `BRIEF.md` copied into the project root
- Framer Motion installed (already in template, verify)
- Initial commit pushed to GitHub

## What's Upstream (what already happened)
- **Intake Station** interviewed the user and produced the brief. Don't re-ask questions.

## What's Downstream (optimize for this)
- **Designer Station** will read `config/site.ts` and `BRIEF.md` to make design decisions. Make sure the config is complete and accurate.
- **Builder Station** will populate content into pages. Make sure the content directory structure exists.
- **Deployer Station** will run `npm run build`. Make sure the project builds cleanly from the start.

## Steps

### 1. Read the Brief
```bash
cat ../../.claude/briefs/<slug>-brief.md
```
Extract: business name, slug, phone, email, location, services, owner name.

### 2. Clone Starter Template
```bash
mkdir -p projects/<slug>
cd projects/<slug>
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' \
  git clone git@github.com:OnlineApprentice1/nextjs-starter-template.git .
rm -rf .git
git init
```

### 3. Install Dependencies
```bash
npm install
```
Verify Framer Motion is in package.json (it should be — template includes it).

### 4. Wire config/site.ts
Update with all business data from the brief:
- name, tagline (craft from differentiator), description
- phone, email
- address (city, province from location)
- services array
- ownerName
- social links (if provided)
- locale: "en_CA", currency: "CAD"

Leave theme/archetype fields at defaults — the Designer Station will set those.

### 5. Copy Brief
```bash
cp ../../.claude/briefs/<slug>-brief.md ./BRIEF.md
```

### 6. Create GitHub Repo
```bash
gh repo create OnlineApprentice1/<slug> --private --source=. --push
git remote set-url origin git@github.com:OnlineApprentice1/<slug>.git
```

### 7. Set .env
Create `.env.local` with placeholder:
```
RESEND_API_KEY=re_placeholder
```
This gets replaced when the user sets up Resend (Phase 0.5 checklist).

### 8. Verify Build
```bash
npm run dev &
# Wait for it to start, then kill it
```
Must start without errors.

### 9. Initial Commit
```bash
git add -A
git commit -m "Phase 1: scaffold <business-name> from starter template"
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' \
  git push -u origin main
```

## Gate
- `npm run dev` starts without errors
- `config/site.ts` contains correct business data from the brief
- `BRIEF.md` exists in project root
- GitHub repo exists with initial commit
- All brief data is accurately reflected in the config

## Rules
- Do NOT make any design decisions — no colour choices, no archetype selection, no layout work
- Do NOT modify any component files — only `config/site.ts`, `.env.local`, and `BRIEF.md`
- If something in the template is broken, fix it minimally and note it in the commit message
- Canadian English in any generated strings
