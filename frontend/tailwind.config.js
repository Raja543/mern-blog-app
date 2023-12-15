/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
      screens: {
        'sm': '640px',
        'md': '865px',
        'lg': '1024px', 
        'xl': '1280px',
  
      },
    },
    plugins: [],
  };
  