# Joe Holbrook Memorial Math Competition

An Astro rewrite of [bcamathteam/Holbrook-Site](https://github.com/bcamathteam/Holbrook-Site), preserving the original site's appearance and content. Maintained by **Colin Ding** ([coldin28@bergen.org](mailto:coldin28@bergen.org)).

Intended production address: **https://holbrook.bcamathteam.org**.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run verify  # Astro diagnostics, production build, internal links, downloads
npm run preview
```

The static production output is `dist/`. No application server, database, or runtime secrets are required.

## Editing the site

| Content | Source |
| --- | --- |
| Homepage and sponsors | `src/pages/index.astro` |
| Competition information, schedule, location, rules | `src/pages/about.astro` |
| Exams, solutions, results, photos | `src/pages/archive.astro` |
| Organizers and past directors | `src/pages/staff.astro` |
| Shared navigation and footer | `src/components/` |
| Maintainer name, email, and metadata | `src/data/site.ts` |
| Original visual styling | `public/css/style.css` |
| Downloadable exams and results | `public/oldcomp/`, `public/results/` |
| Images | `public/images/` |

Competition dates and historical organizer credits remain as published in the source. Update the homepage, About, and Staff pages when the next competition's details are confirmed.

The original Materialize CSS, markup, photos, and interaction scripts are retained to match the reference. Astro provides shared components and static page generation. Both legacy `.html` links and Cloudflare's extensionless URLs work.

See [DEPLOYMENT.md](DEPLOYMENT.md) for Cloudflare setup and [MIGRATION.md](MIGRATION.md) for provenance and validation.
