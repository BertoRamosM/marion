const posts = require('./src/content/blog.json');

const locales = ['fr', 'en', 'es'];
const defaultLocale = 'fr';

/** Builds one sitemap entry plus its hreflang alternates. */
function entry(siteUrl, path, priority, changefreq) {
  return {
    loc: path,
    changefreq,
    priority,
    alternateRefs: locales.map((locale) => ({
      href: `${siteUrl}/${locale}${path.replace(/^\/[a-z]{2}/, '')}`,
      hreflang: locale,
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

      // FAQ. Higher priority than the legal page: it answers real search
      // queries about levels, prices and schedule, which the home page cannot
      // also rank for.
      paths.push(entry(config.siteUrl, `/${locale}/faq`, 0.7, 'monthly'));

      // Legal notice
      paths.push(
        entry(config.siteUrl, `/${locale}/mentions-legales`, 0.3, 'yearly')
      );

      // Blog index
      paths.push(entry(config.siteUrl, `/${locale}/blog`, 0.7, 'weekly'));

      // One entry per blog post
      for (const post of posts) {
        paths.push(
          entry(config.siteUrl, `/${locale}/blog/${post.id}`, 0.6, 'monthly')
        );
      }
    }

    return paths;
  },
};
