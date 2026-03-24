# Phase 5 — Maintenance

## Purpose
Handle post-launch changes to existing sites without re-running the full pipeline. This covers content updates, blog posts, info changes, design tweaks, and feature additions.

## When to Use
- Client wants to update business info (phone, hours, services)
- Adding a blog post
- Changing copy or images on existing pages
- Adding a new page
- Design tweaks or bug fixes
- Adding new services to the services page

## Before Making Changes

1. Navigate to the project: `cd projects/<slug>/`
2. Read the brief: `cat BRIEF.md`
3. Check git log to understand current state: `git log --oneline -10`
4. Run `npm run dev` to verify the site works before touching anything

## Common Maintenance Tasks

### Adding a Blog Post
1. Create a new `.md` file in `content/blog/`:
```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "A short description for the listing page."
coverImage: "/images/blog/post-slug.jpg"
---

Post content here in markdown.
```
2. If the client provided a cover image, add it to `public/images/blog/`
3. If no image, use a placehold.co URL in the frontmatter
4. Build and verify: `npm run build`
5. Commit and push

### Updating Business Info
1. Edit `config/site.ts` — this is the single source of truth
2. Changes propagate to header, footer, contact page, JSON-LD schema
3. Verify the changes render correctly on affected pages
4. Commit and push

### Adding a New Service
1. Add the service to the `services` array in `config/site.ts`
2. Create or update service content in `content/services.ts`
3. Verify the services page and any service detail pages
4. Commit and push

### Design Tweaks
1. Read the existing code before modifying
2. Keep changes minimal — match the existing design language
3. Don't introduce new patterns that conflict with the archetype
4. Test at all responsive breakpoints (375px, 768px, 1024px, 1440px)
5. Commit with a descriptive message

### Adding a New Page
1. Create the page in the `app/` directory following App Router conventions
2. Add navigation link in the Header component
3. Add meta tags via Next.js Metadata API
4. Match the existing layout and design patterns
5. Test responsive behaviour
6. Update sitemap if not auto-generated
7. Commit and push

## Content Generation for Blog Posts

When writing blog posts for trades businesses:
- Write from the business's perspective ("we", "our team")
- Focus on educating homeowners — what to look for, how to maintain, when to call a pro
- Keep paragraphs short (2-3 sentences)
- Use Canadian English (colour, centre, metre, neighbour)
- Include a CTA at the end (e.g., "Need help with your roof? Call us at...")
- Avoid AI cliches — no "in today's world", no "when it comes to"
- Target 400-800 words per post — enough for SEO, not so long that nobody reads it

## Commit Convention
```bash
git add -A
git commit -m "maintenance(<slug>): <what changed>"
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' git push
```

Examples:
- `maintenance(summit-roofing): add blog post about spring roof inspection`
- `maintenance(apex-hvac): update phone number and hours`
- `maintenance(greenfield-lawn): add snow removal to services`
