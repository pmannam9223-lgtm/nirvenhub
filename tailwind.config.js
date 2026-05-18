/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3C1A',
          light: '#2D5A27',
          dark: '#0D240D',
        },
        secondary: {
          DEFAULT: '#8BA888',
        },
        'bg-fresh': '#F9F7F2',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
