import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  daisyui: {
    themes: ["dark", ""],
  },
  plugins: [require("tailwindcss-animate"), daisyui],
} satisfies Config;

export default config;
