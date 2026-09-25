import { getLocale, getTranslations } from 'next-intl/server';
import Header from './components/Header';
import NavPending from './components/NavPending';
import { Link } from '../../i18n/routing';
import { offerHref } from '../../lib/routes';

/*
 * The 404 for anything under a valid locale.
 *
 * Before this the site served Next's built-in page: no header, no navigation,
 * not one link back, and "404: This page could not be found" in English to a
 * French visitor. A dead end in the literal sense — the only way out was the
 * back button.
 *
 * It matters more than a 404 usually would here, because two ordinary things
 * land on it. The offer slugs are translated, so /en/cours-de-francais-rennes
 * is a deliberate 404 rather than a mistake, and anyone editing a URL by hand
 * or following a stale link finds it. So this page's job is to be a junction,
 * not an apology: the full header nav, plus the two offer pages named
 * explicitly, because those are what someone was most likely looking for.
 *
 * SCOPE: this covers /fr/..., /en/... and /es/... A path with no valid locale
 * at all, like /nope, cannot reach here — the [local] segment never matches,
 * so Next's root 404 handles it. Fixing that one means introducing a root
 * layout, and [local]/layout.js is currently acting as the root (it renders
 * <html> and <body>); adding another above it would nest one inside the
 * other. Left alone deliberately: middleware redirects / to /fr, so every
 * normal route into the site already carries a locale.
 *
 * getLocale/getTranslations rather than useTranslations: a not-found file
 * receives no params, so the locale has to come from the request context the
 * layout established.
 */
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'NotFound' });
  const tHeader = await getTranslations({ locale, namespace: 'Header' });
  const tBlog = await getTranslations({ locale, namespace: 'Blog' });
  const tFaq = await getTranslations({ locale, namespace: 'Faq' });

  /*
   * Ordered by how likely each one is to be what they wanted. The two courses
   * first: they are what the site sells, and the translated-slug 404 lands
   * people here while looking for exactly those.
   */
  const routes = [
    { href: offerHref('rennes', locale), label: tHeader('coursesRennes') },
    { href: offerHref('online', locale), label: tHeader('onlineCourses') },
    { href: '/faq', label: tFaq('nav') },
    { href: '/blog', label: tBlog('nav') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* z-[70], matching every other page — see the layer note in
          StickySocialIcons. */}
      <div className="top-0 left-0 right-0 z-[70] bg-surface shadow-md">
        <Header />
      </div>

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
        <div className="max-w-2xl mx-auto pt-28 sm:pt-24 text-center">
          {/* The number is the one piece of this page that needs no
              translating, so it carries the weight. aria-hidden because the
              heading below already says it in words. */}
          <p
            aria-hidden="true"
            className="text-7xl font-bold text-rust-lg sm:text-8xl"
          >
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold text-ink-900">{t('title')}</h1>
          <p className="mt-4 text-lg text-ink-800">{t('body')}</p>

          <nav className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {routes.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border-2 border-ember px-6 py-3 font-semibold text-rust transition duration-300 hover:bg-ember hover:text-on-ember"
              >
                {label}
                <NavPending />
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 font-semibold text-on-ember shadow transition-transform duration-300 ease-out hover:scale-105"
            >
              ← {tBlog('backToSite')}
              <NavPending />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
