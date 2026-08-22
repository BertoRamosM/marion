/** @type {import('tailwindcss').Config} */

/*
 * Colour tokens.
 *
 * Every colour resolves to a CSS variable defined in globals.css, which holds
 * a light and a dark value. Components reference the role (`bg-cream`), never
 * a hex, so the whole palette switches from one place.
 *
 * Each token's light value is exactly the hex it replaced, so light mode is
 * unchanged by construction rather than by inspection.
 *
 * Deliberately NOT tokenised: the three flag icons. A French flag is #092050
 * in every colour scheme, so those files keep their literal hexes.
 */
const tokens = {
  "page-from": "var(--page-from)",
  "page-to": "var(--page-to)",

  surface: "var(--surface)",
  cream: "var(--cream)",
  mist: "var(--mist)",
  field: "var(--field)",
  paper: "var(--paper)",

  // One token per original grey, so light mode keeps its exact hierarchy.
  ink: "var(--ink)",
  "ink-900": "var(--ink-900)",
  "ink-800": "var(--ink-800)",
  "ink-700": "var(--ink-700)",
  "ink-600": "var(--ink-600)",
  "ink-500": "var(--ink-500)",
  "ink-300": "var(--ink-300)",
  "ink-max": "var(--ink-max)",

  brand: "var(--brand)",
  "brand-deep": "var(--brand-deep)",
  "brand-alt": "var(--brand-alt)",
  "teal-deep": "var(--teal-deep)",

  mint: "var(--mint)",
  "mint-soft": "var(--mint-soft)",
  "mint-vivid": "var(--mint-vivid)",
  "field-line": "var(--field-line)",

  // Ink for content printed ON mint or on the orange-to-mint banner. Identical
  // in both schemes — see the note in globals.css.
  "on-mint": "var(--on-mint)",
  "on-ember": "var(--on-ember)",
  "veil-pending": "var(--veil-pending)",
  scrim: "var(--scrim)",
  "on-mint-ink": "var(--on-mint-ink)",
  "on-mint-rust": "var(--on-mint-rust)",

  ember: "var(--ember)",
  "ember-deep": "var(--ember-deep)",
  "ember-vivid": "var(--ember-vivid)",
  rust: "var(--rust)",
  "rust-lg": "var(--rust-lg)",

  "danger-bg": "var(--danger-bg)",
  "danger-line": "var(--danger-line)",
  "danger-mark": "var(--danger-mark)",
  "danger-text": "var(--danger-text)",
  "danger-text-strong": "var(--danger-text-strong)",
  "danger-detail": "var(--danger-detail)",
  star: "var(--star)",

  // Raised panels on a coloured card. Named after the original alpha.
  "veil-10": "var(--veil-10)",
  "veil-30": "var(--veil-30)",
  "veil-50": "var(--veil-50)",
  "veil-60": "var(--veil-60)",
  "veil-70": "var(--veil-70)",
  "veil-80": "var(--veil-80)",
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: tokens,
      keyframes: {
        // Used when an expandable card opens. Native <details> cannot animate
        // its own height, so the revealed text fades and eases into place
        // instead — no JavaScript required.
        "disclosure-open": {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "disclosure-open": "disclosure-open 260ms ease-out",
      },
    },
  },
  plugins: [],
};
