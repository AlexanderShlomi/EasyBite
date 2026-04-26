/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eb: {
          background: "#FAF9F6",
          surface: "#FFFFFF",
          primary: "#D4AF37",
          text: "#2C3E50",
          border: "#E0E0E0",
          muted: "#546E7A",
        },
      },
      fontSize: {
        // Accessibility defaults for 50+ audience
        body: ["18px", { lineHeight: "27px" }],
        h2: ["24px", { lineHeight: "34px", fontWeight: "600" }],
        h1: ["32px", { lineHeight: "42px", fontWeight: "700" }],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

