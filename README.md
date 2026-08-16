# Compliance Extension

First-party bundle that keeps the legal surfaces (cookies, terms of service, and privacy policy) out of the core component registry. Sites can mount these documents wherever needed without copying the SFCs or duplicating schema logic.

## Quick Start
- Add the components to a page with the object syntax so the loader can resolve the extension:  
  ```json
  "components": [
    "Header",
    { "name": "Terms", "source": "compliance" },
    { "name": "Cookies", "source": "compliance" },
    { "name": "Privacy", "source": "compliance" },
    "Footer"
  ]
  ```
- Each component reads its content block from the matching config key (`terms`, `cookies`, `privacy`). Define those fields under `pages.<page>.content` or `shared.content` in your site JSON.

## Component Catalog

| Component | Location | Config Key | Allowed Pages | Notes |
|-----------|----------|------------|---------------|-------|
| `Terms` | `extensions/compliance/components/Terms.vue` | `terms` | `terms` | Renders rich-text body copy for the Terms of Service route. Supports HTML/markdown mixed content plus optional metadata (headings, updated date) defined inside the config block. |
| `Cookies` | `extensions/compliance/components/Cookies.vue` | `cookies` | `cookies` | Cookie policy surface with sections, ordered lists, and callouts. Reads the `cookieConsent` helpers so buttons stay in sync with `CookieConsent.vue`. |
| `Privacy` | `extensions/compliance/components/Privacy.vue` | `privacy` | `privacy` | Privacy policy layout with title, intro, and repeating section groups. Mirrored across locales by defining per-locale overrides for `privacy`. |
| `Legal` | `extensions/compliance/components/Legal.vue` | `legal` | any | Footer bar with the copyright notice and links to `/terms`, `/privacy`, `/cookies`. See [Legal bar](#legal-bar). |
| `CookieConsent` | `extensions/compliance/components/CookieConsent.vue` | `cookieConsent` | any | Consent banner, wired to the framework's `cookieConsent` helpers. |

> **Tip:** The manifest already maps each component to the config key above, so you only need to supply `configKey` in page configs when you want the component to pull data from an alternate field.

## Content Expectations
- Store legal copy under the matching config key:  
  ```json
  {
    "pages": {
      "privacy": {
        "components": ["Header", { "name": "Privacy", "source": "compliance" }, "Footer"]
      }
    },
    "shared": {
      "content": {
        "privacy": {
          "title": "Privacy Policy",
          "subtitle": "Updated January 2025",
          "sections": [
            { "heading": "Data We Collect", "body": "<p>...</p>" }
          ]
        }
      }
    }
  }
  ```
- Sections accept HTML strings and simple arrays (`bullets`, `listItems`) so CMS tooling can render rich copy without new Vue components.
- Route metadata (`pages.privacy.meta.title`, etc.) still lives beside the page definition just like any core component page.

## Legal bar

`Legal` renders `© <year> <company> - All rights reserved.` plus the three policy
links. The company name defaults to `site.title`, which is right for sites whose
title is a name and wrong for sites whose title is descriptive — a title like
`"Acme — the best widgets anywhere"` produced a copyright line carrying the whole
tagline. Rather than distort `site.title` (which also feeds `<title>`, the logo
alt text, and the JSON-LD organization), set the entity name here:

```json
{
  "shared": {
    "content": {
      "legal": {
        "company": "Acme Industries, LLC"
      }
    }
  }
}
```

| Key | Effect |
|---|---|
| `content.legal.company` | Entity name in the copyright line. Falls back to `site.title`. |
| `content.legal.copyright` | Replaces the whole generated line. Use when the notice doesn't fit the template. |

Both resolve page-first then shared, so a single page can carry a different
notice from the rest of the site.

## Localization
- Follow the normal locale override pattern described in `docs/configuration.md`. For example, `sites/<token>/config/<token>-es.json` can override just the `privacy` block for `/es/privacy` while inheriting the base English copy for any undefined fields.
- Because legal copy often changes per market, keep locale files scoped to the page-level `content` to avoid accidental overwrites across sites.

## Related References
- Manifest schema and validation rules: `docs/extensions.md`
- Site configuration fundamentals: `docs/configuration.md`
- Routing behaviour for `/privacy`, `/terms`, `/cookies`: `docs/architecture.md`

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)
