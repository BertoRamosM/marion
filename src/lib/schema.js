import { SITE_URL } from './site';
import { offerUrl } from './routes';

/*
 * The structured-data graph, split by the page each entity belongs to.
 *
 * The organisation and the person are site-wide, so the root layout emits them
 * on every page. The two courses are not: each one now has a page of its own,
 * and a Course entity belongs on the page that sells it.
 *
 * Before this split both courses were declared in the root layout, which meant
 * Google saw two products whose `url` resolved to the same document — and saw
 * them again on the legal notice, the FAQ and every blog post, none of which
 * sell anything. Entities are still linked across pages by @id, so the graph
 * stays joined up.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#marion`;

export const EMAIL = 'marion.westfrench@gmail.com';
export const PHONE = '+33784582309';

/** The teaching venue, quoted identically wherever it appears. */
export const VENUE_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '6 Cours des Alliés',
  addressLocality: 'Rennes',
  addressRegion: 'Bretagne',
  postalCode: '35000',
  addressCountry: 'FR',
};

export function buildOrganization(locale, description) {
  return {
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': ORG_ID,
    name: 'Westfrench Academy',
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logos/logo-no-bg.png`,
    // The photo Google shows beside the search result, read from the
    // organisation entity. Supplied at several aspect ratios because Google
    // asks for that and picks whichever fits the layout it renders.
    image: [
      `${SITE_URL}/og-photo-16x9.jpg`,
      `${SITE_URL}/og-photo-4x3.jpg`,
      `${SITE_URL}/og-photo.jpg`,
    ],
    description,
    telephone: PHONE,
    email: EMAIL,
    founder: { '@id': PERSON_ID },
    address: VENUE_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.10542631895695,
      longitude: -1.674797659032797,
    },
    /*
     * Copied from the Google Business Profile, which Google treats as
     * authoritative. Two blocks because the closing time differs: Tuesday and
     * Thursday run late, the other three days do not.
     *
     * Saturday and Sunday are omitted rather than declared with zero hours —
     * in schema.org an absent day means closed, and listing them explicitly
     * adds noise without adding meaning.
     *
     * NOTE: Tuesday and Thursday closing at 19:30 contradicts the course
     * schedule, which has classes running 19:15–20:45 on exactly those two
     * days. See the comment on courseSchedule in buildGroupCourse.
     */
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Wednesday', 'Friday'],
        opens: '09:30',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Thursday'],
        opens: '09:30',
        closes: '19:30',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Rennes' },
      { '@type': 'AdministrativeArea', name: 'Ille-et-Vilaine' },
      { '@type': 'AdministrativeArea', name: 'Bretagne' },
      { '@type': 'Country', name: 'France' },
    ],
    knowsLanguage: ['fr', 'en', 'es', 'ca'],
    priceRange: '€€',
    /*
     * Names the two pages that describe what the business sells.
     *
     * Without it the offer pages are things the crawler has to find by
     * following the nav; with it they are part of the organisation's own
     * account of itself, pointed at by the entity Google already trusts
     * because it matches the Business Profile.
     */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Westfrench Academy',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Rennes',
          url: offerUrl('rennes', locale),
        },
        {
          '@type': 'OfferCatalog',
          name: 'Online',
          url: offerUrl('online', locale),
        },
      ],
    },
    sameAs: [
      // Google Business Profile listing. Included so Google can tie this
      // website and the Maps listing together as one entity. The ?cid= form is
      // the stable canonical URL; the long /maps/place/... one carries session
      // parameters that change.
      'https://maps.google.com/?cid=8809206434949443188',
      'https://www.instagram.com/westfrench_academy/',
      'https://www.facebook.com/p/WestFrench-Academy-Marion-61571846455654/',
      'https://www.linkedin.com/in/marionrichardfrenchteacher/',
    ],
  };
}

export function buildPerson(description) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Marion Richard',
    jobTitle: 'Professeure de français langue étrangère',
    description,
    worksFor: { '@id': ORG_ID },
    knowsLanguage: ['fr', 'en', 'es', 'ca'],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'DAEFLE',
      description:
        "Diplôme d'aptitude à l'enseignement du français langue étrangère",
      // Naming the awarding body is what turns this from a claimed acronym
      // into a verifiable qualification, which is the whole point of putting
      // a credential in structured data.
      recognizedBy: {
        '@type': 'Organization',
        name: 'Alliance Française',
      },
    },
    sameAs: ['https://www.linkedin.com/in/marionrichardfrenchteacher/'],
  };
}

export function buildGroupCourse(locale, t) {
  const url = offerUrl('rennes', locale);

  return {
    '@type': 'Course',
    '@id': `${SITE_URL}/#course-group`,
    name: t('courseGroupName'),
    description: t('courseGroupDesc'),
    url,
    provider: { '@id': ORG_ID },
    inLanguage: locale,
    teaches: 'French as a foreign language',
    educationalLevel: ['A1', 'A2', 'B1', 'B2'],
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        courseWorkload: 'PT1H30M',
        location: {
          '@type': 'Place',
          name: 'La Maison des Associations',
          address: VENUE_ADDRESS,
        },
        /*
         * These times come from the schedule shown on the page:
         * 17:30–19:00 and 19:15–20:45, Tuesdays and Thursdays.
         *
         * They outlast the opening hours on the organisation, which say the
         * business closes at 19:30 on those days. Both cannot be right, and
         * Google can see both in the same graph. The class times are almost
         * certainly the correct ones, since they are what the site
         * advertises — which would mean the Google listing needs extending to
         * 20:45 rather than these being trimmed.
         */
        courseSchedule: {
          '@type': 'Schedule',
          byDay: ['Tuesday', 'Thursday'],
          startTime: '17:30',
          endTime: '20:45',
          repeatFrequency: 'P1W',
          duration: 'PT1H30M',
        },
        instructor: { '@id': PERSON_ID },
        maximumAttendeeCapacity: 8,
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: '3 mois – 12 sessions',
        price: '440',
        priceCurrency: 'EUR',
        category: 'Paid',
        availability: 'https://schema.org/InStock',
        url,
      },
      {
        '@type': 'Offer',
        name: '6 mois – 24 sessions',
        price: '810',
        priceCurrency: 'EUR',
        category: 'Paid',
        availability: 'https://schema.org/InStock',
        url,
      },
    ],
  };
}

export function buildOnlineCourse(locale, t) {
  const url = offerUrl('online', locale);

  return {
    '@type': 'Course',
    '@id': `${SITE_URL}/#course-online`,
    name: t('courseOnlineName'),
    description: t('courseOnlineDesc'),
    url,
    provider: { '@id': ORG_ID },
    inLanguage: locale,
    teaches: 'French as a foreign language',
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT1H30M',
        instructor: { '@id': PERSON_ID },
        maximumAttendeeCapacity: 1,
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: '10 sessions – 15h',
        price: '575',
        priceCurrency: 'EUR',
        category: 'Paid',
        availability: 'https://schema.org/InStock',
        url,
      },
      {
        '@type': 'Offer',
        name: '20 sessions – 30h',
        price: '840',
        priceCurrency: 'EUR',
        category: 'Paid',
        availability: 'https://schema.org/InStock',
        url,
      },
    ],
  };
}

/**
 * A BreadcrumbList from [name, url] pairs, already in order.
 * Google uses it to replace the bare URL in a result with a readable trail.
 */
export function buildBreadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item,
    })),
  };
}
