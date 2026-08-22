/*
 * Ornament marking the boundary between two sections.
 *
 * Replaces the light background bands: those separated the sections but at the
 * cost of painting over the page gradient and its ambient blobs, which is the
 * part of the design worth keeping. A marker sits *between* sections instead of
 * recolouring them, so the background stays continuous.
 *
 * Two mint rules fading outward to nothing, with a small orange diamond in the
 * middle — brand colours, and nothing hard-edged.
 *
 * aria-hidden because it is decoration: the headings already tell a screen
 * reader that a new section has started.
 */
const SectionDivider = () => (
  <div
    aria-hidden="true"
    className="flex items-center justify-center gap-3 py-3 sm:py-8"
  >
    <span className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent to-mint" />
    <span className="h-2 w-2 rotate-45 rounded-[1px] bg-ember" />
    <span className="h-px w-16 sm:w-32 bg-gradient-to-l from-transparent to-mint" />
  </div>
);

export default SectionDivider;
