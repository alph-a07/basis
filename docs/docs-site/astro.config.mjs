import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
const isProd = import.meta.env.PROD;

export default defineConfig({
  site: isProd ? 'https://alph-a07.github.io/basis' : undefined,
  base: isProd ? '/basis/' : '/',
  integrations: [react(), mdx()],
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    },
  },
});
