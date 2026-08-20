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
  <div className={`p-8 rounded-3xl shadow-lg overflow-hidden ${cardClassName}`}>
    <details className="group">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <h3
          className={`text-2xl font-semibold flex items-center gap-2 flex-col text-center ${titleClassName}`}
        >
          {icon}
          {title}
        </h3>
        <span
          className="mt-2 flex justify-center text-black transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        >
          <ExpandIcon />
        </span>
      </summary>

      <ul className="mt-4 space-y-3 text-gray-700 pb-4">
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
