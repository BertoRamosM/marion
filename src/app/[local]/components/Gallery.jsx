"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const images = [
  "/gallery/Photo 1.webp",
  "/gallery/Photo 2.webp",
  "/gallery/Photo 3.webp",
  "/gallery/Photo 10.webp",
  "/gallery/Photo 11.webp",
  "/gallery/rennes.webp",
  "/gallery/Photo 15.webp",
  "/gallery/Photo 16.webp",
  "/gallery/Photo 17.webp",
  "/gallery/Photo 18.webp",
  "/gallery/Photo 19.webp",
  "/gallery/Photo 20.webp",
  "/gallery/Photo 21.webp",
  "/gallery/Photo 4.webp",
  "/gallery/Photo 5.webp",
  "/gallery/Photo 6.webp",
  "/gallery/Photo 7.webp",
  "/gallery/Photo 8.webp",
  "/gallery/Photo 9.webp",
];

/** Circular arrow button, styled to match the hero carousel controls. */
const ArrowButton = ({ direction, onClick, label, className }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/30 hover:bg-white/50 ring-4 ring-[#a3e4db] transition ${className}`}
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
      <div className="columns-2 gap-4 pt-8 space-y-4 w-full md:w-2/3 mx-auto sm:columns-3 md:columns-4">
        {images.map((src, index) => (
          <div key={src} className="break-inside-avoid mb-4">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t("galleryOpen", { number: index + 1 })}
              className="block w-full rounded-lg cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-[#a3e4db]"
            >
              <Image
                src={src}
                alt={t("galleryItem", { number: index + 1 })}
                width={300}
                height={300}
                loading="lazy"
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 17vw"
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
          <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
            {openIndex + 1} / {images.length}
          </p>

          {/* Close */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label={t("galleryClose")}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/30 hover:bg-white/50 ring-4 ring-[#a3e4db] text-white text-2xl leading-none transition"
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
            <Image
              src={images[openIndex]}
              alt={t("galleryItem", { number: openIndex + 1 })}
              fill
              sizes="100vw"
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
