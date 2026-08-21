import "./globals.css";
import Footer from "./components/Footer";
import StickySocialIcons from "./components/StickySocialIcons";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "../../i18n/routing";

const SITE_URL = "https://www.westfrench-academy.com";
const EMAIL = "marion.westfrench@gmail.com";
const PHONE = "+33784582309";

/*
 * One font for the whole site.
 *
 * Replaces Geist, whose neutral, technical tone sat oddly against the rounded
 * cards and pastel palette. Nunito's slightly rounded terminals echo those
 * shapes. Geist Mono and Dancing Script are gone — neither rendered anywhere,
 * so they were pure download weight.
 *
 * display: swap so text paints immediately in the fallback rather than
 * blocking on the font file.
 */
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

/**
 * Builds the structured data graph for a given locale.
 *
 * Entities are linked by @id so search engines can tell that the
 * organisation, the teacher and the two courses all belong together.
 */
function buildJsonLd(locale, t, description) {
  const orgId = `${SITE_URL}/#organization`;
  const personId = `${SITE_URL}/#marion`;
  const pageUrl = `${SITE_URL}/${locale}`;

  const organization = {
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": orgId,
    name: "WestFrench Academy",
    url: pageUrl,
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
    founder: { "@id": personId },
    address: {
      "@type": "PostalAddress",
      streetAddress: "6 Cours des Alliés",
      addressLocality: "Rennes",
      addressRegion: "Bretagne",
      postalCode: "35000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.10542631895695,
      longitude: -1.674797659032797,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "19:30",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Rennes" },
      { "@type": "AdministrativeArea", name: "Ille-et-Vilaine" },
      { "@type": "AdministrativeArea", name: "Bretagne" },
      { "@type": "Country", name: "France" },
    ],
    knowsLanguage: ["fr", "en", "es", "ca"],
    priceRange: "€€",
    sameAs: [
      // Google Business Profile listing. Included so Google can tie this
      // website and the Maps listing together as one entity. The ?cid= form is
      // the stable canonical URL; the long /maps/place/... one carries session
      // parameters that change.
      "https://maps.google.com/?cid=8809206434949443188",
      "https://www.instagram.com/westfrench_academy/",
      "https://www.facebook.com/p/WestFrench-Academy-Marion-61571846455654/",
      "https://www.linkedin.com/in/marionrichardfrenchteacher/",
    ],
  };

  const person = {
    "@type": "Person",
    "@id": personId,
    name: "Marion Richard",
    jobTitle: "Professeure de français langue étrangère",
    description: t("marion"),
    worksFor: { "@id": orgId },
    knowsLanguage: ["fr", "en", "es", "ca"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "DAEFLE",
      description:
        "Diplôme d'aptitude à l'enseignement du français langue étrangère",
    },
    sameAs: ["https://www.linkedin.com/in/marionrichardfrenchteacher/"],
  };

  const groupCourse = {
    "@type": "Course",
    "@id": `${SITE_URL}/#course-group`,
    name: t("courseGroupName"),
    description: t("courseGroupDesc"),
    url: `${pageUrl}#courses`,
    provider: { "@id": orgId },
    inLanguage: locale,
    teaches: "French as a foreign language",
    educationalLevel: ["A1", "A2", "B1", "B2"],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: "PT1H30M",
        location: {
          "@type": "Place",
          name: "La Maison des Associations",
          address: {
            "@type": "PostalAddress",
            streetAddress: "6 Cours des Alliés",
            addressLocality: "Rennes",
            postalCode: "35000",
            addressCountry: "FR",
          },
        },
        courseSchedule: {
          "@type": "Schedule",
          byDay: ["Tuesday", "Thursday"],
          startTime: "17:30",
          endTime: "20:45",
          repeatFrequency: "P1W",
          duration: "PT1H30M",
        },
        instructor: { "@id": personId },
        maximumAttendeeCapacity: 8,
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "3 mois – 12 sessions",
        price: "440",
        priceCurrency: "EUR",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: `${pageUrl}#courses`,
      },
      {
        "@type": "Offer",
        name: "6 mois – 24 sessions",
        price: "810",
        priceCurrency: "EUR",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: `${pageUrl}#courses`,
      },
    ],
  };

  const onlineCourse = {
    "@type": "Course",
    "@id": `${SITE_URL}/#course-online`,
    name: t("courseOnlineName"),
    description: t("courseOnlineDesc"),
    url: `${pageUrl}#online-courses`,
    provider: { "@id": orgId },
    inLanguage: locale,
    teaches: "French as a foreign language",
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: "PT1H30M",
        instructor: { "@id": personId },
        maximumAttendeeCapacity: 1,
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "10 sessions – 15h",
        price: "575",
        priceCurrency: "EUR",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: `${pageUrl}#online-courses`,
      },
      {
        "@type": "Offer",
        name: "20 sessions – 30h",
        price: "840",
        priceCurrency: "EUR",
        category: "Paid",
        availability: "https://schema.org/InStock",
        url: `${pageUrl}#online-courses`,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, person, groupCourse, onlineCourse],
  };
}

