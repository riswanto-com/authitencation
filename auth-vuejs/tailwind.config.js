/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  theme: {
    extend: {},
  },
  content: [
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

