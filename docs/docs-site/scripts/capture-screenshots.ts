import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const distDir = path.resolve('docs/docs-site/dist');
const outDir = path.resolve('scratch/screenshots');
fs.mkdirSync(outDir, { recursive: true });

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js':
    case '.mjs': return 'application/javascript';
    case '.json': return 'application/json';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.woff2': return 'font/woff2';
    default: return 'application/octet-stream';
  }
}

function startServer(port: number): Promise<http.Server> {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url?.split('?')[0] || '/');
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    } else if (!path.extname(reqPath)) {
      reqPath += '/index.html';
    }

    const fullPath = path.join(distDir, reqPath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      res.writeHead(200, { 'Content-Type': getMimeType(fullPath) });
      fs.createReadStream(fullPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

const routes = [
  { name: 'landing', path: '/' },
  { name: 'studio', path: '/studio' },
  { name: 'button-overview', path: '/docs/components/button' },
  { name: 'button-api', path: '/docs/components/button/api' },
  { name: 'theming-brand', path: '/docs/theming/set-brand' },
  { name: 'installation', path: '/docs/getting-started/installation' },
  { name: 'surface', path: '/docs/foundation/surface' },
];

async function main() {
  const port = 4178;
  const server = await startServer(port);
  console.log(`Server started at http://localhost:${port}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  for (const theme of ['dark', 'light'] as const) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Pre-seed theme before DOM loads so head blocking script sets it synchronously
    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem('basis-theme', t);
    }, theme);

    for (const route of routes) {
      console.log(`Capturing ${route.name} [${theme}]...`);
      const url = `http://localhost:${port}${route.path}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      // Ensure data-theme is set explicitly
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);
      await new Promise((r) => setTimeout(r, 100));
      await page.screenshot({ path: path.join(outDir, `${route.name}-${theme}.png`) });
    }

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`All screenshots captured to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
