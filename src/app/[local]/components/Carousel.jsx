"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const Carousel = () => {
  const t = useTranslations("Carousel");

  const slides = [
    {
      type: "image",
      content: "/carousel/red_wall.webp",
      title: t("title1"),
      text: t("subtitle1"),
      sub: t("text1"),
      link: "#courses",
    },
    {
      type: "image",
      content: "/carousel/pic2.webp",
      title: t("title2"),
      text: t("subtitle2"),
      sub: t("text2"),
      link: "#online-courses",
    },
    {
      type: "image",
      content: "/gallery/Photo 21.webp",
      title: t("title3"),
      text: t("subtitle3"),
      sub: t("text3"),
      link: "#reviews",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startInterval = useCallback(() => {
    return setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      /*
       * 10s, down from 20s. Three slides at 20s meant a visitor had to stay
       * a full minute to see the third one, so almost nobody did — the copy on
       * slides 2 and 3 was effort that went unread.
       *
       * Not faster than this on purpose: each slide is a heading, two
       * paragraphs and a button, which takes most of 10s to read. Rotating
       * sooner would interrupt people mid-sentence, which is worse than them
       * missing a slide. Hover, focus and prefers-reduced-motion still pause
       * it entirely.
       */
    }, 10000);
  }, [slides.length]);

  // Automatically rotate the carousel, unless the visitor is hovering or
  // tabbing through it, or has asked their system to reduce motion.
  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const id = startInterval();

    return () => clearInterval(id);
  }, [startInterval, isPaused]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  // Top padding clears the fixed banner + header. pt-48 was sized for the old
  // three-row mobile header (~182px of fixed chrome); that header is now a
  // single 68px row, so the large padding just left a blank gap under it.
  return (
    <div
      id="default-carousel"
      className="relative w-full pt-20 sm:pt-28 lg:pt-24"
      data-carousel="slide"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {/* Carousel Wrapper */}
      <div className="relative h-[500px] sm:h-[400px] overflow-hidden rounded-lg md:h-[600px]">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className={`absolute flex justify-center items-center w-full h-full transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-[-100%]"
              }`}
              data-carousel-item
            >
              {/*
                Only render the current slide and the first slide.

                This prevents slides 2 and 3 from downloading during
                the initial page load and competing with the LCP image.
              */}
              {(isActive || index === 0) && (
                <Image
                  src={slide.content}
                  alt={slide.title}
                  fill
                  className="block w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, calc(100vw - 160px)"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  placeholder={index === 0 ? "blur" : "empty"}
                  blurDataURL={
                    index === 0
                      ? "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACQBACdASoQABUAPu1iqk4ppaQiMAgBMB2JbACdMoRwACWecdiNk6fGWX1lwYwA/tzm/GnoguWGnCVWoBWrliMcJ+t3mOUelIbKuT+2MY+kidkWN9/NcsH2/W1m9dh8eaXgNj9kZYher6oAAAA="
                      : undefined
                  }
                />
              )}

              {/* Dark Overlay + Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="p-6 text-white text-center rounded-lg max-w-lg">
                  {index === 0 ? (
                    <h1 className="text-4xl font-bold pb-4">{slide.title}</h1>
                  ) : (
                    <h2 className="text-4xl font-bold pb-4">{slide.title}</h2>
                  )}

                  <p className="mt-2 text-lg">
                    {slide.text}
                  </p>

                  <p className="mt-2 mb-4">
                    {slide.sub}
                  </p>

                  {slide.link && (
                    <Link
                      href={slide.link}
                      aria-label="section link"
                    >
                      <button
                        type="button"
                        /* Was white text on the light orange gradient: only
                           1.96:1, which read as washed out over the photo. A
                           light mint button with dark teal text is 7.02:1 and
                           pops against the dark overlay. Mint already appears
                           in the carousel arrow rings. */
                        className="bg-mint hover:bg-mint-soft px-6 py-3 rounded-lg text-on-mint font-bold shadow-lg hover:scale-105 transition-all duration-300"
                        aria-label="section button"
                      >
                        {t("button")}
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/*
          Arrows live inside the image box, not outside it.

          They used to be siblings of it with `top-80 sm:top-0` and `h-full`,
          which meant a 580px-tall button starting 320px down: on mobile it
          overhung the image by 320px, put the arrow glyph 30px *below* the
          carousel, and left a large invisible tap target over the section
          underneath. Anchored here, `top-1/2` is the middle of the image at
          every breakpoint, and the hit area is the button itself.
        */}
        <button
          aria-label="Previous slide"
          type="button"
          onClick={prevSlide}
          data-carousel-prev
          className="absolute bottom-4 left-2 sm:bottom-auto sm:top-1/2 sm:left-4 sm:-translate-y-1/2 z-30 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-veil-30 text-mint ring-2 sm:ring-4 ring-mint transition-all duration-300 hover:bg-veil-60 hover:scale-110 focus-visible:outline-none focus-visible:ring-brand"
        >
          <svg className="h-4 w-4" viewBox="0 0 6 10" fill="none" aria-hidden="true">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </button>

        <button
          aria-label="Next slide"
          type="button"
          onClick={nextSlide}
          data-carousel-next
          className="absolute bottom-4 right-2 sm:bottom-auto sm:top-1/2 sm:right-4 sm:-translate-y-1/2 z-30 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-veil-30 text-mint ring-2 sm:ring-4 ring-mint transition-all duration-300 hover:bg-veil-60 hover:scale-110 focus-visible:outline-none focus-visible:ring-brand"
        >
          <svg className="h-4 w-4" viewBox="0 0 6 10" fill="none" aria-hidden="true">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </button>
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-mint"
                : "bg-surface"
            }`}
            aria-current={
              index === currentIndex ? "true" : "false"
            }
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

    </div>
  );
};

export default Carousel;