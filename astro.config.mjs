import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://notafacildownloader.contabilcert.com.br',
  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'always'
  }
});
