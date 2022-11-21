/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/app/**/*.{js,ts,jsx,tsx}",
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        menuSlide: {
          "0%": { transform: "translateX(-150px)" },
          "75%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0px)" },
        },
        buttonSlideUp: {
          "0%": { transform: "translateY(100px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        menuSlide: "menuSlide .35s ease-out",
        buttonSlideUp: "buttonSlideUp .25s ease-out",

      },
    },
    colors: {
      primary: "#5603AD",
      green: "#34D1BF",
      red: "#FF4B56",
      black: "#0F0F0F",
      white: "#E0E0E0",
    },
  },
  plugins: [],
};
