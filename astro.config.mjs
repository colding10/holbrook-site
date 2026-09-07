import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://holbrook.bcamathteam.org",
  integrations: [sitemap()],
  output: "static",
  build: { format: "file" },
});
