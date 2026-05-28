"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SmallCarousel = ({ slides }) => {
  const t = useTranslations("Reviews");

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  return (
    <div className="w-full max-w-md mx-auto h-full" id="reviews">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#007ea7]">{t("title")}</span>
        </h1>
      </div>

      <div
        className="relative w-full h-[450px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 relative"
                : "opacity-0 absolute top-0 left-0"
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




// Example usage
const slidesData = [
  { image: "/reviews/pic1.png", title: "Paula Hernández", text: "Marion is an excellent teacher. In just three months, I have been able to greatly improve my French thanks to her classes. In addition, I’ve had the chance to meet new people and form new friendships through the meetups she organizes. The classes are very dynamic and tailored to each student’s needs. I will definitely continue with her lessons and highly recommend her.", rating: 4.5 },
  { image: "/reviews/pic2.png", title: "Yuchen Huang", text: "Marion is an excellent French teacher. She is passionate, patient, and always encourages me to speak French with confidence. She first took the time to understand my needs and interests, then designed lessons tailored specifically for me. I’ve learned so much from every class. If you’re thinking about learning French, or if you’ve been studying for a while but feel like you’re not making progress, I highly recommend Marion. With her help, I’ve made great improvements!", rating: 5 },
  { image: "/reviews/pic3.png", title: "Clover L", text: "Marion is a truly wonderful French teacher. She always comes to class fully prepared, teaches with heart, and knows how to bring out the best in her students. The class atmosphere is always relaxed and interactive, which makes learning both effective and enjoyable. Her kindness and encouragement mean a lot. I’m so lucky to be one of her students. I highly recommend her!❤️❤️❤️", rating: 5 },
  { image: "/reviews/pic4.png", title: "César Faria", text: "Marion est une excellente professeure de français. Elle prend vraiment le temps de comprendre mes besoins et adapte chaque leçon en fonction de mon niveau, de mes objectifs et de mon rythme. La qualité des cours est remarquable, c’est toujours clair, structuré et personnalisé. Elle est très attentive et je me sens vraiment bien accompagné dans mon parcours grâce à elle.C’est un vrai plaisir d’apprendre avec toi, merci !", rating: 5 },
  { image: "/reviews/pic5.png", title: "Marco Boschetti", text: "Marion is super good! I started the course when I was at A2 level and quickly moved up to B1 and am well on my way to B2. Good lessons and good activities, great for workers, university students and others.", rating: 5 },
  { image: "/reviews/pic6.png", title: "Emmanuelle Dubois", text: "Marion accompagne un petit groupe de jeunes bénéficiaires de la protection internationale (jeunes migrants) avec des niveaux de français très hétérogènes. Et pourtant à chaque collectif, chaque participant y trouve son compte. Que cela soit à l'écrit, à l'oral, en lecture... ses outils sont pertinents, adaptés et Marion est très engagée auprès de ces jeunes qui l'ont bien adoptée pour les #coursdefrançais à l'association We Ker. Pas de place à l'ennui, c'est toujours ludique. J'ai toujours plaisir et confiance à intégrer un nouveau jeune dans ses cours collectifs.", rating: 5 },
  { image: "/reviews/pic7.png", title: "writemesoon100", text: "I enjoyed the small class size and the relaxed atmosphere. Marion uses different techniques and physical aids during the class. The classroom is centrally located and easily accessible. Good for beginners to advanced learners. Profitez de votre cours de français.", rating: 5 },
  { image: "/reviews/pic8.png", title: "mami", text: "J’ai rencontré Marion et apprendre le français est devenu amusant ! C’est une prof très gentille qui m’enseigne patiemment même en tant que débutante. Je suis reconnaissante pour cette rencontre !", rating: 5 },
  { image: "/reviews/pic9.png", title: "Celine Luo", text: "Marion is a superrr nice french teacher!I spent a wonderful time with her in Rennes.", rating: 5 },
  { image: "/reviews/pic10.png", title: "NAOKI HUA", text: "Ce fut une expérience d'apprentissage du français très intéressante et enrichissante. Grâce à plusieurs mois de cours particuliers avec le professeur, mon français s'est considérablement amélioré, notamment en ce qui concerne l'actualité. J'ai développé mon autonomie d'apprentissage et enrichi considérablement mon vocabulaire. C'est un cours de français que tout apprenant devrait suivre.", rating: 5 },
  { image: "/reviews/pic11.png", title: "Preeti Yadav", text: "Marion est une excellente professeur. Ses cours sont très interactifs et elle adapte son cours en fonction des besoins de chacun.", rating: 5 },
  { image: "/reviews/pic11.png", title: "Profesora Belinda", text: "I highly recommend Marion Richard and her French classes. I am grateful for her attention to my particular interests and questions. I have never had a more responsive instructor. Our classes together were conducted on Google Meet and she made that situation fun and immensely practical. I specifically asked for colloquial, common expressions and she delivered those to me through references to videos, songs, ads, movies. All those are current and useful for the things that I need: grammar, idiomatic expressions and cultural knowledge. Thank you, Marion. Si eres hispanohablante con el deseo de aprender a hablar con tus vecinos al norte de la frontera, te recomiendo las clases de Marion Richard. Ella me dio clases en Zoom y te aseguro que no hay nada más valioso que tener una prof que también habla español y que puede reconocer de inmediato cuando el error que haces nace de la lengua materna. Además, hay momentos cuando intentar explicar algo en francés no ayuda, pero ella por supuesto te lo puede decir en castellano para sepas de verdad lo que dices. Tú sí puedes. Aprender otro idioma es cosa de todos los sereshumanos. Y Marion Richard te ayudará.", rating: 5 },
  { image: "/reviews/pic12.png", title: "Manny WANG", text: "I’ve been taking French lessons with Marion for half a year, and I can confidently say she is an exceptional teacher. She is incredibly responsible and passionate about teaching. Whenever you have a question, she is always there to help, offering clear explanations and guidance. During lessons, Marion brings great energy and enthusiasm. She encourages us to speak French, which I believe is essential for me learning a new language. Thanks to her supportive approach, I’ve become much more confident expressing myself. Her scheduling is also flexible, which makes it much easier to balance lessons with my busy student life. She always tries her best to adapt to our availability. Marion creates a positive, encouraging, and effective learning environment. I would highly recommend her to anyone looking to improve French.", rating: 5 },


];

export default function CarouselWrapper() {
  return <SmallCarousel slides={slidesData} />;
}
