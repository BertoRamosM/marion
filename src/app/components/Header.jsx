'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UkFlag } from "../icons/UkFlag";
import { SpanishFlag } from "../icons/SpanishFlag";
import { FrenchFlag } from "../icons/FrenchFlag";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    // Initialize lastScrollY when the component is loaded
    lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down, hide the header, else show it
      if (currentScrollY > lastScrollY) {
        setIsHidden(true); // Scrolling down: hide the header
      } else {
        setIsHidden(false); // Scrolling up: show the header
      }

      lastScrollY = currentScrollY; // Update last scroll position
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <header
      className={`flex items-center justify-between gap-4 py-8 px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] top-0 bg-[#a3e4db] transition-transform duration-300 fixed z-50 w-full ${
        isHidden ? "header-hidden" : ""
      }`}
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
          Cours
        </Link>
        <Link href={"#online-courses"} className="hover:text-[#ffa45b] transition duration-300">
          Cours en ligne
        </Link>
        <Link href={"#about"} className="hover:text-[#ffa45b] transition duration-300">
          A propos
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
      <style jsx>{`
        .header-hidden {
          transform: translateY(-100%); /* Hide the header */
        }
      `}</style>
    </header>
  );
};

export default Header;
