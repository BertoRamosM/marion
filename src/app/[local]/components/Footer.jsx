import React from 'react';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import Instagram from '../icons/Instagram';
import YoutubeIcon from '../icons/YoutubeIcon';
import WhatsappIcon from '../icons/WhatsappIcon';
import EmailIcon from '../icons/EmailIcon';
import Heart from '../icons/Heart';
import LocationIcon from '../icons/LocationIcon';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';

// Social links lift slightly on hover — same playful feel as the buttons
// elsewhere on the page.
const socialLink =
  'text-[#006a8f] hover:text-[#c2410c] hover:-translate-y-1 transition duration-300';

const Footer = () => {
  const tBlog = useTranslations('Blog');
  const tLegal = useTranslations('Legal');

  return (
    <footer className="relative overflow-hidden bg-[#f9f9f9]">
      {/* Brand gradient hairline, echoing the banner at the top of the page */}
      <div className="h-2 w-full bg-gradient-to-r from-[#ffa45b] via-[#a3e4db] to-[#ffa45b]" />

      {/* Blurred blobs — same decorative motif as the About card, but with
          more saturated tones and higher opacity so the colour actually reads.
          Kept in the corners with negative offsets so they tint the edges
          rather than washing out the text in the middle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#3fd0bd] opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-[#ff7c3d] opacity-60 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3 items-start">
        {/* Brand + address */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/logos/logo-no-bg.png"
            alt="WestFrench logo"
            width={326}
            height={213}
            className="w-40 h-auto"
          />
          <p className="text-gray-700 mt-4 text-sm leading-relaxed">
            Cours en mini-groupe à Rennes :
            <br />
            La Maison des associations, 6 cours des Alliés à Rennes
          </p>
          <p className="text-gray-500 mt-4 text-xs leading-relaxed">
            Portée par la coopérative d’activités Elan Créateur, 7 rue Armand
            Herpin Lacroix – CS 73902, 35039 RENNES CEDEX
          </p>
        </div>

        {/* Contact card */}
        <div className="rounded-3xl bg-[#e5f8f6] p-6 shadow-lg text-center">
          <h3 className="text-lg font-semibold text-[#006a8f] flex items-center justify-center gap-2">
            <LocationIcon />
            Rennes, Bretagne
          </h3>
          <p className="text-gray-700 mt-4 text-sm">
            <strong>Téléphone:</strong> 07 84 58 23 09
          </p>
          <p className="text-gray-700 mt-1 text-sm">
            <strong>Email:</strong>{' '}
            <a
              aria-label="Email"
              href="mailto:marion.westfrench@gmail.com"
              className="text-[#006a8f] hover:text-[#c2410c] underline transition duration-300 break-all"
            >
              marion.westfrench@gmail.com
            </a>
          </p>

          {/*   <Link
            href="/blog"
            prefetch={false}
            className="text-[#006a8f] hover:text-[#ffa45b] underline font-semibold transition duration-300"
          >
            {tBlog('nav')}
          </Link> */}
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-5 items-center rounded-full bg-[#fff7f3] px-6 py-4 shadow-lg">
            <a
              aria-label="Whatsapp"
              href="https://wa.me/33784582309?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20online%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
            >
              <WhatsappIcon />
            </a>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/share/18s3C5AGKS/"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
            >
              <FacebookIcon />
            </a>
            {/* <a
            aria-label='Youtube'
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
            >
              <YoutubeIcon />
            </a> */}
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/westfrench_academy/"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
            >
              <Instagram />
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/marionrichardfrenchteacher/"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
            >
              <LinkedinIcon />
            </a>
            <a
              aria-label="Email"
              href="mailto:marion.westfrench@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={socialLink}
            >
              <EmailIcon />
            </a>
          </div>

          <p className="text-sm text-gray-600 text-center md:text-right">
            À bientôt&nbsp;! <span aria-hidden="true">👋</span>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>
              © {new Date().getFullYear()} WestFrench Academy — Tous droits
              réservés.
            </span>
            <span aria-hidden="true">·</span>
            <Link
              href="/mentions-legales"
              className="text-[#006a8f] hover:text-[#c2410c] underline transition duration-300"
            >
              {tLegal('nav')}
            </Link>
          </p>
          <p className="flex items-center gap-2">
            Fait avec
            <span className="text-[#c2410c] animate-pulse motion-reduce:animate-none">
              <Heart />
            </span>
            à Rennes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
