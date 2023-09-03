const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  plugins: [require("@tailwindcss/forms")],
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        stone: colors.stone,
        sky: colors.sky,
        neutral: colors.neutral,
        gray: colors.gray,
        slate: colors.slate,
        primary: colors.blue
      },
    },
  },
};
