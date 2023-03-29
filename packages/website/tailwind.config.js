/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,css}',
    './widget/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-1': '#2B6AFF',
        'theme-2': '#1B46B9',
        'theme-3': '#113582',
        'theme-gray-1': '#f9fafb',
        'theme-gray-2': '#f3f4f6',
        'theme-gray-3': '#e5e7eb',
        'theme-gray-4': '#d1d5db',
        'theme-content-1': '#334155',
        'theme-content-2': '#0f172a',
      },
      borderColor: {
        light: '#e5e7eb',
      },
    },
  },
};
