import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import StickySocialIcons from "./components/StickySocialIcons";
import { Dancing_Script } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from 'next/navigation';
import Head from 'next/head'; // Import Head component

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

export const metadata = {
  title: "WestFrench Academy",
  description: "WestFrench Academy propose des cours de français interactifs à Rennes, adaptés aux expatriés. Participez à des groupes réduits ou à des cours particuliers en ligne, pour apprendre le français de manière ludique et immersive. Découvrez la culture française grâce à un enseignement personnalisé, dirigé par un professeur expérimenté et passionné. Que vous soyez à Rennes, Nantes, ou que vous prévoyiez de vous installer en France, WestFrench vous aide à maîtriser le français dans un cadre convivial et stimulant. Commencez avec un cours d'essai à 5€ !",
};

export default async function RootLayout({ children }) {
  const messages = await getMessages();

  return (
      <html lang="fr">
       <Head>
          {/* Favicon Setup */}
          <link rel="icon" href="/favicon.ico" />
          <meta name="google-site-verification" content="Ml98YqB2kA_XBnJ3KJ9IbevLRqu5R6STf5W4TjSJy3w" />
          <meta name="theme-color" content="#ffffff" />

          <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness","EducationalOrganization"],
        "name": "WestFrench Academy",
        "url": "https://westfrench-academy.com",
        "logo": "https://www.westfrench.com/logo.png",
        "image": "https://www.westfrench.com/cover.jpg",
        "description": "Cours de français interactifs à Rennes pour expatriés, en groupe ou en ligne.",
        "telephone": "+33 7 84 58 23 09",
        "email": "contact@westfrench.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "6 Cr des Alliés",
          "addressLocality": "Rennes",
          "addressRegion": "Bretagne",
          "postalCode": "35000",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 48.10542631895695,
          "longitude": -1.674797659032797
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens": "09:30",
            "closes": "19:30"
          }
        ],
        "areaServed": [
          { "@type": "City", "name": "Rennes" },
          { "@type": "AdministrativeArea", "name": "Ille-et-Vilaine" },
          { "@type": "Country", "name": "France" }
        ],
        "priceRange": "€€",
        "sameAs": [
          "https://www.instagram.com/westfrench_academy/",
          "https://www.facebook.com/p/WestFrench-Academy-Marion-61571846455654/",
          "https://www.linkedin.com/in/marionrichardfrenchteacher/"

        ]
      })
    }}
  />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased bg-gradient-to-br from-gray-100 to-gray-200 text-pretty`}
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <StickySocialIcons />
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
  );
}
