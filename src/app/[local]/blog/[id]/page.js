import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '../../components/Header';
import NavPending from '../../components/NavPending';
import { Link, routing } from '../../../../i18n/routing';
import {
  getPost,
  getPostIds,
  parseBlock,
  formatDate,
  getAdjacentPosts,
} from '../../../../lib/blog';
import { SITE_URL } from '../../../../lib/site';

/*
 * Links inside the article prose. Underlined rather than colour-only, so they
 * are still identifiable without relying on hue.
 */
const LINK_IN_PROSE =
  'font-semibold text-brand underline decoration-2 underline-offset-2 transition-colors duration-300 hover:text-rust';

/*
 * Google shows roughly 60 characters of a title and 155 of a description.
 *
 * The suffix is dropped rather than the article title truncated: a title cut
 * mid-word is worse than one without the brand on the end, and Google often
 * appends the site name itself anyway.
 */
/*
 * The byline appears twice — under the title and again at the end — and both
 * link to the About section on the home page.
 *
 * Two reasons beyond the obvious. A named, qualified author is the signal
 * Google looks for on advice content, and the article's schema already points
 * author at Marion's Person entity, so the visible byline and the structured
 * data now say the same thing. And it adds internal links from the post to the
 * page it is really selling, which is most of what a blog does for search.
 */
const AUTHOR_NAME = 'Marion Richard';

const TITLE_SUFFIX = ' | Westfrench Academy';
const TITLE_BUDGET = 60;
const DESCRIPTION_BUDGET = 155;

function pageTitle(postTitle) {
  return postTitle.length + TITLE_SUFFIX.length <= TITLE_BUDGET
    ? postTitle + TITLE_SUFFIX
    : postTitle;
}

/*
 * Trims only the copy handed to search engines. The full excerpt stays on the
 * index card, where there is room for it — this way the author's text is never
 * rewritten to fit a meta tag. Cuts on a word boundary, which Google's own
 * truncation does not.
 */
function metaDescription(excerpt) {
  if (excerpt.length <= DESCRIPTION_BUDGET) return excerpt;
  const cut = excerpt.slice(0, DESCRIPTION_BUDGET);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, '') + '…';
}

