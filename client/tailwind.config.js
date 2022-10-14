/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        pink: "#F76C6C",
        pinkLight: "#f07373",
        pinkIntense: "#f85c5c",
        bordeaux: "#9C001A",
        cream: "rgb(255 253 244)",
        stone: "#798897",
      },
    },
  },
  plugins: [],
};
