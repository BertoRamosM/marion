  import Link from "next/link";
  import { UkFlag } from "../icons/UkFlag";
  import { SpanishFlag } from "../icons/SpanishFlag";
  import { FrenchFlag } from "../icons/FrenchFlag";

  const Header = () => {
    return (
      <header className="flex items-center justify-between gap-4 py-8 px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] top-0 bg-[#a3e4db]">
        <h1 className="text-4xl font-bold flex flex-col items-center text-center">
          <span>WestFrench</span>
          <span
            className="text-xl text-[#2c7a7b]"  
            style={{ fontSize: "2rem" }}
          >
            Academy
          </span>
        </h1>
        <div className="flex gap-8 items-center font-bold">
  {/*         <Link href={"/#"} className="hover:text-[#ffa45b] transition duration-300">Accueil</Link>
  */}        <Link href={"#courses"} className="hover:text-[#ffa45b] transition duration-300">Cours</Link>
          <Link href={"#online-courses"} className="hover:text-[#ffa45b] transition duration-300">Cours en ligne</Link>
  {/*         <Link href={""} className="hover:text-[#ffa45b] transition duration-300">Ateliers</Link>
  */}        <Link href={"#about"} className="hover:text-[#ffa45b] transition duration-300">A propos</Link>
          <Link href={"#contact"} className="hover:text-[#ffa45b] transition duration-300">Contact</Link>
        </div>
        <div className="flex gap-4 items-center">
        <SpanishFlag />
          <UkFlag />
          <FrenchFlag />
        </div>
      </header>
    );
  };

  export default Header;
