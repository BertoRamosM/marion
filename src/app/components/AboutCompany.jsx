  import React from 'react';
  import Needle from '../icons/Needle';
  import About from './About';
  import Heart from '../icons/Heart';
  import GroupIcon from '../icons/GroupIcon';
  import FriendIcon from '../icons/FriendIcon';
  import Up from '../icons/Up';
  import Building from '../icons/Building';
  import World from '../icons/World';

  const AboutCompany = () => {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 min-h-screen" id="about">
        {/* Title Section */}
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            <span className="text-[#ffa45b]">WestFrench avec Marion : </span>Apprends le français rapidement en mini-groupe et avec une prof locale.
          </h1>
          <p className="text-lg text-gray-800 mt-4">
            Choisis le contenu de tes cours et rencontre d&apos;autres expats !
          </p>
        </div>
        <About />

        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            <span className="text-[#2c7a7b]">WestFrench, </span>c&apos;est la seule école de français à Rennes destinée exclusivement aux expats.
          </h1>
          <p className="text-lg text-gray-800 mt-4">
            Je te propose un <span className="font-bold text-[#ffa45b]">lieu authentique et familial</span> pour apprendre le français. <br />
            <span className="text-gray-500 text-sm">Une structure différente des grandes écoles aux classes surchargées et aux cours impersonnels et standardisés où les profs ne sont jamais les mêmes et ne connaissent pas leurs apprenants. </span>
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         

        <div class="grid gap-4">
          <div className="  bg-[#e5f8f6] text-[#007ea7] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group h-max-full max-w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Heart   />Une prof proche de ses apprenants
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  La prof met un point d&apos;honneur à connaître chaque élève et à leur donner une attention personnalisée. L&apos;erreur est la bienvenue car elle donne l&apos;opportunité d&apos;apprendre. La prof te donne des feedbacks réguliers constructifs dans une ambiance bienveillante.
                </li>
              </ul>
            </div>
          </div>

       
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <GroupIcon />Des mini-groupes
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Les cours collectifs à Rennes se font en petits groupes de 3 à 8 personnes maximum réparties par niveau afin de créer une ambiance conviviale et décomplexée où chaque apprenant pourra respecter son rythme et pourra prendre la parole tout au long du cours.
                </li>
              </ul>
            </div>
          </div>
          </div>


          <div class="grid gap-4">
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <FriendIcon />Une communauté d&apos;expats
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Plus qu&apos;une école, c&apos;est un lieu de rencontre entre expats, une véritable communauté accueillante où on peut se faire des nouveaux amis facilement. Les cours collectifs en petit comité favorisent les activités interactives et le travail d&apos;équipe pour tisser des liens entre apprenants et s&apos;intégrer dans sa ville. Des sorties culturelles ou de loisirs sont régulièrement organisées pour vivre le français en dehors de la classe et consolider l&apos;esprit de groupe.
                </li>
              </ul>
            </div>
          </div>

  
          <div className=" p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group bg-[#e5f8f6] text-[#007ea7]">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Needle />Des cours sur-mesure
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Ils sont pensés exclusivement pour les expats. Chaque séquence est construite en fonction des besoins propres aux expats en général mais aussi selon les centres d&apos;intérêts et les objectifs de chacun. Chaque mois, la prof te questionne pour savoir quel thème tu aimerais aborder prochainement, quel type de situation te pose problème en français dans ta vie privée ou professionnelle, quels points ou compétences tu aimerais améliorer et quelles activités tu aimerais privilégier.
                </li>
              </ul>
            </div>
          </div>
      </div>


      <div class="grid gap-4">
      
          <div className="bg-[#e5f8f6] text-[#007ea7] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold   flex items-center gap-2">
              <Up />Une progression rapide tout en s&apos;amusant
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Les cours sont toujours dessinés en fonction de situations de communication de la vie réelle. Le but est de pouvoir communiquer rapidement avec des natifs et sans tension. Les supports utilisés sont authentiques et les activités sont ludiques et interactives. On apprend tout en s&apos;amusant ! Les progrès sont visibles rapidement et les objectifs sont concrets.
                </li>
              </ul>
            </div>
          </div>

     
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <World />Une immersion socioculturelle
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Pour apprendre une langue, il faut connaître sa culture ! Les séquences ont un focus culturel pour en savoir plus sur l&apos;histoire de Rennes et de la Bretagne mais aussi sur la culture populaire, les traditions bretonnes, la gastronomie et le style de vie rennais !
                </li>
              </ul>
            </div>
          </div>
          </div>

      

          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <Building  />Le quartier atypique et central du Colombier
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Les cours collectifs sont donnés à la Maison des Associations, un bâtiment futuriste situé à deux pas des métros Charles de Gaulle (ligne A) et Combier (ligne B). Le quartier Colombier est le témoin de l&apos;urbanisme des années 70 et c&apos;est aussi le quartier le plus culturel de Rennes. La Maison des Associations propose des concerts, des conférences, et des dizaines d&apos;activités sportives et culturelles tout au long de l&apos;année. Le bâtiment des Champs Libre se trouve juste à côté et contient la plus grande bibliothèque de Rennes, le musée de Bretagne et des sciences ainsi que plusieurs espaces collectifs.
                </li>
              </ul>
            </div>
            </div>
          </div>
        
      </div>
    );
  };

  export default AboutCompany;
