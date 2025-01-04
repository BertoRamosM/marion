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

const AboutCompany = () => {
  const t = useTranslations("AboutCompany"); 

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen" id="about">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">{t('Marion')}</span>{t('text1')} {t('text2')}
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          {t('text3')}
        </p>
      </div>
      <About />

      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#007ea7]">{t('text4')}</span> {t('text5')}
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          {t('text6')} <br />
          <span className="text-gray-500 text-sm">{t('text7')}</span>
        </p>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div className="grid gap-4">
          <div className="bg-[#e5f8f6] text-[#007ea7] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group h-max-full max-w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2 flex-col text-center">
              <Heart /> {t('text8')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  {t('text9')} <span className='font-bold'>{t('text10')}</span> {t('text11')}. {t('text12')} {t('text13')}.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>

          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
              <GroupIcon /> {t('text14')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  {t('text15')} <span className='font-bold'>{t('text16')}</span> {t('text17')} <span className='font-bold'>{t('text18')}</span> {t('text19')} <span className='font-bold'>{t('text20')}</span>.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
              <FriendIcon /> {t('text21')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  {t('text22')} <span className='font-bold'>{t('text23')}</span> {t('text24')} <span className='font-bold'>{t('text25')}</span> {t('text26')}. {t('text27')} <span className='font-bold'>{t('text28')}</span>.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>

          <div className="p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group bg-[#e5f8f6] text-[#007ea7]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 flex-col text-center">
              <Needle /> {t('text29')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  <span className='font-bold'>{t('text30')}</span> {t('text31')} {t('text32')} {t('text33')}.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-[#e5f8f6] text-[#007ea7] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold flex items-center gap-2 flex-col text-center">
              <Up /> {t('text34')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  {t('text35')} <span className='font-bold'>{t('text36')}</span>. {t('text37')} {t('text38')} {t('text39')}.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>

          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
              <World /> {t('text40')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  {t('text41')} <span className='font-bold'>{t('text42')}</span> {t('text43')}.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2 flex-col text-center">
              <Building /> {t('text44')}
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  {t('text45')} <span className='font-bold'>{t('text46')}</span>. {t('text47')}.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden">
              <ExpandIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
