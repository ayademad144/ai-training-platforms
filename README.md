# AI Training Platforms

AI Training Platforms helps users discover AI training, data annotation, search evaluation, and remote AI work opportunities in one directory.

## Features

- Responsive marketing homepage and navigation
- Category-based platform filtering
- Platform, benefits, guide, and newsletter sections
- Supabase email/password sign-in
- Protected admin dashboard
- App Router metadata, sitemap, robots, manifest, and social images
- Accessible loading, error, and not-found states

## Tech stack

- Next.js 15.5.20 with App Router
- React 18.3.1
- Tailwind CSS 3.4.19
- Material Tailwind 2.1.10
- Supabase SSR and Supabase JS
- JavaScript

## Requirements

- Node.js 20.9 or newer
- npm

## Environment variables

Create a local `.env.local` file when testing authentication:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
npm start
```

## Project structure

```text
app/                 App Router pages, layouts, metadata, and route states
components/home/     Homepage sections and reusable cards
components/layout/   Header, navigation, Footer, and route-state UI
data/                Static homepage and Footer data
lib/supabase/        Browser, server, and middleware Supabase clients
public/brand/        Brand asset
scripts/             Next.js 15 build compatibility runner
middleware.js        Session refresh and protected-route middleware
tailwind.config.js   Tailwind CSS 3 and Material Tailwind configuration
```

## Documentation

- `PROJECT_STATE.md`: continuation state, architecture decisions, and known issues.
- `CHANGELOG.md`: implementation and compatibility changes.
- `TODO.md`: deployment and future-scope checklist.
- `FINAL_REPORT.md`: complete production report and deployment checklist.

## License

MIT
