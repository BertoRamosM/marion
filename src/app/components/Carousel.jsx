"use client"; // Add this directive for client-side rendering

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const Carousel = () => {
  const slides = [
    { 
      type: "image", 
      content: "/carousel/pic1.jpg",
      title: "Cours en mini-groupes a rennes",
      text: "Tu vis à Rennes ou tu viens d’emménager à Rennes ?",
      sub: "Tu veux progresser rapidement en français dans un mini groupe et rencontrer d’autres expats ? Tu ne veux plus être “un élève de plus” d’une grande école de français et de cours standardisés ? Tu veux apprendre le français tout en t’amusant ? Des cours sur-mesure en fonction de tes centres d’intérêts et de tes besoins ? ",
      link: "#courses"
    },
    { 
      type: "image", 
      content: "/carousel/pic2.jpg",
      title: "Cours en ligne",
      text: "Tu ne vis pas encore dans le nord-ouest de la France ?",
      sub: "Tu souhaites t’installer bientôt à Rennes, à Nantes, en Bretagne, en Normandie ou dans les pays de Loire et tu veux progresser en français dès maintenant avec moi en ligne et tout savoir sur ta future région ? Tu veux une prof locale qui te ressemble pour apprendre le français interactivement et ludiquement ? ",
      link: "#online-courses"
    },
    { 
      type: "image", 
      content: "/carousel/pic3.jpg",
      title: "Les ateliers de phonétique a rennes",
      text: "Tu as déjà un bon niveau de français mais tu aimerais améliorer ta prononciation et ton accent français ? ",
      sub: "Tu es un expat et tu vis à Rennes ou dans le nord-ouest de la France ? Inscris-toi à mon prochain atelier de phonétique (A partir du niveau B1, 3h en mini groupe)",
      link: ""
    },
    // Add more slides with different types as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null); // Keep track of the interval ID

  // Function to start the slide interval
  const startInterval = useCallback(() => {
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 20000); // Slide every 20 seconds
    setIntervalId(id);
  }, [slides.length]);

 

  // Handle next slide
  const nextSlide = () => {
    clearInterval(intervalId); // Clear the previous interval when user clicks
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    startInterval(); // Restart the interval
  };

  // Handle previous slide
  const prevSlide = () => {
    clearInterval(intervalId); // Clear the previous interval when user clicks
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    startInterval(); // Restart the interval
  };

  return (
    <div id="default-carousel" className="relative w-full pt-24" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-[400px] overflow-hidden rounded-lg md:h-[600px]"> {/* Adjust height */}
        {/* Carousel items */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute flex justify-center items-center w-full h-full transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0" // Keep the current slide in place
                : index === (currentIndex - 1 + slides.length) % slides.length
                ? "opacity-0 translate-x-[100%]" // Move previous slide to the right
                : "opacity-0 translate-x-[-100%]" // Move next slide to the left
            }`}
            data-carousel-item
          >
            {/* Image */}
            <img
              src={slide.content}
              className="block w-[85%] h-full object-cover" // Ensures full coverage
              alt={`Slide ${index + 1}`}
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 bg-black/70 text-white text-center rounded-lg max-w-lg">
                <h2 className="text-5xl font-bold pb-8">{slide.title}</h2>
                
                <p className="mt-2 text-lg font-semibold">{slide.text}</p>
                <p className="mt-2 mb-4">{slide.sub}</p>
              {slide.link ?   <Link href={slide.link}><button  className="bg-gradient-to-tr from-[#ffa45b] to-[#ff7c5b] px-6 py-3 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform duration-300 ease-out">C’est par là</button></Link> : null}
              

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
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

      {/* Slider controls */}
      <button
  type="button"
  className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  onClick={prevSlide}
  data-carousel-prev
>
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 ring-4 ring-[#a3e4db]">
    <svg
      className="w-4 h-4 text-[#a3e4db] rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="#a3e4db"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 1 1 5l4 4"
      />
    </svg>
    <span className="sr-only">Previous</span>
  </span>
</button>



<button
  type="button"
  className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  onClick={nextSlide}
  data-carousel-next
>
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 ring-4 ring-[#a3e4db]">
    <svg
      className="w-4 h-4 text-[#a3e4db]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="#a3e4db"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
    <span className="sr-only">Next</span>
  </span>
</button>

    </div>
  );
};

export default Carousel;