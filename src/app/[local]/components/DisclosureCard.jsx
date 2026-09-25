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
    className={`group/card relative rounded-3xl shadow-lg overflow-hidden ${cardClassName}`}
  >
    {/*
      The photo, full-bleed across the top of the card.

      It used to be a fixed 200x100 box sitting inside a thick orange-to-mint
      gradient frame, centred in the card's padding. Two measured problems:

        - 200px of photo inside a 280px card left dead space either side, and
          the gradient border pulled the eye to the frame rather than to the
          picture inside it — eight times down the page.
        - 2:1 is a brutal crop. object-cover keeps the middle band, so the
          1600x1472 classroom photo showed only rows 336-1136 and cut the
          heads off both people in it.

      16:9 with the crop biased upwards keeps faces. The same photo now shows
      rows 143-1043. 25% rather than centre because in every one of these
      photos the people are in the upper half and the floor is in the lower.
    */}
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 1280px) 300px, (min-width: 1024px) 320px, (min-width: 768px) 360px, 100vw"
        className="object-cover object-[center_25%] transition-transform duration-300 ease-out group-hover/card:scale-105"
      />
    </div>

    <details className="group p-6">
      {/* after:inset-0 stretches an invisible layer over the whole card so a
          tap anywhere on it toggles, not just the title or the caret. It needs
          a z-index: the image wrapper is positioned and the body text is
          promoted by its open animation, so both would otherwise paint on top
          of the layer and swallow the click. */}
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden after:absolute after:inset-0 after:z-[5] after:content-['']">
        <h3
          className={`text-2xl font-semibold flex items-center gap-2 flex-col text-center ${titleClassName}`}
        >
          {icon}
          {title}
        </h3>

        {/* Directly under the title, in the flow.

            It used to be pinned to the bottom edge of the card, floating over
            the photo — about as far from the title as it could get, and
            reading as part of the picture rather than as a control. Nothing
            said the card opened, which is how 86% of this section's text came
            to sit behind a click almost nobody made. */}
        <span
          className="mt-3 mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-veil-80 shadow"
          aria-hidden="true"
        >
          {/* Rotation lives on this inner span so it cannot compose with any
              transform on the wrapper above. */}
          <span className="block text-ink-max transition-transform duration-300 group-open:rotate-180">
            <ExpandIcon />
          </span>
        </span>
      </summary>

      {/* Fades in on open. motion-reduce opts out for anyone who has asked
          their system to minimise animation. */}
      <ul className="mt-4 space-y-3 text-ink-700 group-open:animate-disclosure-open motion-reduce:animate-none">
        <li>{children}</li>
      </ul>
    </details>
  </div>
);

export default DisclosureCard;
