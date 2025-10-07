/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4339F2",
        success: "#34B53A",
        info: "#02A0FC",
        danger: "#FF3A29",
        warning: "#FFB200",
        transparent: "#00000000",
        "primary-light": "#DAD7FE",
        "success-light": "#E2FBD7",
        "info-light": "#CCF8FE",
        "danger-light": "#FFE5D3",
        "warning-light": "#FFF5CC",
      },
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
};
