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
- Contact form (name, email, phone, message) — uses Resend API route at `app/api/contact/route.ts`
- Phone number prominent (matches primary CTA)
- Email address
- Service area / location info
- **Google Maps embed** — use the business address from `config/site.ts` coordinates (lat/lng) to embed a Google Maps iframe. If no coordinates, use a service area description instead.
- Link to **Google Business Profile** if URL provided in brief
- Business hours (if provided, otherwise omit)

### FAQ Page (`app/faq/page.tsx`) — if applicable
- FAQ items from the brief
- Accordion pattern with Framer Motion expand/collapse
- FAQPage JSON-LD schema (in this file, not root layout)

### Privacy Policy Page (`app/privacy/page.tsx`)
- Already exists in template — update with actual business name and contact info
- Include PIPEDA compliance language (Canadian privacy law)
- Mention cookie usage, analytics data collection, contact form data handling
- Link to it from the footer

### Terms of Service Page (`app/terms/page.tsx`) — if it doesn't exist, create it
- Basic terms for a service business website
- Include disclaimer about pricing estimates, service availability
- Link to it from the footer alongside privacy policy

## Open Graph Images

Every page should generate a dynamic OG image using Next.js route conventions.

Create `app/opengraph-image.tsx` (and per-route variants) using Next.js `ImageResponse`:
```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Business Name — Tagline';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#PRIMARY_COLOR',
        color: '#fff',
        fontSize: 60,
        fontWeight: 700,
      }}>
        <div>Business Name</div>
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.8 }}>Tagline or page title</div>
      </div>
    ),
    { ...size }
  );
}
```

- Style it to match the site's archetype and colour palette
- Include the business name and a page-specific tagline
- Use the site's primary colour as background
- Create route-level variants for key pages (services, about, contact) if they need different messaging

## Content Guidelines

**Follow `.claude/workflows/copywriting.md` for all copy.** Key rules:
- Canadian English (colour, centre, metre, neighbour)
- No AI-sounding phrases (see banned phrases list in copywriting.md)
- Start with value or a hook, never "Welcome to [business]"
- Use the differentiator as the core messaging thread throughout
- CTAs must be specific to the trade: "Get a Free Roofing Estimate" not "Contact Us"
- Short paragraphs (2-3 sentences max)
- Use the business's 3 vibe words to guide tone
- Claude generates all copy — write it like a skilled human copywriter would

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

## Performance Check

Before completing Phase 3, reference the `performance` and `core-web-vitals` skills:
- Use Next.js `<Image>` component for all images (lazy loading, proper sizing)
- No render-blocking resources
- Minimize client-side JavaScript — prefer server components where possible
- Framer Motion: use `lazy` variants and `viewport={{ once: true }}` to avoid re-triggering
- Target Lighthouse scores: 90+ Performance, 90+ Accessibility, 90+ Best Practices, 90+ SEO

## Gate
- All pages render without console errors
- Every page has unique meta title and description
- JSON-LD schemas are valid
- Google Maps embed or service area map on contact page
- Responsive at all 5 breakpoints
- Content is Canadian English, feels human-written, not AI-generated
- No banned AI phrases present in any copy

## Commit
```bash
git add -A
git commit -m "Phase 3: pages, content, and GEO complete for <business-name>"
GIT_SSH_COMMAND='ssh -i ~/.ssh/github_onlineapprentice -o IdentitiesOnly=yes' git push
```
