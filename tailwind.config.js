/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App/Views/**/*.{html,js}",
    "./Public/**/*.{html,js}",
    "./App/Views/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark"],
    logs: false,
  }
}