"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";
import FriendIcon from "../icons/FriendIcon";

/*
 * The Google Business Profile, in its stable ?cid= form — the same URL the
 * organisation schema lists under sameAs.
 */
const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=8809206434949443188";

const SmallCarousel = ({ slides }) => {
  const t = useTranslations("Reviews");
  const tLabel = useTranslations("SectionLabel");

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /*
   * No auto-advance, on purpose.
   *
   * Reviews vary a lot in length, so rotating on a timer changed the height of
   * this section every 15 seconds — which shoved the contact form below it
   * around while someone was typing. That is why reviews used to sit *after*
   * the form, where most visitors never reached them.
   *
   * Letting the visitor drive (arrows, swipe, keyboard) means the height only
   * changes when they ask for it, so the section can sit immediately before
   * the form. It also means nobody loses a long testimonial half-read.
   */

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? nextSlide() : prevSlide();
    }
  };

  /*
   * The glyphs are decorative; the rating is announced by the wrapper's
   * aria-label instead.
   *
   * Before this, the score existed only as five yellow characters with no
   * text alternative, so a screen reader got either nothing useful or a
   * literal "black star" five times. aria-hidden on each glyph plus one
   * role="img" label on the container is the standard fix, and it also stops
   * the stars being read out in the middle of the review text.
   */
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          aria-hidden="true"
          className={`text-2xl ${rating >= i ? "text-star" : "text-ink-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatNumber = (num) => String(num).padStart(2, "0");

  // max-w-3xl rather than the old max-w-md: long reviews wrap onto far fewer
  // lines, so the tallest card shrinks and the height variance between reviews
  // (which shifts whatever follows) gets much smaller. Matches the contact
  // form's width so the two sections line up.
  return (
    <div className="w-full max-w-3xl mx-auto pb-10 sm:pb-20" id="reviews">
      <SectionHeading
        icon={<FriendIcon />}
        label={tLabel("reviews")}
        title={<span className="text-brand">{t("title")}</span>}
      />

      {/* No fixed or minimum height: the container hugs whichever review is
          showing, so short ones leave no dead space and the long one pushes
          what follows down instead of overlapping it. */}
      <div
        className="relative w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            aria-hidden={index !== currentIndex}
            className={`transition-opacity duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 relative"
                : "opacity-0 absolute top-0 left-0 pointer-events-none"
            }`}
          >
            <div className="relative bg-surface shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
              
              {/* Slide counter */}
              <div className="absolute top-4 right-4 text-xs font-medium text-ink-700 bg-veil-80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                {formatNumber(currentIndex + 1)} / {formatNumber(slides.length)}
              </div>

              <div className="w-20 h-20 relative mb-4">
                {/* 80px, matching the w-20 box. Without an explicit sizes
                    a fill image defaults to 100vw, so all sixteen avatars
                    asked for a viewport-wide variant of a 90px source. */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-full object-cover"
                  fill
                  sizes="80px"
                />
              </div>

              <h3 className="font-semibold text-lg text-ink-max">
                {slide.title}
              </h3>

              {/* Split on blank lines so a multi-paragraph review keeps its
                  paragraphs. Most reviews are a single block and come out of
                  this as one <p>, exactly as before. */}
              <div className="text-ink-700 text-sm my-2 px-6">
                {String(slide.text)
                  .split(/\n\s*\n/)
                  .map((paragraph, i) => (
                    <p key={i} className="mt-3 first:mt-0">
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* Bare on the card, no chip. See the contrast note on --star
                  in globals.css: this colour does not meet 3:1 on white, and
                  that was accepted on purpose. */}
              <div
                className="flex space-x-1"
                role="img"
                aria-label={t("rating", { rating: slide.rating })}
              >
                {renderStars(slide.rating)}
              </div>
            </div>
          </div>
        ))}

        {/* Pinned near the top of the card so they stay reachable no matter
            how tall the active review is.

            They were bg-veil-70 with a black glyph — sitting on a white card,
            which made them almost invisible, and hover:text-black/40 actually
            faded them further. Now a mint ring provides the contrast against
            white, matching the hero carousel's arrows, and hover fills the
            button instead of dimming it. */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="group absolute top-40 -left-2 sm:-left-4 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-brand ring-4 ring-mint shadow-lg transition-all duration-300 hover:bg-mint hover:text-brand-deep hover:scale-110"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 6 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 1 1 5l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="group absolute top-40 -right-2 sm:-right-4 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-brand ring-4 ring-mint shadow-lg transition-all duration-300 hover:bg-mint hover:text-brand-deep hover:scale-110"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 6 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m1 9 4-4-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/*
        One link for the section rather than one per card. All sixteen reviews
        stay in the carousel; this just points at the source so a visitor can
        verify them independently, which is worth more than any number of
        testimonials we host ourselves. It also sends traffic to the Google
        listing, and engagement there feeds local ranking.
      */}
      <p className="mt-6 text-center">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand underline decoration-2 underline-offset-4 transition-colors duration-300 hover:text-rust"
        >
          {t("googleLink")}
        </a>
      </p>
    </div>
  );
};




// Photo and rating stay in code (they are not translatable); the name and
// text for each review come from messages/*.json so every locale reads its
// own version. Order here must match the "Reviews.items" array.
const REVIEW_META = [
  { image: "/reviews/pic1.png", rating: 5 },
  { image: "/reviews/pic2.png", rating: 5 },
  { image: "/reviews/pic3.png", rating: 5 },
  { image: "/reviews/pic4.png", rating: 5 },
  { image: "/reviews/pic5.png", rating: 5 },
  { image: "/reviews/pic6.png", rating: 5 },
  { image: "/reviews/pic7.png", rating: 5 },
  { image: "/reviews/pic8.png", rating: 5 },
  { image: "/reviews/pic9.png", rating: 5 },
  { image: "/reviews/pic10.png", rating: 5 },
  { image: "/reviews/pic11.png", rating: 5 },
  { image: "/reviews/pic11.png", rating: 5 },
  { image: "/reviews/pic12.png", rating: 5 },
  { image: "/reviews/pic13.png", rating: 5 },
  { image: "/reviews/pic15.png", rating: 5 },
  { image: "/reviews/pic16.png", rating: 5 },
  { image: "/reviews/pic17.png", rating: 5 },
];

export default function CarouselWrapper() {
  const t = useTranslations("Reviews");
  // t.raw returns the array as-is rather than trying to format it.
  const items = t.raw("items") || [];

  const slides = REVIEW_META.map((meta, index) => ({
    ...meta,
    title: items[index]?.name ?? "",
    text: items[index]?.text ?? "",
  })).filter((slide) => slide.text);

  return <SmallCarousel slides={slides} />;
}