export function generateStaticParams() {
  return getPostIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { local, id } = await params;
  const post = getPost(id, local);

  if (!post) return {};

  const title = pageTitle(post.title);
  const url = `${SITE_URL}/${local}/blog/${post.id}`;
  const image = post.image || '/og-image.jpg';

  return {
    title,
    description: metaDescription(post.excerpt),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `${SITE_URL}/${locale}/blog/${post.id}`,
          ])
        ),
        'x-default': `${SITE_URL}/${routing.defaultLocale}/blog/${post.id}`,
      },
    },
    openGraph: {
      type: 'article',
      siteName: 'Westfrench Academy',
      title,
      description: metaDescription(post.excerpt),
      url,
      locale: local,
      publishedTime: post.date || undefined,
      images: [{ url: image, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription(post.excerpt),
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { local, id } = await params;

  // Static rendering — see layout.js.
  setRequestLocale(local);
  const post = getPost(id, local);
  const { newer, older } = getAdjacentPosts(id, local);

  if (!post) notFound();

  const t = await getTranslations({ locale: local, namespace: 'Blog' });
  const tA11y = await getTranslations({ locale: local, namespace: 'A11y' });
  const dateLabel = formatDate(post.date, local);
  /*
   * Shown only when it actually differs from the publication date. "Updated" on
   * the day of publishing is noise, and a visible date is what lets a reader
   * verify the dateModified the schema below claims.
   */
  const updatedLabel =
    post.updated && post.updated !== post.date ? formatDate(post.updated, local) : '';
  const postUrl = `${SITE_URL}/${local}/blog/${post.id}`;
  // A gallery fallback needs a generic description, not the post's own.
  const featuredAlt = post.imageIsFallback ? tA11y('blogImage') : post.imageAlt;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: post.title,
        // Full excerpt here, not the trimmed one: schema.org sets no
        // length limit, so cutting it would drop information for nothing.
        description: post.excerpt,
        datePublished: post.date || undefined,
        dateModified: post.updated || post.date || undefined,
        wordCount: post.wordCount || undefined,
        // ISO 8601 duration, and the same number the byline shows, so the
        // visible page and the structured data cannot drift apart.
        timeRequired: `PT${post.readingMinutes}M`,
        inLanguage: local,
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        // encodeURI matters here: gallery filenames contain spaces, and an
        // unencoded space makes the URL invalid for crawlers.
        image: `${SITE_URL}${encodeURI(post.image || '/og-image.jpg')}`,
        author: { '@id': `${SITE_URL}/#marion` },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('breadcrumbHome'),
            item: `${SITE_URL}/${local}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('title'),
            item: `${SITE_URL}/${local}/blog`,
          },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* z-[70], matching every other page. This wrapper is a flex item
          with a z-index, so it forms a stacking context and caps everything
          inside it — including the full-screen mobile menu. At z-50 the sticky
          social icons (z-60) drew over the open menu. See the layer list in
          StickySocialIcons. */}
      <div className="top-0 left-0 right-0 z-[70] bg-surface shadow-md">
        <Header />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        px-4 rather than p-8 on phones: 32px a side was 17% of a 375px screen
        spent on empty margin. pt-4 because the wrapper below carries the
        header clearance.

        Horizontal padding then steps up instead of jumping straight to 80px:
        sm:p-20 gave every screen from 640px the same 80px gutter, which is
        25% of a 640px tablet. sm:px-8 / lg:px-20 keeps 80px where there is
        room for it. Vertical spacing is unchanged.
      */}
      <main id="main-content" tabIndex={-1} className="flex-1 px-4 pt-4 pb-20 sm:px-8 sm:py-20 lg:px-20">
        <article className="max-w-3xl mx-auto pt-28 sm:pt-24">
          {/* Breadcrumb */}
          <nav className="text-sm text-ink-600 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-rust underline">
              {t('breadcrumbHome')}
              <NavPending />
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-rust underline">
              {t('title')}
              <NavPending />
            </Link>
          </nav>

          <h1 className="text-4xl font-bold text-rust-lg">{post.title}</h1>

          <p className="text-sm text-ink-600 mt-3">
            {dateLabel && (
              <>
                {t('published')} <time dateTime={post.date}>{dateLabel}</time>
                <span aria-hidden="true"> · </span>
              </>
            )}
            {t('byAuthor')}{' '}
            <Link href="/#about" className={LINK_IN_PROSE}>
              {AUTHOR_NAME}
              <NavPending />
            </Link>
            <span aria-hidden="true"> · </span>
            {t('readingTime', { minutes: post.readingMinutes })}
            {updatedLabel && (
              <>
                <span aria-hidden="true"> · </span>
                <span className="italic">
                  {t('updatedOn')}{' '}
                  <time dateTime={post.updated}>{updatedLabel}</time>
                </span>
              </>
            )}
          </p>

          <div className="mt-8 bg-cream p-8 rounded-3xl shadow-lg">
            {/*
              Featured image, at the top of the article body.

              priority, not lazy. This was lazy on the reasoning that the
              heading above it is the LCP element and the text should paint
              first — but that turned out not to be true on a phone. Lighthouse
              measures this image as the LCP element and reported it twice
              over: "LCP resources should not use loading=lazy" and
              "fetchpriority=high should be applied", with LCP at 5.9s on a
              throttled Moto G. A lazy LCP image cannot even begin loading
              until layout has decided it is near the viewport, which on a slow
              connection is exactly the delay the metric measures.

              priority gives it eager loading, fetchpriority=high, and a
              preload hint in the document head.

              sizes is the real rendered width, not 100vw. The article is
              max-w-3xl inside main's p-8, and the image sits inside a card
              with p-8 of its own, so on a phone it draws at 100vw - 128px —
              measured at 284px in a 412px viewport, i.e. 69vw. Declaring
              100vw had the browser fetching a 750px file for a 284px slot.
            */}
            {post.image && (
              <div className="relative w-full h-[220px] sm:h-[340px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={featuredAlt}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 128px), 700px"
                  className="object-cover"
                  priority
                  /* Explicit, because Lighthouse checks for the attribute by
                     name under "LCP request discovery" and priority alone did
                     not emit it here. Same as the hero carousel slide. */
                  fetchPriority="high"
                />
              </div>
            )}

            {post.content.map((block, index) => {
              const parsed = parseBlock(block);

              if (parsed.type === 'heading') {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-semibold text-rust-lg mt-8 first:mt-0"
                  >
                    {parsed.text}
                  </h2>
                );
              }

              if (parsed.type === 'image') {
                // With real dimensions the image sizes itself, so a portrait
                // photo stays portrait instead of being cropped to a strip by
                // a fixed landscape box. The fixed box below is the fallback
                // for an image missing from the manifest.
                if (parsed.width && parsed.height) {
                  return (
                    <Image
                      key={index}
                      src={parsed.src}
                      alt={parsed.alt}
                      width={parsed.width}
                      height={parsed.height}
                      /* Real rendered width, not 100vw — see the note on
                         the featured image above. */
                      sizes="(max-width: 768px) calc(100vw - 128px), 700px"
                      className="w-full h-auto rounded-2xl mt-8 shadow"
                      loading="lazy"
                    />
                  );
                }

                return (
                  <div
                    key={index}
                    className="relative w-full h-[220px] sm:h-[340px] rounded-2xl overflow-hidden mt-8 shadow"
                  >
                    <Image
                      src={parsed.src}
                      alt={parsed.alt}
                      fill
                      sizes="(max-width: 768px) calc(100vw - 128px), 700px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              }

                return (
                <p key={index} className="text-ink-800 mt-4 first:mt-0">
                  {parsed.parts.map((part, partIndex) => {
                    if (part.type !== 'link') return part.text;

                    // An absolute URL leaves the site, so it gets a plain
                    // anchor with the usual new-tab safety. Everything else
                    // goes through the localised Link.
                    if (/^https?:\/\//.test(part.href)) {
                      return (
                        <a
                          key={partIndex}
                          href={part.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={LINK_IN_PROSE}
                        >
                          {part.text}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={partIndex}
                        href={part.href}
                        className={LINK_IN_PROSE}
                      >
                        {part.text}
                        <NavPending />
                      </Link>
                    );
                  })}
                </p>
              );
            })}
          </div>

            {/*
              Closing byline. The photo is the one the About section uses, so a
              reader arriving from search meets the person before being asked to
              trust the advice.
            */}
            <aside className="mt-12 flex flex-col items-center gap-5 rounded-3xl bg-mist p-6 text-center sm:flex-row sm:text-left">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-veil-70">
                <Image
                  src="/about/Marion.webp"
                  alt={tA11y('marion')}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <p className="text-ink-800">
                {t('writtenBy')}{' '}
                <Link
                  href="/#about"
                  className="font-bold text-brand underline decoration-2 underline-offset-2 transition-colors duration-300 hover:text-rust"
                >
                  {AUTHOR_NAME}
                  <NavPending />
                </Link>
                , {t('authorRole')}
              </p>
            </aside>

            {/*
            What to read next.

            Renders only when there is somewhere to go, so with a single
            published article the whole block is absent rather than showing a
            dead button. Each side is labelled with the article's own title
            rather than a bare "next", so the reader can decide whether they
            actually want it.

            newer/older rather than previous/next: in a list sorted by date,
            "next article" can mean either the next one down the page or the
            next one published. These cannot be misread.
          */}
          {newer || older ? (
            <nav className="mt-12 border-t border-ink-300 pt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              {t('readNext')}
            </h2>

            {/*
              Laid out the way the archive reads in time: older on the left,
              newer on the right.

              So the left card is the article published BEFORE this one and the
              right card the one published AFTER, and the arrows point the same
              way — back on the left, forward on the right. It matches how
              people expect previous/next to sit, and it matches the direction
              a timeline runs.

              Both cards are pinned to a column rather than being left to flow.
              A grid places children in order, so without that the surviving
              card on the first or last article slides into whichever column
              comes first, which puts it under the wrong heading and points its
              arrow into empty space. The empty column is the point: it says
              there is nothing further that way.
            */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {older ? (
              <Link
                href={`/blog/${older.id}`}
                className="rounded-2xl bg-cream p-5 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:col-start-1"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-ink-600">
                ← {t('olderPost')}
                </span>
                <span className="mt-2 block font-bold text-brand-deep">
                {older.title}
                <NavPending />
                </span>
              </Link>
              ) : null}

              {newer ? (
              <Link
                href={`/blog/${newer.id}`}
                className="rounded-2xl bg-cream p-5 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:col-start-2 sm:text-right"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-ink-600">
                {t('newerPost')} →
                </span>
                <span className="mt-2 block font-bold text-brand-deep">
                {newer.title}
                <NavPending />
                </span>
              </Link>
              ) : null}
            </div>
            </nav>
          ) : null}

          {/* Navigation back */}
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Link
              href="/blog"
              className="border-2 border-ember text-rust px-6 py-3 rounded-lg font-semibold hover:bg-ember hover:text-on-ember transition duration-300"
            >
              ← {t('backToBlog')}
              <NavPending />
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 rounded-lg text-on-ember font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
            >
              {t('backToSite')}
              <NavPending />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
