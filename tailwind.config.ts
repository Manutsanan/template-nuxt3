/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        gold: "rgb(214, 199, 112)",
        main: "rgb(0, 5, 85)",
        bg: "rgb(201,201,201)"
      },
      borderRadius: {
        'xxl': '50px'
      }
    },
  },
  plugins: [],
};
