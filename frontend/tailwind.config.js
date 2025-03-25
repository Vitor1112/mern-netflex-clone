import tailwindScrollbarHide from "tailwind-scrollbar-hide";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide],
}
//"scrollbar-hide " é class que tenho que coloca esconde barra do scroll da minha pagina