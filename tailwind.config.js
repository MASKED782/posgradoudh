/** Configuración única de Tailwind para todas las páginas */
export default {
  content: ["./*.html", "./components/**/*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        jet: "#3D3C3B",
        zomp: "#5A9E8D",
        tealbtn: "#5A9E8D",
        saffron: "#ECC138",
        primary: "#ECC138",
        background: "#FAF7F0",
        card: "rgba(255,255,255,0.72)",
        border: "rgba(61,60,59,0.16)",
        muted: "rgba(90,158,141,0.10)",
        foreground: "#3D3C3B",
        "muted-foreground": "rgba(61,60,59,0.72)",
        "primary-foreground": "#3D3C3B",
      },
      boxShadow: { soft: "0 12px 30px rgba(61,60,59,0.22)" },
    },
  },
};
