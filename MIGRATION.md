# Migration notes

Reference: [bcamathteam/Holbrook-Site](https://github.com/bcamathteam/Holbrook-Site/tree/9f402cbc058911ac3523658cc1c9149e092770c4), commit `9f402cbc058911ac3523658cc1c9149e092770c4`.

## Preserved

- All four public pages: Home, About, Archive, and Staff.
- Original Materialize styles, custom stylesheet, Roboto and icon fonts, slideshow photographs, sponsors, tables, and layout classes.
- Competition content, past directors, 2025 student directors and exam leaders, and Daniel Kim's original developer credit.
- Mobile navigation, slideshow, About and Archive tabs, map modal, archive photo lightboxes, and return-to-top behavior.
- All original `images/`, `oldcomp/`, and `results/` files, plus both registration PDFs and favicon, at their existing public paths.

## Changed

- Shared Astro layout, navigation, footer, and site metadata replace duplicated HTML documents.
- Maintainer and Webmaster contact now point to Colin Ding, `coldin28@bergen.org`.
- Assets use root-relative paths so they resolve consistently from legacy and extensionless URLs.
- jQuery is served locally at the exact original version, preserving the original Materialize integration.
- Added image descriptions and accessible names for the navigation, map, and return-to-top control.
- The reference's 2004 exam shortcut pointed to a nonexistent section and had no corresponding exam files. The year remains in the same position as text, with an explanatory tooltip, instead of a broken link.
- Added a matching 404 page, canonical metadata, sitemap, robots.txt, locked dependencies, and GitHub build verification.
- Historical development copies, obsolete PHP sources, Apache configuration, and the old GitHub Pages CNAME are excluded from the deployed site.

`npm run verify` checks all generated routes, same-site links and fragments, image/script paths, maintainer contact, and archive PDF signatures. A browser visual comparison is not part of that command.

During migration, all 471 original public images, downloads, and favicon were compared byte-for-byte. The four pages' main markup was compared with the source, confirming the preserved structure and content apart from the documented contact, accessibility, URL, and 2004 shortcut changes. The original stylesheets are unchanged.

## Attribution

The source repository did not provide a site-wide license. This migration does not assign a new license to the original content, images, or competition materials. The package is marked `UNLICENSED`.

Materialize 1.0.0 and its included Cash DOM code retain their MIT notices. jQuery 2.1.1 retains its license notice. See [THIRD_PARTY.md](THIRD_PARTY.md).
