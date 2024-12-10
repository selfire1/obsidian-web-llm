const utopia = require("tailwind-utopia");
/** @type {import('tailwindcss').Config} */
const black = "#000000";
const white = "#ffffff";
export default {
  // corePlugins: {
  //   fontSize: false,
  // },
  separator: "_",
  content: [],
  theme: {
    extend: {
      utopia: {
        minScreen: "320px",
        minSize: 16,
        minScale: 1.2,
        maxScreen: "1024px",
        maxSize: 20,
        maxScale: 1.375,
        textSizes: [
          "xs",
          "sm",
          "base",
          "lg",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl",
          "7xl",
          "8xl",
          "9xl",
        ],
      },
    },
  },
  plugins: [
    utopia({
      useClamp: false,
      prefix: "",
      baseTextSize: "base",
    }),
  ],
  corePlugins: {
    fontSize: false,
  },
};
