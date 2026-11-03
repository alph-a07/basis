import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const isProd = process.env.NODE_ENV === 'production';
const siteUrl = isProd ? 'https://alph-a07.github.io/basis' : '';

export function generateSitemap(): void {
  if (!fs.existsSync(distDir)) {
    console.warn('⚠️ Dist dir does not exist; skipping sitemap generation.');
    return;
  }

  function getHtmlFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getHtmlFiles(fullPath));
      } else if (entry.isFile() && entry.name === 'index.html') {
        files.push(fullPath);
      }
    }
    return files;
  }

  const htmlFiles = getHtmlFiles(distDir);
  const urls: string[] = [];

  for (const file of htmlFiles) {
    const rel = path.relative(distDir, file);
    if (rel.startsWith('404')) continue;
    const route = rel.replace(/(^|\/)index\.html$/, '');
    const cleanRoute = route ? `/${route}` : '/';
    urls.push(`${siteUrl}${cleanRoute}`);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs at ${outputPath}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  generateSitemap();
}
