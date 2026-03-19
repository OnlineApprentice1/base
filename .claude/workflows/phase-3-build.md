# Phase 3 — Pages & Polish

## Purpose
Build all pages with real content, configure GEO elements, and polish the site to production quality.

## Prerequisites
- Phase 2 complete (responsive layout with header, hero, footer, section shells)

## Before Writing Any Code

1. **Invoke the `frontend-design` skill.** Mandatory for this phase.
2. **Re-read the vibe brief** at `BRIEF.md` in the project root.

## Pages to Build

### Home Page (`app/page.tsx`)
- Hero section (already built in Phase 2, now populate with real content)
- Services overview with links to individual service pages or services page
- Differentiator / why-choose-us section
- Testimonials section (use placehold.co for avatars if no real photos)
- CTA strip
- FAQ preview (if applicable, link to full FAQ page)

### About Page (`app/about/page.tsx`)
- Owner name appears HERE and only here
- Business story (craft from brief: years in business, values, approach)
- Team section or owner spotlight
- Certifications / awards / notable projects (if provided)
- Image: placehold.co if no real photo

### Services Page (`app/services/page.tsx`)
- All services from the brief
- Each service gets a card or section with description
- Link structure: if >5 services, consider individual service sub-pages
- Use Framer Motion stagger for service card reveals

### Contact Page (`app/contact/page.tsx`)
- Contact form (name, email, phone, message)
- Phone number prominent (matches primary CTA)
- Email address
- Service area / location info
- Map embed placeholder or service area description
- Business hours (if provided, otherwise omit)

### FAQ Page (`app/faq/page.tsx`) — if applicable
- FAQ items from the brief
- Accordion pattern with Framer Motion expand/collapse
- FAQPage JSON-LD schema (in this file, not root layout)

## Content Guidelines

- Write copy as if a skilled human copywriter wrote it — no AI filler phrases
- No "Welcome to [business]" — start with value or a hook
- No "In today's fast-paced world" or "When it comes to" — ban all AI cliches
- Use the differentiator as the core messaging thread throughout
- CTAs should be specific: "Get a Free Roofing Estimate" not "Contact Us"
- Short paragraphs (2-3 sentences max)
- Use the business's 3 vibe words to guide tone

## GEO Configuration

### JSON-LD Schemas
- **LocalBusiness** in root layout — business name, address, phone, service area
- **FAQPage** in FAQ page component (not root layout)
- **Organization** with `sameAs` pointing to social profiles

### Meta Tags (via Next.js Metadata API)
- Unique `title` and `description` for every page
- Open Graph tags (og:title, og:description, og:image)
- Canonical URLs

### Other GEO Elements
- `robots.txt` — allow all crawlers including AI bots
- `sitemap.xml` — auto-generated or manual, all pages included
- `llms.txt` — brief site description for AI crawlers
- Alt text on every image (descriptive, not keyword-stuffed)

## Responsive Polish Pass

After building all pages, do a full responsive check:

1. **375px** — Everything single-column, text readable, images scale, CTAs accessible
2. **768px** — Appropriate column splits, spacing comfortable
3. **1024px** — Full layout visible, no awkward gaps
4. **1440px** — Content contained, generous white space
5. **1920px** — No horizontal stretch, centered content

Check specifically:
- Text doesn't overflow containers at any size
- Images have proper aspect ratios and don't distort
- Touch targets are at least 44px on mobile
- No horizontal scroll at any breakpoint
- Framer Motion animations don't cause layout shift

## Visual Quality Check

Before completing Phase 3:
- Does this look like a custom-built site or a template?
- Would a business owner be proud to show this to customers?
- Are there at least 2 things that make this site visually distinct from the last build?
- Is there visual rhythm — variation in section density, color, and layout?

## Gate
- All pages render without console errors
- Every page has unique meta title and description
- JSON-LD schemas are valid
- Responsive at all 5 breakpoints
- Content feels human-written, not AI-generated

## Commit
```bash
git add -A
git commit -m "Phase 3: pages, content, and GEO complete for <business-name>"
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' git push
```
