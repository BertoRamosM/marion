import Header from '../components/Header';
import NavPending from '../components/NavPending';
import ContactForm from '../components/ContactForm';
import SectionDivider from '../components/SectionDivider';
import { Link } from '../../../i18n/routing';

/*
 * The page chrome both offer pages share: header, breadcrumb, h1, lead, and
 * the two links out at the bottom.
 *
 * Underscore-prefixed folder, so Next.js treats it as private and does not try
 * to route it. The two bodies that fill it are siblings here rather than in
 * components/ because they are page content, not components reused anywhere
 * else.
 *
 * Every string rendered here is passed in by the route, and every one of them
 * comes from a translation key that already existed. These pages deliberately
 * introduce no new copy: the wording on this site is Marion's, and a page that
 * sells a course should not be the one place written by someone else.
 */
export default function OfferShell({
  jsonLd,
  breadcrumbHome,
  breadcrumbLabel,
  title,
  lead,
  otherOffer,
  backLabel,
  offerKey,
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* z-[70], matching every other page. This wrapper is a flex item
          with a z-index, so it forms a stacking context and caps everything
          inside it — including the full-screen mobile menu. At z-50 the sticky
          social icons (z-60) drew over the open menu. See the layer list in
          StickySocialIcons. */}
      <div className="top-0 left-0 right-0 z-[70] bg-surface shadow-md">
        <Header />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 p-8 pb-20 sm:p-20">
        {/* pt-32 clears the fixed banner + header, as on the other pages. */}
        <div className="max-w-5xl mx-auto pt-32 sm:pt-28">
          <nav className="text-sm text-ink-600 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-rust underline">
              {breadcrumbHome}
              <NavPending />
            </Link>
            <span className="mx-2">/</span>
            {/* The current page is not a link: it would be something a
                keyboard user tabs onto that goes nowhere. */}
            <span aria-current="page">{breadcrumbLabel}</span>
          </nav>

          {/*
            The only h1 on the page, and the thing the whole URL exists to say.
            Everything the body renders below is h2 or lower.
          */}
          <h1 className="text-4xl font-bold text-rust-lg">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-800">{lead}</p>

          <div className="mt-12 flex flex-col gap-8">{children}</div>

          {/*
            The same contact form the home page carries, on the page itself.

            Both pages used to send people to /#contact, which meant leaving
            the page and reloading the home one at the moment they had just
            decided — the worst possible time to ask someone to navigate. The
            form is identical here, and its submissions land in the same
            Netlify inbox, so nothing downstream changes.

            It brings its own id="contact", which is what the price card's
            button now anchors to.
          */}
          <SectionDivider />
          <ContactForm scope={breadcrumbLabel} course={offerKey} />

          {/*
            Out to the other offer, and back home.

            The cross-link is the point of having a pair: someone reading about
            the online lessons who is moving to Rennes wants the other page,
            and vice versa. It is labelled with that page's own nav label
            rather than a sentence, which keeps the wording Marion's and
            happens to make good anchor text.
          */}
          <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={otherOffer.href}
              className="rounded-lg border-2 border-ember px-6 py-3 text-center font-semibold text-rust transition duration-300 hover:bg-ember hover:text-on-ember"
            >
              {otherOffer.label}
              <NavPending />
            </Link>
            <Link
              href="/"
              className="rounded-lg border-2 border-ember px-6 py-3 text-center font-semibold text-rust transition duration-300 hover:bg-ember hover:text-on-ember"
            >
              ← {backLabel}
              <NavPending />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
