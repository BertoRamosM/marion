import Link from "next/link";

export const Banner = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-4 px-4 sm:px-20 font-[family-name:var(--font-geist-sans)] top-0 bg-gradient-to-r from-[#ffa45b] to-[#a3e4db]">
        <Link className="text-sm sm:text-lg font-bold" href={"#contact"}>
          Inscris-toi à ton premier cours d&apos;essai à 5€ <span className="text-red-500 font-bold">ici !</span>
        </Link>
      </div>
    );
  };
  