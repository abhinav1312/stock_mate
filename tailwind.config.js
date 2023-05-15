/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6674CC",
        secondary: "#081a51",
        light: "#E6F4F1",
        txtPrim: "rgb(1, 18, 41)",
        txtSec: "rgb(119, 124, 133)",
        // body: "#f8f9fc"
        body: "#ebf3ff",
        txtActive: "#51CBFF",
        hoverSecondary: "#1b2b65"

      }
    },
  },
  plugins: [],
};
