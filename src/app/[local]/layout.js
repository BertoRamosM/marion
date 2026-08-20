import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import StickySocialIcons from "./components/StickySocialIcons";
import { Dancing_Script } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "../../i18n/routing";

const SITE_URL = "https://www.westfrench-academy.com";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  name: "WestFrench Academy",
  url: "https://westfrench-academy.com",
  logo: "https://www.westfrench.com/logo.png",
  image: "https://www.westfrench.com/cover.jpg",
  description:
    "Cours de français interactifs à Rennes pour expatriés, en groupe ou en ligne.",
  telephone: "+33 7 84 58 23 09",
  email: "contact@westfrench.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 Cr des Alliés",
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
    { "@type": "Country", name: "France" },
  ],
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/westfrench_academy/",
    "https://www.facebook.com/p/WestFrench-Academy-Marion-61571846455654/",
    "https://www.linkedin.com/in/marionrichardfrenchteacher/",
  ],
};

export async function generateMetadata({ params }) {
  const { local } = await params;
  const t = await getTranslations({ locale: local, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: { icon: "/favicon.ico" },
    verification: {
      google: "Ml98YqB2kA_XBnJ3KJ9IbevLRqu5R6STf5W4TjSJy3w",
    },
    alternates: {
      canonical: `${SITE_URL}/${local}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`])
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
  };
}

export const viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children, params }) {
  const { local } = await params;
  const messages = await getMessages();

  return (
    <html lang={local}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased bg-gradient-to-br from-gray-100 to-gray-200 text-pretty`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <StickySocialIcons />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
