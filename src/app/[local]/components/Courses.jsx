import React from 'react';
import LocationIcon from '../icons/LocationIcon';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import CalendarIcon from '../icons/CalendarIcon';
import { Banner } from './Banner';
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
    <div className="flex flex-col items-center justify-center py-16 px-0 sm:px-6 min-h-screen" id="courses">
      <SectionHeading
        icon={<LocationIcon />}
        label={tLabel('courses')}
        title={<span className="text-[#d24b06]">{t("text1")}</span>}
      >
        {t('text2')}
      </SectionHeading>

      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* What you get */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg">
          <div className="text-center">
            <p className="text-base font-semibold text-[#c2410c]">{t('text3')}</p>
            <h3 className="mt-2 flex items-center justify-center gap-3 text-xl font-semibold text-[#006a8f]">
              <InfoIcon />
              {t('text4')}
            </h3>
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 text-gray-700">
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
          <div className="bg-[#e5f8f6] p-8 rounded-3xl shadow-lg lg:col-span-3">
            <h3 className="text-lg font-semibold text-[#006a8f] flex items-center gap-2">
              <CalendarIcon /> {t('text16')}
            </h3>

            {/* Two columns, not three: the third was left empty by the
                commented-out Wednesday and opened a gap in the middle. */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SCHEDULE.map(({ day, slots }) => (
                <div
                  key={day}
                  className="rounded-2xl bg-white/70 p-4 shadow-sm"
                >
                  <h4 className="text-center text-sm font-bold uppercase tracking-wide text-[#006a8f]">
                    {t(day)}
                  </h4>
                  <dl className="mt-3 space-y-2 text-sm text-gray-700">
                    {slots.map(([levelKey, timeKey]) => (
                      <div
                        key={levelKey}
                        className="flex items-baseline justify-between gap-3 border-b border-[#a3e4db] pb-2 last:border-b-0 last:pb-0"
                      >
                        <dt className="font-semibold text-[#00485f]">
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

              {/*     <h3 className="text-[#006a8f] font-bold">{t('textWed1')}</h3>
               <p className='border-2 sm:border-b-2 border-[#007ea7] p-1'><span className='font-bold'>{t('textWed2')}</span>{t('textWed3')}</p>

 <p className='border-2 sm:border-b-2 border-[#007ea7] p-1'><span className='font-bold'>{t('text200')}</span>{t('text20')}</p>
 */}
              {/*   <p className='border-2 sm:border-b-2 border-[#007ea7] border-[#007ea7] p-1 border-b-2 border-l-2 border-[#007ea7]'><span className='font-bold'>{t('text211')}</span>{t('text22')}</p> */}
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm text-[#006a8f] font-semibold">
              <LocationIcon />
              <span>{t('text25')}</span>
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-[#e5f8f6] p-8 rounded-3xl shadow-lg lg:col-span-2 flex flex-col">
            <h3 className="text-lg font-semibold text-[#006a8f] flex items-center gap-2">
              <EuroIcon /> {t('text26')}
            </h3>

            <div className="mt-6 space-y-3">
              {PRICES.map((key) => (
                <p
                  key={key}
                  className="rounded-2xl bg-white/70 px-4 py-3 text-center font-bold text-[#00485f] shadow-sm"
                >
                  {t(key)}
                </p>
              ))}

              {/* <li className="flex items-center gap-2">
                <BookIcon /> <strong>{t('text29')}</strong>
              </li> */}
            </div>

            <p className="mt-4 text-xs text-gray-600 text-center">
              {t('text30')}
            </p>
          </div>
        </div>
      </div>

      {/* Banner Section — w-full so the card reaches its own max-w-3xl
          instead of shrinking to fit inside the centred column. */}
      <div className="w-full pt-8">
        <Banner variant="card" />
      </div>
    </div>
  );
};

export default Courses;
