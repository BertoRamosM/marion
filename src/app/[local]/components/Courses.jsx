import React from 'react';
import LocationIcon from '../icons/LocationIcon';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import CalendarIcon from '../icons/CalendarIcon';
import { Link } from '../../../i18n/routing';
import { useTranslations } from 'next-intl';
import CheckBadge from './CheckBadge';
import SectionHeading from './SectionHeading';

// The eleven promises used to sit in two separate cream boxes, the second of
// which had no heading and read as an orphan. They are one list now.
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

// Each day, with its level/time slots. Wednesday and the free slot stay
// commented out below, as in the original.
const SCHEDULE = [
  { day: 'text17', slots: [['text188', 'text18'], ['text199', 'text19']] },
  { day: 'text21', slots: [['text222', 'text23'], ['text233', 'text24']] },
];

const PRICES = ['text27', 'text28'];


const Courses = () => {
  const t = useTranslations("Courses");
  const tLabel = useTranslations('SectionLabel');

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-0 sm:px-6 sm:min-h-screen" id="courses">
      <SectionHeading
        icon={<LocationIcon />}
        label={tLabel('courses')}
        title={<span className="text-rust-lg">{t("text1")}</span>}
      >
        {t('text2')}
      </SectionHeading>

      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* What you get */}
        <div className="bg-cream p-8 rounded-3xl shadow-lg">
          <div className="text-center">
            <p className="text-base font-semibold text-rust">{t('text3')}</p>
            <h3 className="mt-2 flex items-center justify-center gap-3 text-xl font-semibold text-brand">
              <InfoIcon />
              {t('text4')}
            </h3>
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 text-ink-700">
            {PROMISES.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckBadge />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule + pricing */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Schedule */}
          <div className="bg-mist p-8 rounded-3xl shadow-lg lg:col-span-3">
            <h3 className="text-lg font-semibold text-brand flex items-center gap-2">
              <CalendarIcon /> {t('text16')}
            </h3>

            {/* Two columns, not three: the third was left empty by the
                commented-out Wednesday and opened a gap in the middle. */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SCHEDULE.map(({ day, slots }) => (
                <div
                  key={day}
                  className="rounded-2xl bg-veil-70 p-4 shadow-sm"
                >
                  <h4 className="text-center text-sm font-bold uppercase tracking-wide text-brand">
                    {t(day)}
                  </h4>
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

              {/*     <h3 className="text-brand font-bold">{t('textWed1')}</h3>
               <p className='border-2 sm:border-b-2 border-brand-alt p-1'><span className='font-bold'>{t('textWed2')}</span>{t('textWed3')}</p>

 <p className='border-2 sm:border-b-2 border-brand-alt p-1'><span className='font-bold'>{t('text200')}</span>{t('text20')}</p>
 */}
              {/*   <p className='border-2 sm:border-b-2 border-brand-alt border-brand-alt p-1 border-b-2 border-l-2 border-brand-alt'><span className='font-bold'>{t('text211')}</span>{t('text22')}</p> */}
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm text-brand font-semibold">
              <LocationIcon />
              <span>{t('text25')}</span>
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-mist p-8 rounded-3xl shadow-lg lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-semibold text-brand flex items-center gap-2">
              <EuroIcon /> {t('text26')}
            </h3>

            <div className="mt-6 space-y-3">
              {PRICES.map((key) => (
                <p
                  key={key}
                  className="rounded-2xl bg-veil-70 px-4 py-3 text-center font-bold text-brand-deep shadow-sm"
                >
                  {t(key)}
                </p>
              ))}

              {/* <li className="flex items-center gap-2">
                <BookIcon /> <strong>{t('text29')}</strong>
              </li> */}
            </div>

            <p className="mt-4 text-xs text-ink-600 text-center">
              {t('text30')}
            </p>

            {/*
              The commit action, placed at the price rather than further down.

              It reads the same as the contact form's submit button on purpose:
              the orange gradient is this site's "this is the action" colour, so
              using it here says the two buttons do the same kind of thing.

              This is now the only call to action in the section. A
              free-trial banner used to sit below it, but between that, the
              section CTA, the top bar and the sticky WhatsApp icon, one scroll
              offered five routes to the same conversation. The trial offer
              still runs in the bar at the top of every page.

              mt-auto from lg up: the card is a flex column, so this pins the
              button to the bottom edge and lines it up with the taller
              schedule card alongside. On narrower screens the cards stack, so
              a fixed mt-6 is the right spacing instead.

              href is "/#contact", matching the top bar: a bare hash would go
              nowhere from the legal or blog pages.

              The label says "book my place" rather than "sign up", because
              that is literally what the button does — it opens the contact
              form, not an enrolment flow. It also happens to be the stronger
              CTA here: the schema caps these groups at eight people, so
              "place" carries the scarcity that "sign up" does not.
            */}
            <div className="mt-6 lg:mt-auto lg:pt-6">
              <Link
                href="/#contact"
                className="block w-full rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 text-center font-semibold text-on-ember shadow transition-transform duration-300 ease-out hover:scale-105"
              >
                {t('bookPlace')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
