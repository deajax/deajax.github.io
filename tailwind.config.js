/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[theme-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}