import React from 'react';
import InfoIcon from '../icons/InfoIcon';
import FlagIcon from '../icons/FlagIcon';
import EuroIcon from '../icons/EuroIcon';
import LaptopIcon from '../icons/LaptopIcon';

const OnlineCourses = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen" id='online-courses'>
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#007ea7]">Cours Individuels en Ligne:</span> Apprends à ton rythme
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          Prépare ton arrivée dans l&apos;ouest de la France avec des cours sur mesure adaptés à tes besoins.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-[#007ea7] flex items-center gap-2"><InfoIcon  /> Pourquoi nos cours en ligne ?</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              ✔️ <strong>Flexibilité totale:</strong> cours d&apos;1h30 selon ta disponibilité, du lundi au vendredi.
            </li>
            <li>
              ✔️ <strong>Progrès rapide:</strong> des cours individuels pour t&apos;aider à progresser efficacement en français avant ton arrivée.
            </li>
            <li>
              ✔️ <strong>Sur mesure:</strong> contenus adaptés à tes besoins, centres d&apos;intérêts, secteur professionnel, et axés sur ta future ville ou région (Rennes, Nantes, Bretagne, Normandie, Pays de Loire).
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2"><FlagIcon  /> Un suivi personnalisé</h2>
          <p className="mt-4 text-gray-700">
            Si tu souhaites t&apos;installer à Rennes, tu pourras rejoindre mes{' '}
            <strong>cours en petits groupes</strong> dès ton arrivée pour rencontrer de nouvelles personnes et poursuivre ton apprentissage avec une prof que tu connais déjà.
          </p>
          <p className="mt-4 text-gray-700">
            Tu ne vis pas encore en France ? Commence dès maintenant des{' '}
            <strong>cours individuels en ligne</strong> pour te préparer au mieux !
          </p>
        </div>
      </div>

      {/* Tarifs Section */}
      <div className="mt-12 bg-[#e5f8f6] p-8 rounded-3xl shadow-lg max-w-4xl">
        <h2 className="text-2xl font-semibold text-[#007ea7] text-center flex items-center gap-2"><EuroIcon  /> Tarifs</h2> 
        <ul className="mt-4 space-y-3 text-gray-700">
          <li className='flex items-center gap-2'><LaptopIcon /> <strong>Pack de 10 classes (15h):</strong> 375€</li>
          <li className='flex items-center gap-2'><LaptopIcon /> <strong>Pack de 20 classes (30h):</strong> 720€</li>
        </ul>
      </div>
    </div>
  );
};

export default OnlineCourses;
