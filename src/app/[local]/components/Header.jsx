'use client';

import React, { useState, useEffect } from "react";
import {Link} from '../../../i18n/routing';

import { useTranslations } from "next-intl"; 
import { UkFlag } from "../icons/UkFlag";
import { SpanishFlag } from "../icons/SpanishFlag";
import { FrenchFlag } from "../icons/FrenchFlag";
import { Banner } from "./Banner";

// Import Dancing Script font
import { Dancing_Script } from "next/font/google";

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
  let lastScrollY = 0;

  useEffect(() => {
    lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
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
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ${
        isHidden ? "header-hidden" : ""
      }`}
    >
      <Banner />
      <header className="flex items-center flex-col sm:flex-row justify-between gap-4 py-2 sm:py-8 px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] bg-[#a3e4db] w-full text-center">
        <h1 className="text-sm sm:text-base lg:text-4xl font-bold flex flex-col items-center text-center border-2 border-[#2c7a7b] p-4">
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
        </h1>
        <div className="hidden md:flex gap-8 items-center font-bold">
          <Link
            href={"#default-carousel"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("home")} 
          </Link>
          <Link
            href={"#courses"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("coursesRennes")}
          </Link>
          <Link
            href={"#online-courses"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("onlineCourses")} 
          </Link>
          <Link
            href={"#about"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("about")} 
          </Link>
          <Link
            href={"#contact"}
            className="hover:text-[#ffa45b] transition duration-300"
          >
            {t("contact")} 
          </Link>
        </div>
        <button
          className="md:hidden text-xl font-bold py-2 px-4 text-[#ffa45b] border border-[#ffa45b] rounded-lg hover:bg-[#ffa45b] hover:text-white transition duration-300"
          onClick={toggleModal}
        >
          ☰
        </button>
        <div className="flex gap-4 items-center">
          <Link href="/" locale="fr">
            <FrenchFlag />
          </Link>
          <Link href="/" locale="en">
            <UkFlag />
          </Link>
          <Link href="/" locale="es">
            <SpanishFlag />
          </Link>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white z-50">
          <button
            className="absolute top-4 right-4 text-3xl font-bold"
            onClick={toggleModal}
          >
            ×
          </button>
          <nav className="flex flex-col gap-8 text-xl font-bold">
            <Link href={"#default-carousel"} onClick={toggleModal}>
              {t("home")}
            </Link>
            <Link href={"#courses"} onClick={toggleModal}>
              {t("coursesRennes")}
            </Link>
            <Link href={"#online-courses"} onClick={toggleModal}>
              {t("onlineCourses")}
            </Link>
            <Link href={"#about"} onClick={toggleModal}>
              {t("about")}
            </Link>
            <Link href={"#contact"} onClick={toggleModal}>
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
