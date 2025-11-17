/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This is CRITICAL for manual dark mode toggle
  content: ["./Frontend/**/*.{html,js}",
    "./Frontend/Menu Page/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
