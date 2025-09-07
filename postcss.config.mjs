// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;

const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ Tailwind PostCSS plugin
    autoprefixer: {},           // ✅ Autoprefixer
  },
};

export default config;

