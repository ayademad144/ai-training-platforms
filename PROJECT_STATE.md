# Project State

## Current milestone

Dependency compatibility, merge resolution, and JavaScript migration - complete on 2026-07-14.

The existing homepage, sign-in flow, and protected dashboard behavior are preserved. The project installs, lints, builds, and serves correctly with the dependency ranges required by `package.json`.

## Completed milestones

- Milestone 1: App Router architecture, global design tokens, and optimized fonts.
- Milestone 2: Responsive, accessible Navbar.
- Milestone 3: Server-rendered Hero.
- Milestone 4: Categories and filterable platform grid.
- Milestone 5: Features, guides, and newsletter sections.
- Milestone 6: Responsive semantic Footer.
- Production hardening: metadata, crawler routes, social images, route-state UI, SEO, accessibility, and performance checks.
- Compatibility migration: merge conflicts resolved in source, JavaScript-only application restored, and Next.js 15/React 18/Tailwind CSS 3 compatibility verified.

## Remaining milestones

None. New pages, localization, backend features, or visual changes require a separately approved scope.

## Architecture decisions

- Next.js `15.5.20`, React `18.3.1`, Tailwind CSS `3.4.19`, and the App Router are the application foundation.
- The repository is JavaScript-only. `jsconfig.json` supplies the `@/*` path alias; no project `.ts`, `.tsx`, or `.d.ts` source files remain.
- Public UI lives in `app/(marketing)`. The route group adds shared Header, Footer, and skip navigation without changing public URLs.
- Authentication routes remain outside the marketing layout. `/signin` is public; `/dashboard` is protected by Supabase checks in both `middleware.js` and the dashboard layout.
- `middleware.js` follows the Next.js 15 middleware convention and delegates cookie/session handling to `lib/supabase/middleware.js`.
- Supabase browser and server clients use the public `@supabase/ssr` exports. Missing environment variables fail safely: public routes remain available and protected routes redirect to sign-in.
- Components are Server Components by default. Client Components are limited to navigation/filter/form interaction and error recovery.
- Static homepage content is separated into `data/` modules and rendered through reusable mapped components.
- Tailwind CSS 3 uses `tailwind.config.js`, `@tailwind` CSS directives, PostCSS, and Autoprefixer. Material Tailwind's `withMT` wrapper is retained because the dependency is explicitly required.
- Global CSS contains only design tokens and global base behavior. Component styling remains in Tailwind utility classes.
- Inter and Plus Jakarta Sans are loaded through `next/font` with Latin subsets and `display: "swap"`.
- Metadata is centralized in `app/layout.js` and `lib/site-config.js`. Generated metadata endpoints are JavaScript modules.
- Sign-in and dashboard routes opt out of indexing; `robots.js` also blocks private/authentication paths.
- The build uses Next.js 15 worker threads because this Windows validation sandbox blocks child-process workers. `scripts/next15-build.cjs` removes only already-consumed internal configuration callbacks from worker payloads; it does not change application runtime behavior.
- No UI redesign or business-rule change was made during compatibility work.

## Folder structure

```text
app/
  (marketing)/
    layout.js
    page.jsx
  dashboard/
    layout.jsx
    page.jsx
  signin/
    components/
      Basic.jsx
    page.jsx
  error.jsx
  fonts.js
  globals.css
  layout.js
  loading.jsx
  manifest.js
  not-found.jsx
  opengraph-image.jsx
  robots.js
  sitemap.js
  twitter-image.jsx
components/
  home/
    categories.jsx
    category-card.jsx
    feature-card.jsx
    features.jsx
    guide-card.jsx
    hero-platform-preview.jsx
    hero.jsx
    latest-guides.jsx
    newsletter-form.jsx
    newsletter.jsx
    platform-card.jsx
    platforms-grid.jsx
  layout/
    footer-column.jsx
    footer.jsx
    navbar.jsx
    navigation-links.jsx
    route-status.jsx
    site-header.jsx
    site-navigation.js
    social-links.jsx
data/
  categories.js
  features.js
  footer.js
  guides.js
  platforms.js
lib/
  auth.js
  site-config.js
  supabase/
    client.js
    middleware.js
    server.js
public/
  brand/
    ai-training-models.svg
scripts/
  next15-build.cjs
middleware.js
jsconfig.json
tailwind.config.js
```

