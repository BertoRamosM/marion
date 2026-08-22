/*
 * Shared heading block for the main sections.
 *
 * Three parts, top to bottom:
 *   - a circular mint icon badge, acting as a chapter marker
 *   - a small uppercase label naming the section
 *   - the section's own <h2>
 *
 * Together with the divider between sections, this gives each block a clear
 * "this is where a new topic starts" without touching the page background.
 *
 * `title` takes a node rather than a string so each section keeps its own
 * coloured spans inside the heading.
 *
 * The badge is aria-hidden: it is decoration, and the label plus the heading
 * already announce the section to a screen reader.
 */
const SectionHeading = ({ icon, label, title, children }) => (
  <div className="max-w-3xl mx-auto text-center mb-12">
    <span
      aria-hidden="true"
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint text-on-mint shadow-md ring-4 ring-veil-70"
    >
      {icon}
    </span>

    <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand">
      {label}
    </p>

    <h2 className="mt-2 text-4xl font-bold text-ink-900">{title}</h2>

    {children ? (
      <div className="mt-4 text-lg text-ink-800">{children}</div>
    ) : null}
  </div>
);

export default SectionHeading;
