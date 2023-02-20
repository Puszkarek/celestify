/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,scss}"],
  theme: {
    backgroundImage: {
      app: "linear-gradient(to left, #91EAE4, #86A8E7, #7F7FD5)",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
