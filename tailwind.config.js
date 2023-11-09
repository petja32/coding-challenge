/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    colors: {
      gray: {
        100: "#010101",
        200: "#0A0A0A",
        300: "#0E0E0E",
        400: "#161616",
        500: "#2B2B2B",
      },
      white: {
        300: "#FFF",
        200: "#CDCDCD",
        100: "#5F5F5F",
      },
      glass: {
        300: "#ffffff0d",
        200: "#1C1C1C80",
        100: "#101010e6",
      },
      green: "#6DB95A",
      red: "#DD5E5E",
    },
  },
  plugins: [],
};
