import React from 'react';
import LocationIcon from '../icons/LocationIcon';
import InfoIcon from '../icons/InfoIcon';
import EuroIcon from '../icons/EuroIcon';
import DotIcon from '../icons/DotIcon';
import BookIcon from '../icons/BookIcon';

const Courses = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen" id="courses">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">Cours à Rennes</span>: Rejoins notre communauté d&apos;expats rennaise
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          Apprends le français dans une ambiance conviviale et chaleureuse !
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2"><InfoIcon  /> Pourquoi Choisir Nos Cours ?</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              ✔️ <strong className="text-[#ffa45b]">Petits groupes:</strong> de 3 à 8 personnes pour une attention
              personnalisée.
            </li>
            <li>
              ✔️ <strong className="text-[#ffa45b]">Cours interactifs:</strong> adaptés aux intérêts et besoins de
              chaque participant.
            </li>
            <li>
              ✔️ <strong className="text-[#ffa45b]">Ambiance conviviale:</strong> un espace de rencontre et d’échange
              pour les expats.
            </li>
            <li>✔️ Une enseignante locale, ancienne expat’, bienveillante et attentive.</li>
          </ul>
        </div>
      
        {/* Right Section */}
        <div className="bg-[#e5f8f6] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-[#007ea7] flex items-center gap-2"><LocationIcon  /> Horaires et Lieu</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <strong className="text-[#007ea7]">Cours A1/A2:</strong> Les mardis et jeudis de 14h00 à 15h30.
            </li>
            <li>
              <strong className="text-[#007ea7]">Cours B1/B2:</strong> Les mardis et jeudis de 16h00 à 17h30.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            <strong className="text-[#007ea7]">Lieu:</strong> La Maison des associations, 6 cours des Alliés à Rennes.
          </p>
        </div>
      </div>

      {/* Tarifs Section */}
      <div className="mt-12 bg-white p-8 rounded-3xl shadow-lg max-w-4xl">
        <h2 className="text-2xl font-semibold text-[#ffa45b] text-center flex items-center gap-2"><EuroIcon  /> Tarifs</h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li className='flex items-center gap-2'>
            <BookIcon /> <strong>3 mois (12 classes d&apos;1h30):</strong> 360€ (22€/h).
          </li>
          <li className='flex items-center gap-2'>
            <BookIcon  /><strong>6 mois (24 classes d&apos;1h30):</strong> 648€ (20€/h).
          </li>
          <li className='flex items-center gap-2'>
            <BookIcon  /><strong>9 mois (36 classes d&apos;1h30):</strong> 972€ (18€/h).
          </li>
          <li className='flex items-center gap-2'>
            <BookIcon  /> <strong>1er cours d&apos;essai:</strong> 5€{' '}
            <a href="#" className="text-[#007ea7] underline hover:text-[#005f80]">
              ici
            </a>.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Courses;
