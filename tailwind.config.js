/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,scss}"],
  theme: {
    colors: {
      "primary-green": "#90ee90",
      "primary-black": "rgb(38, 38, 39)",
      "primary-white": "whitesmoke",
      "primary-yellow": "#fedc26",
    },
    backgroundImage: {
      app: "linear-gradient(to left, #91EAE4, #86A8E7, #7F7FD5)",
    },
    extend: {
      borderRadius: {
        sm: "1rem",
        lg: "3rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
