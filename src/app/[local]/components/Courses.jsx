import React from 'react';
import LocationIcon from '../icons/LocationIcon';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import BookIcon from '../icons/BookIcon';
import CalendarIcon from '../icons/CalendarIcon';
import { Banner } from './Banner';
import { useTranslations } from 'next-intl';
import Gallery from './Gallery';

const Courses = () => {
  const t = useTranslations("Courses");

  return (
    <div className="flex flex-col items-center justify-center py-16 px-0 sm:px-6 min-h-screen" id="courses">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">{t("text1")}</span>
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          {t('text2')}
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-[#ffa45b] flex flex-col items-center gap-2">
            <span className="text-base">{t('text3')}</span>
            <span className="flex gap-4 items-center justify-center text-[#007ea7] <span className='flex items-center justify-center gap-4 text-xl'>">
              <InfoIcon />{t('text4')}
            </span>
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>✔️{t('text5')}</li>
            <li>✔️{t('text6')}</li>
            <li>✔️{t('text7')}</li>
            <li>✔️{t('text8')}</li>
            <li>✔️{t('text9')}</li>
          </ul>
        </div>

        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>✔️{t('text10')}</li>
            <li>✔️{t('text11')}</li>
            <li>✔️{t('text12')}</li>
            <li>✔️{t('text13')}</li>
            <li>✔️{t('text14')}</li>
            <li>✔️{t('text15')}</li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#e5f8f6] p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row justify-between w-full md:col-span-2">
          <div className="pb-4 border-b-2 border-[#007ea7] flex flex-col gap-4 sm:border-none">
            <h2 className="text-lg font-semibold text-[#007ea7] flex items-center gap-2">
              <CalendarIcon /> {t('text16')}
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 text-gray-700 text-center px-8 text-xs md:text-sm gap-4 sm:gap-1">
              <div className='flex flex-col gap-1'>
                
                <h3 className="text-[#007ea7] font-bold">{t('text17')}</h3>
                <p className='border-2 sm:border-b-2 border-[#007ea7] p-1'><span className='font-bold'>{t('text188')}</span>{t('text18')}</p>
                <p className='border-2 sm:border-b-2 border-[#007ea7] p-1'><span className='font-bold'>{t('text199')}</span>{t('text19')}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <h3 className="text-[#007ea7] font-bold">{t('textWed1')}</h3>
{/*                 <p className='border-2 sm:border-b-2 border-[#007ea7] p-1'><span className='font-bold'>{t('textWed2')}</span>{t('textWed3')}</p>
 */}                <p className='border-2 sm:border-b-2 border-[#007ea7] p-1'><span className='font-bold'>{t('text200')}</span>{t('text20')}</p>

              </div>
              <div className='flex flex-col gap-1'>
                <h3 className="text-[#007ea7] font-bold">{t('text21')}</h3>
{/*                 <p className='border-2 sm:border-b-2 border-[#007ea7] border-[#007ea7] p-1 border-b-2 border-l-2 border-[#007ea7]'><span className='font-bold'>{t('text211')}</span>{t('text22')}</p>
                <p className='border-2 sm:border-b-2 border-[#007ea7] border-[#007ea7] p-1 border-b-2 border-l-2 border-[#007ea7]'><span className='font-bold'>{t('text222')}</span>{t('text23')}</p> */}
                <p className='border-2 sm:border-b-2 border-[#007ea7] border-[#007ea7] p-1 border-b-2 border-l-2 border-[#007ea7]'><span className='font-bold'>{t('text233')}</span>{t('text24')}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              <strong className="text-[#007ea7] flex items-center gap-2">
                <LocationIcon />{t('text25')}
              </strong>
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 sm:mt-0">
            <h2 className="text-lg font-semibold text-[#007ea7] text-center flex items-center gap-2 pt-4">
              <EuroIcon /> {t('text26')}
            </h2>
            <ul className="mt-4 space-y-3 text-gray-700 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <BookIcon /> <strong>{t('text27')}</strong>
              </li>
              <li className="flex items-center gap-2">
                <BookIcon /> <strong>{t('text28')}</strong>
              </li>
              {/* <li className="flex items-center gap-2">
                <BookIcon /> <strong>{t('text29')}</strong>
              </li> */}
              <li className="flex items-center gap-2 text-xs md:text-sm">
                {t('text30')}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Gallery />

      {/* Banner Section */}
      <div className="pt-8">
        <Banner />
      </div>
    </div>
  );
};

export default Courses;
