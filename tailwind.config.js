/** Sistema de diseño Posgrado UDH */
export default {
  content: { relative: true, files: ["./index.html", "./src/**/*.{js,jsx}"] },
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: { DEFAULT: "#1F1E1D", soft: "#2B2A29" },
        jet: "#3D3C3B",
        gold: { DEFAULT: "#ECC138", light: "#F6DC85", dark: "#B8900F" },
        teal: { DEFAULT: "#5A9E8D", light: "#E3F0EC", dark: "#3E7A6B" },
        cream: "#FAF7F0",
        sand: "#F2EDE2",
        line: "rgba(61,60,59,0.12)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(31,30,29,0.04), 0 8px 24px -12px rgba(31,30,29,0.12)",
        lift: "0 2px 4px rgba(31,30,29,0.06), 0 24px 48px -20px rgba(31,30,29,0.28)",
        glow: "0 12px 32px -8px rgba(236,193,56,0.55)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
    },
  },
};
