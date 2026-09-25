import "./globals.css";
import Script from "next/script";
import Footer from "./components/Footer";
import StickySocialIcons from "./components/StickySocialIcons";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "../../i18n/routing";
import { buildOrganization, buildPerson } from "../../lib/schema";
import { SITE_URL } from "../../lib/site";

/*
 * Google Tag Manager container.
 *
 * Google's own instructions say to paste the loader as high in <head> as
 * possible. That is deliberately not what happens here: a synchronous script
 * in <head> blocks the first paint, and this site's whole performance story is
 * that it went from a 5.7s to a ~50ms time-to-first-byte. next/script with
 * strategy="afterInteractive" injects it once the page is interactive, which
 * costs a fraction of a second of measurement accuracy and protects the thing
 * visitors actually feel.
 *
 * The <noscript> iframe stays immediately after <body> opens, as Google asks.
 *
 * CONSENT: this container loads Google Analytics, which sets cookies and sends
 * data to Google. In France, Article 82 of the Loi Informatique et Libertés
 * requires consent BEFORE that happens, and this site has no consent banner.
 * A working consent gate was built and then removed at the owner's request:
 * the decision on record is to keep GA ungated and accept the risk. The
 * compliant alternative that needs no banner is a cookieless analytics tool
 * (Netlify Analytics is server-side and needs no code at all), which would
 * mean deleting everything in this block. See the note in mentions-legales.
 */
const GTM_ID = "GTM-5FG7Q9QC";

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
 * The site-wide half of the structured-data graph.
 *
 * The organisation and the teacher, and nothing else. The two Course
 * entities used to be declared here too, which put them on the legal
 * notice, the FAQ and every blog post, and gave both of them a url that
 * resolved to the same document. Each one now lives on the page that
 * sells it — see src/lib/schema.js — and they stay joined to these two by
 * @id rather than by sharing a page.
 */
function buildJsonLd(locale, description, teacherDescription) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganization(locale, description),
      buildPerson(teacherDescription),
    ],
  };
}

/*
 * Only fr, en and es are locales. Anything else in this position is a 404.
 *
 * Without this, generateStaticParams below prerenders the three and Next
 * renders ANY other value on demand — so /nope, /wp-admin and
 * /google60d0ecfd0683796b.html all returned 200, serving the French home page
 * with lang="nope" on it. next-intl compounds it by design: request.ts falls
 * back to the default locale for an unrecognised one, so there is nothing to
 * throw and no error to notice.
 *
 * That is worse than a cosmetic bug. Every junk URL anyone links or a scanner
 * probes becomes an indexable 200 duplicate of the home page under a bogus
 * lang attribute, and a soft 404 is the one thing Search Console cannot tell
 * you is wrong, because the server keeps insisting the page is fine.
 *
 * The [offer] segment already does this a level down; this is the same guard
 * on the segment above it.
 */
export const dynamicParams = false;

/*
 * Tells Next.js the three locale segments up front, so /fr, /en and /es are
 * built as static HTML at deploy time instead of rendered per request.
 *
 * Without this (and the setRequestLocale call below) every visit ran a
 * serverless function: Netlify returned
 * "Cache-Control: private, no-cache, no-store", so nothing was ever cached
 * and a cold start put time-to-first-byte at ~5.7s on the first visit of
 * the day — 87% of a 6.5s LCP.
 */
export function generateStaticParams() {
  return routing.locales.map((local) => ({ local }));
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
    other: {
      /*
       * Tells Dark Reader to leave this page alone, because the site brings
       * its own dark palette.
       *
       * This is the only lever a site has over that extension: there is no
       * way to hand it our palette and have it use it. Without the lock a
       * visitor already on our dark theme gets it inverted a second time,
       * which is the mangled rendering this whole exercise started from.
       *
       * The trade: someone running a light OS with Dark Reader on now sees
       * our light palette rather than a dark one. Our design wins over the
       * extension's guess, which is the point, but it does mean they get
       * light where they may have expected dark.
       */
      // Next omits a meta whose content is empty, so this carries a value.
      // Dark Reader only tests for the tag name; the content is ignored.
      "darkreader-lock": "true",
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
      siteName: "Westfrench Academy",
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
  // Follows the system preference, exactly like the palette itself.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#16242c" },
  ],
};

export default async function RootLayout({ children, params }) {
  const { local } = await params;

  // Must come before any translation call in this tree. It hands next-intl
  // the locale directly; otherwise next-intl reads the incoming request to
  // work it out, which opts the whole route out of static rendering.
  setRequestLocale(local);

  const messages = await getMessages();
  const tA11y = await getTranslations({ locale: local, namespace: "A11y" });
  const tMeta = await getTranslations({ locale: local, namespace: "Metadata" });

  const jsonLd = buildJsonLd(local, tMeta("description"), tA11y("marion"));

  return (
    <html lang={local}>
      <body
        className={`${nunito.variable} antialiased bg-gradient-to-br from-page-from to-page-to text-pretty`}
      >
        {/* Google Tag Manager, no-JavaScript fallback. Immediately after
            <body> opens, per Google's instructions. dangerouslySetInnerHTML
            because React does not render markup inside <noscript> otherwise. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/*
          First thing in the tab order. Without it a keyboard user has to tab
          through the banner, logo, five nav links and three flags on every
          page before reaching the content. Hidden until focused.
        */}
        {/* Positioning lives in .skip-link in globals.css — see the comment
            there for why it is not done with utilities. */}
        <a
          href="#main-content"
          className="skip-link rounded-lg bg-surface px-5 py-3 font-bold text-brand-deep shadow-lg"
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
          <div className="absolute top-[6%] -left-24 w-[28rem] h-[28rem] rounded-full bg-mint-vivid opacity-25 blur-3xl" />
          <div className="absolute top-[34%] -right-32 w-[32rem] h-[32rem] rounded-full bg-ember-vivid opacity-20 blur-3xl" />
          <div className="absolute top-[64%] -left-32 w-[30rem] h-[30rem] rounded-full bg-mint-vivid opacity-20 blur-3xl" />
          <div className="absolute bottom-[4%] -right-24 w-[26rem] h-[26rem] rounded-full bg-ember-vivid opacity-25 blur-3xl" />
        </div>

        <NextIntlClientProvider messages={messages}>
          {children}
          <StickySocialIcons />
          <Footer />
        </NextIntlClientProvider>

        {/* Google Tag Manager loader. See the note on GTM_ID for why this is
            afterInteractive rather than in <head>. */}
        <Script id="gtm-loader" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </body>
    </html>
  );
}
