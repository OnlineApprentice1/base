# Skill Pack: SEO & Metadata

Inject this into subagent prompts for tasks involving: robots.ts, sitemap.ts, JSON-LD, opengraph-image.tsx, metadata, llms.txt.

---

## Required SEO Files

### 1. robots.ts (`app/robots.ts`)
```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://DOMAIN/sitemap.xml",
  };
}
```

### 2. sitemap.ts (`app/sitemap.ts`)
```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://DOMAIN";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    // Add blog posts dynamically if blog exists
  ];
}
```

### 3. JSON-LD (LocalBusiness schema in layout.tsx or page.tsx)
```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BUSINESS_NAME",
  description: "DESCRIPTION",
  url: "https://DOMAIN",
  telephone: "PHONE",
  email: "EMAIL",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ADDRESS",
    addressLocality: "CITY",
    addressRegion: "PROVINCE",  // Use province code: ON, BC, AB, etc.
    postalCode: "POSTAL_CODE",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: LAT,
    longitude: LNG,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: LAT, longitude: LNG },
    geoRadius: "50000",  // metres
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

// Embed in page:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

### 4. OG Image (`app/opengraph-image.tsx`)
```typescript
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BUSINESS_NAME";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "PALETTE_PRIMARY_AS_CSS",  // Match site palette
        color: "white",
        fontFamily: "sans-serif",
      }}>
        <h1 style={{ fontSize: 64 }}>BUSINESS_NAME</h1>
        <p style={{ fontSize: 28 }}>TAGLINE</p>
      </div>
    ),
    { ...size }
  );
}
```

### 5. llms.txt (`public/llms.txt`)
```
# BUSINESS_NAME

> TAGLINE

BUSINESS_NAME is a TRADE business based in CITY, PROVINCE, serving AREA.

## Services
- SERVICE_1
- SERVICE_2
- SERVICE_3

## Contact
- Phone: PHONE
- Email: EMAIL
- Address: ADDRESS
- Website: https://DOMAIN
```

## Page Metadata Pattern
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAGE_TITLE | BUSINESS_NAME",
  description: "150-160 char description with location and primary service keyword",
  openGraph: {
    title: "PAGE_TITLE | BUSINESS_NAME",
    description: "Same as above",
    url: "https://DOMAIN/page",
    siteName: "BUSINESS_NAME",
    locale: "en_CA",
    type: "website",
  },
};
```

## Rules
- Every page must have unique title and description metadata
- `locale: "en_CA"` on all OG metadata
- JSON-LD on homepage at minimum, service pages if possible
- OG image must match site palette and archetype — not generic
- Sitemap must include ALL pages (don't forget /privacy and /terms)
