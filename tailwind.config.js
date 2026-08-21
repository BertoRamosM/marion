/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
