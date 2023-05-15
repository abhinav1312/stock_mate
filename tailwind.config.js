/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6674CC",
        secondary: "#001D65",
        light: "#E6F4F1",
        txtPrim: "rgb(1, 18, 41)",
        txtSec: "rgb(119, 124, 133)",
        // body: "#f8f9fc"
        body: "#f7f8fc"
        

        // hoverBlue: "#0353a4",
        // black: "#001233",
        // grey: "#7d7c83",
        // darkGrey: "#8d99ae",
        
        // white: "#ffffff",
        // bgColor: "#ECF2FF"
      }
    },
  },
  plugins: [],
};
