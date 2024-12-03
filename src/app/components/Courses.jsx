import React from 'react';

const Courses = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen pt-32">
      {/* Title Section */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          <span className="text-[#ffa45b]">Cours a Rennes</span>: Rejoins notre communauté d’expats rennaise
        </h1>
        <p className="text-lg text-gray-800 mt-4">
          Apprends le français dans une ambiance conviviale et chaleureuse !
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl flex flex-col gap-8">
        {/* First Section */}
        <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#ffa45b]">Pourquoi Choisir Nos Cours ?</h2>
          <div className="mt-6">
            <p className="text-gray-700 mb-4">
              Découvrez des cours spécialement conçus pour les expats rennais :
            </p>
            <ul className="space-y-3 text-gray-700 list-disc pl-6">
              <li>
                <strong className="text-[#ffa45b]">Petits groupes:</strong> de 3 à 8 personnes pour une attention
                personnalisée.
              </li>
              <li>
                <strong className="text-[#ffa45b]">Cours interactifs:</strong> adaptés aux intérêts et besoins de chaque
                participant.
              </li>
              <li>
                <strong className="text-[#ffa45b]">Ambiance conviviale:</strong> un espace de rencontre et d’échange
                pour les expats.
              </li>
              <li>
                Une enseignante locale, ancienne expat’, bienveillante et attentive.
              </li>
            </ul>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Card */}
          <div className="bg-[#e5f8f6] flex-1 p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#007ea7]">Horaires</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <strong className="text-[#007ea7]">Cours A1/A2:</strong> Les mardis et jeudis de 14h00 à 15h30.
              </li>
              <li>
                <strong className="text-[#007ea7]">Cours B1/B2:</strong> Les mardis et jeudis de 16h00 à 17h30.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold text-[#007ea7] mt-8">Lieu</h2>
            <p className="mt-4 text-gray-700">
              La Maison des associations, 6 cours des Alliés à Rennes.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-white flex-1 p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#ffa45b]">Tarifs</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>
                <strong className="text-[#ffa45b]">3 mois (12 classes d’1h30):</strong> 360€ (22€/h).
              </li>
              <li>
                <strong className="text-[#ffa45b]">6 mois (24 classes d’1h30):</strong> 648€ (20€/h).
              </li>
              <li>
                <strong className="text-[#ffa45b]">9 mois (36 classes d’1h30):</strong> 972€ (18€/h).
              </li>
              <li>
                <strong className="text-[#ffa45b]">1er cours d’essai:</strong> 5€{' '}
                <a href="#" className="text-[#007ea7] underline hover:text-[#005f80]">
                  ici
                </a>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
