module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    // colors: {
    //   "s-green": "#006063",
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
