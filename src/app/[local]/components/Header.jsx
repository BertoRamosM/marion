'use client';

import React, { useState, useEffect, useRef } from "react";
import { Link, usePathname } from '../../../i18n/routing';
import { offerHref, offerFromSlug } from '../../../lib/routes';
import { useLinkStatus } from 'next/link';

import { useTranslations, useLocale } from "next-intl";
import { UkFlag } from "../icons/UkFlag";
import { SpanishFlag } from "../icons/SpanishFlag";
import { FrenchFlag } from "../icons/FrenchFlag";
import { Banner } from "./Banner";
import NavPending from "./NavPending";
import Up from "../icons/Up";
import Heart from "../icons/Heart";
import LocationIcon from "../icons/LocationIcon";
import LaptopIcon from "../icons/LaptopIcon";
import InfoIcon from "../icons/InfoIcon";
import EmailIcon from "../icons/EmailIcon";
import BookIcon from "../icons/BookIcon";


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
/*
 * Each entry carries an icon, used by the mobile menu only — the desktop bar
 * stays text-only, where six glyphs in a row would be noise rather than help.
 *
 * Four of the six reuse the exact icon the destination section already uses
 * for its own heading: map-pin for the Rennes courses, laptop for online,
 * mail for contact, info for the FAQ. So the menu reads as a set of shortcuts
 * to places you have already seen, not a new set of symbols to learn.
 *
 * Accueil gets the up-arrow because that link goes to the top of the page,
 * and À propos gets the heart, which is what Marion's own card uses.
 */
const NAV = [
  { href: '/#default-carousel', key: 'home', Icon: Up },
  { href: '/#about', key: 'about', Icon: Heart },
  // These two carry an offer key rather than an href: each is a real page
  // now, and its slug is translated, so the URL cannot be written here.
  // resolveNav below turns the key into the current locale's path.
  { offer: 'rennes', key: 'coursesRennes', Icon: LocationIcon },
  { offer: 'online', key: 'onlineCourses', Icon: LaptopIcon },
  // Sits before Contact on purpose: answering the question first is
  // cheaper for everyone than answering it by email afterwards.
  { href: '/faq', key: 'faq', Icon: InfoIcon },
  { href: '/blog', key: 'blog', Icon: BookIcon },
  // Contact stays last: it is the action, everything above it is information.
  { href: '/#contact', key: 'contact', Icon: EmailIcon },
];

/**
 * Swaps each offer key for the path that offer has in this language.
 * Entries that already carry an href pass through untouched.
 */
const resolveNav = (locale) =>
  NAV.map((item) =>
    item.offer ? { ...item, href: offerHref(item.offer, locale) } : item
  );

/*
 * The path to switch to when the visitor picks another language.
 *
 * For almost every page this is just the current path: /faq, /blog and
 * /mentions-legales are spelled the same in all three languages, so
 * next-intl only has to swap the locale prefix.
 *
 * The two offer pages are not. Their slug is translated, so keeping the
 * path and changing only the prefix produces /en/cours-de-francais-rennes —
 * a URL that deliberately 404s, because the English page lives at
 * /en/french-classes-rennes. That is exactly what the flags used to do: the
 * language switcher was the one place on the site that could build a
 * mismatched slug, and it did it on every offer page.
 *
 * usePathname here is next-intl's, which returns the path WITHOUT the
 * locale prefix — so "/cours-de-francais-rennes", which is what
 * offerFromSlug expects.
 */
