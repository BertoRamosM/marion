import Image from 'next/image';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations("About");
  const tA11y = useTranslations("A11y");

  return (
    <div
      id="about"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 px-0 sm:px-6 pt-4 sm:pt-8 pb-8 sm:pb-16 text-pretty"
    >
      {/*
        Text card.

        Now has a background: it previously had `shadow-lg` with no background
        colour, so the shadow floated around a transparent box — and every
        other card on the site is cream, mint or white. It also carried
        `text-white`, which was invisible against the page and only harmless
        because every child happened to set its own colour.
      */}
      <div className="sm:max-w-lg bg-cream p-8 rounded-3xl shadow-lg z-10">
        <h2 className="text-3xl font-bold text-rust-lg text-pretty">
          {t("text1")}
        </h2>

        {/* space-y-4 instead of <br> tags: consistent rhythm, and every
            paragraph is a real <p> so the text has proper structure. */}
        <div className="pt-4 space-y-4 text-ink-800">
          <p className="font-bold text-brand">{t("text2")}</p>
          <p>{t("text3")}</p>
          <p>{t("text4")}</p>
          <p>{t("text5")}</p>
          <p>{t("text6")}</p>
          <p>{t("text7")}</p>
        </div>
      </div>

      {/* Image Card */}
      <div className="relative shrink-0">
        <div className="bg-gradient-to-r from-ember to-mint p-4 rounded-3xl shadow-lg">
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/about/Marion.webp"
              alt={tA11y("marion")}
              fill
              sizes="(max-width: 640px) 280px, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Decorative blobs — the motif reused in the footer. */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-mint rounded-full opacity-90 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-ember-deep rounded-full opacity-90 blur-xl"></div>
      </div>
    </div>
  );
};

export default About;
