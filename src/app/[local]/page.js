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
      {/* Fixed Header and Banner

          z-[70] rather than z-50, and the number matters more than it looks.
          This div is a flex item with a z-index, so it forms a stacking
          context: everything inside it, including the full-screen mobile menu,
          is confined to this one value no matter how high its own z-index
          goes. At 50 the sticky social icons (60, a direct child of body) drew
          on top of the open menu. 70 puts the whole header group above them,
          which is what lets the menu cover them. The header bar itself never
          overlaps the icons, so nothing is hidden by this.

          Layer order is documented in StickySocialIcons. */}
      <div className="top-0 left-0 right-0 z-[70] bg-surface shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      {/*
        px-4 on phones, not px-8.

        At px-8 this took 32px off each side, so on a 375px screen the content
        ran at 311px — 17% of the display spent on empty margin. Every section
        inherits it, which is why the ones that set their own px-0
        (AboutCompany, ContactForm) looked no wider: the gutter was never
        theirs to give back.

        16px is the usual phone gutter and leaves those cards at 343px.
        Horizontal padding steps up rather than jumping
        straight to 80px: sm:p-20 gave every screen from 640px the same 80px
        gutter, 25% of a 640px tablet. sm:px-8 / lg:px-20 keeps 80px where
        there is room for it. Vertical spacing is unchanged.
      */}
      <main id="main-content" tabIndex={-1} className="flex-1 px-4 pt-4 pb-12 gap-16 sm:px-8 sm:py-20 lg:px-20 items-center">
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
