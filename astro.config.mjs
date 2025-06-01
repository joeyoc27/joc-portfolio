// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://joc-portfolio.joeyoc27.workers.dev',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    logLevel: 'info',
  },
});
