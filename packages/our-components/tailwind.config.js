/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: { relative: true, files: ['./src/**/*.{js,ts,jsx,tsx}'] },
  // purge: {
  //   enabled: process.env.NODE_ENV === 'publish',
  //   content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // },
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    // plugin(function ({ addBase }) {
    //   addBase(require('./globals.css'))
    // }),
  ],
}
