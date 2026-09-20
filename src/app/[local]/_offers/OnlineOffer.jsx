import { useTranslations } from 'next-intl';
import CheckBadge from '../components/CheckBadge';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import LaptopIcon from '../icons/LaptopIcon';

/*
 * The full one-to-one online offer, moved off the home page for the same
 * reason the Rennes detail was — see the note in RennesOffer.
 *
 * This page has the wider reach of the two. The in-person course is capped at
 * eight seats in one building in Rennes; this one has no geographic limit at
 * all, and until now it had no URL of its own to rank with.
 */

const BENEFITS = ['text7', 'text8', 'text9', 'text10'];

// The amounts live here rather than in the translations, as they did in the
// home section: they are the same figures in all three languages.
const PRICES = [
  { key: 'text12', amount: '575€*' },
  { key: 'text13', amount: '840€*' },
];

export default function OnlineOffer() {
  const t = useTranslations('online');

  return (
    <>
      {/* The framing paragraphs that used to sit under the section heading on
          the home page. They carry the "why", which the bullet list below
          does not. */}
      <section className="bg-cream p-8 rounded-3xl shadow-lg">
        <p className="text-ink-800">{t('text2')}</p>
        <p className="mt-4 text-ink-800">
          {t('text3')}
          <span className="font-bold text-rust"> {t('text4')}</span> {t('text5')}
        </p>

        <div className="mt-8 text-center">
          <p className="text-base font-semibold text-rust">{t('text6')}</p>
          <h2 className="mt-2 flex items-center justify-center gap-3 text-2xl font-semibold text-brand">
            <InfoIcon />
            {t('textWF')}
          </h2>
        </div>

        {/* One column, not two: these four entries are full paragraphs rather
            than the one-liners the Rennes list carries, and side by side they
            produced two very ragged columns. */}
        <ul className="mt-8 grid gap-4 text-ink-700">
          {BENEFITS.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <CheckBadge />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section className="bg-mist p-8 rounded-3xl shadow-lg">
        <h2 className="text-xl font-semibold text-brand flex items-center gap-2">
          <EuroIcon /> {t('text11')}
        </h2>

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

        <p className="mt-4 text-xs text-ink-600 text-center">{t('text14')}</p>

        {/* Width capped and centred rather than full-bleed: this card spans
            the whole column, and a 960px-wide button reads as a banner
            instead of a button. */}
        {/* Bare "#contact" on a plain <a>: the form is on this page, so this
            is a scroll rather than a navigation. See the note on the same
            button in RennesOffer. */}
        <div className="mt-6 flex justify-center">
          <a
            href="#contact"
            className="block w-full max-w-xs rounded-lg bg-gradient-to-tr from-ember to-ember-deep px-6 py-3 text-center font-semibold text-on-ember shadow transition-transform duration-300 ease-out hover:scale-105"
          >
            {t('bookPlace')}
          </a>
        </div>
      </section>
    </>
  );
}
