import posts from '../content/blog.json';
import imageSizes from '../content/image-sizes.json';
import { routing } from '../i18n/routing';

/**
 * Photos used when a post has no image of its own.
 * Filenames match public/gallery exactly. The three that used to be lowercase
 * ("photo 3/7/8") were renamed to match the rest, so these are capitalised
 * too — they only resolved before because Windows and Netlify happen to be
 * case-insensitive.
 */
const GALLERY_FALLBACKS = [
  '/gallery/Photo 1.webp',
  '/gallery/Photo 2.webp',
  '/gallery/Photo 3.webp',
  '/gallery/Photo 4.webp',
  '/gallery/Photo 5.webp',
  '/gallery/Photo 6.webp',
  '/gallery/Photo 7.webp',
  '/gallery/Photo 8.webp',
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
 * Rough reading time, from the article's own words.
 *
 * 200 words a minute is the usual figure for adult silent reading. Counted per
 * locale rather than once, because a French translation of an English paragraph
 * is reliably longer and the label should match the text in front of the reader.
 *
 * Rounded up, so a very short post never claims to take zero minutes.
 */
function countWords(content) {
  return content
    // An image block is not read, so it contributes no time.
    .filter((block) => !String(block).trim().startsWith('!['))
    .join(' ')
    .replace(/^##\s+/gm, '')
    // Keep a link's visible text, drop its URL.
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .split(/\s+/)
    .filter(Boolean).length;
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
  const content = pick('content') || [];
  const wordCount = countWords(content);

  return {
    id,
    date: post.date || '',
    /*
     * Optional, and only set once a published post is genuinely revised.
     *
     * Google treats freshness as a ranking signal, but it reads dateModified -
     * so while this is absent, dateModified simply equals datePublished and an
     * edit is invisible to search. Kept separate from date so a post does not
     * jump back to the top of the index every time a typo is fixed.
     */
    updated: post.updated || '',
    image: hasOwnImage ? post.image : fallbackImage(id),
    // Lets callers swap in a generic alt: a gallery fallback is not
    // described by whatever imageAlt the post happens to carry.
    imageIsFallback: !hasOwnImage,
    title: pick('title') || id,
    excerpt: pick('excerpt') || '',
    imageAlt: pick('imageAlt') || '',
    content,
    wordCount,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
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

/**
 * The posts either side of a given one, for the "read next" links.
 *
 * Named newer/older rather than previous/next on purpose: "next article" is
 * ambiguous in a list sorted by date — it can mean the next one down the page
 * or the next one published. Newer and older cannot be misread.
 *
 * Either can be null: the most recent post has no newer, the first post has no
 * older, and with a single post both are null so the whole block disappears.
 */
export function getAdjacentPosts(id, locale) {
  const ordered = getAllPosts(locale);
  const index = ordered.findIndex((post) => post.id === String(id));
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? ordered[index - 1] : null,
    older: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
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
/*
 * Inline links inside a paragraph, written as [texte](/#courses).
 *
 * Added because the blog could not link anywhere at all. An article that
 * mentions the courses twice and links to neither is a dead end: internal
 * links from a post to the pages it talks about are most of what a blog does
 * for search, and all of what it does for a reader who is ready to act.
 *
 * The negative lookbehind stops ![alt](src) being read as a link. A whole-block
 * image is caught earlier in parseBlock, but a paragraph could still contain
 * one inline.
 */
const INLINE_LINK = /(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Splits paragraph text into plain and link segments.
 * Returns a single text part when there are no links, so callers can always
 * just map over the result.
 */
export function parseInline(text) {
  const parts = [];
  let last = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    if (match.index > last) {
      parts.push({ type: 'text', text: text.slice(last, match.index) });
    }
    parts.push({ type: 'link', text: match[1], href: match[2] });
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push({ type: 'text', text: text.slice(last) });
  return parts;
}

export function parseBlock(block) {
  const text = String(block ?? '').trim();

  if (text.startsWith('## ')) {
    return { type: 'heading', text: text.slice(3).trim() };
  }

  const image = text.match(/^!\[(.*?)\]\((.+?)\)$/);
  if (image) {
    const src = image[2].trim();
    // Dimensions come from the manifest npm run optimize-images writes. Absent
    // for an image that never went through the optimizer, in which case the
    // renderer falls back to a fixed box.
    const size = imageSizes[src] || null;
    return {
      type: 'image',
      alt: image[1].trim(),
      src,
      width: size ? size.width : null,
      height: size ? size.height : null,
    };
  }

  return { type: 'paragraph', text, parts: parseInline(text) };
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
