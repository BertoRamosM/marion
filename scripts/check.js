#!/usr/bin/env node
/**
 * Consistency checks for the things that break silently.
 *
 *   npm run check
 *
 * Every check here exists because the bug it catches actually happened, and
 * in each case nothing complained: the build passed, the pages returned 200,
 * the HTML was valid. That is the whole category this file is for — errors
 * that look exactly like success.
 *
 *   - hreflang alternates pointing at URLs that 404.  Shipped and live for
 *     months. next-sitemap treats alternateRefs.href as a PREFIX unless you
 *     set hrefIsAbsolute, so ".../en/faq" + "/fr/faq" became
 *     ".../en/faq/fr/faq". Google silently drops a cluster whose members do
 *     not resolve, so the three languages compete instead of being grouped.
 *
 *   - A photo's declared size not matching the file. Gallery.jsx balances its
 *     masonry columns on the declared ratio; when it is wrong the columns are
 *     laid out on false heights and lazy images inside them can end up
 *     positioned so the browser never fetches them. Photos stay blank.
 *
 *   - A message key present in one locale and missing in another. next-intl
 *     throws at render time, so the page that breaks is whichever one a
 *     visitor happens to open in that language.
 *
 *   - An image path in the code that no longer exists on disk. Renaming or
 *     recropping a photo is routine here; a stale reference is a broken
 *     image, and nothing fails the build.
 *
 * Read-only. It never writes anything.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
process.chdir(ROOT);

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('This script needs "sharp" (already a devDependency).');
  process.exit(1);
}

const LOCALES = ['fr', 'en', 'es'];

const problems = [];
const notes = [];
const fail = (check, detail) => problems.push({ check, detail });

// --------------------------------------------------------------- helpers

/** Flattens nested messages to dotted keys, so two locales can be compared. */
function flattenKeys(object, prefix = [], into = new Set()) {
  for (const [key, value] of Object.entries(object)) {
    const next = [...prefix, key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenKeys(value, next, into);
    } else {
      into.add(next.join('.'));
    }
  }
  return into;
}

