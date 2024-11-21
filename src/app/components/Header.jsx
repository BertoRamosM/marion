import Link from "next/link";

const Header = () => {
  return (
    
    <header className="flex items-center justify-between gap-4 py-8 px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] top-0">
      <h1 className="text-4xl font-bold">WestFrenchAcademy   </h1>
     <div className="flex gap-4 items-center">
        <Link href={""}>Accueil</Link>
        <Link href={""}>Cours</Link>
        <Link href={""}>Ateliers</Link>
        <Link href={""}>A propos</Link>
        <Link href={""}>Contact</Link>

     </div>
    </header>
  );
};
export default Header;