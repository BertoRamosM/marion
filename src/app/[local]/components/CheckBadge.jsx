/*
 * Tick used in the "what you get" lists on both course sections.
 *
 * Replaces the ✔️ emoji, which renders differently on every platform and
 * cannot take the brand colours. Shared so the two sections stay identical.
 */
const CheckBadge = () => (
  <span
    aria-hidden="true"
    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint"
  >
    <svg viewBox="0 0 12 10" fill="none" className="h-3 w-3 text-on-mint">
      <path
        d="M1 5l3.5 3.5L11 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default CheckBadge;
