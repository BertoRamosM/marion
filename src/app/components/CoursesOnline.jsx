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
          <span className="text-[#007ea7]">Cours Individuels en ligne:</span> prépare ton arrivée dans le nord-ouest de la France
        </h1>
        <p className="text-lg text-gray-800 mt-4">
        S’installer dans une ville française où on ne connaît personne et sans pouvoir communiquer dans des situations basiques peut être une grande source de stress. 
        </p>
        <p className="text-lg text-gray-800 mt-4">
        Commence ton <span className="font-bold text-[#ffa45b]">apprentissage du français dès maintenant à distance</span> avec Marion grâce à des cours sur-mesure adaptés à tes besoins et à ta nouvelle région.  <br />
          
          </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl font-semibold text-[#007ea7] flex items-center gap-2 flex-col"><span className='text-base'>Fini les applications inutiles et décontextualisées d’apprentissage de vocabulaire. A WestFrench, tu trouveras.</span><span className='flex items-center justify-center gap-4'><InfoIcon  />A WestFrench, tu trouveras : </span></h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              ✔️ Un programme de français efficace et sur-mesure pour apprendre, en seulement quelques heures, à te débrouiller dans les situations de communication les plus basiques selon tes besoins (ex : se présenter, faire connaissance avec ses voisins, effectuer des formalités administratives, faire des courses, commander au restaurant, prendre un rendez-vous ou réaliser une inscription par téléphone, répondre à une annonce de logement, candidater à une offre de travail). 
            </li>
            <li>
              ✔️ Marion, une prof locale, chaleureuse et bienveillante qui connaît ta langue
            </li>
           
          </ul>
        </div>

        {/* Right Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg flex flex-col justify-center ">
         
          <p className="mt-4 text-gray-700">
          ✔️ Des cours à focus culturel pour tout savoir de ta future ville et/ou région (ex : Si tu souhaites t’installer prochainement à Nantes, tu découvriras son histoire mais aussi la gastronomie nantaise, les lieux culturels, le style de vie ainsi que les plus beaux villages et vignes des alentours).
          </p>
          <p className="mt-4 text-gray-700">
          ✔️ Si tu prévois de t’installer à Rennes, tu peux commencer les cours en ligne avec moi dès maintenant et tu pourras rejoindre nos cours collectifs en présentiel dès ton arrivée afin de continuer à progresser avec une prof que tu connais déjà et de rencontrer d’autres expats pour t’intégrer rapidement ! 
          </p>
        </div>
      </div>

      {/* Tarifs Section */}
      <div className="mt-12 bg-[#e5f8f6] p-8 rounded-3xl shadow-lg max-w-4xl">
      <h2 className="text-lg font-semibold text-[#007ea7] text-center flex items-center gap-2"><EuroIcon  /> <span>Tarifs pour des sessions d' 1h30.</span> </h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li className='flex items-center gap-2'><LaptopIcon /> <strong>10 sessions - 15h:</strong> 450€*</li>
          <li className='flex items-center gap-2'><LaptopIcon /> <strong>20 sessions - 30h:</strong> 840€*</li>
          <li className='flex items-center gap-2 text-xs md:text-sm'>
              *3 mois 24€/h, 6 mois 22€/h, 9 mois 20€/h
              </li>
        </ul>
      </div>
    </div>
  );
};

export default OnlineCourses;
