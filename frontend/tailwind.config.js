/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*/.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#153540',
        'primary-light': '#f6f6f6',
        
        'secondary-1': '#6DB3BF',
        'secondary-2': '#94CFC9',
        'secondary-gray': '#dddddd',
        
        'accent-red': '#FD3F5B',
        'accent-gray': '#dddddd'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}