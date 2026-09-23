/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a6f6',
          500: '#0c89eb',
          600: '#026dc9',
          700: '#0357a3',
          800: '#074a86',
          900: '#0b3f6f',
          950: '#07284b',
        },
        navy: {
          800: '#111c30',
          900: '#0b1322',
          950: '#070b14',
        }
      },
    },
  },
  plugins: [],
}