export async function generateMetadata({ params }) {
  const { local } = await params;
  const t = await getTranslations({ locale: local, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}/${local}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: { icon: "/favicon.ico" },
    verification: {
      google: "Ml98YqB2kA_XBnJ3KJ9IbevLRqu5R6STf5W4TjSJy3w",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`]),
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "WestFrench Academy",
      title,
      description,
      url,
      locale: local,
      images: [
        {
          url: "/og-photo.jpg",
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-photo.jpg"],
    },
  };
}

export const viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children, params }) {
  const { local } = await params;
  const messages = await getMessages();
  const tSchema = await getTranslations({ locale: local, namespace: "Schema" });
  const tA11y = await getTranslations({ locale: local, namespace: "A11y" });
  const tMeta = await getTranslations({ locale: local, namespace: "Metadata" });

  // One translator surface for the graph builder, so it can pull from
  // both the Schema namespace and the teacher description in A11y.
  const t = (key) => (key === "marion" ? tA11y(key) : tSchema(key));
  const jsonLd = buildJsonLd(local, t, tMeta("description"));

  return (
    <html lang={local}>
      <body
        className={`${nunito.variable} antialiased bg-gradient-to-br from-gray-100 to-gray-200 text-pretty`}
      >
        {/*
          First thing in the tab order. Without it a keyboard user has to tab
          through the banner, logo, five nav links and three flags on every
          page before reaching the content. Hidden until focused.
        */}
        {/* Positioning lives in .skip-link in globals.css — see the comment
            there for why it is not done with utilities. */}
        <a
          href="#main-content"
          className="skip-link rounded-lg bg-white px-5 py-3 font-bold text-[#00485f] shadow-lg"
        >
          {tA11y("skipToContent")}
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/*
          Ambient brand light behind the whole site, same motif as the footer.

          Deliberately: fixed (four blobs cover a 15,000px page instead of
          dozens, and cost far less to paint), at hand-picked positions rather
          than random ones (random would differ between server and client and
          jump on every load), and at much lower opacity than the footer's —
          these sit behind body text, and automated contrast checks cannot see
          through a blurred sibling, so the score would not warn us if this
          got too strong.
        */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-[6%] -left-24 w-[28rem] h-[28rem] rounded-full bg-[#3fd0bd] opacity-25 blur-3xl" />
          <div className="absolute top-[34%] -right-32 w-[32rem] h-[32rem] rounded-full bg-[#ff7c3d] opacity-20 blur-3xl" />
          <div className="absolute top-[64%] -left-32 w-[30rem] h-[30rem] rounded-full bg-[#3fd0bd] opacity-20 blur-3xl" />
          <div className="absolute bottom-[4%] -right-24 w-[26rem] h-[26rem] rounded-full bg-[#ff7c3d] opacity-25 blur-3xl" />
        </div>

        <NextIntlClientProvider messages={messages}>
          {children}
          <StickySocialIcons />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
