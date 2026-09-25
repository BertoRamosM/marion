const posts = require('./src/content/blog.json');
// The same six slugs the [offer] route builds its pages from. Shared as JSON
// because this file is CommonJS and src/lib/routes.js is not — see the note
// there for why there is deliberately only one copy.
const offerSlugs = require('./src/content/offers.json');

const locales = ['fr', 'en', 'es'];
const defaultLocale = 'fr';

/*
 * lastmod, which the sitemap did not carry at all.
 *
 * next-sitemap's autoLastmod only applies to routes it discovers from the
 * build output, and every URL on this site is supplied through
 * additionalPaths instead — so the option was on and doing nothing, and not
 * one entry had a date. Google treats lastmod as a crawl hint, and it is the
 * main way a blog says "this changed, come back".
 *
 * Two clocks on purpose. An article is dated by the article: its own updated
 * or published date, so re-deploying the site does not claim every post was
 * revised. Everything else is dated by the deploy, which for pages that are
 * generated from the codebase is genuinely when they last changed.
 */
const BUILD_DATE = new Date().toISOString();

/** ISO date for a post: its revision date if it has one, else publication. */
function postLastmod(post) {
  const date = post.updated || post.date;
  if (!date) return BUILD_DATE;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? BUILD_DATE : parsed.toISOString();
}

/** The newest post date, so the blog index moves when a post lands. */
function blogIndexLastmod() {
  const dates = posts.map(postLastmod).sort();
  return dates.length ? dates[dates.length - 1] : BUILD_DATE;
}

/** Builds one sitemap entry plus its hreflang alternates. */
function entry(siteUrl, path, priority, changefreq, lastmod = BUILD_DATE) {
  return {
    loc: path,
    changefreq,
    priority,
    lastmod,
    alternateRefs: locales.map((locale) => ({
      href: `${siteUrl}/${locale}${path.replace(/^\/[a-z]{2}/, '')}`,
      hreflang: locale,
      // Without this next-sitemap treats href as a prefix and appends loc to
      // it, so every alternate came out as
      // ".../en/faq/fr/faq" — a 404. See the note above hrefIsAbsolute in
      // offerEntry for why that quietly undoes the whole point of hreflang.
      hrefIsAbsolute: true,
    })),
  };
}

/**
 * The same, for a page whose slug is translated.
 *
 * entry() above builds each alternate by swapping the locale prefix and
 * keeping the rest of the path, which is right for /faq and /blog — they are
 * spelled the same in all three languages. The offer pages are not:
 * /fr/cours-de-francais-rennes and /en/french-classes-rennes are the same
 * page, and swapping the prefix would produce /en/cours-de-francais-rennes,
 * a URL that deliberately 404s.
 *
 * Getting this wrong is quiet and expensive: Google drops an hreflang cluster
 * whose members do not resolve, and the three pages then compete with each
 * other instead of being read as one page in three languages.
 *
 * hrefIsAbsolute is what makes that true rather than aspirational. next-sitemap
 * defaults it to false and then treats href as a PREFIX, concatenating the
 * entry's loc onto it — which had been silently producing
 * ".../en/faq/fr/faq" for every alternate on the site since the sitemap was
 * first written. Nothing warns about it: the sitemap is valid XML, Google
 * fetches the URLs, they 404, and the cluster is dropped.
 */
function offerEntry(siteUrl, offer, locale, priority, changefreq) {
  return {
    loc: `/${locale}/${offerSlugs[offer][locale]}`,
    changefreq,
    priority,
    lastmod: BUILD_DATE,
    alternateRefs: locales.map((alt) => ({
      href: `${siteUrl}/${alt}/${offerSlugs[offer][alt]}`,
      hreflang: alt,
      hrefIsAbsolute: true,
    })),
  };
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.westfrench-academy.com', // your main domain
  generateRobotsTxt: true, // automatically creates robots.txt
  sitemapSize: 5000,       // optional, for large sites
  exclude: ['/[local]', '/[local]/*'], // Next.js dynamic-segment placeholders, not real pages
  additionalPaths: async (config) => {
    const paths = [];

    for (const locale of locales) {
      // Home page
      paths.push(
        entry(
          config.siteUrl,
          `/${locale}`,
          locale === defaultLocale ? 1.0 : 0.8,
          'weekly'
        )
      );

      /*
       * The two offer pages, at 0.9 — above everything except the home page.
       *
       * These are what the site is for: one page per thing that is actually
       * sold, each the landing page for a different search. They sit below
       * the home page only because it is the entry point, not because it
       * matters more.
       */
      for (const offer of Object.keys(offerSlugs)) {
        paths.push(offerEntry(config.siteUrl, offer, locale, 0.9, 'weekly'));
      }

      // FAQ. Higher priority than the legal page: it answers real search
      // queries about levels, prices and schedule, which the home page cannot
      // also rank for.
      paths.push(entry(config.siteUrl, `/${locale}/faq`, 0.7, 'monthly'));

      // Legal notice
      paths.push(
        entry(config.siteUrl, `/${locale}/mentions-legales`, 0.3, 'yearly')
      );

      // Blog index. Dated by the newest post, so it moves when one lands
      // rather than on every unrelated deploy.
      paths.push(
        entry(config.siteUrl, `/${locale}/blog`, 0.7, 'weekly', blogIndexLastmod())
      );

      // One entry per blog post, dated by the post itself.
      for (const post of posts) {
        paths.push(
          entry(
            config.siteUrl,
            `/${locale}/blog/${post.id}`,
            0.6,
            'monthly',
            postLastmod(post)
          )
        );
      }
    }

    return paths;
  },
};
