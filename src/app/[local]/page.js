import Image from "next/image";
import Header from "./components/Header";
import { Banner } from "./components/Banner";
import Carousel from "./components/Carousel";
import About from "./components/About";
import AboutCompany from "./components/AboutCompany";
import Courses from "./components/Courses";
import CoursesOnline from "./components/CoursesOnline";
import ContactForm from "./components/ContactForm";
import InstagramGallery from "./components/InstagramGallery";
import Reviews from "./components/Reviews";




export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header and Banner */}
      <div className="top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-[calc(2*var(--banner-height))] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] items-center">
        {/* Content goes here */}
        <Carousel />
        <AboutCompany />
        <Courses />
        <CoursesOnline />
        <Reviews />
        <ContactForm />
        <div className="w-2/3 mx-auto py-12 sm:pt-18 sm:pb-12">
          <InstagramGallery />
        </div>
      </main>




    </div>
  );
}
