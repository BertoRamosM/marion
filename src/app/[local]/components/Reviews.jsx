"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SmallCarousel = ({ slides }) => {
  const t = useTranslations("Reviews");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reviews can be long, so stop advancing while someone is reading them —
  // on hover, on keyboard focus, or if they prefer reduced motion.
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={rating >= i ? "text-yellow-400" : "text-gray-300"}
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
    <div className="w-full max-w-3xl mx-auto pb-20" id="reviews">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          <span className="text-[#006a8f]">{t("title")}</span>
        </h2>
      </div>

      {/* No fixed or minimum height: the container hugs whichever review is
          showing, so short ones leave no dead space and the long one pushes
          what follows down instead of overlapping it. */}
      <div
        className="relative w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
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
            <div className="relative bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
              
              {/* Slide counter */}
              <div className="absolute top-4 right-4 text-xs font-medium text-gray-700 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                {formatNumber(currentIndex + 1)} / {formatNumber(slides.length)}
              </div>

              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-full object-cover"
                  fill
                />
              </div>

              <h3 className="font-semibold text-lg text-black">
                {slide.title}
              </h3>

              <p className="text-gray-700 text-sm my-2 px-6">
                {slide.text}
              </p>

              <div className="flex space-x-1">
                {renderStars(slide.rating)}
              </div>
            </div>
          </div>
        ))}

        {/* Pinned near the top of the card so they stay reachable no matter
            how tall the active review is. */}
        <button
          onClick={prevSlide}
          className="absolute top-40 left-0 -translate-y-1/2 bg-white/70 hover:text-black/40 rounded-full p-2 text-black z-10"
          aria-label="Previous Slide"
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-40 right-0 -translate-y-1/2 bg-white/70 hover:text-black/40 rounded-full p-2 pr-4 text-black z-10"
          aria-label="Next Slide"
        >
          →
        </button>
      </div>
    </div>
  );
};




// Photo and rating stay in code (they are not translatable); the name and
// text for each review come from messages/*.json so every locale reads its
// own version. Order here must match the "Reviews.items" array.
const REVIEW_META = [
  { image: "/reviews/pic1.png", rating: 4.5 },
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
