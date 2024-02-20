/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    function ({ addComponents }) {
      const newComponents = {
        ".link-hover": {
          "@apply duration-[0.3s] hover:scale-[1.09]": {},
        },
      };

      addComponents(newComponents);
    },
  ],
};
