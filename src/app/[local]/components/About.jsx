import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations("About");
  const tA11y = useTranslations("A11y");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-0 sm:px-6 pt-8 pb-16 text-pretty">
      {/* Text Content Card */}
      <div className="sm:max-w-lg p-8 rounded-3xl shadow-lg text-white z-10">

        <h2 className="text-3xl font-bold text-[#a8570a] text-pretty">{t("text1")}</h2>
        <div className="pt-4 text-black">
          <p className='text-[#006a8f] font-bold'>{t("text2")}</p> <br></br> 
          
         <p> {t("text3")}
</p>
<br></br>
{t("text4")}
<br></br>
<p className='pt-4'>{t("text5")}
</p>
<p className='pt-4'>{t("text6")}
</p>
        </div>
        <p className="pt-6 text-black">
        {t("text7")}

        </p>
      </div>

      {/* Image Card */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-4 rounded-3xl shadow-lg">
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/about/Marion.webp"
              alt={tA11y("marion")}
              fill
              sizes="(max-width: 640px) 280px, 400px"
              className="object-cover transform hover:scale-105 transition-transform duration-300 ease-out"
            />
          </div>
        </div>
        {/* Optional Decorative Element */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#a3e4db] rounded-full opacity-90 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#ff7c5b] rounded-full opacity-90 blur-xl"></div>
      </div>
    </div>
  );
};

export default About;
  