import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { Link, routing } from '../../../i18n/routing';
import { getAllPosts, formatDate } from '../../../lib/blog';
import { SITE_URL } from '../../../lib/site';
import NavPending from '../components/NavPending';

export async function generateMetadata({ params }) {
  const { local } = await params;
  const t = await getTranslations({ locale: local, namespace: 'Blog' });

  const title = `${t('title')} | Westfrench Academy`;
  const description = t('subtitle');
  const url = `${SITE_URL}/${local}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/blog`])
        ),
        'x-default': `${SITE_URL}/${routing.defaultLocale}/blog`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Westfrench Academy',
      title,
      description,
      url,
      locale: local,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function BlogIndexPage({ params }) {
  const { local } = await params;

  // Static rendering — see layout.js.
  setRequestLocale(local);
  const t = await getTranslations({ locale: local, namespace: 'Blog' });
  const tA11y = await getTranslations({ locale: local, namespace: 'A11y' });

  const posts = getAllPosts(local).map((post) => ({
    ...post,
    // A gallery fallback needs a generic description, not the post's own.
    imageAlt: post.imageIsFallback ? tA11y('blogImage') : post.imageAlt,
  }));

  const blogUrl = `${SITE_URL}/${local}/blog`;

  /*
   * Marks this page as a publication rather than one more page that happens to
   * list some links. Each article already carries its own BlogPosting; naming
   * them here as blogPost tells Google the set belongs together and which
   * entity publishes it, which is what makes the posts eligible to surface as
   * a group rather than as unrelated pages.
   *
   * The Person and Organization are referenced by @id only - both are defined
   * once in the root layout, which renders on this page too.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        name: t('title'),
        description: t('subtitle'),
        url: blogUrl,
        inLanguage: local,
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': `${blogUrl}/${post.id}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${blogUrl}/${post.id}`,
          datePublished: post.date || undefined,
          dateModified: post.updated || post.date || undefined,
          // encodeURI matters here: gallery filenames contain spaces, and an
          // unencoded space makes the URL invalid for crawlers.
          image: `${SITE_URL}${encodeURI(post.image || '/og-image.jpg')}`,
          author: { '@id': `${SITE_URL}/#marion` },
        })),
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
          { '@type': 'ListItem', position: 2, name: t('title'), item: blogUrl },
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

      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 sm:p-20">
        <div className="max-w-3xl mx-auto text-center pt-32 sm:pt-28">
          <h1 className="text-4xl font-bold text-ink-900">
            <span className="text-rust-lg">{t('title')}</span>
          </h1>
          <p className="text-lg text-ink-800 mt-4">{t('subtitle')}</p>

          <Link
            href="/"
            className="inline-block mt-8 border-2 border-ember text-rust px-6 py-3 rounded-lg font-semibold hover:bg-ember hover:text-on-ember transition duration-300"
          >
            ← {t('backToSite')}
            <NavPending />
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-lg text-ink-700 mt-16">{t('empty')}</p>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                dateLabel={formatDate(post.date, local)}
                publishedLabel={t('published')}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
