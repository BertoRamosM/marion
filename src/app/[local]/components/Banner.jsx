import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";

const GRADIENT = "bg-gradient-to-r from-[#ffa45b] to-[#a3e4db]";

/*
 * The trial-lesson call to action, in two shapes.
 *
 *   variant="bar"  (default) — the announcement strip at the top of every
 *                  page. Full width, edge to edge, no rounding: that is what
 *                  a top bar is, and rounding it would look accidental.
 *   variant="card" — the mid-page CTA between the course sections. There it
 *                  sits among rounded cards, so it matches them.
 *
 * href defaults to "/#contact" rather than "#contact" so it still works from
 * pages that are not the home page (the header renders on the legal page too,
 * where a bare hash would go nowhere). Pass an absolute URL to point a given
 * instance somewhere else — external links open in a new tab.
 */
export const Banner = ({ variant = "bar", href = "/#contact" }) => {
  const t = useTranslations("Banner");

  const isExternal = /^https?:\/\//.test(href);
  const Wrapper = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  if (variant === "card") {
    return (
      <Wrapper
        {...linkProps}
        className={`group block w-full max-w-3xl mx-auto rounded-3xl shadow-lg px-6 py-6 sm:px-10 text-center transition-transform duration-300 hover:scale-[1.02] ${GRADIENT}`}
      >
        <span className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <span className="text-base sm:text-lg font-bold">{t("title1")}</span>
          <span className="shrink-0 rounded-full bg-white px-5 py-2 font-bold text-[#00485f] shadow transition-colors group-hover:bg-[#e5f8f6]">
            {t("title2")}
          </span>
        </span>
      </Wrapper>
    );
  }

  return (
    <div
      className={`flex items-center justify-center py-2 px-4 sm:px-20 text-center ${GRADIENT}`}
    >
      <Wrapper
        {...linkProps}
        className="text-sm sm:text-lg font-bold transition-opacity hover:opacity-75"
      >
        {t("title1")}{" "}
        {/* Was text-red-500: only 1.92:1 on the orange end of the gradient,
            and off-palette. Dark teal is 5.12:1 there and 7.02:1 on the mint
            end. */}
        <span className="text-[#00485f] underline decoration-2 underline-offset-2">
          {t("title2")}
        </span>
      </Wrapper>
    </div>
  );
};