const localisedPath = (pathname, fromLocale, toLocale) => {
  const offer = offerFromSlug(pathname.replace(/^\//, ''), fromLocale);
  return offer ? offerHref(offer, toLocale) : pathname;
};

const Header = () => {
  const t = useTranslations("Header");
  const tA11y = useTranslations("A11y");
  // Locale switching keeps you on the current page (e.g. a blog post)
  // instead of always jumping back to the home page.
  const pathname = usePathname();
  const locale = useLocale();
  const nav = resolveNav(locale);
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
<header className="flex items-center flex-row justify-between gap-2 sm:gap-4 py-1 sm:py-2 px-2 sm:px-20 lg:px-8 xl:px-20 bg-mint text-on-mint-ink w-full text-center">
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
{/* No lg:w-32: the logo, not the links, was setting the header height.
    At 128px wide it rendered 84px tall, which with the row padding made a
    108px bar on top of the 44px announcement strip. Holding it at md:w-28
    from md upward takes the row to 97px, and frees 16px of horizontal room
    for the nav as a side effect. */}
{/* 326x213 matches the real file. The previous 150x180 declared a portrait
    box, so the browser reserved ~200px of height and then collapsed to ~104px
    once the image loaded — a visible jump in a fixed header. */}
<Image
  src="/logos/logo-no-bg.png"
  alt={tA11y("logo")}
  width={326}
  height={213}
  priority
  /* Widest it ever draws is md:w-28, i.e. 112px. Undeclared, it asked
     for the 384px variant on every page load. */

  /* unoptimized: this is a flat-colour logo with alpha, and WebP
     encodes it WORSE than PNG (21.5KB vs 9.7KB measured). Sending the
     palettised PNG straight through is smaller, needs no transform, and
     is cached for a year by _headers. */
  unoptimized
  className="py-1 w-20 h-auto sm:w-24 md:w-28"
/>
        {/* <nav>, not a plain div: this was the only navigation on the site
            with no landmark, so screen-reader users had nothing to jump to.
            The mobile menu already used <nav>, but it only exists while
            open. */}
        {/*
          gap-5 until xl, and the header drops to px-8 over the same range.
          Between 1024 and 1279 the nav becomes visible while the row still
          carries 160px of padding, which left exactly zero pixels spare with
          six items — "Cours à Rennes" and "Cours en ligne" were wrapping onto
          two lines against neighbours that did not, so the bar read as ragged.
          From xl up there is room for the original spacing, so it comes back.
        */}
        <nav className="hidden lg:flex gap-5 xl:gap-8 items-center font-bold">
          {nav.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-ember transition duration-300"
            >
              {t(key)}
              <NavPending />
            </Link>
          ))}
        </nav>
        <button
          aria-label="toggle menu"
          /* on-mint-ink, not on-mint-rust: the orange glyph measured 3.0:1
             against the mint bar and 18px bold just misses the large-text
             threshold, so it needed 4.5. Near-black takes it past 10:1. */
          className="lg:hidden text-lg font-bold py-1 px-2 text-on-mint-ink border border-ember rounded-lg hover:bg-ember hover:text-on-ember transition duration-300"
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
                href={localisedPath(pathname, locale, code)}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-scrim p-6">
          {/*
            A rounded surface card on a dimmed ground, rather than bare white
            text on black. Every other panel on this site is a card — cream,
            mint or white, rounded-3xl, shadow-lg — so the menu now belongs to
            the same family instead of looking like a browser default.

            The scrim is pinned dark in both schemes; see --scrim in
            globals.css for why black-at-opacity does not work here.
          */}
          <div className="relative w-full max-w-sm rounded-3xl bg-surface p-6 shadow-lg">
            {/* Circular, like the carousel and review arrows, rather than a
                bare glyph. Mist ground keeps it legible in both schemes. */}
            <button
              aria-label="close menu"
              className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-mist text-brand shadow-md ring-2 ring-mint transition-all duration-300 hover:bg-mint hover:text-on-mint hover:scale-110"
              onClick={toggleModal}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <nav className="flex flex-col">
              {nav.map(({ href, key, Icon }, index) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleModal}
                  className={`flex items-center gap-4 rounded-2xl px-3 py-3 text-lg font-bold text-brand-deep transition-colors duration-200 hover:bg-mist ${
                    // No opacity modifier: Tailwind cannot inject alpha into a
                    // var() colour, and border-ink-300/60 silently resolved to a
                    // near-white line in dark mode. The plain token is subtle in
                    // both schemes on its own.
                    index > 0 ? 'border-t border-ink-300' : ''
                  }`}
                >
                  {/* Mint disc, the same chapter-marker motif SectionHeading
                      uses, at a size that suits a list rather than a heading.
                      aria-hidden: the link text already names the target. */}
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-on-mint shadow-sm"
                  >
                    <Icon />
                  </span>
                  {t(key)}
                  <NavPending />
                </Link>
              ))}
            </nav>
          </div>
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
