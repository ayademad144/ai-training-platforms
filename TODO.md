# Project Checklist

## Completed scope

- [x] Production architecture and global design tokens.
- [x] Responsive Navbar.
- [x] Hero section.
- [x] Directory highlights and category filtering.
- [x] Featured platform grid.
- [x] Benefits, guides, and newsletter sections.
- [x] Responsive Footer.
- [x] Complete root metadata and canonical configuration.
- [x] Sitemap, robots, manifest, Open Graph image, and Twitter image.
- [x] Loading, error, and not-found route states.
- [x] Image, font, accessibility, dependency, and Client/Server boundary audits.
- [x] ESLint, strict TypeScript, runtime endpoint, metadata, and production compilation checks.
- [x] Final project and deployment documentation.

## Deployment actions

- [ ] Set the production `SITE_URL` or `NEXT_PUBLIC_SITE_URL`.
- [ ] Run `npm ci` with Node.js 20.9 or newer in CI.
- [ ] Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` in the deployment environment.
- [ ] Verify the canonical domain, social preview images, sitemap, robots, manifest, and custom 404 after deployment.
- [ ] Run Lighthouse and keyboard/screen-reader smoke tests against the deployed URL.
- [ ] Recheck `npm audit` when a compatible Next.js/PostCSS security update is available.

## Optional future scope — not approved

- [ ] Build platform listing and dynamic platform-detail routes.
- [ ] Build guide, company, policy, FAQ, blog, and newsletter routes.
- [ ] Connect newsletter persistence and content workflows to Supabase.
- [ ] Implement real localization and translated content.
- [ ] Add verified social profile URLs.
- [ ] Add production monitoring, analytics, and field Core Web Vitals reporting.
