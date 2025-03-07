/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        landingImg: "url('assets/image-landing.jpg')",
        landingImg2: "url('assets/landing-img.jpg')",
        logo: "url('assets/logo.png')",
      },
      backgroundColor: {
        dark: "#2F5D62",
        semidark: "#5E8B7E",
        semilight: "#A7C4BC",
        light: "#DFEEEA",
        white: "#FFF",
        black: "#000000",
        purple: "#4C0070",
        gray: "#e5e7eb",
        grey: "#B2B1B9",
        red: "#FB0B0B",
      },
	  screens: {
        sm: "640px",
        lm: "1020px",
        gm: "975px",
        xl: "1280px",
		xxl:"1368px"
      },
    },
    color: {
      primary: "#2F5D62",
      secundary: "#5E8B7E",
      terciary: "#A7C4BC",
      cuar: "#DFEEEA",
      quint: "#FFF",
      sext: "#000000",
      sep: "#4C0070",
    },
  },
  plugins: [
	require('tailwind-scrollbar-hide')
  ],
};
