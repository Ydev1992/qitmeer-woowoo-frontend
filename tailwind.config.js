/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '450px',
      },
      colors: {
        success: '#2FD35D',
        danger: '#f44336',
        grey: '#C4C4C4',
      },
      fontFamily: {
        pingfang: 'Noto Sans SC',
        Mont: 'Montserrat',
      },
    },
  },
  plugins: [],
};
