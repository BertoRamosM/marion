import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Header from '../../components/Header';
import { Link, routing } from '../../../../i18n/routing';
import {
  getPost,
  getPostIds,
  parseBlock,
  formatDate,
} from '../../../../lib/blog';
import { SITE_URL } from '../../../../lib/site';

export function generateStaticParams() {
  return getPostIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { local, id } = await params;
  const post = getPost(id, local);

  if (!post) return {};

  const title = `${post.title} | WestFrench Academy`;
  const url = `${SITE_URL}/${local}/blog/${post.id}`;
  const image = post.image || '/og-image.jpg';

  return {
    title,
    description: post.excerpt,
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
      siteName: 'WestFrench Academy',
      title,
      description: post.excerpt,
      url,
      locale: local,
      publishedTime: post.date || undefined,
      images: [{ url: image, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { local, id } = await params;
  const post = getPost(id, local);

  if (!post) notFound();

  const t = await getTranslations({ locale: local, namespace: 'Blog' });
  const tA11y = await getTranslations({ locale: local, namespace: 'A11y' });
  const dateLabel = formatDate(post.date, local);
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
        description: post.excerpt,
        datePublished: post.date || undefined,
        dateModified: post.date || undefined,
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
      <div className="top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 sm:p-20">
        <article className="max-w-3xl mx-auto pt-32 sm:pt-28">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#c2410c] underline">
              {t('breadcrumbHome')}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#c2410c] underline">
              {t('title')}
            </Link>
          </nav>

          <h1 className="text-4xl font-bold text-[#d24b06]">{post.title}</h1>

          {dateLabel && (
            <p className="text-sm text-gray-600 mt-3">
              {t('published')} <time dateTime={post.date}>{dateLabel}</time>
            </p>
          )}

          <div className="mt-8 bg-[#fff7f3] p-8 rounded-3xl shadow-lg">
            {/* Featured image sits at the top of the article body.
                Left lazy on purpose: the heading above it is the LCP element,
                so the text paints first and the image streams in after. */}
            {post.image && (
              <div className="relative w-full h-[220px] sm:h-[340px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={featuredAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {post.content.map((block, index) => {
              const parsed = parseBlock(block);

              if (parsed.type === 'heading') {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-semibold text-[#d24b06] mt-8 first:mt-0"
                  >
                    {parsed.text}
                  </h2>
                );
              }

              if (parsed.type === 'image') {
                return (
                  <div
                    key={index}
                    className="relative w-full h-[220px] sm:h-[340px] rounded-2xl overflow-hidden mt-8 shadow"
                  >
                    <Image
                      src={parsed.src}
                      alt={parsed.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              }

              return (
                <p key={index} className="text-gray-800 mt-4 first:mt-0">
                  {parsed.text}
                </p>
              );
            })}
          </div>

          {/* Navigation back */}
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Link
              href="/blog"
              className="border-2 border-[#ffa45b] text-[#c2410c] px-6 py-3 rounded-lg font-semibold hover:bg-[#ffa45b] hover:text-white transition duration-300"
            >
              ← {t('backToBlog')}
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out"
            >
              {t('backToSite')}
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
