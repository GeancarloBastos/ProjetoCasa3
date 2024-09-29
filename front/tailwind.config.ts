import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'colorc3': '#3d4c41',
        'colorc3brancobg': '#f0f4f3',
        'colorc3offbranco': '#f2f4f1',
        'colorc3bege': '#f0e6d6',
        'colorc3cinza': '#d3d3d3',
        'colorc3marrom': '#a67b5b',
        'colorc3rosapastel': '#d9a5b3',
        'colorc3verde': '#809b8a',
      },
      'fontFamily': {
        'nunito': ['"Nunito"', 'serif'],
        'merri': ['"Merriweather"', 'serif'],
        'sans': ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
