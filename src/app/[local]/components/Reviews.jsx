"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SmallCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Render star rating (supports halves)
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="text-yellow-400">&#9733;</span>); // full star
      } else if (rating >= i - 0.5) {
        stars.push(<span key={i} className="text-yellow-400">&#9733;</span>); // half star (simplified)
      } else {
        stars.push(<span key={i} className="text-gray-300">&#9733;</span>); // empty star
      }
    }
    return stars;
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
          }`}
        >
          <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center">
            <div className="w-20 h-20 relative mb-4">
              <Image
                src={slide.image}
                alt={slide.title}
                className="rounded-full object-cover"
                fill
              />
            </div>
            <h3 className="font-semibold text-lg">{slide.title}</h3>
            <p className="text-gray-600 text-sm my-2 px-6">{slide.text}</p>
            <div className="flex space-x-1">{renderStars(slide.rating)}</div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 pr-4"
        aria-label="Previous Slide"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 pr-4"
        aria-label="Next Slide"
      >
        &#8594;
      </button>
    </div>
  );
};
// Example usage
const slidesData = [
  { image: "/reviews/pic1.png", title: "Paula Hernández", text: "Marion is an excellent teacher. In just three months, I have been able to greatly improve my French thanks to her classes. In addition, I’ve had the chance to meet new people and form new friendships through the meetups she organizes. The classes are very dynamic and tailored to each student’s needs. I will definitely continue with her lessons and highly recommend her.", rating: 4.5 },
  { image: "/reviews/pic2.png", title: "Yuchen Huang", text: "Marion is an excellent French teacher. She is passionate, patient, and always encourages me to speak French with confidence. She first took the time to understand my needs and interests, then designed lessons tailored specifically for me. I’ve learned so much from every class. If you’re thinking about learning French, or if you’ve been studying for a while but feel like you’re not making progress, I highly recommend Marion. With her help, I’ve made great improvements!", rating: 5 },
    { image: "/reviews/pic3.png", title: "Clover L", text: "Marion is a truly wonderful French teacher. She always comes to class fully prepared, teaches with heart, and knows how to bring out the best in her students. The class atmosphere is always relaxed and interactive, which makes learning both effective and enjoyable. Her kindness and encouragement mean a lot. I’m so lucky to be one of her students. I highly recommend her!❤️❤️❤️", rating: 5 },
    { image: "/reviews/pic4.png", title: "César Faria", text: "Marion est une excellente professeure de français. Elle prend vraiment le temps de comprendre mes besoins et adapte chaque leçon en fonction de mon niveau, de mes objectifs et de mon rythme. La qualité des cours est remarquable, c’est toujours clair, structuré et personnalisé. Elle est très attentive et je me sens vraiment bien accompagné dans mon parcours grâce à elle.C’est un vrai plaisir d’apprendre avec toi, merci !", rating: 5 },
    { image: "/reviews/pic5.png", title: "Marco Boschetti", text: "Marion is super good! I started the course when I was at A2 level and quickly moved up to B1 and am well on my way to B2. Good lessons and good activities, great for workers, university students and others.", rating: 5 },
    { image: "/reviews/pic6.png", title: "Emmanuelle Dubois", text: "Marion accompagne un petit groupe de jeunes bénéficiaires de la protection internationale (jeunes migrants) avec des niveaux de français très hétérogènes. Et pourtant à chaque collectif, chaque participant y trouve son compte. Que cela soit à l'écrit, à l'oral, en lecture... ses outils sont pertinents, adaptés et Marion est très engagée auprès de ces jeunes qui l'ont bien adoptée pour les #coursdefrançais à l'association We Ker. Pas de place à l'ennui, c'est toujours ludique. J'ai toujours plaisir et confiance à intégrer un nouveau jeune dans ses cours collectifs.", rating: 5 },
    { image: "/reviews/pic7.png", title: "writemesoon100", text: "I enjoyed the small class size and the relaxed atmosphere. Marion uses different techniques and physical aids during the class. The classroom is centrally located and easily accessible. Good for beginners to advanced learners. Profitez de votre cours de français.", rating: 5 },
];

export default function CarouselWrapper() {
  return <SmallCarousel slides={slidesData} />;
}
