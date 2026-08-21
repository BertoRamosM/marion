# Adding a blog post

All blog content lives in `blog.json`. Add a new object to the array for each
post — no code changes needed. Pages appear automatically at
`/{locale}/blog/{id}` and are listed on `/{locale}/blog`.

## Fields

| Field     | Required | Notes |
|-----------|----------|-------|
| `id`      | yes      | Becomes the URL. Use a keyword slug, not a number (see below). |
| `date`    | yes      | `YYYY-MM-DD`. Controls sort order — newest first. |
| `image`   | no       | Featured image path, e.g. `/blog/rennes.webp`. Leave `""` to auto-pick a gallery photo (see below). |
| `fr` / `en` / `es` | at least `fr` | Per-locale content. |

Inside each locale object:

| Field      | Notes |
|------------|-------|
| `title`    | Shown as the `<h1>` and in the browser tab. |
| `excerpt`  | 1–2 sentences. Used on the index card **and** as the Google search snippet. |
| `imageAlt` | Describes the featured image, for screen readers and image search. |
| `content`  | Array of blocks — see below. |

Only `fr` is required. A missing `en` or `es` falls back to French rather than
rendering blank, so a post can go live before it is translated.

## Content blocks

Each string in `content` is one block:

```json
"content": [
  "A normal paragraph.",
  "## A subheading",
  "Another paragraph.",
  "![Description of the photo](/blog/second-photo.webp)"
]
```

- Plain string → paragraph
- Starts with `## ` → subheading (renders as `<h2>`)
- `![description](/path.webp)` → image placed inline at that point in the article

**One featured image is the recommended default.** It covers the index card,
the social share preview, and the article's structured data. Add inline images
only for longer posts — roughly one image per 400–500 words.

## Use slugs, not numbers

Prefer `"id": "vivre-a-rennes-quand-on-est-expat"` over `"id": "1"`.

Keywords in the URL help rankings, and numeric ids break permanently if posts
are ever reordered or deleted — a dead URL loses whatever ranking it had.

## No image? One is picked for you

Leaving `"image": ""` is perfectly fine — a photo from `public/gallery` is used
automatically, so a post never looks unfinished and you can publish without
hunting for a picture.

The choice is derived from the post's `id`, which means:

- Different posts get different photos.
- The same post always gets the **same** photo — it does not change on refresh,
  and the article page, index card, social share preview and structured data
  all agree.

`imageAlt` is ignored for these, since it would not describe a generic gallery
photo; a localized fallback description is used instead. Set a real `image` when
you have a photo that genuinely belongs to the article — always better than the
fallback.

## Images

1. Drop the photo into `public/blog/`.
2. Run the optimizer:

   ```bash
   npm run optimize-images
   ```

   It resizes to 1600px wide, re-encodes as WebP, and prints the path to use.
   JPG/PNG files are converted to `.webp` alongside the original (originals are
   never deleted). Running it twice is harmless.

3. Reference the printed path in `blog.json`.

Guidelines: landscape orientation, at least 1200px wide. Avoid photos with text
baked in — the same image is shared across all three locales, so embedded
French would appear on the English and Spanish pages too.

`/blog/*` is cached for a year (see `_headers`), so **use a new filename when
replacing an image** instead of overwriting it, or browsers will keep serving
the old version.

## After adding a post

```bash
npm run build
```

`postbuild` regenerates `sitemap.xml`, which reads this file directly — new
posts are added to the sitemap automatically with hreflang for all three
locales. No other step is needed.
