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

  const startInterval = useCallback(() => {
    return setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 20000);
  }, [slides.length]);

  // Automatically rotate the carousel
  useEffect(() => {
    const id = startInterval();

    return () => clearInterval(id);
  }, [startInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full pt-48 sm:pt-36 lg:pt-28"
      data-carousel="slide"
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
                  alt={`Slide ${index + 1}`}
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
                        className="bg-gradient-to-r from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300"
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
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-[#a3e4db]"
                : "bg-white"
            }`}
            aria-current={
              index === currentIndex ? "true" : "false"
            }
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Previous Button */}
      <button
        aria-label="Previous slide"
        type="button"
        className="absolute top-80 sm:top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 ring-4 ring-[#a3e4db]">
          <svg
            className="w-4 h-4 text-[#a3e4db]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>

      {/* Next Button */}
      <button
        aria-label="Next slide"
        type="button"
        className="absolute top-80 sm:top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 ring-4 ring-[#a3e4db]">
          <svg
            className="w-4 h-4 text-[#a3e4db]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Carousel;