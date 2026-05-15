import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://notafacildownloader.contabilcert.com.br',
  trailingSlash: 'always',
  integrations: [
    sitemap(),
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
