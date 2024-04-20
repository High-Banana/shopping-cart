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
        ".navbar-link-hover": {
          "@apply duration-[0.3s] hover:scale-[1.09]": {},
        },
        ".custom-scrollbar": {
          "@apply scrollbar scrollbar-w-2 scrollbar-thumb-[#545454] scrollbar-thumb-rounded-sm": {},
        },
      };

      addComponents(newComponents);
    },
  ],
};
