#!/usr/bin/env node
/**
 * Compresses images so straight-from-camera photos never reach production.
 *
 *   npm run optimize-images                 # optimizes public/blog
 *   node scripts/optimize-images.js public/gallery
 *
 * - .webp files are resized and re-encoded in place (only when the result
 *   is actually smaller, so running it twice is harmless).
 * - .jpg / .jpeg / .png files are converted to a new .webp next to the
 *   original. Originals are never deleted; the script tells you which
 *   path to use in blog.json so you can remove them yourself.
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error(
    'This script needs "sharp". Install it with:\n\n  npm install --save-dev sharp\n'
  );
  process.exit(1);
}

// Blog images render at roughly 700px wide, so 1600px leaves plenty of
// headroom for high-density screens and for social share previews.
const MAX_WIDTH = 1600;
const QUALITY = 78;
const TARGET = process.argv[2] || 'public/blog';
const EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

const kb = (bytes) => (bytes / 1024).toFixed(0) + 'KB';

async function main() {
  const dir = path.resolve(process.cwd(), TARGET);

  if (!fs.existsSync(dir)) {
    console.log(`Nothing to do — ${TARGET} does not exist yet.`);
    return;
  }

  const files = fs
    .readdirSync(dir)
    .filter((name) => EXTENSIONS.has(path.extname(name).toLowerCase()));

  if (files.length === 0) {
    console.log(`No images found in ${TARGET}.`);
    return;
  }

  let before = 0;
  let after = 0;
  const converted = [];

  for (const name of files) {
    const filePath = path.join(dir, name);
    const input = fs.readFileSync(filePath);
    const meta = await sharp(input).metadata();

    let pipeline = sharp(input);
    if (meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const output = await pipeline.webp({ quality: QUALITY }).toBuffer();

    const isWebp = path.extname(name).toLowerCase() === '.webp';
    before += input.length;

    if (isWebp) {
      if (output.length < input.length) {
        // Write via a temp file so a crash cannot truncate the original.
        const tmp = filePath + '.tmp';
        fs.writeFileSync(tmp, output);
        fs.renameSync(tmp, filePath);
        after += output.length;
        console.log(
          `  optimized  ${name}  ${kb(input.length)} -> ${kb(output.length)}  (${meta.width}px -> ${Math.min(meta.width, MAX_WIDTH)}px)`
        );
      } else {
        after += input.length;
        console.log(`  skipped    ${name}  ${kb(input.length)} (already optimal)`);
      }
      continue;
    }

    const webpName = path.basename(name, path.extname(name)) + '.webp';
    const webpPath = path.join(dir, webpName);
    fs.writeFileSync(webpPath, output);
    after += output.length;
    converted.push({ from: name, to: webpName });
    console.log(
      `  converted  ${name} -> ${webpName}  ${kb(input.length)} -> ${kb(output.length)}`
    );
  }

  console.log(
    `\nTotal: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`
  );

  await writeSizeManifest(dir);

  if (converted.length > 0) {
    const folder = '/' + TARGET.replace(/^public\//, '');
    console.log('\nUse these paths in blog.json:');
    for (const { to } of converted) {
      console.log(`  ${folder}/${to}`);
    }
    console.log('\nThe original files were kept — delete them once you have');
    console.log('checked the .webp versions look right.');
  }
}

/*
 * Records the real pixel size of every .webp in the folder.
 *
 * next/image needs true width and height to reserve the right box before the
 * file loads. Without them an inline blog image has to be forced into a fixed
 * container, which crops a portrait photo to a narrow strip — the same bug
 * that hit the gallery when every photo was declared 300x300.
 *
 * Written here rather than read at build time so the Next build stays free of
 * image decoding, and so the numbers update exactly when the images do.
 */
async function writeSizeManifest(dir) {
  const folder = '/' + TARGET.replace(/^public\//, '');
  const sizes = {};

  for (const name of fs.readdirSync(dir)) {
    if (path.extname(name).toLowerCase() !== '.webp') continue;
    const { width, height } = await sharp(path.join(dir, name)).metadata();
    if (width && height) sizes[`${folder}/${name}`] = { width, height };
  }

  const manifestPath = path.resolve('src/content/image-sizes.json');
  const existing = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {};

  // Merge, so optimizing one folder never drops another folder's entries.
  const merged = { ...existing, ...sizes };
  const ordered = Object.fromEntries(Object.keys(merged).sort().map((k) => [k, merged[k]]));

  fs.writeFileSync(manifestPath, JSON.stringify(ordered, null, 2) + '\n');
  console.log(
    `\nRecorded dimensions for ${Object.keys(sizes).length} image(s) in src/content/image-sizes.json`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
