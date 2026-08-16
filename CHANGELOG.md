# Changelog

## Unreleased

### Fixed

- **`Legal` no longer hardcodes `site.title` into the copyright line.** The
  entity name was read straight from `site.title` with no way to override it,
  so a site whose title is descriptive rather than a name rendered its whole
  tagline inside the notice — e.g. `© 2026 Acme — the best widgets anywhere -
  All rights reserved.` The only workaround was shortening `site.title`, which
  also feeds `<title>`, the logo alt text, and the JSON-LD organization.

  Two new content keys, both resolved page-first then shared:
  `content.legal.company` sets the entity name (still falling back to
  `site.title`, so existing sites are unchanged), and `content.legal.copyright`
  replaces the generated line outright for notices that don't fit the template.

## 1.0.0

First stable release, cut alongside `@koehler8/cms` 1.0.0.

- Verified against the cms 1.0.0 surface: every deep import
  (`utils/cookieConsent`, `utils/analytics`, `utils/loadConfig`) and all
  seven named consent APIs this extension uses are part of cms's documented
  stable exports, and the extension manifest passes the JSON-Schema
  validation the cms Vite plugin now enforces at build time (the cms test
  suite validates this package's manifest directly).
- Works with cms's new `site.analytics.consentMode` knob unchanged: the
  banner's accept flow still calls `scheduleAnalyticsLoad`, which respects
  the configured mode.
- Peer range widened to `^1.0.0-beta.1 || ^1.0.0` so the extension installs
  cleanly against both the beta line and stable 1.x.
- Publishing is now guarded: the workflow refuses to publish when the git
  tag doesn't match `package.json`, and builds on the pinned Node version
  (`.nvmrc`, 20.19.0 — Amplify parity).

## 1.0.0-beta.4 and earlier

Pre-1.0 development. Notable: beta.3 switched publishing from GitHub
Packages to the public npm registry; beta.2 fixed JSON import assertions
for Node ESM SSR compatibility.
