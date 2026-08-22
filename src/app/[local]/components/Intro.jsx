import { useTranslations } from 'next-intl';
import GroupIcon from '../icons/GroupIcon';
import BookIcon from '../icons/BookIcon';
import LaptopIcon from '../icons/LaptopIcon';
import Heart from '../icons/Heart';

/*
 * Lead-in between the hero and the course details.
 *
 * The tagline block used to open the AboutCompany section; when the offer moved
 * above "why us", the page went from hero straight into schedules and prices
 * with nothing framing them. It moved up here rather than being duplicated —
 * same keys, still the AboutCompany namespace.
 *
 * The fact pills exist because this is the first thing a visitor from a search
 * like "french classes in rennes" reads. They answer who it is for, what level,
 * where, and what it costs to try — all facts already stated further down the
 * page, just surfaced before anyone has to scroll for them.
 */

const FACTS = [
  { key: 'groupSize', Icon: GroupIcon },
  { key: 'levels', Icon: BookIcon },
  { key: 'where', Icon: LaptopIcon },
  // Highlighted: it is the offer, not just a fact.
  { key: 'trial', Icon: Heart, highlight: true },
];

const Intro = () => {
  const t = useTranslations('AboutCompany');
  const tIntro = useTranslations('Intro');

  return (
    <section className="relative max-w-4xl mx-auto text-center pt-4 pb-12 px-4">
      <h2 className="text-4xl font-bold text-ink-900 pt-14">
        <span className="text-rust-lg">{t('Marion')} </span>
        {t('text1')}
      </h2>

      <p className="text-lg text-ink-800 mt-4">{t('text2')}</p>

      {/* No differentiator line here on purpose: text3/text4 ("the only French
          school in Rennes exclusively for expats") already heads the About
          section, and repeating it would be duplicate copy on one page. */}

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {FACTS.map(({ key, Icon, highlight }) => (
          <li
            key={key}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${
              highlight
                ? 'bg-mint text-on-mint'
                : 'bg-veil-80 text-brand-deep'
            }`}
          >
            <span className={highlight ? 'text-on-mint' : 'text-brand'}>
              <Icon />
            </span>
            {tIntro(key)}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Intro;
