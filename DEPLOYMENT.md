# Cloudflare Pages deployment

This repository is prepared for Cloudflare Pages with GitHub integration. Creating this repository does not itself deploy the site or change DNS.

## Connect the repository

In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository**, then select `colding10/holbrook-site`.

| Setting | Value |
| --- | --- |
| Project name | `holbrook-site` (or another available name) |
| Production branch | `main` |
| Framework preset | Astro |
| Root directory | Repository root |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (also specified in `.nvmrc`) |

Deploy once and verify the assigned `pages.dev` address. GitHub Actions independently runs Astro checks, builds the site, and checks internal links and archive downloads. Cloudflare owns deployment; no GitHub Cloudflare token is needed for this setup.

## Attach holbrook.bcamathteam.org

In the new Pages project's **Custom domains**, add `holbrook.bcamathteam.org`. Follow Cloudflare's DNS instructions for that specific Pages project. If the zone is in the same Cloudflare account, Cloudflare can create the record for you. If DNS is managed elsewhere, use the CNAME target shown by Pages.

Associate the hostname in Pages before adding or replacing its DNS record. An existing `holbrook` record may point to the old site; switch that hostname only after the `pages.dev` preview is verified. The Astro canonical URL and sitemap already use `https://holbrook.bcamathteam.org`.

## URLs and verification

Astro emits `about.html`, `archive.html`, and `staff.html`. Cloudflare Pages serves these through extensionless paths and redirects legacy `.html` requests. Do not add redirects from extensionless paths back to `.html`, which would create a loop.

After deployment, check the homepage carousel, mobile navigation, About tabs and map, Archive tabs and PDFs, and Staff tabs. Test both `/archive` and `/archive.html`, a PDF whose filename contains spaces, and an unknown URL (which should use `404.html`).

Future pushes to `main` deploy automatically after Git integration is connected. Pull requests can receive Cloudflare preview deployments. Roll back through the Pages deployment history if needed.

Official references: [Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [Pages URL handling](https://developers.cloudflare.com/pages/configuration/serving-pages/).
