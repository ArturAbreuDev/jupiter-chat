/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jupiter: {
          primary: {
            DEFAULT: '#1BB9FB',
          },
          secondary: {
            DEFAULT: '#FF7200',
          },
        },
      },
    },
  },
  plugins: [],
}
