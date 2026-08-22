import React from 'react';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import LaptopIcon from '../icons/LaptopIcon';
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';
import CheckBadge from './CheckBadge';
import SectionHeading from './SectionHeading';

// The four benefits previously sat in two separate cards, the second without a
// heading — the same orphan-box problem the in-person section had. One list now.
const BENEFITS = ['text7', 'text8', 'text9', 'text10'];


// The amounts live in the JSX rather than the translations, exactly as before.
const PRICES = [
  { key: 'text12', amount: '575€*' },
  { key: 'text13', amount: '840€*' },
];

const OnlineCourses = () => {
  const t = useTranslations("online");
  const tLabel = useTranslations("SectionLabel");

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-0 sm:px-6 sm:min-h-screen" id='online-courses'>
      <SectionHeading
        icon={<LaptopIcon />}
        label={tLabel('online')}
        title={<><span className="text-brand">{t("title")}</span> {t("text1")}</>}
      >
        <p>{t("text2")}</p>
        <p className="mt-4">
          {t("text3")}
          <span className="font-bold text-rust"> {t("text4")}</span> {t("text5")}
        </p>
      </SectionHeading>

      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* What you get — mirrors the in-person section's layout */}
        <div className="bg-cream p-8 rounded-3xl shadow-lg">
          <div className="text-center">
            <p className="text-base font-semibold text-rust">{t("text6")}</p>
            <h3 className="mt-2 flex items-center justify-center gap-3 text-xl font-semibold text-brand">
              <InfoIcon />
              {t("textWF")}
            </h3>
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 text-ink-700">
            {BENEFITS.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckBadge />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="bg-mist p-8 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-brand flex items-center gap-2">
            <EuroIcon /> {t("text11")}
          </h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PRICES.map(({ key, amount }) => (
              <p
                key={key}
                className="flex items-center justify-center gap-2 rounded-2xl bg-veil-70 px-4 py-3 text-center font-bold text-brand-deep shadow-sm"
              >
                <LaptopIcon />
                <span>
                  {t(key)} {amount}
                </span>
              </p>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink-600 text-center">
            {t("text14")}
          </p>

          {/*
            Mirrors the in-person section's button so the two offers close the
            same way. No mt-auto here: this card is full width in a stacked
            column rather than sharing a row with a taller sibling, so there is
            no height to match.

            Width is capped and centred rather than full-bleed: this card spans
            the whole column, and a 960px-wide button reads as a banner instead
            of a button. max-w-xs lands it at 320px, within a few pixels of the
            in-person one, so the two sections close symmetrically — which was
            the point of adding it.
          */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/#contact"
              className="block w-full max-w-xs rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 text-center font-semibold text-on-ember shadow transition-transform duration-300 ease-out hover:scale-105"
            >
              {t("bookPlace")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCourses;
