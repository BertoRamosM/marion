import React from 'react';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import LaptopIcon from '../icons/LaptopIcon';
import { Banner } from './Banner';
import { useTranslations } from 'next-intl';
import CheckBadge from './CheckBadge';

// The four benefits previously sat in two separate cards, the second without a
// heading — the same orphan-box problem the in-person section had. One list now.
const BENEFITS = ['text7', 'text8', 'text9', 'text10'];

// This section sits directly above the contact form, so a CTA pointing at
// #contact would just scroll to what is already on screen. WhatsApp gives it a
// real destination and a lower-friction alternative to the form. Same URL as
// the sticky icons and footer, and its prefilled message is about online
// courses — which is exactly this section's subject.
const WHATSAPP_URL =
  'https://wa.me/33784582309?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20online%20courses';

// The amounts live in the JSX rather than the translations, exactly as before.
const PRICES = [
  { key: 'text12', amount: '575€*' },
  { key: 'text13', amount: '840€*' },
];

const OnlineCourses = () => {
  const t = useTranslations("online");

  return (
    <div className="flex flex-col items-center justify-center py-16 px-0 sm:px-6 min-h-screen" id='online-courses'>
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          <span className="text-[#006a8f]">{t("title")}</span> {t("text1")}
        </h2>
        <p className="text-lg text-gray-800 mt-4">
        {t("text2")}
        </p>
        <p className="text-lg text-gray-800 mt-4">
        {t("text3")}<span className="font-bold text-[#c2410c]"> {t("text4")}</span>  {t("text5")}
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* What you get — mirrors the in-person section's layout */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg">
          <div className="text-center">
            <p className="text-base font-semibold text-[#c2410c]">{t("text6")}</p>
            <h3 className="mt-2 flex items-center justify-center gap-3 text-xl font-semibold text-[#006a8f]">
              <InfoIcon />
              {t("textWF")}
            </h3>
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 text-gray-700">
            {BENEFITS.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckBadge />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="bg-[#e5f8f6] p-8 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold text-[#006a8f] flex items-center gap-2">
            <EuroIcon /> {t("text11")}
          </h3>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PRICES.map(({ key, amount }) => (
              <p
                key={key}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-center font-bold text-[#00485f] shadow-sm"
              >
                <LaptopIcon />
                <span>
                  {t(key)} {amount}
                </span>
              </p>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-600 text-center">
            {t("text14")}
          </p>
        </div>
      </div>

      <div className="w-full pt-8">
        <Banner variant="card" href={WHATSAPP_URL} />
      </div>
    </div>
  );
};

export default OnlineCourses;
