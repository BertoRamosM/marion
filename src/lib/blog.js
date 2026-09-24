import posts from '../content/blog.json';
import imageSizes from '../content/image-sizes.json';
import { routing } from '../i18n/routing';

/*
 * Gallery photos a post can borrow when it has no image of its own.
 *
 * Derived from the image-size manifest rather than hand-listed. That manifest
 * is written by `npm run optimize-images` straight from the files on disk, so
 * every entry here provably exists.
 *
 * The hand-kept list this replaces could only drift, and had: it still named
 * photos that no longer matched their files, and it had never gained photos
 * 22-30, so the newest work could not be picked at all. A typo or a removed
 * file showed up as a broken image with nothing to warn you.
 */
const EXCLUDED_FROM_FALLBACKS = new Set([
  // Stock photography. Out of place anywhere on this site, and especially at
  // the top of an article, where the whole point is that it is Marion's own.
  '/gallery/Photo 3.webp', // rose-gold flat-lay
  '/gallery/Photo 13.webp', // friends silhouetted at sunset
]);

const GALLERY_FALLBACKS = Object.keys(imageSizes)
  .filter((src) => src.startsWith('/gallery/'))
  .filter((src) => !EXCLUDED_FROM_FALLBACKS.has(src))
  // Sorted so the set is identical on every machine and every build, whatever
  // order the manifest happens to have been written in.
  .sort();

/**
 * Stable 32-bit string hash: FNV-1a, then murmur3's final avalanche.
 *
 * The avalanche step is the part that matters. This was a plain `hash * 31 +
 * charCode`, which is fine for a hash table and not fine here: every candidate
 * shares the prefix "/gallery/Photo " and differs in one or two trailing
 * characters, and a ×31 hash barely separates inputs that similar. Measured
 * over 300 ids it left 8 of the 29 photos never chosen at all, gave one photo
 * five times its share, and made adding a single photo move a third of the
 * posts instead of a thirtieth.
 *
 * Math.imul is not decoration — it is the only way to get a real 32-bit
 * multiply in JavaScript. Plain `*` goes through a double and quietly loses
 * the low bits that carry the mixing.
 */
function hashString(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

/**
 * Picks a gallery photo for a post that has no image.
 *
 * Derived from the post id rather than Math.random(): the choice has to stay
 * identical between the server render, the Open Graph share image and the
 * structured data, and must not change on refresh.
 *
 * WHY NOT hash % length
 *
 * That was the previous approach and it is unstable: the modulus moves the
 * instant the pool does, so adding a single photo silently reassigns the card
 * image of every existing post. Photos get added here regularly, so that is
 * not a rare event — and a post's card image is also its Open Graph image,
 * the one already cached by whoever has shared the link.
 *
 * Instead each post scores every candidate and keeps the highest, which is
 * rendezvous hashing. Adding a photo moves a post only if the new photo
 * outscores its current one; removing a photo moves only the posts that were
 * using it. Everything else stays exactly where it was.
 */
function fallbackImage(id) {
  if (GALLERY_FALLBACKS.length === 0) return null;

  let best = null;
  let bestScore = -1;

  for (const candidate of GALLERY_FALLBACKS) {
    const score = hashString(`${id}\u0000${candidate}`);
    // Fall back to the filename when two score the same, so a tie can never
    // depend on array order.
    if (score > bestScore || (score === bestScore && candidate < best)) {
      best = candidate;
      bestScore = score;
    }
  }

  return best;
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
    /*
     * True when the caller should use a generic description instead of the
     * post's own imageAlt.
     *
     * Two cases, not one. A gallery fallback is not described by whatever
     * imageAlt the post happens to carry — that was the original reason. But
     * a post can also name its own image and not describe it, which is what
     * happens when a photo is pinned before anyone has written alt text for
     * it. That used to fall through to imageAlt: '', and an empty alt is not
     * "no description", it is a positive claim that the image is decorative
     * and can be skipped. For a photograph of the teacher that is simply
     * false.
     */
    imageIsFallback: !hasOwnImage || !pick('imageAlt'),
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
