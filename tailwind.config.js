/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,scss}'],
  theme: {
    colors: {
      'primary-green': '#7fc49b',
      'secondary-green': '#2a5348',
      'primary-black': '#383838',
      'secondary-black': '#1a1a1a',
      'primary-white': '#f5f5f5',
      'secondary-white': '#e0e0e0',
      'primary-yellow': '#ffd700',
      'secondary-yellow': '#4f3b00',
      'primary-blue': '#4e8fb4',
      'secondary-blue': '#1a3541',
      'primary-purple': '#b39ddb',
      'secondary-purple': '#3c2856',
      'primary-pink': '#f08080',
      'secondary-pink': '#6e2d2d',
      'primary-red': '#e45a5a',
      'secondary-red': '#572121',
      'primary-brown': '#a58e7a',
      'secondary-brown': '#403128',
      'primary-cyan': '#00acc1',
      'secondary-cyan': '#00454a',
      'primary-magenta': '#d81b60',
      'secondary-magenta': '#4f0924',
      'primary-orange': '#ff8c00',
      'secondary-orange': '#4d2600',
      'primary-aqua': '#00bfa5',
      'secondary-aqua': '#00412d',
    },
    backgroundImage: {
      app: 'linear-gradient(to left, #91EAE4, #86A8E7, #7F7FD5)',
    },
    extend: {
      margin: {
        gutter: '16px',
      },
      borderRadius: {
        sm: '1rem',
        lg: '3rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
