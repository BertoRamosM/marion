'use client';

import React, { useState, useEffect, useRef } from "react";
import { Link, usePathname } from '../../../i18n/routing';

import { useTranslations } from "next-intl";
import { UkFlag } from "../icons/UkFlag";
import { SpanishFlag } from "../icons/SpanishFlag";
import { FrenchFlag } from "../icons/FrenchFlag";
import { Banner } from "./Banner";


// Import Dancing Script font
import { Dancing_Script } from "next/font/google";
import Image from "next/image";

// Define the font outside of the JSX
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});

const Header = () => {
  const t = useTranslations("Header");
  const tA11y = useTranslations("A11y");
  const tBlog = useTranslations("Blog");
  // Locale switching keeps you on the current page (e.g. a blog post)
  // instead of always jumping back to the home page.
  const pathname = usePathname();
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

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ${isHidden ? "header-hidden" : ""
        }`}
    >
      <Banner />
{/* Single row at every size. Stacking on phones (flex-col) pushed logo,
    menu button and flags onto three lines, costing ~90px of vertical space
    for content that fits comfortably side by side. */}
<header className="flex items-center flex-row justify-between gap-2 sm:gap-4 py-1 sm:py-2 px-2 sm:px-20 font-[family-name:var(--font-geist-sans)] bg-[#a3e4db] w-full text-center">
        {/*  <h1 className="text-sm sm:text-base lg:text-4xl font-bold flex flex-col items-center text-center border-2 border-[#2c7a7b] p-4">
          <span className="text-[#006a8f]">WestFrench</span>
          <span
            className={`text-[#2c7a7b]`}
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
        <div className="hidden lg:flex gap-8 items-center font-bold">

          <Link
            href={"/#default-carousel"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("home")}
          </Link>

          <Link
            href={"/#courses"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("coursesRennes")}
          </Link>
          <Link
            href={"/#online-courses"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("onlineCourses")}
          </Link>
          <Link
            href={"/#about"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("about")}
          </Link>
          {/* <Link
            href={"/blog"}
            prefetch={false}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {tBlog("nav")}
          </Link> */}
          <Link
            href={"/#contact"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("contact")}
          </Link>
        </div>
        <button
          aria-label="toggle menu"
          className="lg:hidden text-lg font-bold py-1 px-2 text-[#c2410c] border border-[#ffa45b] rounded-lg hover:bg-[#ffa45b] hover:text-white transition duration-300"
          onClick={toggleModal}
        >
          ☰
        </button>
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* prefetch disabled: switching language is a deliberate, rare action,
              so there is no need to download the other two locales up front. */}
          <Link href={pathname} locale="fr" prefetch={false} aria-label="Français">
            <FrenchFlag />
          </Link>
          <Link href={pathname} locale="en" prefetch={false} aria-label="English">
            <UkFlag />
          </Link>
          <Link href={pathname} locale="es" prefetch={false} aria-label="Español">
            <SpanishFlag />
          </Link>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-black z-50">
          {/* Explicitly white: the wrapper sets text-black, so the close
              glyph was rendering black against a near-black overlay. */}
          <button
            aria-label="close menu"
            className="absolute top-4 right-4 p-2 text-5xl leading-none font-bold text-white hover:text-[#ffa45b] transition duration-300"
            onClick={toggleModal}
          >
            ×
          </button>
          <nav className="flex flex-col gap-8 text-xl font-bold text-white">
            <Link href={"/#default-carousel"} onClick={toggleModal}>
              {t("home")}
            </Link>
            <Link href={"/#courses"} onClick={toggleModal}>
              {t("coursesRennes")}
            </Link>
            <Link href={"/#online-courses"} onClick={toggleModal}>
              {t("onlineCourses")}
            </Link>
            <Link href={"/#about"} onClick={toggleModal}>
              {t("about")}
            </Link>
           {/*  <Link href={"/blog"} onClick={toggleModal} prefetch={false}>
              {tBlog("nav")}
            </Link> */}
            <Link href={"/#contact"} onClick={toggleModal}>
              {t("contact")}
            </Link>
          </nav>
        </div>
      )}

      <style jsx>{`
        .header-hidden {
          transform: translateY(-100%);
        }
      `}</style>
    </div>
  );
};

export default Header;
