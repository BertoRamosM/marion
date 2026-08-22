import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/routing";

/*
 * Orange to mint. Both ends are light colours in BOTH schemes (mint has to
 * stay light because it also rings the carousel arrows over a photograph), so
 * the ink is pinned dark here rather than following the normal ramp, which
 * would print light-on-light in dark mode.
 */
const GRADIENT =
  "bg-gradient-to-r from-ember to-mint text-on-mint-ink";

/*
 * The trial-lesson call to action, in two shapes.
 *
 *   variant="bar"  (default) — the announcement strip at the top of every
 *                  page. Full width, edge to edge, no rounding: that is what
 *                  a top bar is, and rounding it would look accidental.
 *   variant="card" — CURRENTLY UNUSED. It was the mid-page CTA inside the two
 *                  course sections. Both were removed: between the new "book
 *                  my place" buttons, this banner, the section CTA, the top
 *                  bar and the sticky WhatsApp icon, one scroll offered five
 *                  routes to the same conversation, which reads as pressure
 *                  rather than help. The free-trial offer still runs at the
 *                  top of every page. Kept because it works and re-adding it
 *                  is one line; delete it if that is settled.
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
          <span className="shrink-0 rounded-full bg-surface px-5 py-2 font-bold text-brand-deep shadow transition-colors group-hover:bg-mist">
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
        {/* Was text-danger-mark: only 1.92:1 on the orange end of the gradient,
            and off-palette. Dark teal is 5.12:1 there and 7.02:1 on the mint
            end. */}
        <span className="text-on-mint underline decoration-2 underline-offset-2">
          {t("title2")}
        </span>
      </Wrapper>
    </div>
  );
};
