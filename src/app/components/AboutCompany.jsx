import React from 'react';

const AboutCompany = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">WestFrench</span>: Un Concept Unique pour Apprendre le Français en s'Amusant
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          Apprenez le français avec plaisir, dans une atmosphère unique et enrichissante !
        </p>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Left Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#ffa45b]">
            Des cours sur-mesure et interactifs
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <strong className="text-[#ffa45b]">Mini-groupes (3 à 8 personnes):</strong> attention individualisée, progression rapide, ambiance bienveillante et solidaire.
            </li>
            <li>
              <strong className="text-[#ffa45b]">Approche personnalisée:</strong> thèmes adaptés aux besoins et intérêts des apprenants, avec enquêtes régulières.
            </li>
            <li>
              <strong className="text-[#ffa45b]">Focus culturel:</strong> immersion dans la culture, le style de vie, et l’histoire locale (Rennes et le nord-ouest de la France).
            </li>
            <li>
              Originaire de Granville et ancienne guide conférencière, la prof partage sa passion pour les cultures bretonne et normande.
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="bg-[#d3eef0] p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#007ea7]">
            Une expérience ludique et sociale
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <strong className="text-[#007ea7]">Apprendre en s’amusant:</strong> cours interactifs, sorties culturelles, et exercices pratiques basés sur des situations réelles.
            </li>
            <li>
              <strong className="text-[#007ea7]">Lieu de rencontre pour expats:</strong> intégration, création de liens, et activités de groupe favorisant les interactions.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#007ea7] mt-8">
            Une enseignante proche des apprenants
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>
              <strong className="text-[#007ea7]">Prof locale et internationale:</strong> ancienne expat’, quadrilingue (anglais, espagnol, catalan), ouverte et attentive aux besoins des élèves.
            </li>
            <li>
              Sa riche expérience à l’étranger et son esprit fédérateur créent une ambiance conviviale et chaleureuse.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
