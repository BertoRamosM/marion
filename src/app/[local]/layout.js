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
