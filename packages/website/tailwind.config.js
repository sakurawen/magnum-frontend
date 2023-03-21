/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,css}',
    './components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-1': '#e0f2fe', //浅主题色
        'theme-2': '#bae6fd', //主题色
        'theme-3': '#0c4a6e', //深主题色
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
