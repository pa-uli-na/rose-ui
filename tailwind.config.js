module.exports = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
    "./src/pages/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        ross: {
          DEFAULT: "#c8102e",
        },
        primary: {
          lighter: "var(--color-primary-lighter)",
          light: "var(--color-primary-light)",
          DEFAULT: "var(--color-primary-DEFAULT)",
          dark: "var(--color-primary-dark)",
        },
        secondary: {
          lighter: "#f5f5f5",
          light: "#e4e4e4",
          DEFAULT: "#8b8b8b",
          dark: "#4b5563",
          darker: "#27272a",
        },
        success: {
          lighter: "#dcfce7",
          light: "#99cf86",
          DEFAULT: "#66bb6a",
          dark: "#449c48",
        },
        warning: {
          lighter: "#fef9c3",
          light: "#99cf86",
          DEFAULT: "#ffc107",
          dark: "#d39f04",
        },
        danger: {
          lighter: "#ffe4e6",
          light: "#f26657",
          DEFAULT: "#e73926",
          dark: "#bb2211",
        },
      },
    },
  },
};
