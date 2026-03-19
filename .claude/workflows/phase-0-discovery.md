# Phase 0 — Discovery

## Purpose
Gather everything needed to make informed design and content decisions. Every question maps directly to a build choice. This is a conversation, not a form — ask in 2-3 natural rounds.

## Round 1 — The Business (ask all of these)

| Question | What it decides |
|----------|----------------|
| What's the business name? | Branding, slug, repo name |
| What trade or service? (e.g., roofing, painting, HVAC, landscaping) | Content tone, imagery direction, service page structure |
| What city/region do they serve? | Local SEO, LocalBusiness schema, service area content |
| What's their phone number? | Primary CTA across all pages |
| Do they have a website, Google Business profile, or social media now? | Existing content to pull from, backlink opportunities |

## Round 2 — The Vibe (ask all of these)

| Question | What it decides |
|----------|----------------|
| Describe the business in 3 words. (e.g., "fast, reliable, clean" or "premium, detailed, trusted") | Design archetype selection, typography weight, color mood |
| Who's the ideal customer? (homeowners, commercial property managers, builders, realtors) | Content voice, CTA language, trust signal emphasis |
| What's the ONE thing that sets them apart from competitors? | Hero headline, signature design move, key messaging |
| What should someone do after visiting the site? (call, fill a form, request a quote, book online) | CTA design, form placement, conversion flow |
| Do they have real photos of their work? (yes / no / some) | Photo-forward vs illustration/gradient design approach |

## Round 3 — The Details (ask what's relevant based on Round 1-2)

| Question | When to ask | What it decides |
|----------|-------------|----------------|
| Top 3-5 services they offer | Always | Service page hierarchy, nav structure |
| Years in business? | If trust/experience matters to their vibe | Trust signals, About page emphasis |
| Owner name? | Always (used on About page only) | About page content |
| Email address? | Always | Contact form, footer |
| Any certifications, awards, or notable projects? | If vibe is premium/professional | Trust badges, case study potential |
| Do they want a FAQ section? If so, what do customers always ask? | If the trade commonly gets questions | FAQ page, FAQPage schema |
| Any colors or branding they already use? (logo colors, truck colors, uniform colors) | If they have existing brand identity | Color palette starting point |
| Any websites they like the look of? (competitors or otherwise) | If they have strong opinions | Design direction, anti-patterns to avoid |
| Residential, commercial, or both? | If not obvious from the trade | Content voice split, service categorization |

## After Discovery — Generate the Brief

Create a vibe brief at `.claude/briefs/<slug>-brief.md` with this structure:

```markdown
# <Business Name> — Vibe Brief

## Identity
- **Business:** <name>
- **Trade:** <trade>
- **Location:** <city/region>
- **Phone:** <phone>
- **Email:** <email>
- **Owner:** <name>

## Vibe
- **3 Words:** <word1>, <word2>, <word3>
- **Ideal Customer:** <description>
- **Differentiator:** <what sets them apart>
- **Primary CTA:** <call / form / quote / book>
- **Has Real Photos:** yes / no / some

## Services
1. <service>
2. <service>
3. <service>
...

## Design Direction
- **Suggested Archetype:** <from differentiation check>
- **Color Mood:** <warm / cool / neutral / bold>
- **Existing Brand Colors:** <if any>
- **Photo Strategy:** <photo-forward / gradient-accent / illustration-hybrid>
- **Reference Sites:** <if provided>

## Content Notes
- **Years in Business:** <if provided>
- **Certifications/Awards:** <if provided>
- **FAQ Topics:** <if provided>
- **Residential/Commercial:** <if provided>
- **Tone Notes:** <any specific tone guidance>
```

## Gate
Present the brief to the user for confirmation. Do not proceed to Phase 1 until the user approves or requests changes.
