# Surhires

Surhires is a frontend-only hiring and job discovery experience for employers
and job seekers. It includes a responsive marketing homepage, searchable mock
roles, employer pricing, and a validated job-submission demo.

## Setup

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To verify a production
build and lint:

```bash
npm run build
npm run lint
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed origin to use it in
metadata, the sitemap, and robots response. The default is
`https://surhires.com`.

## Design

- **Navy and teal** establish a confident, accessible brand; warm white keeps
  the pages open and calm.
- **Plus Jakarta Sans** gives headings a distinctive, confident voice.
- **Inter** keeps longer copy and interface labels easy to scan.
- Shared color, spacing, type, radius, and elevation tokens live in
  `app/globals.css`.

## Project structure

```text
app/
  employers/page.tsx       Employer plans and posting flow
  jobs/page.tsx            Job discovery page
  globals.css              Design tokens, base styles, motion
  icon.svg                 Surhires favicon
  layout.tsx               Fonts, metadata, shared site shell
  page.tsx                 Home page
  robots.ts                Crawler rules
  sitemap.ts               Public route sitemap
components/
  layout/                  Navbar, footer, brand, newsletter
  sections/                Page sections and interactive experiences
  ui/                      Shared buttons, cards, tags, headings, accordion
lib/
  jobs.ts                  Typed sample role data
  utils.ts                 Small shared class-name helper
```

## Assumptions

- Job listings, pricing, testimonials, and company names are sample content.
- The job form and newsletter validate in the browser and display local
  confirmation states only; they do not send or persist submitted data.
- Employers can select a plan and request a conversation, but checkout and
  payment are outside this frontend-only scope.
- No stock photography is needed: the hero visual is built from HTML/CSS,
  avatars use initials, and company marks are text-only. Unsplash is allowed
  in Next Image configuration if product photography is added later.
- Prices are indicative Indian rupee amounts. Annual pricing is shown as a
  20% monthly-equivalent discount.

## Accessibility and SEO

- Semantic page landmarks, one page-level `h1`, a skip link, visible keyboard
  focus, accessible form labels/errors, a keyboard-operable FAQ, reduced-motion
  styles, and a mobile menu focus trap are included.
- Each public route has page-specific metadata and Open Graph descriptions.
  The site also exposes `/sitemap.xml`, `/robots.txt`, and an SVG favicon.
- Keep salary details visible on role cards and ensure any future content,
  real links, and legal copy are reviewed before production.

## Motion

- Shared timing tokens and reusable motion components live in `app/globals.css`,
  `components/motion/`, and `hooks/`. Motion is limited to small, purposeful
  transitions and transform/opacity-based ambient effects.
- Intersection observers pause off-screen ambient effects; pointer glow and
  automatic motion are disabled for touch or reduced-motion preferences.
- The home, jobs, and employer routes preserve their content and keyboard
  access when motion is reduced. The job filter delay is represented by a brief
  skeleton state, and pricing/form feedback remains available without animation.

## What I would improve with more time

- Connect forms and role data to a secured API, add server-side validation,
  rate limiting, consent management, and a real privacy/terms review.
- Add employer and candidate account flows, application tracking, and
  operational analytics.
- Replace sample listings and testimonials with verified customer content.
- Run Lighthouse in the deployment environment and tune against real field
  data, including the final image strategy and Core Web Vitals.
