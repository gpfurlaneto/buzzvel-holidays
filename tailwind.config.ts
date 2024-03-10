import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        light: '0 4px 8px 0 rgba(0,0,0,0.2)',
        dark: '0 4px 8px 0 rgba(50,50,50.2)'
        
      },
    },
  },
  plugins: [],
};
export default config;
