import posts from '../content/blog.json';
import { routing } from '../i18n/routing';

/**
 * Photos used when a post has no image of its own.
 * Filenames match public/gallery exactly, including the lowercase
 * "photo 3/7/8" entries.
 */
const GALLERY_FALLBACKS = [
  '/gallery/Photo 1.webp',
  '/gallery/Photo 2.webp',
  '/gallery/photo 3.webp',
  '/gallery/Photo 4.webp',
  '/gallery/Photo 5.webp',
  '/gallery/Photo 6.webp',
  '/gallery/photo 7.webp',
  '/gallery/photo 8.webp',
  '/gallery/Photo 9.webp',
  '/gallery/Photo 10.webp',
  '/gallery/Photo 11.webp',
  '/gallery/Photo 12.webp',
  '/gallery/Photo 13.webp',
  '/gallery/Photo 14.webp',
  '/gallery/Photo 15.webp',
  '/gallery/Photo 16.webp',
  '/gallery/Photo 17.webp',
  '/gallery/Photo 18.webp',
  '/gallery/Photo 19.webp',
  '/gallery/Photo 20.webp',
  '/gallery/Photo 21.webp',
  '/gallery/rennes.webp',
];

/** Small stable string hash, so a given id always maps to the same photo. */
function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Picks a gallery photo for a post that has no image.
 *
 * Deliberately derived from the post id rather than Math.random(): the
 * choice has to stay identical between the server render, the Open Graph
 * share image and the structured data, and must not change on refresh.
 */
function fallbackImage(id) {
  if (GALLERY_FALLBACKS.length === 0) return null;
  return GALLERY_FALLBACKS[hashString(id) % GALLERY_FALLBACKS.length];
}

/**
 * Flattens one raw entry from blog.json into a single-locale shape.
 *
 * Falls back to the default locale for any field a translation is missing,
 * so a half-translated post still renders instead of showing blanks.
 */
function localize(post, locale) {
  const fallback = post[routing.defaultLocale] || {};
  const current = post[locale] || {};
  const pick = (key) => current[key] ?? fallback[key];

  const id = String(post.id);
  const hasOwnImage = Boolean(post.image);

  return {
    id,
    date: post.date || '',
    image: hasOwnImage ? post.image : fallbackImage(id),
    // Lets callers swap in a generic alt: a gallery fallback is not
    // described by whatever imageAlt the post happens to carry.
    imageIsFallback: !hasOwnImage,
    title: pick('title') || id,
    excerpt: pick('excerpt') || '',
    imageAlt: pick('imageAlt') || '',
    content: pick('content') || [],
  };
}

/** All posts for a locale, newest first. */
export function getAllPosts(locale) {
  return [...posts]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((post) => localize(post, locale));
}

/** A single post, or null when the id does not exist. */
export function getPost(id, locale) {
  const post = posts.find((entry) => String(entry.id) === String(id));
  return post ? localize(post, locale) : null;
}

/** Every post id — used for static generation and the sitemap. */
export function getPostIds() {
  return posts.map((post) => String(post.id));
}

/**
 * Splits a content block into its rendered form.
 *
 *   "## Titre"                     -> heading
 *   "![description](/blog/x.webp)" -> image placed inline in the article
 *   anything else                  -> paragraph
 */
export function parseBlock(block) {
  const text = String(block ?? '').trim();

  if (text.startsWith('## ')) {
    return { type: 'heading', text: text.slice(3).trim() };
  }

  const image = text.match(/^!\[(.*?)\]\((.+?)\)$/);
  if (image) {
    return { type: 'image', alt: image[1].trim(), src: image[2].trim() };
  }

  return { type: 'paragraph', text };
}

/** Locale-aware date label, e.g. "21 août 2026". Empty string when unset. */
export function formatDate(date, locale) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}