/** Every "/gallery/..." or "/blog/..." path written in a source file. */
function imagePathsIn(file) {
  const source = fs.readFileSync(file, 'utf8');
  return [...source.matchAll(/["'`](\/(?:gallery|blog|carousel|about|logos)\/[^"'`]+)["'`]/g)]
    .map((match) => match[1])
    .filter((p) => /\.(webp|png|jpe?g|svg)$/i.test(p));
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(name)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

// ---------------------------------------------------- 1. locale key parity

function checkLocaleParity() {
  const keysByLocale = {};
  for (const locale of LOCALES) {
    keysByLocale[locale] = flattenKeys(
      JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'))
    );
  }

  const reference = LOCALES[0];
  for (const locale of LOCALES.slice(1)) {
    for (const key of keysByLocale[reference]) {
      if (!keysByLocale[locale].has(key)) {
        fail('locale parity', `"${key}" is in ${reference}.json but missing from ${locale}.json`);
      }
    }
    for (const key of keysByLocale[locale]) {
      if (!keysByLocale[reference].has(key)) {
        fail('locale parity', `"${key}" is in ${locale}.json but missing from ${reference}.json`);
      }
    }
  }

  notes.push(`locale parity   ${keysByLocale[reference].size} keys in each of ${LOCALES.join(', ')}`);
}

// ------------------------------------------------- 2. declared image sizes

async function checkImageSizes() {
  const manifest = JSON.parse(fs.readFileSync('src/content/image-sizes.json', 'utf8'));
  let checked = 0;

  for (const [src, declared] of Object.entries(manifest)) {
    const file = path.join('public', decodeURIComponent(src));
    if (!fs.existsSync(file)) {
      fail('image sizes', `${src} is in image-sizes.json but the file does not exist`);
      continue;
    }
    const meta = await sharp(file).metadata();
    checked += 1;
    if (meta.width !== declared.width || meta.height !== declared.height) {
      fail(
        'image sizes',
        `${src}: file is ${meta.width}x${meta.height}, manifest says ${declared.width}x${declared.height}` +
          ' — run "npm run optimize-images public/gallery" to refresh it'
      );
    }
  }

  // Gallery.jsx declares its own, and is what the masonry balances on.
  const gallery = fs.readFileSync('src/app/[local]/components/Gallery.jsx', 'utf8');
  let inGallery = 0;
  for (const m of gallery.matchAll(/\{ src: "([^"]+)", width: (\d+), height: (\d+)/g)) {
    const [, src, width, height] = m;
    const file = path.join('public', decodeURIComponent(src));
    if (!fs.existsSync(file)) {
      fail('image sizes', `Gallery.jsx references ${src}, which does not exist`);
      continue;
    }
    const meta = await sharp(file).metadata();
    inGallery += 1;
    if (meta.width !== Number(width) || meta.height !== Number(height)) {
      fail(
        'image sizes',
        `Gallery.jsx declares ${src} as ${width}x${height} but the file is ${meta.width}x${meta.height}` +
          ' — the masonry will balance on the wrong heights'
      );
    }
  }

  notes.push(`image sizes     ${checked} in the manifest, ${inGallery} in the gallery array`);
}

// --------------------------------------------- 3. image paths that resolve

function checkImageReferences() {
  const files = [...walk('src')].filter((f) => /\.(jsx?|tsx?|json)$/.test(f));
  const seen = new Set();
  let checked = 0;

  for (const file of files) {
    for (const src of imagePathsIn(file)) {
      const key = src + '|' + file;
      if (seen.has(key)) continue;
      seen.add(key);
      checked += 1;
      if (!fs.existsSync(path.join('public', decodeURIComponent(src)))) {
        fail('image refs', `${path.relative(ROOT, file)} references ${src}, which is not in public/`);
      }
    }
  }

  notes.push(`image refs      ${checked} references resolve`);
}

// -------------------------------------------------------- 4. sitemap sanity

function checkSitemap() {
  const file = 'public/sitemap-0.xml';
  if (!fs.existsSync(file)) {
    notes.push('sitemap         not generated yet (runs on build) — skipped');
    return;
  }

  const xml = fs.readFileSync(file, 'utf8');
  const urls = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map((m) => m[0]);
  if (urls.length === 0) {
    fail('sitemap', 'no <url> entries at all');
    return;
  }

  const locs = new Set();
  let withLastmod = 0;

  for (const block of urls) {
    const loc = /<loc>(.*?)<\/loc>/.exec(block)?.[1];
    if (loc) locs.add(loc);
    if (/<lastmod>/.test(block)) withLastmod += 1;

    for (const alt of block.matchAll(/hreflang="(.*?)"\s+href="(.*?)"/g)) {
      const href = alt[2];
      const pathPart = href.replace(/^https?:\/\/[^/]+/, '');
      /*
       * The doubled-prefix signature: a second locale segment after the
       * first, e.g. /en/faq/fr/faq. A correct URL has exactly one.
       */
      if (/^\/(fr|en|es)\/.*\/(fr|en|es)(\/|$)/.test(pathPart)) {
        fail(
          'sitemap hreflang',
          `${loc} -> ${alt[1]} alternate is "${href}", which has the locale twice` +
            ' — alternateRefs is missing hrefIsAbsolute: true'
        );
      }
    }
  }

  // Every hreflang target should itself be a URL the sitemap lists.
  for (const block of urls) {
    const loc = /<loc>(.*?)<\/loc>/.exec(block)?.[1];
    for (const alt of block.matchAll(/hreflang="(fr|en|es)"\s+href="(.*?)"/g)) {
      if (!locs.has(alt[2])) {
        fail(
          'sitemap hreflang',
          `${loc} points its ${alt[1]} alternate at ${alt[2]}, which the sitemap does not list`
        );
      }
    }
  }

  if (withLastmod !== urls.length) {
    fail('sitemap', `${urls.length - withLastmod} of ${urls.length} entries have no <lastmod>`);
  }

  notes.push(`sitemap         ${urls.length} urls, all with lastmod, hreflang resolves`);
}

// ------------------------------------------- 5. offer slugs are consistent

function checkOfferSlugs() {
  const slugs = JSON.parse(fs.readFileSync('src/content/offers.json', 'utf8'));
  const seen = new Map();

  for (const [offer, byLocale] of Object.entries(slugs)) {
    for (const locale of LOCALES) {
      const slug = byLocale[locale];
      if (!slug) {
        fail('offer slugs', `${offer} has no slug for "${locale}"`);
        continue;
      }
      /*
       * Every slug must be unique across the whole table. The [offer] route
       * resolves a slug against one locale, so a slug shared by two locales
       * would make one of them unreachable.
       */
      if (seen.has(slug)) {
        fail('offer slugs', `"${slug}" is used by both ${seen.get(slug)} and ${offer}/${locale}`);
      }
      seen.set(slug, `${offer}/${locale}`);
      if (!/^[a-z0-9-]+$/.test(slug)) {
        fail('offer slugs', `"${slug}" (${offer}/${locale}) is not a clean lowercase slug`);
      }
    }
  }

  notes.push(`offer slugs     ${seen.size} unique slugs across ${LOCALES.length} locales`);
}

// ---------------------------------------------------------------- run all

(async () => {
  checkLocaleParity();
  await checkImageSizes();
  checkImageReferences();
  checkSitemap();
  checkOfferSlugs();

  if (problems.length === 0) {
    console.log('\nAll checks passed.\n');
    for (const note of notes) console.log('  ' + note);
    console.log();
    return;
  }

  console.error(`\n${problems.length} problem(s) found:\n`);
  for (const { check, detail } of problems) {
    console.error(`  [${check}] ${detail}`);
  }
  console.error();
  process.exit(1);
})();
