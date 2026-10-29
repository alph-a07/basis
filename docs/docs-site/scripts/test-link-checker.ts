import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

console.log('Running P1.7 Internal Link Checker and Stub Summary...\n');

if (!fs.existsSync(distDir)) {
  console.log(`Dist directory not found at ${distDir}. Building site first...`);
  execSync('npm run build', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
}

function getHtmlFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Scanning ${htmlFiles.length} generated HTML pages for internal links and stub pages...\n`);

interface BrokenLink {
  sourceFile: string;
  href: string;
  reason: string;
}

const brokenLinks: BrokenLink[] = [];
const stubPages: { url: string; title: string; section: string }[] = [];
const checkedLinks = new Set<string>();

// Pre-load DOMs and IDs for fast hash resolution
const fileDomCache = new Map<string, { dom: JSDOM; ids: Set<string> }>();

function getFileDom(filePath: string) {
  if (!fileDomCache.has(filePath)) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const ids = new Set<string>();
    dom.window.document.querySelectorAll('[id]').forEach((el) => {
      const id = el.getAttribute('id');
      if (id) ids.add(id);
    });
    dom.window.document.querySelectorAll('a[name]').forEach((el) => {
      const name = el.getAttribute('name');
      if (name) ids.add(name);
    });
    fileDomCache.set(filePath, { dom, ids });
  }
  return fileDomCache.get(filePath)!;
}

for (const filePath of htmlFiles) {
  const relativeSource = path.relative(distDir, filePath);
  const { dom, ids } = getFileDom(filePath);
  const doc = dom.window.document;

  // Check if this page is a stub
  const stubBadge = doc.querySelector('.stub-badge');
  if (stubBadge) {
    const sectionBadge = doc.querySelector('.section-badge')?.textContent?.trim() || '';
    const title = doc.querySelector('.doc-title')?.textContent?.trim() || '';
    stubPages.push({
      url: `/${relativeSource.replace(/index\.html$/, '').replace(/\.html$/, '')}`,
      title,
      section: sectionBadge,
    });
  }

  // Check all anchor links
  const links = doc.querySelectorAll<HTMLAnchorElement>('a[href]');
  for (const link of links) {
    const href = link.getAttribute('href');
    if (!href) continue;

    // Ignore external or non-http links
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    const cacheKey = `${relativeSource} -> ${href}`;
    if (checkedLinks.has(cacheKey)) continue;
    checkedLinks.add(cacheKey);

    // Hash-only link (#section)
    if (href.startsWith('#')) {
      const anchor = href.slice(1);
      if (anchor && !ids.has(anchor)) {
        brokenLinks.push({
          sourceFile: relativeSource,
          href,
          reason: `Target anchor "#${anchor}" does not exist in ${relativeSource}`,
        });
      }
      continue;
    }

    // Path with optional hash
    const [pathname, hash] = href.split('#');

    // Resolve relative or root pathname
    let targetFilePath = '';
    if (pathname.startsWith('/')) {
      const cleanPath = pathname.replace(/^\//, '');
      const candidateIndex = path.join(distDir, cleanPath, 'index.html');
      const candidateDirect = path.join(distDir, `${cleanPath}.html`);
      const candidateExact = path.join(distDir, cleanPath);

      if (fs.existsSync(candidateIndex) && fs.statSync(candidateIndex).isFile()) {
        targetFilePath = candidateIndex;
      } else if (fs.existsSync(candidateDirect) && fs.statSync(candidateDirect).isFile()) {
        targetFilePath = candidateDirect;
      } else if (fs.existsSync(candidateExact) && fs.statSync(candidateExact).isFile()) {
        targetFilePath = candidateExact;
      }
    } else {
      const resolved = path.resolve(path.dirname(filePath), pathname);
      const candidateIndex = path.join(resolved, 'index.html');
      const candidateDirect = `${resolved}.html`;

      if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
        targetFilePath = resolved;
      } else if (fs.existsSync(candidateIndex) && fs.statSync(candidateIndex).isFile()) {
        targetFilePath = candidateIndex;
      } else if (fs.existsSync(candidateDirect) && fs.statSync(candidateDirect).isFile()) {
        targetFilePath = candidateDirect;
      }
    }

    if (!targetFilePath || !fs.existsSync(targetFilePath)) {
      brokenLinks.push({
        sourceFile: relativeSource,
        href,
        reason: `Destination file not found for path "${pathname}"`,
      });
      continue;
    }

    // Verify hash anchor if specified
    if (hash) {
      const targetDomData = getFileDom(targetFilePath);
      if (!targetDomData.ids.has(hash)) {
        brokenLinks.push({
          sourceFile: relativeSource,
          href,
          reason: `Target anchor "#${hash}" does not exist in destination ${path.relative(distDir, targetFilePath)}`,
        });
      }
    }
  }
}

// -------------------------------------------------------------
// CI Summary: List all Documentation Stub Pages
// -------------------------------------------------------------
console.log('=============================================================');
console.log(`📋 CI SUMMARY: DOCUMENTATION STUB PAGES (${stubPages.length} STUBS)`);
console.log('=============================================================');
const stubsBySection = new Map<string, typeof stubPages>();
for (const stub of stubPages) {
  const section = stub.section || 'General';
  if (!stubsBySection.has(section)) {
    stubsBySection.set(section, []);
  }
  stubsBySection.get(section)!.push(stub);
}

for (const [section, items] of stubsBySection.entries()) {
  console.log(`\n📁 Section: ${section}`);
  for (const item of items) {
    console.log(`   - [STUB] ${item.title.padEnd(24)} -> ${item.url}`);
  }
}
console.log('\n=============================================================');

// -------------------------------------------------------------
// Link Verification Results
// -------------------------------------------------------------
if (brokenLinks.length > 0) {
  console.error(`\n❌ Found ${brokenLinks.length} broken internal links:`);
  for (const bl of brokenLinks) {
    console.error(`  - In "${bl.sourceFile}": href="${bl.href}"`);
    console.error(`    Reason: ${bl.reason}`);
  }
  process.exit(1);
} else {
  console.log(`✅ All internal links across all ${htmlFiles.length} pages verified successfully! Zero broken links.`);
  console.log('🎉 P1.7 Prose stubs and link checking passed successfully!');
}
