import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://notafacildownloader.contabilcert.com.br',
  integrations: [
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
