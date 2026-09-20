import { routing } from '../i18n/routing';
import { SITE_URL } from './site';
import slugs from '../content/offers.json';

/*
 * The two offer pages, and their slug in each language.
 *
 * These used to be anchors on the home page — /#courses and /#online-courses.
 * That gave one document the job of ranking for "cours de français à Rennes"
 * (someone already living here) and "cours de français en ligne" (someone
 * anywhere in the world, a market with no seat limit). Google ranks pages, not
 * fragments, so the two offers were competing for the same slot instead of
 * holding one each.
 *
 * Slugs are translated rather than shared. A Spanish speaker seeing
 * /es/cours-de-francais-rennes in a result reads it as a French-language page
 * and scrolls past; the keyword in the URL is a weak ranking signal, but the
 * "this page is in my language" signal it sends a human is not.
 *
 * Every slug is unique across the whole table, which is what lets the
 * [offer] route reject a slug used with the wrong locale — /fr/online-french-lessons
 * is a 404, not a second copy of the French page.
 *
 * The table itself is JSON in src/content, not a literal here, because
 * next-sitemap.config.js needs the same six slugs and is CommonJS — it
 * cannot import this module. Two hand-kept copies would have drifted the
 * first time a slug changed, and the symptom would have been a sitemap
 * advertising URLs that 404.
 */
export const OFFERS = slugs;

/** Every offer key, in the order the pages should be linked. */
export const OFFER_KEYS = Object.keys(OFFERS);

/**
 * The slug for one offer in one language.
 *
 * Falls back to the default locale rather than returning undefined, so a
 * locale added to routing.ts before its translations land produces a working
 * (if untranslated) URL instead of /undefined.
 */
export function offerSlug(offer, locale) {
  const slugs = OFFERS[offer];
  if (!slugs) throw new Error(`Unknown offer: ${offer}`);
  return slugs[locale] || slugs[routing.defaultLocale];
}

/**
 * Href for next-intl's <Link>, which prepends the locale itself.
 * Leading slash, no locale: "/cours-de-francais-rennes".
 */
export function offerHref(offer, locale) {
  return `/${offerSlug(offer, locale)}`;
}

/** Absolute URL, for canonicals, hreflang and structured data. */
export function offerUrl(offer, locale) {
  return `${SITE_URL}/${locale}/${offerSlug(offer, locale)}`;
}

/**
 * The hreflang map for one offer: every locale's own slug, plus x-default.
 *
 * Each language points at a different path here, which is the whole reason
 * this cannot reuse the pattern the other pages use — those share one slug
 * across all three and can build the map by interpolating the locale.
 */
export function offerAlternates(offer) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, offerUrl(offer, locale)])
    ),
    'x-default': offerUrl(offer, routing.defaultLocale),
  };
}

/** Reverse lookup: which offer does this slug name, in this locale? */
export function offerFromSlug(slug, locale) {
  return OFFER_KEYS.find((offer) => offerSlug(offer, locale) === slug) || null;
}
