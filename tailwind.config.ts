import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primary: "#fcfc03",
        secondary: "#404833",
        camo: {
          300: "#9BA885",
          400: "#75835D",
          500: "#404833",
          700: "#11140C",
        },
      },
      textColor: {
        primary: "#fcfc03",
        secondary: "#404833",
        camo: {
          300: "#9BA885",
          400: "#75835D",
          500: "#404833",
          700: "#11140C",
        },
      },
      fill: {
        primary: "#fcfc03",
        secondary: "#404833",
        camo: {
          300: "#9BA885",
          400: "#75835D",
          500: "#404833",
          700: "#11140C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
