const locales = ['fr', 'en', 'es'];
const defaultLocale = 'fr';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.westfrench-academy.com', // your main domain
  generateRobotsTxt: true, // automatically creates robots.txt
  sitemapSize: 5000,       // optional, for large sites
  exclude: ['/[local]', '/[local]/*'], // Next.js dynamic-segment placeholder, not a real page
  additionalPaths: async (config) => {
    return locales.map((locale) => ({
      loc: `/${locale}`,
      changefreq: 'weekly',
      priority: locale === defaultLocale ? 1.0 : 0.8,
      alternateRefs: locales.map((altLocale) => ({
        href: `${config.siteUrl}/${altLocale}`,
        hreflang: altLocale,
      })),
    }));
  },
};
