# Project Checklist

## Completed compatibility migration

- [x] Preserve the completed homepage UI and interaction behavior.
- [x] Preserve Supabase sign-in, admin-role validation, and protected dashboard behavior.
- [x] Resolve all source conflict markers and invalid duplicate manifest entries.
- [x] Use only the dependency names and ranges specified in `package.json`.
- [x] Align Next.js with `^15.5.20` and remove Next.js 16-only conventions.
- [x] Align React/React DOM with `^18.3.1` and remove React 19 assumptions.
- [x] Align Tailwind CSS with `^3.4.19` and restore the Tailwind 3/PostCSS configuration.
- [x] Keep the application JavaScript-only with `jsconfig.json` aliases.
- [x] Restore `middleware.js` for Next.js 15.
- [x] Repair incompatible imports, exports, configuration, and global styles.
- [x] Regenerate `package-lock.json`.
- [x] Run `npm install` successfully.
- [x] Run `npm run lint` successfully with no warnings.
- [x] Run `npm run build` successfully.
- [x] Run production route smoke tests successfully.
- [x] Update project-state, changelog, checklist, final-report, and README documentation.

## Local Git action

- [ ] Run `git add package.json package-lock.json app/globals.css` from a normal local shell to mark the already-resolved files in Git's index; this sandbox is not permitted to write `.git/index`.

## Deployment actions

- [ ] Use Node.js 20.9 or newer.
- [ ] Set `SITE_URL` or `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Run `npm ci`, `npm run lint`, and `npm run build` in CI.
- [ ] Verify `/`, `/signin`, `/dashboard`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and an unmatched route.
- [ ] Test successful/failed sign-in, unauthorized-role sign-out, and dashboard protection with a configured Supabase project.
- [ ] Run keyboard, screen-reader, responsive, and Lighthouse checks against the deployed URL.
- [ ] Recheck `npm audit` when a compatible fix exists within the approved dependency ranges; do not apply npm's current breaking forced replacement.

## Optional future scope - not approved

- [ ] Build linked platform, guide, company, policy, FAQ, blog, and newsletter routes.
- [ ] Connect newsletter persistence and content workflows.
- [ ] Implement full localization and translated routes.
- [ ] Add verified social profile destinations.
- [ ] Add monitoring, analytics, and field Core Web Vitals reporting.
