// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    build: {
      minify: false, // Helps with debugging
    },
  },
});
