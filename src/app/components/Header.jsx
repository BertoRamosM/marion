'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UkFlag } from "../icons/UkFlag";
import { SpanishFlag } from "../icons/SpanishFlag";
import { FrenchFlag } from "../icons/FrenchFlag";
import { Banner } from "./Banner";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
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

      lastScrollY = currentScrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ${
        isHidden ? "header-hidden" : ""
      }`}
    >
      <Banner />
      <header
        className="flex items-center flex-col sm:flex-row justify-between gap-4 py-8 px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] bg-[#a3e4db] w-full text-center"
      >
        <h1 className="text-4xl font-bold flex flex-col items-center text-center">
          <span>WestFrench</span>
          <span className="text-xl text-[#2c7a7b]" style={{ fontSize: "2rem" }}>
            Academy
          </span>
        </h1>
        <div className="flex gap-8 items-center font-bold">
          <Link href={"#default-carousel"} className="hover:text-[#ffa45b] transition duration-300">
            Accueil
          </Link>
          <Link href={"#courses"} className="hover:text-[#ffa45b] transition duration-300">
          Cours à Rennes
          </Link>
          <Link href={"#online-courses"} className="hover:text-[#ffa45b] transition duration-300">
            Cours en ligne
          </Link>
          <Link href={"#about"} className="hover:text-[#ffa45b] transition duration-300">
          À propos
          </Link>
          <Link href={"#contact"} className="hover:text-[#ffa45b] transition duration-300">
            Contact
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <SpanishFlag />
          <UkFlag />
          <FrenchFlag />
        </div>
      </header>
      <style jsx>{`
        .header-hidden {
          transform: translateY(-100%);
        }
      `}</style>
    </div>
  );
};

export default Header;
