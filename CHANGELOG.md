# Changelog

## Unreleased

### Added

- Complete root metadata with canonical URLs, authorship, keywords, robots directives, icons, Open Graph, and Twitter cards.
- Generated sitemap, robots, and web-app manifest endpoints.
- Statically generated Open Graph and Twitter images.
- Accessible loading, error-recovery, and not-found route states with shared UI.
- Keyboard skip navigation for marketing pages.
- Hybrid TypeScript configuration for typed metadata routes.
- Centralized site and deployment URL configuration.
- Final production report and deployment checklist.
- Semantic responsive Footer with reusable navigation columns and centralized data.
- Server-rendered feature, guide, Hero, category, and platform-card UI.
- Responsive Navbar, mobile navigation, and active-route state.
- Optimized guide imagery, newsletter feedback, and project state documents.

### Changed

- Replaced the deprecated Next 16 `priority` image prop with deliberate eager loading for the above-fold logo.
- Tightened guide image `sizes` and the allowed Unsplash remote-image path.
- Renamed the package to `ai-training-platforms` and declared the supported Node.js runtime.
- Replaced `jsconfig.json` with a strict hybrid `tsconfig.json`.
- Updated Twitter metadata to use a large generated social card.
- Centralized brand, description, keyword, and canonical URL values.
- Optimized Inter and Plus Jakarta Sans through `next/font` with Latin subsets and `swap` display.

### Fixed

- Added a branded custom 404 with automatic `noindex` behavior.
- Added accessible error recovery and meaningful loading feedback.
- Added a keyboard-accessible main-content skip target.
- Replaced the default Next.js favicon metadata with the project brand icon.
- Removed the obsolete commented Navbar implementation from the active architecture.

### Removed

- Unused `@material-tailwind/react` and its React 18 dependency subtree.
- Default Next.js starter favicon and unused starter SVG assets.
- Empty future folders and unused global design tokens from earlier milestones.
