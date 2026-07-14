# Final Project Report

## Project overview

AI Training Models is a production-structured directory homepage built with Next.js 16.2.10, React 19.2.4, Tailwind CSS 4.3.2, and the App Router. The Figma/Vite project was used only as a visual reference; its routing, architecture, and folder structure were not copied.

The completed homepage is composed primarily of static Server Components, with narrow Client Components only where local interaction is required.

## Project architecture

- `app/layout.js` owns global metadata, optimized fonts, global CSS, language, and the document shell.
- `app/(marketing)/layout.js` owns shared public-site chrome: keyboard skip navigation, Header, and Footer.
- `app/(marketing)/page.jsx` composes the homepage sections in reference order.
- `components/home` contains section and card components.
- `components/layout` contains navigation, Footer, and shared route-state UI.
- `data` contains static render data and keeps repeated content out of JSX.
- `lib/site-config.js` resolves canonical deployment URLs and centralizes SEO identity.
- `lib/supabase.js` is preserved existing business infrastructure and is not imported by the current homepage.
- TypeScript is enabled incrementally for the requested metadata routes while existing JavaScript remains supported.

## Folder tree

```text
app/
  (marketing)/
    layout.js
    page.jsx
  Admin/page.jsx
  error.jsx
  fonts.js
  globals.css
  layout.js
  loading.jsx
  manifest.ts
  not-found.jsx
  opengraph-image.jsx
  robots.ts
  sitemap.ts
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
  site-config.js
  supabase.js
public/
  brand/ai-training-models.svg
```

## Components

| Area | Components | Responsibility |
| --- | --- | --- |
| Shared layout | `SiteHeader`, `Navbar`, `NavigationLinks` | Branding, primary navigation, active state, mobile menu, and language label control |
| Footer | `Footer`, `FooterColumn`, `SocialLinks` | Semantic Footer, reusable link columns, and reference social labels |
| Route states | `RouteStatus`, `Loading`, `Error`, `NotFound` | Consistent loading, recovery, and 404 experiences |
| Hero | `Hero`, `HeroPlatformPreview` | Primary heading, calls to action, and reviewed-platform preview |
| Highlights | `Categories`, `CategoryCard` | Directory trust statistics |
| Platforms | `PlatformsGrid`, `PlatformCard`, private `StarRating` | Category filtering and reusable platform summaries |
| Benefits | `Features`, `FeatureCard` | Reusable benefit cards |
| Guides | `LatestGuides`, `GuideCard` | Guide preview grid with responsive optimized images |
| Newsletter | `Newsletter`, `NewsletterForm` | Newsletter presentation and local confirmation state |

## Pages and routes

| Route | Type | Status |
| --- | --- | --- |
| `/` | Marketing page | Complete and indexable |
| `/Admin` | Existing route | Preserved unchanged and excluded from `robots.txt` |
| `/sitemap.xml` | Metadata route | Includes only the implemented homepage |
| `/robots.txt` | Metadata route | Allows public crawling and disallows `/Admin` |
| `/manifest.webmanifest` | Metadata route | Brand name, colors, start URL, scope, and SVG icon |
| `/opengraph-image` | Generated image route | Static 1200×630 PNG |
| `/twitter-image` | Generated image route | Static 1200×630 PNG |
| Unmatched routes | Custom 404 | Returns 404 and includes `noindex` |

Linked platform, guide, company, policy, FAQ, blog, and newsletter pages are future scope and currently resolve to the custom 404.

## Data files

- `data/categories.js`: directory statistics.
- `data/platforms.js`: platform filters and platform card content.
- `data/features.js`: benefit-card content.
- `data/guides.js`: guide-card content and image sources.
- `data/footer.js`: Footer brand, navigation columns, social labels, and copyright.

## Client Components

- `Navbar`: requires state, effects, pathname access, and keyboard handling.
- `PlatformsGrid`: requires local category-filter state.
- `NewsletterForm`: requires controlled form and confirmation state.
- `app/error.jsx`: Next.js error boundaries must be Client Components.

No other component ships a client boundary.

## Server Components

All homepage sections, cards, layouts, Footer components, loading UI, and not-found UI remain Server Components. Static data is rendered on the server, reducing client JavaScript and hydration work.

## Performance summary

- The homepage is eligible for static prerendering and does not use request-time APIs.
- Client boundaries are limited to three interactive UI components plus the required error boundary.
- Inter and Plus Jakarta Sans are self-hosted and optimized by `next/font`; no browser request is made to Google Fonts.
- The above-fold 32×32 logo uses eager loading without the deprecated Next 16 `priority` prop.
- Footer and guide images use native lazy loading by default.
- Guide images use `fill`, a reserved aspect-ratio container, and precise responsive `sizes` values to reduce oversized downloads.
- Remote image optimization is restricted to HTTPS Unsplash photo paths.
- Social images are statically generated and cached by Next.js.
- `@material-tailwind/react` and its unnecessary React 18 subtree were removed.
- No bundle-analyzer dependency or other runtime library was added.

