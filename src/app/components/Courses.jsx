import React from 'react';
import LocationIcon from '../icons/LocationIcon';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import DotIcon from '../icons/DotIcon';
import BookIcon from '../icons/BookIcon';
import CalendarIcon from '../icons/CalendarIcon';
import { Banner } from './Banner';

const Courses = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen" id="courses">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">Cours en mini-groupe à Rennes:</span> rejoins notre communauté d&apos;expats
        </h1>
        <p className="text-lg text-gray-800 mt-4">
        S&apos;intégrer dans un nouveau pays peut-être un véritable challenge quand on ne maîtrise pas la langue. Apprends le français rapidement avec une prof qui te ressemble et fais-toi de nouveaux amis ! 
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex flex-col items-center gap-2"> <span className='text-base'>Fini les classes surchargées aux cours impersonnels et standardisés !</span> <span className='flex gap-4 items-center justify-center text-[#007ea7]'><InfoIcon  />à WestFrench, je te promets :</span></h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              ✔️ Des mini-groupes de 3 à 8 personnes.
            </li>
            <li>
              ✔️ Une attention personnalisée et un temps de parole équilibré.
            </li>
            <li>
              ✔️ Des cours sur-mesure selon tes centres d&apos;intérêts et tes objectifs.
            </li>
            <li>✔️ Un lieu de rencontre entre expats.</li>
            <li>✔️ Une ambiance décomplexée et conviviale.</li>
          </ul>
        </div>

        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>✔️ Des situations de communication de la vie réelle.</li>
            <li>
              ✔️ Une prof locale diplômée et bienveillante
            </li>
            <li>
              ✔️ Des activités ludiques et interactives à partir de supports authentiques
            </li>
            <li>
              ✔️ Une progression rapide et visible 
            </li>
            <li>✔️ Une immersion culturelle dans l&apos;histoire, le style de vie et les traditions bretons et rennais.</li>
            <li>✔️ Des sorties culturelles ou de loisirs organisées régulièrement en dehors de la classe.</li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#e5f8f6] p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row justify-between w-full md:col-span-2">
          <div className='pb-4 border-b-2 border-[#007ea7] flex flex-col gap-4 sm:border-none'>
            <h2 className="text-lg font-semibold text-[#007ea7] flex items-center gap-2"><CalendarIcon  /> Cours de 3 à 8 personnes,
            selon niveaux (A1, A2, B1, B2)</h2>
            <div className="mt-4 grid grid-cols-2 text-gray-700 text-center px-8 text-xs sm:text-sm md:text-base">
            <div>
              <h3 className="text-[#007ea7] font-bold className='border-b-2 border-[#007ea7]'">Les Mardis</h3>
              <p className='border-b-2 border-[#007ea7]'>14h30 - 16h00</p>
              <p className='border-b-2 border-[#007ea7]'>16h15 - 17h45</p>
              <p className='border-b-2 border-[#007ea7]'>18h00 - 19h30</p>
            </div>
            <div>
              <h3 className="text-[#007ea7] font-bold className='border-b-2 border-[#007ea7]'">Les Jeudis</h3>
              <p className='border-b-2 border-[#007ea7]'>14h30 - 16h00</p>
              <p className='border-b-2 border-[#007ea7]'>16h30 - 18h00</p>
              <p className='border-b-2 border-[#007ea7]'>18h30 - 20h00</p>
            </div>
          </div>
            <p className="mt-4 text-gray-700">
              <strong className="text-[#007ea7] flex items-center gap-2"><LocationIcon/>La Maison des associations, 6 cours des Alliés à Rennes.</strong> 
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#007ea7] text-center flex items-center gap-2 pt-4"><EuroIcon  /> <span>Tarifs pour des sessions d&apos; 1h30.</span> </h2>
            <ul className="mt-4 space-y-3 text-gray-700 text-sm md:text-base">
              <li className='flex items-center gap-2'>
                <BookIcon /> <strong>3 mois - 12 sessions:</strong> 430€*   
              </li>
              <li className='flex items-center gap-2'>
                <BookIcon  /><strong>6 mois - 24 sessions:</strong> 790€*
              </li>
              <li className='flex items-center gap-2'>
                <BookIcon  /><strong>9 mois - 36 sessions:</strong> 972€*
              </li>

              <li className='flex items-center gap-2 text-xs md:text-sm'>
              *3 mois 24€/h, 6 mois 22€/h, 9 mois 20€/h
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      <div className='pt-8'>  <Banner /></div>
    
    </div>
  );
};

export default Courses;
