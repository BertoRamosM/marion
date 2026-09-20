import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '../../../i18n/routing';
import {
  OFFER_KEYS,
  offerSlug,
  offerUrl,
  offerHref,
  offerAlternates,
  offerFromSlug,
} from '../../../lib/routes';
import {
  buildGroupCourse,
  buildOnlineCourse,
  buildBreadcrumb,
} from '../../../lib/schema';
import { SITE_URL } from '../../../lib/site';
import OfferShell from '../_offers/OfferShell';
import RennesOffer from '../_offers/RennesOffer';
import OnlineOffer from '../_offers/OnlineOffer';

/*
 * The two offer pages, behind one dynamic segment.
 *
 * A dynamic segment rather than six literal folders, because the slug differs
 * per language — /fr/cours-de-francais-rennes, /en/french-classes-rennes,
 * /es/clases-de-frances-rennes are one page in three languages, not three
 * pages. Six folders would have meant six copies of this file, and the parent
 * [local] segment would have generated all three locales for each of them:
 * eighteen routes for the six that should exist, twelve of them a French page
 * living at an English URL.
 *
 * What keeps that from happening is generateStaticParams below, which is
 * called once per locale and returns only that locale's two slugs, plus
 * dynamicParams = false, which makes everything else a 404 rather than a
 * rendered page. So /fr/french-classes-rennes does not exist, which is the
 * correct answer: it would otherwise be a second copy of a page that already
 * has a canonical URL.
 *
 * Literal segments win over dynamic ones in Next's router, so /fr/faq,
 * /fr/blog and /fr/mentions-legales are unaffected by this.
 */

export const dynamicParams = false;

/*
 * Every string these pages show, and where it already lived.
 *
 * Nothing here is new copy. The Schema namespace turned out to hold exactly
 * what a page title and meta description need — it was written to describe
 * each course to Google, which is the same job — and the leads and labels come
 * from the sections and the nav. The one thing added is the " | Westfrench
 * Academy" suffix, which is the pattern /faq and /mentions-legales already
 * use for their own titles.
 */
const COPY = {
  rennes: {
    navKey: 'coursesRennes', // Header
    nameKey: 'courseGroupName', // Schema
    descKey: 'courseGroupDesc', // Schema
    leadNamespace: 'Courses',
    leadKey: 'text2',
  },
  online: {
    navKey: 'onlineCourses',
    nameKey: 'courseOnlineName',
    descKey: 'courseOnlineDesc',
    leadNamespace: 'online',
    leadKey: 'text2',
  },
};

const TITLE_SUFFIX = ' | Westfrench Academy';

export function generateStaticParams({ params } = {}) {
  // Next calls this once per parent param, handing back the locale it already
  // resolved. The fallback covers it being called without one.
  const locales = params?.local ? [params.local] : routing.locales;

  return locales.flatMap((locale) =>
    OFFER_KEYS.map((offer) => ({ local: locale, offer: offerSlug(offer, locale) }))
  );
}

export async function generateMetadata({ params }) {
  const { local, offer: slug } = await params;
  const offer = offerFromSlug(slug, local);
  if (!offer) return {};

  const copy = COPY[offer];
  const tSchema = await getTranslations({ locale: local, namespace: 'Schema' });

  const title = tSchema(copy.nameKey) + TITLE_SUFFIX;
  const description = tSchema(copy.descKey);
  const url = offerUrl(offer, local);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      // Each language sits at a different path, so this cannot be built by
      // interpolating the locale the way the other pages do.
      languages: offerAlternates(offer),
    },
    openGraph: {
      type: 'website',
      siteName: 'Westfrench Academy',
      title,
      description,
      url,
      locale: local,
      images: [{ url: '/og-photo.jpg', width: 1200, height: 800, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-photo.jpg'],
    },
  };
}

export default async function OfferPage({ params }) {
  const { local, offer: slug } = await params;
  const offer = offerFromSlug(slug, local);

  // Unreachable while dynamicParams is false, but it is what makes the slug
  // check explicit rather than something the router happens to enforce.
  if (!offer) notFound();

  // Static rendering — see the note in layout.js.
  setRequestLocale(local);

  const copy = COPY[offer];
  const other = offer === 'rennes' ? 'online' : 'rennes';

  const tSchema = await getTranslations({ locale: local, namespace: 'Schema' });
  const tHeader = await getTranslations({ locale: local, namespace: 'Header' });
  const tBlog = await getTranslations({ locale: local, namespace: 'Blog' });
  const tLead = await getTranslations({
    locale: local,
    namespace: copy.leadNamespace,
  });

  const isRennes = offer === 'rennes';
  const course = isRennes
    ? buildGroupCourse(local, tSchema)
    : buildOnlineCourse(local, tSchema);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      course,
      buildBreadcrumb([
        [tHeader('home'), `${SITE_URL}/${local}`],
        [tHeader(copy.navKey), offerUrl(offer, local)],
      ]),
    ],
  };

  return (
    <OfferShell
      jsonLd={jsonLd}
      breadcrumbHome={tHeader('home')}
      breadcrumbLabel={tHeader(copy.navKey)}
      title={tSchema(copy.nameKey)}
      lead={tLead(copy.leadKey)}
      backLabel={tBlog('backToSite')}
      offerKey={offer}
      otherOffer={{
        href: offerHref(other, local),
        label: tHeader(COPY[other].navKey),
      }}
    >
      {isRennes ? <RennesOffer /> : <OnlineOffer />}
    </OfferShell>
  );
}
