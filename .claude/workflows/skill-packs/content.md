# Skill Pack: Content & Copywriting

Inject this into subagent prompts for tasks involving: page content, copy, inner pages, blog posts, legal pages.

---

## Canadian English (MANDATORY)

- colour, favourite, centre, metre, neighbour, honour, behaviour, defence, licence (noun)
- Organization (not organisation — Canada uses -ize)
- Metric where relevant (square metres, kilometres)
- Currency: `$` without specifying CAD

## Banned Phrases (NEVER use these)

- "In today's fast-paced world"
- "When it comes to [service]"
- "Look no further"
- "Welcome to [business name]"
- "We pride ourselves on"
- "Your trusted partner in"
- "In the heart of [city]"
- "At [business], we believe"
- "Nestled in"
- "Are you looking for"
- "Whether you need X, Y, or Z"
- "Don't hesitate to"
- "Feel free to"
- "Our team of experienced professionals"
- "State-of-the-art"
- "Cutting-edge"
- "Seamless"
- "Leverage"
- "Solutions" (when meaning services)
- "Comprehensive" (when meaning full/complete)

## Tone Rules

- **Confident but not arrogant** — "We've been doing this for 15 years" not "We are the industry-leading premier provider"
- **Direct and clear** — short sentences, plain language
- **Write like the business owner explaining to a neighbour** — not like a marketing agency
- **Owner name: ABOUT PAGE ONLY** — everywhere else use "we", "our team", or the business name

## Content Patterns

### Hero Headlines
Start with value or action, not the business name:
- Good: "Roofs That Last. Guaranteed."
- Bad: "Welcome to Smith Roofing — Your Trusted Partner"

### Service Descriptions
- Lead with what the customer GETS, not what you do
- Include specific details (materials, methods, timeframes)
- End with a soft CTA
- 2-4 sentences on cards, longer on dedicated pages

### CTAs (trade-specific)
- Good: "Get a Free Roofing Estimate"
- Good: "Book Your Spring HVAC Tune-Up"
- Bad: "Contact Us" / "Learn More" / "Get Started"

### Testimonials
- Vary count per build (3-6 testimonials)
- Vary format per build (quotes, case studies, Google Review style)
- 2-4 sentences each, specific details about the work done

### FAQ
- Vary count per build (6-12 questions)
- Questions phrased naturally: "How long does a roof replacement take?"
- NOT keyword-stuffed: "What is the average duration of professional roofing replacement services?"
- Answers: 2-4 sentences, direct, end with a nudge

### About Page
- Owner name appears HERE and only here
- Origin story — how the business started, why they care
- Years of experience, team size, service philosophy
- Under 300 words
- Photo placeholder for owner/team

## Required Pages
- Privacy Policy (`app/privacy/page.tsx`) — PIPEDA compliance
- Terms of Service (`app/terms/page.tsx`) — basic service business terms
- Both linked from footer

## Accessibility
- Semantic HTML: `nav`, `main`, `article`, `section`, `aside`
- Proper heading hierarchy: one `h1` per page, `h2` for sections, `h3` for subsections
- All images need `alt` text (descriptive, not "image of...")
- Focus-visible styles on all interactive elements
- ARIA labels on icon-only buttons and nav landmarks
- Colour contrast: 4.5:1 minimum for body text, 3:1 for large text
