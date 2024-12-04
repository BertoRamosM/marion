import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "WestFrench Academy",
  description: "WestFrench Academy propose des cours de français interactifs à Rennes, adaptés aux expatriés. Participez à des groupes réduits ou à des cours particuliers en ligne, pour apprendre le français de manière ludique et immersive. Découvrez la culture française grâce à un enseignement personnalisé, dirigé par un professeur expérimenté et passionné. Que vous soyez à Rennes, Nantes, ou que vous prévoyiez de vous installer en France, WestFrench vous aide à maîtriser le français dans un cadre convivial et stimulant. Commencez avec un cours d'essai à 5€ !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-100 to-gray-200 `}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
