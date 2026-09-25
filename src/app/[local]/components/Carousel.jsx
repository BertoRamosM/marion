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
      /*
       * A second, pre-cropped copy of the same photo for wide screens.
       *
       * The slide box has a fixed height and a fluid width, so its shape
       * changes completely across breakpoints: 0.62 on a phone, 0.99 on a
       * tablet, 1.96 on a desktop. This photo is portrait (0.75), which fits
       * the first two and not the third — on a desktop object-cover was
       * throwing away 62% of its height, so the browser downloaded 175KB to
       * display the middle 38% of it.
       *
       * One file cannot fix that: a landscape crop would cut ~68% of the
       * width on a phone. So there are two, and the browser picks by media
       * query — which is what <picture> is for.
       *
       * The crop keeps the carved figure, the arched door head and the
       * "Maison TI KOZ de 1505" plaque; above is plain beam and below is
       * doorstep. See the note on the <picture> in the render below.
       */
      wide: {
        srcSet:
          "/carousel/red_wall-wide-1280.webp 1280w, /carousel/red_wall-wide-1920.webp 1920w",
        media: "(min-width: 1024px)",
      },
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

  /*
   * Top padding clears the fixed banner + header, which are out of flow and
   * so contribute no height of their own. pt-48 was sized for the old
   * three-row mobile header (~182px of fixed chrome); that header is now a
   * single row.
   *
   * Retuned with the logo, measured against the bar at each breakpoint:
   *
   *   375px   bar  96px   pt-20 (80)  -> flush. It was -8px before, i.e. the
   *                                     hero was genuinely tucked under the bar.
   *   768px   bar 123px   sm:pt-24 (96) -> 53px clear
   *   1024px+ bar 123px   lg:pt-20 (80) -> 37px clear
   *
   * These two have to move together. The bar is fixed, so trimming it alone
   * does not lift anything — it just widens the gap underneath.
   */
  return (
    <div
      id="default-carousel"
      className="relative w-full pt-28 sm:pt-24 lg:pt-20"
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
                /*
                  <picture> wrapping next/image, so a slide can offer a
                  differently cropped file to wide screens.

                  next/image renders a bare <img> in fill mode, which is
                  exactly what <picture> wants as its last child: the browser
                  takes the first <source> whose media matches, and falls back
                  to the <img> and its own generated srcset otherwise. So
                  narrow screens keep the responsive pipeline untouched, and
                  only wide ones are handed the pre-cropped file.

                  The cropped files are plain static assets rather than going
                  through /_next/image — they are already the right shape and
                  size, and _headers caches /carousel/* for a year, so this
                  also drops a per-request transform.

                  Slides without a `wide` get no <source> and behave exactly as
                  before.
                */
                <picture>
                  {slide.wide && (
                    <source
                      media={slide.wide.media}
                      srcSet={slide.wide.srcSet}
                      sizes="calc(100vw - 160px)"
                      type="image/webp"
                    />
                  )}
                  {/*
                    sizes says 100vw - 32px below 640px, not 100vw.

                    <main> carries px-4 on phones, so this image is never the
                    full viewport width — on a 412px screen it draws at 380px.
                    Claiming 100vw asks the browser to pick a variant for 412px
                    it will then scale down.

                    quality 65 rather than the default 75. This is a backdrop:
                    a dark overlay and the headline sit on top of it, so the
                    detail 75 preserves is detail nobody looks at. 91KB -> 81KB
                    at the 750w variant a phone actually fetches, and this is
                    the LCP image, so those bytes are on the critical path.
                  */}
                  <Image
                    src={slide.content}
                    alt={slide.title}
                    fill
                    quality={65}
                    className="block w-full h-full object-cover"
                    sizes="(max-width: 640px) calc(100vw - 32px), calc(100vw - 160px)"
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    placeholder={index === 0 ? "blur" : "empty"}
                    blurDataURL={
                      index === 0
                        ? "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACQBACdASoQABUAPu1iqk4ppaQiMAgBMB2JbACdMoRwACWecdiNk6fGWX1lwYwA/tzm/GnoguWGnCVWoBWrliMcJ+t3mOUelIbKuT+2MY+kidkWN9/NcsH2/W1m9dh8eaXgNj9kZYher6oAAAA="
                        : undefined
                    }
                  />
                </picture>
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

                  {/*
                    One element, not a <button> inside a <Link>.

                    That nesting is invalid HTML — interactive content cannot
                    sit inside a link — and it behaved like it: keyboard users
                    got two focus stops for one control, and screen readers
                    announced the site's primary call to action twice, once as
                    a link and once as a button.

                    The two aria-labels went with it. They said "section link"
                    and "section button", which overrode the visible wording
                    with something meaningless; without them the accessible
                    name is the label itself, which is what it should always
                    have been.

                    inline-block because <a> is inline by default and the
                    <button> it replaces was not — without it the padding
                    would not reserve height and the 132x48 target collapses.
                  */}
                  {slide.link && (
                    <Link
                      href={slide.link}
                      /* Was white text on the light orange gradient: only
                         1.96:1, which read as washed out over the photo. A
                         light mint button with dark teal text is 7.02:1 and
                         pops against the dark overlay. Mint already appears
                         in the carousel arrow rings. */
                      className="inline-block bg-mint hover:bg-mint-soft px-6 py-3 rounded-lg text-on-mint font-bold shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      {t("button")}
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

      {/*
        Slider Indicators.

        The dots stay 12px, but each button is now a 24px box with the dot
        centred inside it. At w-3 h-3 the button *was* the dot: a 12x12 target,
        half the 24x24 floor WCAG 2.2 sets in SC 2.5.8 (Target Size Minimum,
        Level AA) and genuinely fiddly to hit on a phone.

        space-x-3 drops to space-x-1 so the row stays the same overall width —
        the padding that grew each target absorbs the gap it replaces.
      */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-1">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            aria-current={
              index === currentIndex ? "true" : "false"
            }
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          >
            {/* The dot itself, unchanged at 12px. aria-hidden because the
                button already carries the label. */}
            <span
              aria-hidden="true"
              className={`block h-3 w-3 rounded-full ${
                index === currentIndex ? "bg-mint" : "bg-surface"
              }`}
            />
          </button>
        ))}
      </div>

    </div>
  );
};

export default Carousel;