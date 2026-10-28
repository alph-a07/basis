import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://basis.alph-a07.github.io',
  integrations: [mdx()],
  output: 'static',
});
