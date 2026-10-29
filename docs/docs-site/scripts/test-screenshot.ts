import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outDir = path.resolve('scratch/screenshots');
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const distStudio = path.resolve('docs/docs-site/dist/studio/index.html');
  await page.goto(`file://${distStudio}`, { waitUntil: 'networkidle0' });

  await page.screenshot({ path: path.join(outDir, 'studio-dark.png') });

  // Toggle to light mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise((r) => setTimeout(r, 200));

  await page.screenshot({ path: path.join(outDir, 'studio-light.png') });

  await browser.close();
  console.log('Screenshots saved to scratch/screenshots');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
