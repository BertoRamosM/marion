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
 *
 * ORDER: shuffled once, on purpose, and not numeric — do not "tidy" it back.
 * Photos 22-30 were added in one batch and sat as a block at the end, which is
 * the part of a 28-photo grid fewest people reach, so the newest work was the
 * least seen. They are interleaved now.
 *
 * Shuffled once rather than per visit, because per visit cannot be done here
 * without giving something up: these pages are static HTML built at deploy
 * time, so a per-request order would mean server-rendering the home page and
 * losing that; shuffling during render makes the client's order disagree with
 * the server's, which is a hydration error; and shuffling in an effect
 * reorders 28 lazy images after first paint, which is a visible jump and a
 * large relayout. A fresh order each deploy is free, and nobody sees this page
 * often enough to notice it is fixed.
 */
const images = [
  { src: "/gallery/Photo 15.webp", width: 1201, height: 1140, alt: "picnic" },
  { src: "/gallery/Photo 8.webp", width: 1600, height: 2400, alt: "marionShelf" },
  { src: "/gallery/Photo 25.webp", width: 1600, height: 1579, alt: "worksheetsPair" },
  { src: "/gallery/Photo 17.webp", width: 1600, height: 1200, alt: "pizzeria" },
  { src: "/gallery/Photo 29.webp", width: 1600, height: 1873, alt: "conversationCards" },
  { src: "/gallery/Photo 4.webp", width: 1600, height: 842, alt: "venue" },
  { src: "/gallery/rennes.webp", width: 1600, height: 1216, alt: "rennesHouses" },
  { src: "/gallery/Photo 9.webp", width: 1600, height: 2400, alt: "marionLibrary" },
  { src: "/gallery/Photo 26.webp", width: 1600, height: 1813, alt: "woodenWallPair" },
  { src: "/gallery/Photo 22.webp", width: 1600, height: 1280, alt: "apero" },
  { src: "/gallery/Photo 16.webp", width: 1600, height: 1200, alt: "boardGames" },
  { src: "/gallery/Photo 1.webp", width: 1600, height: 1067, alt: "marionDisplays" },
  { src: "/gallery/Photo 18.webp", width: 1600, height: 1568, alt: "cafeTerrace" },
  { src: "/gallery/Photo 6.webp", width: 1600, height: 2400, alt: "marionOutdoors" },
  { src: "/gallery/Photo 27.webp", width: 1600, height: 1613, alt: "conversationGame" },
  { src: "/gallery/Photo 20.webp", width: 1600, height: 1473, alt: "cardGame" },
  { src: "/gallery/Photo 30.webp", width: 1600, height: 1557, alt: "workshopPair" },
  { src: "/gallery/Photo 11.webp", width: 1600, height: 1067, alt: "marionSeated" },
  { src: "/gallery/Photo 23.webp", width: 1600, height: 1773, alt: "comparingAnswers" },
  { src: "/gallery/Photo 19.webp", width: 1600, height: 1200, alt: "cafeCoffees" },
  { src: "/gallery/Photo 24.webp", width: 1600, height: 1386, alt: "groupGame" },
  { src: "/gallery/Photo 21.webp", width: 1600, height: 1725, alt: "vocabularyCards" },
  { src: "/gallery/Photo 7.webp", width: 1600, height: 2400, alt: "marionSmiling" },
  { src: "/gallery/Photo 28.webp", width: 1600, height: 1472, alt: "classroomPair" },
  { src: "/gallery/Photo 10.webp", width: 1600, height: 1067, alt: "marionFacade" },
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
  const tAlt = useTranslations("GalleryAlt");
  const tLabel = useTranslations("SectionLabel");

  /*
   * What a screen reader is told about a given photo.
   *
   * Every photo in the array carries its own description key. The fallback
   * is for one added later without one: a numbered generic line is a poor
   * description, but it is still better than an empty alt, which claims the
   * image is decorative and can be skipped.
   */
  const altFor = (image, index) =>
    image.alt ? tAlt(image.alt) : t("galleryItem", { number: index + 1 });

  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  /*
   * Whether the full-size photo has arrived, and whether it has been long
   * enough to be worth saying so.
   *
   * Two pieces of state rather than one, because a spinner that appears the
   * instant the overlay opens is worse than none: most of these photos are
   * already in the browser cache from the thumbnail grid, or arrive in well
   * under a tenth of a second, and a spinner that flashes for one frame reads
   * as a glitch. So `loaded` tracks the image and `showSpinner` only becomes
   * true once the load has actually taken a noticeable moment.
   */
  const [loaded, setLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Every open, and every arrow press, starts a new load.
  useEffect(() => {
    if (isOpen) setLoaded(false);
  }, [openIndex, isOpen]);

  useEffect(() => {
    if (!isOpen || loaded) {
      setShowSpinner(false);
      return;
    }
    // Long enough that a fast load never shows one, short enough that a slow
    // one does not feel like nothing happened.
    const timer = setTimeout(() => setShowSpinner(true), 150);
    return () => clearTimeout(timer);
  }, [isOpen, openIndex, loaded]);

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

      {/*
        Denser than it was, because the gallery grew from 19 photos to 28.

        At the old two-to-four columns that was roughly 2,400px of gallery on a
        phone — more scrolling than the rest of the home page put together, for
        a section that is a visual breather rather than something to read. One
        extra column at every breakpoint, and a wider container from md up,
        roughly halves the height without making any single photo too small to
        recognise: tiles land around 100px on a phone and 165px on a desktop,
        and every one of them opens full-size in the lightbox anyway.

        gap and space-y drop from 4 to 3 to match the smaller tiles.
      */}
      <div className="columns-3 gap-3 space-y-3 w-full md:w-3/4 lg:w-5/6 mx-auto sm:columns-4 md:columns-5 lg:columns-6">
        {images.map((image, index) => (
          <div key={image.src} className="break-inside-avoid mb-3">
            {/*
              Telling people these open.

                - a scrim and a slight zoom on hover and on keyboard focus
                - title, so a desktop hover also gets the native tooltip
                - cursor-zoom-in on the button below

              There was a fourth: a small magnifier badge on every tile,
              always visible. It was removed on request, and the trade is
              worth knowing rather than rediscovering. All three cues left are
              hover, focus or cursor states, and a touch device has none of
              those — so on a phone the grid gives no visible signal that a
              photo opens, and someone has to try it to find out. Tapping a
              photo grid is a common enough instinct that this is a reasonable
              bet, but it is a bet.

              title reuses A11y.galleryOpen — "Agrandir la photo 3" — which the
              aria-label already uses, so the tooltip and the screen reader say
              the same thing and no new wording was needed.
            */}
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t("galleryOpen", { number: index + 1 })}
              title={t("galleryOpen", { number: index + 1 })}
              className="group relative block w-full overflow-hidden rounded-lg cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-mint"
            >
              <Image
                src={image.src}
                alt={altFor(image, index)}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="w-full h-auto rounded-lg transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                sizes="(max-width: 640px) 32vw, (max-width: 768px) 24vw, (max-width: 1024px) 15vw, 13vw"
              />

              {/* Darkens on hover and on keyboard focus, so the tile reacts
                  to being pointed at. pointer-events-none so it never eats
                  the click. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg bg-scrim opacity-0 transition-opacity duration-300 group-hover:opacity-30 group-focus-visible:opacity-30"
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
          <div
            className="relative w-full h-full max-w-5xl max-h-[80vh]"
            aria-busy={!loaded}
          >
            {/* Capped at the container's own max-w-5xl rather than 100vw:
                the dialog is full width, the image inside it is not. */}
            {/* key forces a fresh <img> per photo, so onLoad fires again on
                every arrow press instead of only for the first one. */}
            {/* loading="eager", not next/image's lazy default. This image is
                the entire point of the overlay and is on screen the moment it
                mounts, so there is nothing to defer — and deferring it is what
                makes the spinner sit there longer than it needs to. */}
            <Image
              key={openIndex}
              src={images[openIndex].src}
              alt={altFor(images[openIndex], openIndex)}
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain select-none"
              onLoad={() => setLoaded(true)}
            />

            {/*
              Shown only once the load has been slow enough to notice — see
              the note on showSpinner above.

              Same motif as the spinner in the header's language switcher: a
              mint ring with one quarter cut away. motion-reduce stops the
              rotation but keeps the ring, so it still reads as a busy state
              for someone who has asked for less animation.

              aria-hidden because the container already carries aria-busy,
              which is what a screen reader acts on; this is the visual half.
            */}
            {showSpinner && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="h-12 w-12 animate-spin rounded-full border-4 border-mint border-t-transparent motion-reduce:animate-none" />
              </span>
            )}
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
