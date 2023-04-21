/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,css}',
    './widget/**/*.{js,ts,jsx,tsx,css}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd5ff',
          300: '#8ebcff',
          400: '#5996ff',
          500: '#2b6aff', //main
          600: '#1b4df5',
          700: '#1439e1',
          800: '#172fb6',
          900: '#192d8f',
          950: '#141d57',
        },
        'gray-blue': {
          50: '#f5f7f9',
          100: '#e8ecf1',
          200: '#d6dfe7',
          300: '#bac8d6',
          400: '#a0b3c6',
          500: '#8096b1',
          600: '#6e81a2',
          700: '#627293',
          800: '#535e7a',
          900: '#464e62',
          950: '#2d323e',
        },
        'theme-content-1': '#334155',
        'theme-content-2': '#0f172a',
      },
      borderColor: {
        light: '#e5e7eb',
      },
    },
  },
};
