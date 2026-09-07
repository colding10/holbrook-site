import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://holbrook.bcamathteam.org",
  integrations: [sitemap({
    serialize(item) {
      item.url = item.url.replace(/\.html$/, "");
      return item;
    },
  })],
  output: "static",
  // Keep whitespace at line breaks around inline links and emphasis.
  compressHTML: false,
  build: { format: "file" },
});
