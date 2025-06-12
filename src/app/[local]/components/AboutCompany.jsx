import React from 'react';
import Needle from '../icons/Needle';
import About from './About';
import Heart from '../icons/Heart';
import GroupIcon from '../icons/GroupIcon';
import FriendIcon from '../icons/FriendIcon';
import Up from '../icons/Up';
import Building from '../icons/Building';
import World from '../icons/World';
import ExpandIcon from '../icons/ExpandIcon';
import LaptopIcon from '../icons/LaptopIcon';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const AboutCompany = () => {
    const t = useTranslations("AboutCompany"); 
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-0 sm:px-6 min-h-screen" id="about">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">{t("Marion")} </span>{t("text1")}
        </h1>
        <p className="text-lg text-gray-800 mt-4">
        {t("text2")}
        </p>
      </div>
      <About />

      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#007ea7]">{t("text3")} </span>{t("text4")}
        </h1>
        <p className="text-lg text-gray-800 mt-4">
        {t("text5")} <span className="font-bold text-[#ffa45b]">{t("text6")}</span> {t("text7")} <br />
          <span className="text-gray-500 text-sm"> {t("text8")} </span>
        </p>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
       

      <div class="grid gap-4">
        <div className="  bg-[#e5f8f6] text-[#007ea7] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group h-max-full max-w-full ">
          <h2 className="text-2xl font-semibold flex items-center gap-2 flex-col text-center">
            <Heart   />{t("text9")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              {t("text10")} <span className='font-bold'>{t("text11")}</span> {t("text12")} <span className='font-bold'>{t("text13")}</span> {t("text14")} <span className='font-bold'>{t("text15")}</span> {t("text16")} <span className='font-bold'>{t("text17")}</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10  text-black sm:hidden ">
          <ExpandIcon />  
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/about/Marion.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>
        </div>

     
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
            <GroupIcon />{t("text18")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              {t("text19")} <span className='font-bold'>{t("text20")}</span> {t("text21")} <span className='font-bold'>{t("text22")}</span> {t("text23")} <span className='font-bold'>{t("text24")}</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden ">
          <ExpandIcon />  
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/gallery/Photo 5.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>
        </div>
        
        </div>


        <div class="grid gap-4">
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
            <FriendIcon />{t("text25")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              {t("text26")} <span className='font-bold'>{t("text27")}</span> {t("text28")} <span className='font-bold'></span>{t("text29")} <span className='font-bold'>{t("text30")}</span> <span className='font-bold'>  </span>{t("text31")}<span className='font-bold'>{t("text32")}</span> {t("text33")} {t("text34")}<span className='font-bold'>{t("text35")}</span> {t("text36")} <span className='font-bold'></span>{t("text37")}<span className='font-bold'>{t("text38")}</span> {t("text39")}
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden ">
          <ExpandIcon />  
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/gallery/Photo 13.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>

        </div>


        <div className=" p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group bg-[#e5f8f6] text-[#007ea7]">
          <h2 className="text-2xl font-semibold flex items-center gap-2 flex-col text-center">
            <Needle /> {t("text40")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              <span className='font-bold'>{t("text41")}</span> {t("text42")} <span className='font-bold'>{t("text43")}</span> {t("text44")} <span className='font-bold'>{t("text45")}</span> {t("text46")} <span className='font-bold'>{t("text47")}</span> {t("text48")} <span className='font-bold'>{t("text49")}</span> {t("text50")} <span className='font-bold'>{t("text51")}</span> {t("text52")}<span className='font-bold'>{t("text53")}</span> {t("text54")}
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden ">
          <ExpandIcon />  
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/gallery/Photo 14.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>


        </div>
    </div>


    <div class="grid gap-4">
    
        <div className="bg-[#e5f8f6] text-[#007ea7] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
          <h2 className="text-2xl font-semibold   flex items-center gap-2 flex-col text-center">
            <Up />{t("text55")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              {t("text56")}
                <span className='font-bold'>{t("text57")}</span> 
                {t("text58")}
                <span className='font-bold'>{t("text59")}</span> {t("text60")}
                <span className='font-bold'>{t("text61")}</span> {t("text62")}
                <span className='font-bold'>{t("text63")}</span> {t("text64")} 
                <span className='font-bold'>{t("text65")}</span>
                {t("text66")}
                 <span className='font-bold'>{t("text67")}</span>
                 {t("text68")} 
                  <span className='font-bold'>{t("text69")}</span>
                  {t("text70")}
                   <span className='font-bold'> {t("text71")}</span>
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden ">
          <ExpandIcon />  
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/gallery/Photo 7.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>


        </div>

   
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
            <World /> {t("text72")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              {t("text73")}
                <span className='font-bold'> {t("text74")}</span> 
                {t("text75")}
                <span className='font-bold'> {t("text76")}</span>
                {t("text77")}
                 <span className='font-bold'> {t("text78")}</span>
                 {t("text79")}
                  <span className='font-bold'> {t("text80")}</span>
                  {t("text81")}
                   <span className='font-bold'>  {t("text82")}</span> 
                   
                   <span className='font-bold'>  {t("text83")}</span>
                   {t("text84")}
                    <span className='font-bold'>  {t("text85")} </span>!
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden ">
          <ExpandIcon /> 
           
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/about/Marion2.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>
        </div>
        
        </div>

    
        <div class="grid gap-4">
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
            <Building  />  {t("text86")}
          </h2>
          <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
              {t("text87")}
                <span className='font-bold'>  {t("text88")}</span> 
                {t("text89")}
              </li>
            </ul>
          </div>
          <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden ">
          <ExpandIcon />  
          </div>
          <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
                 <Image
                   src="/about/Marion4.webp"
                   alt="Marion"
                   width={200}
                   height={100}
                   className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                 />
               </div>
          </div>
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
  <h2 className="text-2xl font-semibold text-[#ffa45b] flex flex-col items-center gap-2 text-center">
    <LaptopIcon /> {t("text90")}
  </h2>
  <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden pb-4">
    <ul className="mt-4 space-y-3 text-gray-700">
      <li>
        <span className="font-bold">{t("text91")}</span>
        {t("text92")}
        <span className="font-bold">{t("text93")}</span>
        {t("text94")} <span className="font-bold">{t("text95")}</span>
        {t("text96")}
        <span className="font-bold">{t("text97")}</span>
        {t("text98")}
        <span className="font-bold">{t("text99")}</span>
        {t("text100")}
        <span className="font-bold">{t("text101")}</span>
        {t("text102")}
        <span className="font-bold">{t("text103")}</span>
        {t("text104")} <span className="font-bold">{t("text105")}</span>
        {t("text106")} <span className="font-bold">{t("text107")}</span>
        {t("text108")}
        <span className="font-extrabold">{t("text109")}</span>
        {t("text110")}
      </li>
    </ul>
  </div>
  <div className="absolute left-1/2 bottom-1 z-10 text-black sm:hidden">
    <ExpandIcon />
  </div>
  <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
    <Image
      src="/about/Marion3.webp"
      alt="Marion"
      width={200}
      height={100}
      className="rounded-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
    />
  </div>
</div>

          </div>
        </div>
      
    </div>
  );
};

export default AboutCompany;
