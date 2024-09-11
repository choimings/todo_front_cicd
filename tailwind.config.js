/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      customFontEn: ['Ibm Plex Mono', 'monospace'],
      customFontKr: ['Ibm Plex Sans KR', 'sans-serif'],
    },
  },
  plugins: [],
};
