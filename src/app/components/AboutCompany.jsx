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
                  La prof met un point d&apos;honneur à <span className='font-bold'>connaître chaque élève</span> et à leur donner une <span className='font-bold'>attention personnalisée.</span> L&apos;erreur est la bienvenue car elle donne l&apos;opportunité d&apos;apprendre. La prof te donne des <span className='font-bold'>feedbacks réguliers constructifs</span> dans une <span className='font-bold'>ambiance bienveillante.</span>
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10  text-black sm:hidden ">
            <ExpandIcon />  
            </div>
          </div>

       
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <GroupIcon />Des mini-groupes
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Les cours collectifs à Rennes se font en <span className='font-bold'>petits groupes de 3 à 8 personnes</span> maximum réparties par niveau afin de créer une <span className='font-bold'>ambiance conviviale et décomplexée</span> où chaque apprenant pourra respecter son rythme et pourra <span className='font-bold'>prendre la parole tout au long du cours.</span>
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
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
                  Plus qu&apos;une école, c&apos;est un <span className='font-bold'>lieu de rencontre entre expats,</span> une véritable <span className='font-bold'></span>communauté accueillante où on peut se faire des <span className='font-bold'>nouveaux amis facilement.</span>Les <span className='font-bold'> cours collectifs en petit comité </span>favorisent les<span className='font-bold'>activités interactives</span> et le <span className='font-bold'>travail d&apos;équipe</span> pour tisser des liens entre apprenants et <span className='font-bold'></span>s&apos;intégrer dans sa ville. Des <span className='font-bold'>sorties culturelles ou de loisirs</span> sont régulièrement organisées pour vivre le français en dehors de la classe et consolider l&apos;esprit de groupe.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
            </div>
          </div>

  
          <div className=" p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group bg-[#e5f8f6] text-[#007ea7]">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Needle />Des cours sur-mesure
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                <span className='font-bold'>Ils sont pensés exclusivement pour les expats.</span> Chaque séquence est construite en fonction des <span className='font-bold'>besoins propres aux expats en général</span> mais aussi selon les <span className='font-bold'>centres d&apos;intérêts et les objectifs de chacun.</span> Chaque mois, la prof te questionne pour savoir quel <span className='font-bold'>thème</span> tu aimerais aborder prochainement, quel <span className='font-bold'>type de situation</span> te pose problème en français dans ta vie privée ou professionnelle, quels <span className='font-bold'>points ou compétences</span> tu aimerais améliorer et quelles <span className='font-bold'>activités</span> tu aimerais privilégier.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
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
                  Les cours sont toujours dessinés en fonction de <span className='font-bold'>situations de communication de la vie réelle.</span> Le but est de pouvoir communiquer rapidement avec des natifs et sans tension. Les <span className='font-bold'>supports</span> utilisés sont <span className='font-bold'>authentiques</span> et les <span className='font-bold'>activités</span> sont <span className='font-bold'>ludiques et interactives.</span> On apprend tout en s&apos;amusant ! Les <span className='font-bold'>progrès</span> sont <span className='font-bold'>visibles rapidement</span> et les <span className='font-bold'>objectifs sont concrets.</span>
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
            </div>
          </div>

     
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <World />Une immersion socioculturelle
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Pour apprendre une langue, il faut connaître sa culture ! Les séquences ont un <span className='font-bold'>focus culturel</span> pour en savoir plus sur <span className='font-bold'>l&apos;histoire de Rennes</span> et de la <span className='font-bold'>Bretagne</span> mais aussi sur la <span className='font-bold'>culture populaire,</span> les <span className='font-bold'>traditions bretonnes,</span> la <span className='font-bold'>gastronomie</span>gastronomie et le <span className='font-bold'>style de vie rennais</span>style de vie rennais !
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
            </div>
          </div>
          </div>

      
          <div class="grid gap-4">
          <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <Building  />Le quartier atypique et central du Colombier
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
                  Les cours collectifs sont donnés à la <span className='font-bold'>Maison des Associations,</span> un bâtiment futuriste situé à deux pas des métros Charles de Gaulle (ligne A) et Combier (ligne B). Le quartier Colombier est le témoin de l&apos;urbanisme des années 70 et c&apos;est aussi le quartier le plus culturel de Rennes. La Maison des Associations propose des concerts, des conférences, et des dizaines d&apos;activités sportives et culturelles tout au long de l&apos;année. Le bâtiment des Champs Libre se trouve juste à côté et contient la plus grande bibliothèque de Rennes, le musée de Bretagne et des sciences ainsi que plusieurs espaces collectifs.
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
            </div>
            </div>
            <div className="bg-[#fff7f3] p-8 rounded-3xl shadow-lg relative overflow-hidden transition-all duration-300 ease-in-out group">
            <h2 className="text-2xl font-semibold text-[#ffa45b] flex items-center gap-2">
              <World />Des cours en ligne pour ceux qui s&apos;installent bientôt dans le Nord-Ouest 
            </h2>
            <div className="opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 max-h-0 group-hover:max-h-[1000px] transition-all duration-300 ease-in-out origin-top overflow-hidden">
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>
               <span className='font-bold'>Si tu ne vis pas encore en France</span> mais que tu aimerais t&apos;installer prochainement <span className='font-bold'>à Rennes, Nantes, en Bretagne ou en Normandie,</span> je te propose des <span className='font-bold'>cours en ligne individuels</span>cours en ligne individuels pour atteindre un premier niveau de français qui te permettra de t&apos;assurer une <span className='font-bold'>arrivée réussie et sans stress dans ta nouvelle région. </span>

Les cours te permettront de <span className='font-bold'>tout savoir sur le style de vie, la culture populaire, l&apos;histoire, les traditions et les activités de ton futur lieu de vie.</span> Je peux aussi t&apos;aider et te conseiller sur les différentes <span className='font-bold'>démarches administratives</span> à effectuer avant ton arrivée. 

<span className='font-bold'>Si tu planifies de t&apos;installer à Rennes, tu peux commencer les cours en ligne avec moi dès maintenant</span> et tu pourras rejoindre nos <span className='font-bold'>cours collectifs dès ton arrivée</span> afin de continuer à progresser avec une <span className='font-bold'>prof que tu connais déjà</span> et de <span className='font-extrabold'>rencontrer d&apos;autres expats</span> pour t&apos;intégrer rapidement ! 
                </li>
              </ul>
            </div>
            <div className="absolute right-10 bottom-3 z-10 text-black sm:hidden ">
            <ExpandIcon />  
            </div>
          </div>
            </div>
          </div>
        
      </div>
    );
  };

  export default AboutCompany;
