/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        muted: '#64748b',
        brand: {
          50: '#effdf8',
          100: '#d9fbee',
          500: '#14b89a',
          600: '#0f947d',
          700: '#0f766e',
        },
      },
      boxShadow: {
        card: '0 18px 45px rgba(23, 32, 51, 0.08)',
        lift: '0 22px 60px rgba(23, 32, 51, 0.14)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
