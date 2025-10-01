/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "1.4rem",
        button: "1.6rem",
        subheading: "1.8rem",
        body: "2rem",
        large: "2.2rem",
        xl: "2.4rem",
        heading: "2.6rem",
        title: "3.2rem",
      },
    },
  },
  plugins: [],
}