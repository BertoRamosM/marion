import Image from 'next/image';
import ExpandIcon from '../icons/ExpandIcon';

/**
 * A feature card whose body text expands on click/tap.
 *
 * Uses the native <details>/<summary> element rather than a hover state so the
 * content is reachable on touch devices and by keyboard, while staying in the
 * HTML for search engines. The image sits outside <details> so it stays visible
 * whether the card is open or closed.
 */
const DisclosureCard = ({
  cardClassName = '',
  titleClassName = '',
  icon,
  title,
  imageSrc,
  imageAlt = '',
  children,
}) => (
  <div
    className={`relative p-8 rounded-3xl shadow-lg overflow-hidden ${cardClassName}`}
  >
    <details className="group">
      {/* after:inset-0 stretches an invisible layer over the whole card so a
          tap anywhere on it toggles, not just the title or the caret. It needs
          a z-index: the image wrapper is positioned and the body text is
          promoted by its open animation, so both would otherwise paint on top
          of the layer and swallow the click. Kept below the caret's z-10. */}
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden after:absolute after:inset-0 after:z-[5] after:content-['']">
        <h3
          className={`text-2xl font-semibold flex items-center gap-2 flex-col text-center ${titleClassName}`}
        >
          {icon}
          {title}
        </h3>

        {/* Pinned to the bottom of the card, sitting over the photo. It stays
            inside <summary> so tapping it still toggles the card. The rotation
            lives on an inner span so it does not fight the centring translate. */}
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow"
          aria-hidden="true"
        >
          {/* Rotation lives on this inner span so it does not compose with the
              centring translate on the positioned wrapper above. */}
          <span className="block text-black transition-transform duration-300 group-open:rotate-180">
            <ExpandIcon />
          </span>
        </span>
      </summary>

      {/* Fades in on open. motion-reduce opts out for anyone who has asked
          their system to minimise animation. */}
      <ul className="mt-4 space-y-3 text-gray-700 pb-4 group-open:animate-disclosure-open motion-reduce:animate-none">
        <li>{children}</li>
      </ul>
    </details>

    <div className="bg-gradient-to-r from-[#ffa45b] to-[#a3e4db] p-2 rounded-3xl shadow-lg flex items-center justify-center">
      <div className="relative w-[200px] h-[100px] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="200px"
          className="object-cover transform hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>
    </div>
  </div>
);

export default DisclosureCard;
