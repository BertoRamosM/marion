import React from 'react';
import WhatsappIcon from '../icons/WhatsappIcon';
import FacebookIcon from '../icons/FacebookIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import InstagramIcon from '../icons/Instagram';
import EmailIcon from '../icons/EmailIcon';


/*
 * Layer order on this site, lowest first. These all compare in the root
 * stacking context:
 *
 *   -10  ambient background blobs
 *    30  carousel arrows and dots
 *    60  these icons
 *    70  the header group (page.js), and so the mobile menu nested in it
 *   100  the gallery lightbox
 *
 * These icons sat at z-auto, so the carousel arrows drew over them.
 *
 * The two full-screen overlays are above them on purpose: an overlay that
 * something floats over is not an overlay. Note that the mobile menu gets
 * there by way of its ancestor in page.js, not its own z-index. That ancestor
 * is a flex item with a z-index, so it forms a stacking context and caps
 * everything inside it: raising the menu's own z-index does nothing, raising
 * the ancestor's is what works.
 *
 * Icon sizing lives on the container rather than on each of the six links:
 * the icon components ship at 24px with no size class, so one rule scales all
 * of them. 24px on phones, 32px from lg up.
 *
 * On phones the column sits hard against the right edge (right-0, and the
 * inner padding drops from 12px to 6px), which claws back 22px of the narrow
 * viewport. From sm up it returns to the original inset.
 */
const StickySocialIcons = () => {
  return (
    <div className="fixed top-1/2 right-0 sm:right-4 z-[60] transform -translate-y-1/2 flex flex-col gap-4 lg:gap-5 bg-transparent p-1.5 sm:p-3 rounded-lg shadow-lg [&_svg]:h-6 [&_svg]:w-6 lg:[&_svg]:h-8 lg:[&_svg]:w-8">
      <a
      aria-label='Whatsapp'
        href="https://wa.me/33784582309?text=Hello%20I%20would%20like%20to%20know%20more%20about%20your%20online%20courses"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-ember transition duration-300"
      >
        <WhatsappIcon />
      </a>
      <a
      aria-label='Facebook'
        href="https://www.facebook.com/share/18s3C5AGKS/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-ember transition duration-300"
      >
        <FacebookIcon />
      </a>
      {/*   <a
      aria-label='Youtube'
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-ember transition duration-300"
      >
        <YoutubeIcon />
      </a> */}
      <a
      aria-label='Instagram'
        href="https://www.instagram.com/westfrench_academy/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-ember transition duration-300"
      >
        <InstagramIcon />
      </a>
      <a
      aria-label='LinkedIn'
        href="https://www.linkedin.com/in/marionrichardfrenchteacher/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-ember transition duration-300"
      >
        <LinkedinIcon />
      </a>
      <a
      aria-label='Email'
        href="mailto:marion.westfrench@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:text-ember transition duration-300"
      >
        <EmailIcon />
      </a>
    </div>
  );
};

export default StickySocialIcons;
