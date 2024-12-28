import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 pt-8 pb-16">
      {/* Text Content Card */}
      <div className="max-w-lg p-8 rounded-3xl shadow-lg text-white z-10">
        <h1 className="text-3xl font-bold text-[#ffa45b]">Une prof diplômée qui te ressemble !</h1>
        <p className="pt-4 text-black">
          <p className='text-[#007ea7] font-bold'>Hello, moi c&apos;est Marion et je suis professeure de français langue étrangère à Rennes.</p> <br></br> 
          
         <p> Comme toi, je suis une expat&apos; ! J&apos;ai longtemps vécu à l&apos;étranger, en Angleterre, au Mexique et en Espagne. Je parle d&apos;ailleurs couramment anglais, espagnol et catalan. 

Avant de devenir prof, j&apos;étais guide touristique et je suis passionnée par l&apos;histoire de la Bretagne et de la Normandie (dont je suis originaire). 
</p>
<br></br>
Comme j&apos;aime transmettre et être en contact avec les cultures du monde entier, j&apos;ai repris des études pour devenir professeure et j&apos;ai passé le diplôme du DAEFLE (diplôme d&apos;aptitude à l&apos;enseignement du français langue étrangère). 
<br></br>
<p className='pt-4'>J&apos;ai commencé à donner des cours de français dans un centre de langues du sud de la France à des expats venus du 4 coins du monde. J&apos;ai adoré cette expérience qui m&apos;a donné envie d&apos;ouvrir ma propre école. 
</p>
        </p>
        <p className="pt-6 text-black">
        Je suis revenue en Bretagne et je lance maintenant WestFrench Academy, un concept unique à Rennes. 

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
  