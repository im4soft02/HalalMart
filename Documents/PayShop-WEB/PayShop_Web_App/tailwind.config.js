/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "428px",
        lg: "768px",
        xl: "1000px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
