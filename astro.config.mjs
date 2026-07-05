import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: swap for the real production domain once registered —
  // this value drives canonical URLs, the sitemap, and OG/Twitter tags.
  site: 'https://primepeakstays.example',
  integrations: [sitemap()],
});
