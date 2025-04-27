/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          700: "#2D3B75",
          800: "#2D3B75",
          900: "#162041"
        },
        primary: {
          100: "#F4C2C2",
          200: "#DF9595"
        },
        accent: "#FFF3E8",
        markers: {
          "cleanser": "#86B0E0",
          "moisturizer": "#77D682",
          "exfoliate": "#E18E8E",
          "serum": "#CA8EE1",
        }
      },
    },
  },
  plugins: [],
}