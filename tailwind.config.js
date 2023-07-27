/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = nextConfig;

const flowbite = require("flowbite");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...flowbite.fontFamily.sans],
      },
      colors: {
        primary: flowbite.color("blue-500"),
        secondary: flowbite.color("gray-900"),
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
