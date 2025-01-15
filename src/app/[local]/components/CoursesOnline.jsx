import React from 'react';
import InfoIcon from '../icons/InfoIcon';
import FlagIcon from '../icons/FlagIcon';
import EuroIcon from '../icons/EuroIcon';
import LaptopIcon from '../icons/LaptopIcon';
import { Banner2 } from './Banner2';
import { useTranslations } from 'next-intl';

const OnlineCourses = () => {
  const t = useTranslations("online"); 

  return (
    <div className="flex flex-col items-center justify-center py-16 px-0 sm:px-6 min-h-screen" id='online-courses'>
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#007ea7]">{t("title")}</span> {t("text1")}
        </h1>
        <p className="text-lg text-gray-800 mt-4">
        {t("text2")}
        </p>
        <p className="text-lg text-gray-800 mt-4">
        {t("text3")}<span className="font-bold text-[#ffa45b]"> {t("text4")}</span>  {t("text5")}  <br />
          
          </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col justify-between text-black">
          <h2 className=" font-semibold text-[#007ea7] flex items-center gap-2 flex-col"><span className='text-base'>{t("text6")} </span><span className='flex items-center justify-center gap-4 text-xl'><InfoIcon  /> {t("textWF")}</span></h2>
          
          <p className='pt-2'>
              ✔️  {t("text7")}
            </p>
            <p className='pt-2'>
            ✔️  {t("text8")}
            </p>
           
          
        </div>

        {/* Right Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-center ">
        
        
         
          <p className="mt-4 text-gray-700">
          ✔️  {t("text9")}
          </p>
          <p className="mt-4 text-gray-700">
          ✔️  {t("text10")}
          </p>
        </div>
      </div>

      {/* Tarifs Section */}
     {/*  <div className="mt-12 bg-[#e5f8f6] p-8 rounded-3xl shadow-lg max-w-4xl">
      <h2 className="text-lg font-semibold text-[#007ea7] text-center flex items-center gap-2"><EuroIcon  /> <span> {t("text11")}</span> </h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li className='flex items-center gap-2'><LaptopIcon /> <strong> {t("text12")}</strong> 450€*</li>
          <li className='flex items-center gap-2'><LaptopIcon /> <strong> {t("text13")}</strong> 840€*</li>
          <li className='flex items-center gap-2 text-xs md:text-sm'>
          {t("text14")}
              </li>
        </ul>
      </div> */}

      <div className='pt-8'>  <Banner2 /></div>
    </div>
  );
};

export default OnlineCourses;
