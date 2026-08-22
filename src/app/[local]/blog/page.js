import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { Link, routing } from '../../../i18n/routing';
import { getAllPosts, formatDate } from '../../../lib/blog';
import { SITE_URL } from '../../../lib/site';

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 left-0 right-0 z-50 bg-surface shadow-md">
        <Header />
      </div>

      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 sm:p-20">
        <div className="max-w-3xl mx-auto text-center pt-32 sm:pt-28">
          <h1 className="text-4xl font-bold text-ink-900">
            <span className="text-rust-lg">{t('title')}</span>
          </h1>
          <p className="text-lg text-ink-800 mt-4">{t('subtitle')}</p>

          <Link
            href="/"
            className="inline-block mt-8 border-2 border-ember text-rust px-6 py-3 rounded-lg font-semibold hover:bg-ember hover:text-white transition duration-300"
          >
            ← {t('backToSite')}
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
