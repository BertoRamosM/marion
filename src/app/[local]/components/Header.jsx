'use client';

import React, { useState, useEffect, useRef } from "react";
import { Link, usePathname } from '../../../i18n/routing';
import { useLinkStatus } from 'next/link';

import { useTranslations, useLocale } from "next-intl";
import { UkFlag } from "../icons/UkFlag";
import { SpanishFlag } from "../icons/SpanishFlag";
import { FrenchFlag } from "../icons/FrenchFlag";
import { Banner } from "./Banner";


import Image from "next/image";

/*
 * Spinner shown on a flag while its page is being fetched.
 *
 * Switching language cannot be made faster by prefetching: next-intl refuses
 * to prefetch a locale-switching link, because the response carries a
 * Set-Cookie that would change the visitor's language before they clicked.
 * So the click genuinely has to wait for a round trip, and the only thing
 * worth fixing is that it used to look like nothing had happened.
 *
 * useLinkStatus reports the pending state of the nearest ancestor Link, which
 * is why this is a child component rather than logic in the map below.
 */
const FlagPending = () => {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-veil-pending"
    >
      {/* Still legible as a busy state when animation is suppressed: the
          tinted overlay and the ring remain, only the spinning stops. */}
      <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-mint border-t-transparent motion-reduce:animate-none" />
    </span>
  );
};

/*
 * One source of truth for the navigation, used by both the desktop bar and the
 * mobile menu.
 *
 * They used to be two hand-maintained copies of the same five links, which is
 * how they drifted into an order that no longer matched the page. Mapping both
 * from one array means they cannot disagree again.
 *
 * Order mirrors the section order in page.js: hero, Marion's bio, the two
 * course offers, then contact.
 */
const NAV = [
  { href: '/#default-carousel', key: 'home' },
  { href: '/#about', key: 'about' },
  { href: '/#courses', key: 'coursesRennes' },
  { href: '/#online-courses', key: 'onlineCourses' },
  { href: '/#contact', key: 'contact' },
  // Blog is written and routed but deliberately not linked yet:
  // { href: '/blog', key: 'nav' },
];

