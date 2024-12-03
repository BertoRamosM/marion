import Image from "next/image";
import Header from "./components/Header";
import { Banner } from "./components/Banner";
import Carousel from "./components/Carousel";
import About from "./components/About";
import AboutCompany from "./components/AboutCompany";
import Courses from "./components/Courses";
import CoursesOnline from "./components/CoursesOnline";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header and Banner */}
      <div className="top-0 left-0 right-0 z-50 bg-white shadow-md">
      <Banner />
        <Header />
        
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-[calc(2*var(--banner-height))] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          {/* Content goes here */}
          <Carousel />
          <AboutCompany />
          <About />
          <Courses />
          <CoursesOnline />
      </main>




    </div>
  );
}
