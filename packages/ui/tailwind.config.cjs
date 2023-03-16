/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        'theme': '#e0e7ff',
        'theme-deep': '#c7d2fe',
        'theme-black': '#a5b4fc ',
      },
    },
  },
  plugins: [],
};
