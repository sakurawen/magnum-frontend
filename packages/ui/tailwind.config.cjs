/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        'theme-1': '#002fa7',
        'theme-2': '#1e40af',
        'theme-3': '#1e3a8a',
        'theme-main': '#002fa7',
        'theme-deep': '#1e40af',
        'theme-gray-1': '#f9fafb',
        'theme-gray-2': '#f3f4f6',
        'theme-gray-3': '#e5e7eb',
        'theme-gray-4': '#d1d5db',
        'theme-content-1': '#334155',
        'theme-content-2': '#0f172a',
      },
    },
  },
  plugins: [],
};
