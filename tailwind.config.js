/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: '#0099CC',
        naranja: '#F28C28',
        verde: '#7BC67E',
        fondo: '#F8FFFE',
        'gris-oscuro': '#111827',
        'gris-medio': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}