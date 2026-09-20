"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";
import CameraIcon from "../icons/CameraIcon";

/*
 * Each photo carries its real pixel dimensions.
 *
 * They used to be rendered with width={300} height={300} — square, which none
 * of them are. next/image writes those numbers onto the <img>, so the browser
 * reserved a square box for every photo and then reflowed it once the real
 * aspect ratio arrived. In a CSS multi-column layout that is worse than the
 * usual layout shift: the column balancing runs on the wrong heights, and
 * lazy-loaded images inside columns can end up positioned such that the
 * browser never decides they are near enough the viewport to fetch. The
 * result is photos that stay blank until something forces a reflow.
 *
 * With the true ratio declared up front the columns are balanced correctly on
 * the first pass and nothing shifts.
 */
const images = [
  { src: "/gallery/Photo 1.webp", width: 1600, height: 1067 },
  { src: "/gallery/Photo 2.webp", width: 1600, height: 1067 },
  { src: "/gallery/Photo 3.webp", width: 1600, height: 1200 },
  { src: "/gallery/Photo 10.webp", width: 1600, height: 1067 },
  { src: "/gallery/Photo 11.webp", width: 1600, height: 1067 },
  { src: "/gallery/rennes.webp", width: 1600, height: 1216 },
  { src: "/gallery/Photo 15.webp", width: 1201, height: 1600 },
  { src: "/gallery/Photo 16.webp", width: 1600, height: 1200 },
  { src: "/gallery/Photo 17.webp", width: 1600, height: 1200 },
  { src: "/gallery/Photo 18.webp", width: 1600, height: 2133 },
  { src: "/gallery/Photo 19.webp", width: 1600, height: 1200 },
  { src: "/gallery/Photo 20.webp", width: 1600, height: 2133 },
  { src: "/gallery/Photo 21.webp", width: 1600, height: 1725 },
  { src: "/gallery/Photo 4.webp", width: 1600, height: 842 },
  { src: "/gallery/Photo 5.webp", width: 1600, height: 1200 },
  { src: "/gallery/Photo 6.webp", width: 1600, height: 2400 },
  { src: "/gallery/Photo 7.webp", width: 1600, height: 2400 },
  { src: "/gallery/Photo 8.webp", width: 1600, height: 2400 },
  { src: "/gallery/Photo 9.webp", width: 1600, height: 2400 },
];

/** Circular arrow button, styled to match the hero carousel controls. */
const ArrowButton = ({ direction, onClick, label, className }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-veil-30 hover:bg-veil-50 ring-4 ring-mint transition ${className}`}
  >
    <svg
      className="w-4 h-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={direction === "prev" ? "M5 1 1 5l4 4" : "m1 9 4-4-4-4"}
      />
    </svg>
  </button>
);

const Gallery = () => {
  const t = useTranslations("A11y");
  const tGallery = useTranslations("Gallery");
  const tLabel = useTranslations("SectionLabel");

  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  // Set when a swipe fires, so the trailing click does not also close the overlay.
  const justSwiped = useRef(false);
  const closeButtonRef = useRef(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((index) => (index + 1) % images.length),
    []
  );
  const prev = useCallback(
    () => setOpenIndex((index) => (index - 1 + images.length) % images.length),
    []
  );

  // Escape closes, arrow keys navigate.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, next, prev]);

  // Stop the page behind the overlay from scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Move focus into the overlay so keyboard users are not left behind it.
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      justSwiped.current = true;
      if (deltaX > 0) next();
      else prev();
    }
  };

  // Clicking the dark backdrop closes; clicking the photo itself does not.
  const handleBackdropClick = (event) => {
    if (justSwiped.current) {
      justSwiped.current = false;
      return;
    }
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      {/* Full width on phones: w-2/3 alone squeezed the two columns to
          roughly 96px per thumbnail. */}
      {/* mx-auto because this no longer lives inside the Courses section's
          centring flex container — at md+ it is only 2/3 wide, so without it
          the grid hugs the left edge of the page. */}
      {/*
        The full SectionHeading, matching the other sections: mint camera badge,
        uppercase label, h2, lead line.

        This started as a lighter heading — h2 and one line, no badge — on the
        argument that a ninth full-weight marker makes the page read as one
        repeating pattern. Overruled deliberately: consistency across sections
        matters more here than that concern.

        No pt-8 on the grid below any more; SectionHeading's own mb-12 provides
        the gap, and both together left an 80px hole.
      */}
      <SectionHeading
        icon={<CameraIcon />}
        label={tLabel("gallery")}
        title={tGallery("title")}
      >
        {tGallery("description")}
      </SectionHeading>

      <div className="columns-2 gap-4 space-y-4 w-full md:w-2/3 mx-auto sm:columns-3 md:columns-4">
        {images.map((image, index) => (
          <div key={image.src} className="break-inside-avoid mb-4">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t("galleryOpen", { number: index + 1 })}
              className="block w-full rounded-lg cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-mint"
            >
              <Image
                src={image.src}
                alt={t("galleryItem", { number: index + 1 })}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 14vw"
              />
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("galleryDialog")}
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8"
        >
          {/* Counter */}
          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-veil-10 px-3 py-1 rounded-full">
            {openIndex + 1} / {images.length}
          </p>

          {/* Close */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label={t("galleryClose")}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-veil-30 hover:bg-veil-50 ring-4 ring-mint text-white text-2xl leading-none transition"
          >
            &times;
          </button>

          <ArrowButton
            direction="prev"
            onClick={prev}
            label={t("galleryPrev")}
            className="left-2 sm:left-4"
          />

          {/* object-contain so tall photos are never cropped */}
          <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
            {/* Capped at the container's own max-w-5xl rather than 100vw:
                the dialog is full width, the image inside it is not. */}
            <Image
              src={images[openIndex].src}
              alt={t("galleryItem", { number: openIndex + 1 })}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain select-none"
            />
          </div>

          <ArrowButton
            direction="next"
            onClick={next}
            label={t("galleryNext")}
            className="right-2 sm:right-4"
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
