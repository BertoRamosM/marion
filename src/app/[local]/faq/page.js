import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '../components/Header';
import { Link, routing } from '../../../i18n/routing';
import { SITE_URL } from '../../../lib/site';
import Up from '../icons/Up';
import Heart from '../icons/Heart';
import GroupIcon from '../icons/GroupIcon';
import LocationIcon from '../icons/LocationIcon';
import CalendarIcon from '../icons/CalendarIcon';
import EuroIcon from '../icons/EuroIcon';
import FriendIcon from '../icons/FriendIcon';
import LaptopIcon from '../icons/LaptopIcon';
import InfoIcon from '../icons/InfoIcon';
import World from '../icons/World';
import BookIcon from '../icons/BookIcon';
import EmailIcon from '../icons/EmailIcon';

/*
 * One icon per question, in the same order as Faq.items.
 *
 * Matched by position rather than by a key on each item, because an icon is
 * presentation and has no business living in a translation file — the three
 * locales would then each carry their own copy of the same decision. The cost
 * is that this array and the items array have to stay in step: reorder the
 * questions and the icons follow the slot, not the question. The length check
 * below turns that from a silent mismatch into something visible, and any
 * question beyond the list simply renders without an icon rather than
 * crashing.
 *
 * Repeats are deliberate. Schedule and duration are both "when", price,
 * payment and refund are all money, so they share a glyph rather than
 * reaching for a vaguely related one just to look varied.
 */
const QUESTION_ICONS = [
  <Up key="level" />,            // what level am I
  <Heart key="beginner" />,      // no French at all
  <GroupIcon key="size" />,      // group size
  <LocationIcon key="where" />,  // where are the classes
  <CalendarIcon key="when" />,   // schedule
  <CalendarIcon key="length" />, // how long is a class
  <EuroIcon key="price" />,      // cost
  <EuroIcon key="pay" />,        // how to pay
  <FriendIcon key="trial" />,    // is the trial really free
  <LaptopIcon key="formats" />,  // group vs online
  <InfoIcon key="exams" />,      // DELF / DALF
  <World key="remote" />,        // not in Rennes
  <CalendarIcon key="missed" />, // missed class
  <EuroIcon key="refund" />,     // refund
  <BookIcon key="diploma" />,    // is Marion qualified
  <World key="languages" />,     // languages spoken
  <EmailIcon key="signup" />,    // how do I sign up
];

/*
 * Frequently asked questions.
 *
 * A separate page rather than another section on the home page, for two
 * reasons. The home page is already very long, and — more usefully — this gives
 * the site a second URL that can rank on its own. "combien coûte un cours de
 * français à Rennes" and "quel est mon niveau de français" are real queries
 * that the home page, which targets the main service terms, cannot also win.
 *
 * Every answer is drawn from facts already published elsewhere on the site:
 * group size, levels, schedule, venue, the four prices, the free trial, the
 * DAEFLE qualification. Nothing here introduces a new claim, so there is only
 * one place to update if something changes — the translation files.
 *
 * Answers are rendered open rather than behind <details>. On a page whose whole
 * purpose is answering questions, hiding the answers behind clicks costs more
 * than the scroll length saves, and Ctrl+F works.
 */

export async function generateMetadata({ params }) {
  const { local } = await params;
  const t = await getTranslations({ locale: local, namespace: 'Faq' });

  const title = `${t('nav')} | Westfrench Academy`;
  const url = `${SITE_URL}/${local}/faq`;

  return {
    title,
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/faq`])
        ),
        'x-default': `${SITE_URL}/${routing.defaultLocale}/faq`,
      },
    },
  };
}

/*
 * FAQPage structured data.
 *
 * Google can show these as expandable answers directly in the results, which
 * is why the answers are plain strings with no markup: the schema requires
 * text, and anything else risks the rich result being dropped.
 */
function buildFaqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export default async function FaqPage({ params }) {
  const { local } = await params;

  // Static rendering — see layout.js.
  setRequestLocale(local);
  const t = await getTranslations({ locale: local, namespace: 'Faq' });

  // t.raw returns the array as-is rather than trying to format it.
  const items = t.raw('items') || [];

  if (items.length !== QUESTION_ICONS.length) {
    // Visible in the build log rather than silently dropping icons off the end.
    console.warn(
      `[faq] ${items.length} questions but ${QUESTION_ICONS.length} icons — the lists have drifted apart`
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 left-0 right-0 z-[70] bg-surface shadow-md">
        <Header />
      </div>

      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 sm:p-20">
        {/* Clears the fixed banner + header, which is ~152px tall on desktop. */}
        <article className="max-w-3xl mx-auto pt-32 sm:pt-28">
          <h1 className="text-4xl font-bold text-rust-lg">{t('title')}</h1>

          <p className="mt-4 text-lg text-ink-800">{t('intro')}</p>

          <div className="mt-8 space-y-4">
            {items.map(({ q, a, cta }, index) => (
              <section key={q} className="bg-cream p-6 sm:p-8 rounded-3xl shadow-lg">
                {/* The icon is decoration: the question text already names the
                    topic, so announcing a glyph as well would just be noise
                    for a screen reader. shrink-0 keeps it from squashing when
                    a long question wraps. */}
                <h2 className="flex items-start gap-3 text-xl font-bold text-brand">
                  <span aria-hidden="true" className="mt-0.5 shrink-0">
                    {QUESTION_ICONS[index] ?? null}
                  </span>
                  <span>{q}</span>
                </h2>
                <p className="mt-3 text-ink-800 leading-relaxed">{a}</p>

                {/* Only the "how do I sign up" answer carries cta:true. That
                    is the one question where the reader has already decided,
                    so it gets a real button rather than making them scroll
                    back up to find the form. The flag lives in the
                    translations so the copy and its call to action stay
                    together, and the schema below ignores it. */}
                {cta ? (
                  <Link
                    href="/#contact"
                    className="mt-5 inline-block rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 font-semibold text-on-ember shadow transition-transform duration-300 ease-out hover:scale-105"
                  >
                    {t('signupCta')}
                  </Link>
                ) : null}
              </section>
            ))}
          </div>

          {/* Deliberately a quiet line rather than a second gradient button.
              The sign-up answer directly above now carries the loud one, and
              two identical buttons a hundred pixels apart reads as pressure
              rather than help. Different intent, quieter treatment. */}
          <p className="mt-8 text-center text-ink-800">
            {t('stillQuestions')}{' '}
            <Link
              href="/#contact"
              className="font-semibold text-brand underline decoration-2 underline-offset-4 transition-colors duration-300 hover:text-rust"
            >
              {t('contactCta')}
            </Link>
          </p>

          <p className="mt-10">
            <Link
              href="/"
              className="text-brand hover:text-rust underline transition duration-300"
            >
              ← {t('backToSite')}
            </Link>
          </p>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(items)) }}
      />
    </div>
  );
}