## SEO summary

- Descriptive title with a reusable template.
- Search-focused description and keywords.
- Application name, author, creator, publisher, and category.
- `metadataBase` and canonical URL resolution from deployment environment variables.
- Index/follow directives and expanded Googlebot preview permissions.
- Open Graph title, description, URL, locale, site name, type, image, dimensions, type, and alt text.
- Twitter large-image card with matching title, description, image, and alt text.
- Brand icon and web-app manifest metadata.
- Sitemap containing only the implemented public route.
- Robots endpoint referencing the canonical sitemap and excluding `/Admin`.
- Custom 404 verified with automatic `noindex` metadata.

## Accessibility summary

- Semantic Header, navigation, main, sections, articles, lists, definitions, forms, and Footer landmarks.
- Keyboard skip link targeting the focusable main content.
- Accessible mobile-menu labels, expanded state, controls relationship, and Escape handling.
- Active navigation exposes `aria-current="page"`.
- Category filters expose pressed state and a named control group.
- Form input has an explicit label, type, autocomplete, and required validation.
- Newsletter confirmation uses a status announcement.
- Error recovery is keyboard-operable; loading feedback uses polite status semantics.
- Decorative icons and repeated logo graphics are hidden from assistive technology where adjacent text provides the name.
- Star ratings expose a textual accessible name.
- Motion-sensitive image animation and loading animation honor reduced-motion preferences.
- Global focus-visible styling remains enabled.

## Dependencies

### Runtime dependencies

- `next` 16.2.10
- `react` and `react-dom` 19.2.4
- `@heroicons/react` 2.2.0
- `@supabase/supabase-js` 2.110.3

### Development dependencies

- Tailwind CSS and `@tailwindcss/postcss` 4.3.2
- TypeScript 6.0.3
- `@types/node` 26.1.1
- `@types/react` 19.2.17
- ESLint 9.39.5
- `eslint-config-next` 16.2.10

## Validation summary

- ESLint: passed.
- Strict TypeScript check: passed.
- Whitespace and conflict-marker checks: passed.
- Next.js optimized compilation: passed.
- Runtime endpoint and content-type smoke tests: passed.
- Rendered metadata inspection: passed.
- Custom 404 status, copy, and `noindex`: passed.
- Final local build completion: blocked after successful compilation by the documented Windows `spawn EPERM` subprocess limitation.

## Known limitations

- Several design links intentionally target future routes that are not implemented.
- Newsletter submission is local UI only.
- Full Arabic localization is not implemented.
- Social account URLs were not provided and were not invented.
- A production canonical URL must be supplied through `SITE_URL` or `NEXT_PUBLIC_SITE_URL`.
- The local Windows environment cannot complete Next's final build subprocess even though compilation and standalone type checking pass.
- npm reports a moderate PostCSS advisory through Next.js 16.2.10. The available automated fix proposes an unsafe Next 9 downgrade and was not applied.

## Future improvements

These items are not part of the approved project and require new scope:

- Implement the linked platform, guide, company, policy, FAQ, blog, and newsletter routes.
- Connect newsletter and content workflows to Supabase.
- Add real localization with translated content and locale-aware routes.
- Add verified social-profile destinations.
- Add application monitoring, analytics, and field Core Web Vitals reporting.
- Apply a compatible Next.js/PostCSS security update when available.

## Deployment checklist

- [ ] Use Node.js 20.9 or newer.
- [ ] Set `SITE_URL` to the final HTTPS origin. `NEXT_PUBLIC_SITE_URL` is also supported.
- [ ] Store environment variables in the deployment platform; do not commit `.env` files.
- [ ] Run `npm ci` from the committed lockfile.
- [ ] Run `npm run lint`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build` in CI or the deployment environment and require a successful exit.
- [ ] Start the production server with `npm run start` when using a Node deployment.
- [ ] Verify `/`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, social images, and an unmatched URL.
- [ ] Confirm canonical and social-image URLs use the production domain.
- [ ] Test keyboard navigation, mobile-menu Escape behavior, form validation, and focus visibility.
- [ ] Run Lighthouse against the deployed HTTPS URL.
- [ ] Submit the production sitemap to the relevant search-engine webmaster tools.
- [ ] Re-run `npm audit` and review the upstream PostCSS advisory without applying breaking forced downgrades.
