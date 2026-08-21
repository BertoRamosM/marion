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
import Gallery from "./components/Gallery";
import Intro from "./components/Intro";
import SectionDivider from "./components/SectionDivider";
import { setRequestLocale } from "next-intl/server";




export default async function Home({ params }) {
  const { local } = await params;

  // Enables static rendering — see the note in layout.js. The section
  // components below call useTranslations as server components, so the
  // locale has to be in place before they render.
  setRequestLocale(local);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header and Banner */}
      <div className="top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 gap-16 sm:p-20 items-center">
        {/*
          Order is deliberate, for someone arriving from a search like
          "french classes in rennes":

            1. Hero — what this is.
            2. The offer, in-person then online. Previously the "why us"
               section and Marion's bio came first, which meant 2000px of
               persuasion before any schedule or price.
            3. Gallery — a visual breather, moved out of the Courses section
               where it interrupted the pricing → call-to-action flow.
            4. Why us + Marion — the differentiator, once they know what is
               on offer.
            5. Reviews, then the form. Social proof immediately before the
               ask; it used to sit after it, where most visitors never
               reached it. Safe now that the reviews carousel no longer
               auto-advances, so it cannot shove the form around.
            6. Instagram last.
        */}
        {/*
          Sections are separated by an ornament between them rather than by
          recolouring them, so the page gradient and its ambient blobs stay
          continuous across the whole site.
        */}
        <Carousel />
        <Intro />

        <SectionDivider />

        {/* Marion's bio before any pricing: people commit months and several
            hundred euros to one specific teacher, so "who is teaching me"
            comes before "how much". The longer "why us" card block still sits
            after the offer, so this stays a short lead-in rather than the
            2000px of persuasion it used to be. */}
        <About />

        <SectionDivider />

        <Courses />

        <SectionDivider />

        <CoursesOnline />

        <SectionDivider />

        <div className="w-full py-8">
          <Gallery />
        </div>

        <SectionDivider />

        <AboutCompany />

        <SectionDivider />

        <Reviews />

        <SectionDivider />

        <ContactForm />

        <SectionDivider />

        {/* Full width on phones: w-2/3 alone left the Instagram grid at
            roughly 200px, which made the thumbnails tiny. */}
        <div className="w-full md:w-2/3 mx-auto py-12 sm:pt-18 sm:pb-12">
          <InstagramGallery />
        </div>
      </main>




    </div>
  );
}
