import { useTranslations } from 'next-intl';
import CheckBadge from '../components/CheckBadge';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import CalendarIcon from '../icons/CalendarIcon';
import LocationIcon from '../icons/LocationIcon';

/*
 * The in-person offer, as its own page.
 *
 * Same content as the #courses section on the home page, and deliberately so —
 * the home page is where most people meet the offer and it earns its length
 * there. What this page adds is a URL of its own: one title, one h1, one
 * Course entity and one thing to link to, all pointed at "cours de français à
 * Rennes". A fragment cannot rank; a page can.
 *
 * Every string comes from the Courses namespace the home section already
 * uses. No copy was written for this page.
 */

// The eleven promises, in the order they read best. Same keys the home
// section uses.
const PROMISES = [
  'text5',
  'text6',
  'text7',
  'text8',
  'text9',
  'text10',
  'text11',
  'text12',
  'text13',
  'text14',
  'text15',
];

// Each day, with its level/time slots. Wednesday and the free slot are still
// commented out in the home section and stay out here too.
const SCHEDULE = [
  { day: 'text17', slots: [['text188', 'text18'], ['text199', 'text19']] },
  { day: 'text21', slots: [['text222', 'text23'], ['text233', 'text24']] },
];

const PRICES = ['text27', 'text28'];

export default function RennesOffer() {
  const t = useTranslations('Courses');
  const tFaq = useTranslations('Faq');
  const tIntro = useTranslations('Intro');

  return (
    <>
      {/* What you get */}
      <section className="bg-cream p-8 rounded-3xl shadow-lg">
        <div className="text-center">
          <p className="text-base font-semibold text-rust">{t('text3')}</p>
          <h2 className="mt-2 flex items-center justify-center gap-3 text-2xl font-semibold text-brand">
            <InfoIcon />
            {t('text4')}
          </h2>
        </div>

        <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 text-ink-700">
          {PROMISES.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <CheckBadge />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Schedule + pricing, side by side from lg up as in the home section:
          the timetable is the wider of the two and the price card is what the
          eye should land on last. */}
      <div className="grid gap-8 lg:grid-cols-5">
        <section className="bg-mist p-8 rounded-3xl shadow-lg lg:col-span-3">
          <h2 className="text-xl font-semibold text-brand flex items-center gap-2">
            <CalendarIcon /> {t('text16')}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SCHEDULE.map(({ day, slots }) => (
              <div key={day} className="rounded-2xl bg-veil-70 p-4 shadow-sm">
                <h3 className="text-center text-sm font-bold uppercase tracking-wide text-brand">
                  {t(day)}
                </h3>
                <dl className="mt-3 space-y-2 text-sm text-ink-700">
                  {slots.map(([levelKey, timeKey]) => (
                    <div
                      key={levelKey}
                      className="flex items-baseline justify-between gap-3 border-b border-mint pb-2 last:border-b-0 last:pb-0"
                    >
                      <dt className="font-semibold text-brand-deep">
                        {t(levelKey)}
                      </dt>
                      <dd className="whitespace-nowrap tabular-nums">
                        {t(timeKey)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/*
            The venue, under the timetable exactly as in the home section.

            <address> rather than <p>: this is the contact address for the
            thing the page is about, which is what the element is for. The
            string is the same one the LocalBusiness and CourseInstance
            entities carry, so the visible page and the structured data agree —
            which is what Google checks before trusting either.
          */}
          <address className="mt-6 flex items-start gap-2 not-italic text-sm text-brand font-semibold">
            <LocationIcon />
            <span>{t('text25')}</span>
          </address>
        </section>

        <section className="bg-mist p-8 rounded-3xl shadow-lg lg:col-span-2 flex flex-col">
          <h2 className="text-xl font-semibold text-brand flex items-center gap-2">
            <EuroIcon /> {t('text26')}
          </h2>

          <div className="mt-6 space-y-3">
            {PRICES.map((key) => (
              <p
                key={key}
                className="rounded-2xl bg-veil-70 px-4 py-3 text-center font-bold text-brand-deep shadow-sm"
              >
                {t(key)}
              </p>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink-600 text-center">{t('text30')}</p>

          {/*
            A bare "#contact", and a plain <a> rather than the routed Link.

            The form is on this page now, so this is a scroll, not a
            navigation — routing it through next-intl's Link would make it a
            locale-aware page transition to somewhere it already is. It used
            to be "/#contact" because the only form was on the home page.
          */}
          {/*
            The free first lesson, named at the point of decision.

            This button said "Réserver ma place" — book my place — on the two
            pages built to convert, which reads as committing to the 440€ on
            the card right above it. The trial being free was mentioned only
            in the thin banner at the top of every page, i.e. nowhere near
            where anyone decides.

            Both strings already existed: Faq.signupCta is the wording the FAQ
            page has always used for exactly this action, and Intro.trial is
            the line the home page uses. No new copy, and the CTA now names
            the cheapest possible next step instead of the most expensive one.
          */}
          <div className="mt-6 lg:mt-auto lg:pt-6">
            <a
              href="#contact"
              className="block w-full rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 text-center font-semibold text-on-ember shadow transition-transform duration-300 ease-out hover:scale-105"
            >
              {tFaq('signupCta')}
            </a>
            <p className="mt-2 text-center text-sm font-semibold text-rust">
              {tIntro('trial')}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
