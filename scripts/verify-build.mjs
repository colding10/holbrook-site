import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const output = path.resolve("dist");
const origin = "https://holbrook.bcamathteam.org";
const pages = ["index.html", "about.html", "archive.html", "staff.html", "404.html"];
const failures = [];
let references = 0;

function resolveOutput(url) {
  const pathname = decodeURIComponent(url.pathname);
  const relative = pathname.replace(/^\/+/, "");
  const candidates = pathname === "/"
    ? ["index.html"]
    : [relative, `${relative}.html`, `${relative.replace(/\/$/, "")}/index.html`];
  return candidates.map((file) => path.resolve(output, file)).find((file) =>
    file.startsWith(`${output}${path.sep}`) && existsSync(file) && statSync(file).isFile()
  );
}

for (const page of pages) {
  const filename = path.join(output, page);
  assert.ok(existsSync(filename), `Missing generated page: ${page}`);
  const html = readFileSync(filename, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  assert.match(html, /Maintained by[\s\S]*?Colin Ding/, `${page}: maintainer credit`);
  assert.match(html, /mailto:coldin28@bergen\.org/, `${page}: maintainer email`);
  const base = new URL(page === "index.html" ? "/" : `/${page}`, origin);

  for (const match of html.matchAll(/\b(?:href|src|data)="([^"]+)"/g)) {
    const reference = match[1].replace(/&amp;/g, "&");
    if (reference === "#!") continue; // Materialize modal close control.
    const url = new URL(reference, base);
    if (url.origin !== origin) continue;
    references++;
    const target = resolveOutput(url);
    if (!target) {
      failures.push(`${page}: missing ${reference}`);
      continue;
    }
    if (statSync(target).size === 0) failures.push(`${page}: empty ${reference}`);
    if (url.hash && target.endsWith(".html")) {
      const fragment = decodeURIComponent(url.hash.slice(1));
      const targetHtml = readFileSync(target, "utf8");
      if (!targetHtml.includes(`id="${fragment}"`)) {
        failures.push(`${page}: missing anchor ${reference}`);
      }
    }
  }
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filename) : [filename];
  });
}

const downloads = ["oldcomp", "results"].flatMap((folder) => walk(path.join(output, folder)));
for (const filename of downloads.filter((file) => file.endsWith(".pdf"))) {
  assert.equal(readFileSync(filename).subarray(0, 5).toString(), "%PDF-", `Invalid PDF: ${filename}`);
}

assert.deepEqual(failures, [], "Broken internal links or assets");
console.log(`Verified ${pages.length} pages, ${references} local references, and ${downloads.length} archive files.`);
