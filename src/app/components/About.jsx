import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 pt-24">
      {/* Text Content Card */}
      <div className="max-w-lg p-8 rounded-3xl shadow-lg text-white z-10">
        <h1 className="text-3xl font-bold text-black">Moi, Marion</h1>
        <p className="pt-4 text-black">
          Je suis prof de français à Rennes. Comme toi, je suis une expat’! J’ai vécu longtemps en dehors de mon pays, en Angleterre, en Espagne et au Mexique. 
          Aujourd’hui je suis de retour en Bretagne et je te propose des cours spécialement pensés pour toi.
        </p>
        <p className="pt-6 text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsa quod tenetur, expedita ratione fuga dolores eaque quae perferendis optio!
        </p>
      </div>

      {/* Image Card */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-4 rounded-3xl shadow-lg">
          <Image
            src="/about/Marion.jpg"
            alt="Marion"
            width={400}
            height={400}
            className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out "
          />
        </div>
        {/* Optional Decorative Element */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#a3e4db] rounded-full opacity-90 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#ff7c5b] rounded-full opacity-90 blur-xl"></div>
      </div>
    </div>
  );
};

export default About;
  