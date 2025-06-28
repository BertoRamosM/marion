'use client';

import React, { useState, useEffect, useRef } from "react";
import { Link } from '../../../i18n/routing';

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
      <header className="flex items-center flex-col sm:flex-row justify-between gap-4 py-2 sm:p-0  px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] bg-[#a3e4db] w-full text-center">
        {/*  <h1 className="text-sm sm:text-base lg:text-4xl font-bold flex flex-col items-center text-center border-2 border-[#2c7a7b] p-4">
          <span className="text-[#007ea7]">WestFrench</span>
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
        <Image src="/logos/logo-no-bg.png" alt="WestFrench logo" width={150} height={180} className="py-2" />
        <div className="hidden lg:flex gap-8 items-center font-bold">

          <Link
            aria-label="Home"
            href={"#default-carousel"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("home")}
          </Link>

          <Link
            aria-label="Courses"
            href={"#courses"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("coursesRennes")}
          </Link>
          <Link
            aria-label="Online Courses"
            href={"#online-courses"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("onlineCourses")}
          </Link>
          <Link
            aria-label="About"
            href={"#about"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("about")}
          </Link>
          <Link
            aria-label="Contact"
            href={"#contact"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("contact")}
          </Link>
        </div>
        <button
          aria-label="toggle menu"
          className="lg:hidden text-xl font-bold py-2 px-4 text-[#ffa45b] border border-[#ffa45b] rounded-lg hover:bg-[#ffa45b] hover:text-white transition duration-300"
          onClick={toggleModal}
        >
          ☰
        </button>
        <div className="flex gap-4 items-center">
          <Link href="/" locale="fr" aria-label="French">
            <FrenchFlag />
          </Link>
          <Link href="/" locale="en" aria-label="English">
            <UkFlag />
          </Link>
          <Link href="/" locale="es" aria-label="Spanish">
            <SpanishFlag />
          </Link>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white z-50">
          <button
            aria-label="close menu"
            className="absolute top-4 right-4 text-3xl font-bold"
            onClick={toggleModal}
          >
            ×
          </button>
          <nav className="flex flex-col gap-8 text-xl font-bold">
            <Link href={"#default-carousel"} onClick={toggleModal} aria-label="Home">
              {t("home")}
            </Link>
            <Link href={"#courses"} onClick={toggleModal} aria-label="Courses">
              {t("coursesRennes")}
            </Link>
            <Link href={"#online-courses"} onClick={toggleModal} aria-label="Online Courses">
              {t("onlineCourses")}
            </Link>
            <Link href={"#about"} onClick={toggleModal} aria-label="About">
              {t("about")}
            </Link>
            <Link href={"#contact"} onClick={toggleModal} aria-label="Contact">
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