## Components created

### Client Components

- `Navbar`: mobile navigation, active route state, language-label toggle, and Escape handling.
- `PlatformsGrid`: local category filtering.
- `NewsletterForm`: controlled form state and local confirmation.
- `Basic`: Supabase sign-in form, password visibility, role validation, and feedback dialogs.
- `app/error.jsx`: Next.js error boundary and retry action.

### Server Components and server modules

- Marketing layout, homepage composition, Site Header, Footer, route states, and non-interactive homepage sections/cards.
- Sign-in page shell and dashboard page/layout.
- Supabase authorization helpers, metadata routes, sitemap, robots, manifest, and generated social images.

## Files created in the compatibility migration

- `tailwind.config.js`
- `scripts/next15-build.cjs`
- `middleware.js` replaces the incompatible Next.js 16 `proxy.js` convention.

## Files modified in the compatibility migration

- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `app/globals.css`
- `README.md`
- `PROJECT_STATE.md`
- `CHANGELOG.md`
- `TODO.md`
- `FINAL_REPORT.md`

## Files renamed or removed

- `proxy.js` was replaced by `middleware.js` for Next.js 15.
- `app/manifest.ts`, `app/robots.ts`, and `app/sitemap.ts` were converted to `.js` modules.
- `tsconfig.json` and `next-env.d.ts` were removed; `jsconfig.json` provides JavaScript path aliases.
- Dead duplicate components and the duplicate legacy Supabase client remain removed.

## Dependencies

### Runtime

- `next` `15.5.20`
- `react` and `react-dom` `18.3.1`
- `@heroicons/react` `2.2.0`
- `@material-tailwind/react` `2.1.10`
- `@supabase/ssr` `0.12.1`
- `@supabase/supabase-js` `2.110.3`
- `sweetalert2` `11.26.25`

### Development

- `tailwindcss` `3.4.19`
- `postcss` `8.5.19`
- `autoprefixer` `10.5.2`
- `eslint` `9.39.5` (resolved by the required `^9` range)
- `eslint-config-next` `15.5.20`

No package outside the dependency names and ranges specified by the user was added to the root manifest.

## Validation

- `npm install`: passes; lockfile and installed dependency tree match `package.json`.
- `npm run lint`: passes with no ESLint errors or warnings.
- `npm run build`: passes on Next.js `15.5.20`; all expected application and metadata routes compile.
- `npm ls --depth=0`: clean dependency tree with the requested top-level packages only.
- Source conflict-marker scan: clean.
- JavaScript-only source scan: no `.ts`, `.tsx`, or `.d.ts` project files.
- Next.js 16, React 19, and Tailwind CSS 4 API scan: clean.
- Production runtime smoke test: `/`, `/signin`, crawler/manifest endpoints, and social images return `200`; an unmatched route returns `404`; unauthenticated `/dashboard` returns the expected `307` redirect.

## Known issues

- `npm audit` reports two moderate advisories from the PostCSS copy bundled inside the required Next.js `15.5.20`. npm only proposes a breaking Next.js `9.3.3` replacement, so it was not applied because it violates the exact dependency requirement.
- The build logs a non-fatal Edge Runtime warning because the required `@supabase/ssr` public entry point also exports browser-client code that references `process.version`. The middleware and build still complete successfully.
- Webpack reports non-fatal cache serialization warnings for large strings; they do not affect build correctness or runtime output.
- Source files contain no conflict markers and all validations pass, but this execution sandbox cannot write `.git/index`. Git can continue showing historical `UU` entries until `git add package.json package-lock.json app/globals.css` is run from a normal local shell.
- Supabase authentication requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the deployment environment.
- Several design links target future routes that are not implemented and correctly resolve to the custom 404.
- Newsletter submission remains local UI only; localization and verified social destinations remain future scope.

## Next milestone

None. The approved implementation and compatibility scope is complete.
