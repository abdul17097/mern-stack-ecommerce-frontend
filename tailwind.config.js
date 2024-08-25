/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "1rem",
        xl: "4rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
