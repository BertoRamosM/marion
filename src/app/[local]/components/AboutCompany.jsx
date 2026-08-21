import React from 'react';
import Needle from '../icons/Needle';
import Heart from '../icons/Heart';
import GroupIcon from '../icons/GroupIcon';
import FriendIcon from '../icons/FriendIcon';
import Up from '../icons/Up';
import Building from '../icons/Building';
import World from '../icons/World';
import LaptopIcon from '../icons/LaptopIcon';
import { useTranslations } from 'next-intl';
import DisclosureCard from './DisclosureCard';

const TEAL = 'bg-[#e5f8f6] text-[#006a8f]';
const CREAM = 'bg-[#fff7f3]';
// Card titles are text-2xl (24px), which WCAG treats as large text (3:1),
// so they can carry a brighter orange than the smaller inline text below.
const CREAM_TITLE = 'text-[#d24b06]';

const AboutCompany = () => {
  const t = useTranslations("AboutCompany");
  const bold = (key) => <span className='font-bold'>{t(key)}</span>;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-0 sm:px-6 min-h-screen">

      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          <span className="text-[#006a8f]">{t("text3")} </span>{t("text4")}
        </h2>
        <p className="text-lg text-gray-800 mt-4">
        {t("text5")} <span className="font-bold text-[#c2410c]">{t("text6")}</span> {t("text7")} <br />
          <span className="text-gray-500 text-sm"> {t("text8")} </span>
        </p>
      </div>

      {/* Content Sections
          - items-start stops grid rows from stretching every column to match
            the tallest one, which made all the other cards grow when one was
            opened.
          - All eight cards are direct grid items. They used to be pre-grouped
            into four vertical pairs, which meant the grid held only 4 items:
            at lg (3 columns) that left the fourth pair stranded alone on a
            second row, two cards tall and a third of the width. Flowing them
            individually also gives a natural left-to-right reading order. */}
      <div className="grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          <DisclosureCard
            cardClassName={TEAL}
            icon={<Heart />}
            title={t("text9")}
            imageSrc="/about/Marion.webp"
          >
            {t("text10")} {bold("text11")} {t("text12")} {bold("text13")} {t("text14")} {bold("text15")} {t("text16")} {bold("text17")}
          </DisclosureCard>

          <DisclosureCard
            cardClassName={CREAM}
            titleClassName={CREAM_TITLE}
            icon={<GroupIcon />}
            title={t("text18")}
            imageSrc="/gallery/Photo 5.webp"
          >
            {t("text19")} {bold("text20")} {t("text21")} {bold("text22")} {t("text23")} {bold("text24")}
          </DisclosureCard>

          <DisclosureCard
            cardClassName={CREAM}
            titleClassName={CREAM_TITLE}
            icon={<FriendIcon />}
            title={t("text25")}
            imageSrc="/gallery/Photo 13.webp"
          >
            {t("text26")} {bold("text27")} {t("text28")} {t("text29")} {bold("text30")} {t("text31")}{bold("text32")} {t("text33")} {t("text34")}{bold("text35")} {t("text36")} {t("text37")}{bold("text38")} {t("text39")}
          </DisclosureCard>

          <DisclosureCard
            cardClassName={TEAL}
            icon={<Needle />}
            title={t("text40")}
            imageSrc="/gallery/Photo 14.webp"
          >
            {bold("text41")} {t("text42")} {bold("text43")} {t("text44")} {bold("text45")} {t("text46")} {bold("text47")} {t("text48")} {bold("text49")} {t("text50")} {bold("text51")} {t("text52")}{bold("text53")} {t("text54")}
          </DisclosureCard>

          <DisclosureCard
            cardClassName={TEAL}
            icon={<Up />}
            title={t("text55")}
            imageSrc="/gallery/Photo 7.webp"
          >
            {t("text56")}
            {bold("text57")}
            {t("text58")}
            {bold("text59")} {t("text60")}
            {bold("text61")} {t("text62")}
            {bold("text63")} {t("text64")}
            {bold("text65")}
            {t("text66")}
            {bold("text67")}
            {t("text68")}
            {bold("text69")}
            {t("text70")}
            {bold("text71")}
          </DisclosureCard>

          <DisclosureCard
            cardClassName={CREAM}
            titleClassName={CREAM_TITLE}
            icon={<World />}
            title={t("text72")}
            imageSrc="/about/Marion2.webp"
          >
            {t("text73")}
            {bold("text74")}
            {t("text75")}
            {bold("text76")}
            {t("text77")}
            {bold("text78")}
            {t("text79")}
            {bold("text80")}
            {t("text81")}
            {bold("text82")}
            {bold("text83")}
            {t("text84")}
            {bold("text85")}!
          </DisclosureCard>

          <DisclosureCard
            cardClassName={CREAM}
            titleClassName={CREAM_TITLE}
            icon={<Building />}
            title={t("text86")}
            imageSrc="/about/Marion4.webp"
          >
            {t("text87")}
            {bold("text88")}
            {t("text89")}
          </DisclosureCard>

          {/* Online courses card in the blue/teal tones, matching the other
              teal cards rather than the cream ones. */}
          <DisclosureCard
            cardClassName={TEAL}
            icon={<LaptopIcon />}
            title={t("text90")}
            imageSrc="/about/Marion3.webp"
          >
            {bold("text91")}
            {t("text92")}
            {bold("text93")}
            {t("text94")} {bold("text95")}
            {t("text96")}
            {bold("text97")}
            {t("text98")}
            {bold("text99")}
            {t("text100")}
            {bold("text101")}
            {t("text102")}
            {bold("text103")}
            {t("text104")} {bold("text105")}
            {t("text106")} {bold("text107")}
            {t("text108")}
            <span className="font-extrabold">{t("text109")}</span>
            {t("text110")}
          </DisclosureCard>

      </div>
    </div>
  );
};

export default AboutCompany;
