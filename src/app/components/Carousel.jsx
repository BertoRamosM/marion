"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const Carousel = () => {
  const slides = [
    {
      type: "image",
      content: "/carousel/pic1.jpg",
      title: "Cours de français en mini-groupe à Rennes",
      text: "Tu habites à Rennes et tu veux progresser en français rapidement et en t’amusant ?",
      sub: "Rejoins mes cours sur-mesure adaptés à ton niveau et à tes centres d’intérêts : petite classe, ambiance conviviale et rencontre avec d’autres expats !",
      link: "#courses",
    },
    {
      type: "image",
      content: "/carousel/pic2.jpg",
      title: "Cours de français individuels en ligne",
      text: "Tu prévois de t’installer dans le nord-ouest de la France ?",
      sub: "Prépare-toi avant ton arrivée avec une prof locale grâce à des cours sur-mesure sur ta future région et atteins rapidement un premier niveau de français !",
      link: "#online-courses",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startInterval = useCallback(() => {
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 20000);
    setIntervalId(id);
  }, [slides.length]);

  const nextSlide = () => {
    clearInterval(intervalId);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    startInterval();
  };

  const prevSlide = () => {
    clearInterval(intervalId);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    startInterval();
  };

  return (
    <div id="default-carousel" className="relative w-full pt-56 sm:pt-32" data-carousel="slide">
      {/* Carousel Wrapper */}
      <div className="relative h-screen sm:h-[400px] overflow-hidden rounded-lg md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute flex justify-center items-center w-full h-full transition-all duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-100%]"
            }`}
            data-carousel-item
          >
            <img
              src={slide.content}
              className="block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="p-6 text-white text-center rounded-lg max-w-lg">
                <h2 className="text-4xl font-bold pb-4">{slide.title}</h2>
                <p className="mt-2 text-lg">{slide.text}</p>
                <p className="mt-2 mb-4">{slide.sub}</p>
                {slide.link && (
                  <Link href={slide.link}>
                    <button className="bg-gradient-to-r from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300">
                      C&apos;est par là
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-[#a3e4db]" : "bg-white"
            }`}
            aria-current={index === currentIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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
