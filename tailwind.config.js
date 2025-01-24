/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1127px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        Mooli: ["Mooli", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