const Header = () => {
  const t = useTranslations("Header");
  const tA11y = useTranslations("A11y");
  // Locale switching keeps you on the current page (e.g. a blog post)
  // instead of always jumping back to the home page.
  const pathname = usePathname();
  const locale = useLocale();
  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const lastScrollY = useRef(0); // useRef preserves value across renders

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  /*
   * Freeze the page while the menu is open.
   *
   * Without this the body scrolled behind the overlay, which is how the menu
   * appeared to slide away: scrolling down triggered the header's hide
   * animation, and the menu used to be a child of the element that animates.
   * The menu now sits outside it (see the note on the fragment below), but the
   * page must still not scroll underneath a full-screen menu.
   *
   * The previous inline value is restored rather than blanked, so this cannot
   * clobber an overflow set by anything else.
   */
  useEffect(() => {
    if (!isModalOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isModalOpen]);

  /*
   * The menu is a sibling of the header bar, not a child of it.
   *
   * That bar is fixed and animates with translateY(-100%) when you scroll
   * down. A transform also makes it the containing block for any fixed
   * descendant, so while the menu lived inside it the overlay (a) slid off
   * screen with the header on any downward scroll and (b) sized itself against
   * the bar rather than the viewport, so inset-0 never covered the screen.
   *
   * Both stay inside page.js's z-[70] wrapper, which is what keeps the menu
   * above the sticky social icons at z-60.
   */
  return (
    <>
    <div
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ${isHidden ? "header-hidden" : ""
        }`}
    >
      <Banner />
{/* Single row at every size. Stacking on phones (flex-col) pushed logo,
    menu button and flags onto three lines, costing ~90px of vertical space
    for content that fits comfortably side by side. */}
<header className="flex items-center flex-row justify-between gap-2 sm:gap-4 py-1 sm:py-2 px-2 sm:px-20 bg-mint text-on-mint-ink w-full text-center">
        {/*  <h1 className="text-sm sm:text-base lg:text-4xl font-bold flex flex-col items-center text-center border-2 border-teal-deep p-4">
          <span className="text-brand">Westfrench</span>
          <span
            className={`text-teal-deep`}
            style={{
              fontFamily: "var(--font-dancing-script)",
              marginTop: "-12px",
            }}
          >
            Academy
          </span>
        </h1> */}
{/* 326x213 matches the real file. The previous 150x180 declared a portrait
    box, so the browser reserved ~200px of height and then collapsed to ~104px
    once the image loaded — a visible jump in a fixed header. */}
<Image
  src="/logos/logo-no-bg.png"
  alt={tA11y("logo")}
  width={326}
  height={213}
  priority
  className="py-1 w-20 h-auto sm:w-24 md:w-28 lg:w-32"
/>
        {/* <nav>, not a plain div: this was the only navigation on the site
            with no landmark, so screen-reader users had nothing to jump to.
            The mobile menu already used <nav>, but it only exists while
            open. */}
        <nav className="hidden lg:flex gap-8 items-center font-bold">
          {NAV.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-ember transition duration-300"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <button
          aria-label="toggle menu"
          /* on-mint-ink, not on-mint-rust: the orange glyph measured 3.0:1
             against the mint bar and 18px bold just misses the large-text
             threshold, so it needed 4.5. Near-black takes it past 10:1. */
          className="lg:hidden text-lg font-bold py-1 px-2 text-on-mint-ink border border-ember rounded-lg hover:bg-ember hover:text-white transition duration-300"
          onClick={toggleModal}
        >
          ☰
        </button>
        {/* Flags as round "coins". The active locale sits full-colour with a
            teal ring; the others are dimmed and desaturated until hovered, so
            you can now tell at a glance which language you are reading —
            previously all three looked identical. */}
        <div className="flex gap-1.5 sm:gap-2.5 items-center">
          {[
            { code: 'fr', label: 'Français', Flag: FrenchFlag },
            { code: 'en', label: 'English', Flag: UkFlag },
            { code: 'es', label: 'Español', Flag: SpanishFlag },
          ].map(({ code, label, Flag }) => {
            const isActive = code === locale;
            return (
              <Link
                key={code}
                href={pathname}
                locale={code}
                /* Not prefetchable by design — see FlagPending above. The
                   prop is kept explicit so it is clear this is intentional
                   rather than an oversight. */
                prefetch={false}
                aria-label={label}
                aria-current={isActive ? 'true' : undefined}
                title={isActive ? `${label} — ${tA11y('currentLanguage')}` : label}
                className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-full shadow-sm transition-all duration-300 [&>svg]:h-full [&>svg]:w-full [&>svg]:object-cover ${
                  isActive
                    ? 'ring-2 ring-brand ring-offset-1 ring-offset-mint scale-105'
                    : 'opacity-55 saturate-50 hover:opacity-100 hover:saturate-100 hover:scale-110'
                }`}
              >
                <Flag />
                <FlagPending />
              </Link>
            );
          })}
        </div>
      </header>
    </div>

      {/* z-[100]: an overlay has to cover the sticky social icons, which sit
          at 60. See the layer list in StickySocialIcons. */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-ink-max z-[100]">
          {/* Explicitly white: the wrapper sets text-ink-max, so the close
              glyph was rendering black against a near-black overlay. */}
          <button
            aria-label="close menu"
            className="absolute top-4 right-4 p-2 text-5xl leading-none font-bold text-white hover:text-ember transition duration-300"
            onClick={toggleModal}
          >
            ×
          </button>
          <nav className="flex flex-col gap-8 text-xl font-bold text-white">
            {NAV.map(({ href, key }) => (
              <Link key={href} href={href} onClick={toggleModal}>
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style jsx>{`
        .header-hidden {
          transform: translateY(-100%);
        }
      `}</style>
    </>
  );
};

export default Header;
