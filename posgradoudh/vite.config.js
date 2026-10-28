import { defineConfig } from "vite";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = import.meta.dirname;

// Todas las páginas .html de la raíz se compilan como entradas
const pages = Object.fromEntries(
  readdirSync(root)
    .filter((f) => f.endsWith(".html"))
    .map((f) => [f.replace(".html", ""), resolve(root, f)])
);

/* =========================
   Inserta components/navbar.html y components/footer.html
   dentro de <div id="navbar-container"></div> y <div id="footer-container"></div>
   al compilar (ya no hace falta fetch en el navegador).
========================= */
function partials() {
  const read = (name) => readFileSync(resolve(root, "components", `${name}.html`), "utf8");

  return {
    name: "udh-partials",
    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        html.replace(
          /<div id="(navbar|footer)-container"><\/div>/g,
          (_, name) => `<div id="${name}-container">${read(name)}</div>`
        ),
    },
    handleHotUpdate({ file, server }) {
      if (file.replaceAll("\\", "/").includes("/components/")) {
        server.ws.send({ type: "full-reload" });
      }
    },
  };
}

export default defineConfig({
  // Rutas relativas: el sitio funciona en la raíz de public_html o en una subcarpeta
  base: "./",
  plugins: [partials()],
  build: {
    outDir: "dist",
    assetsDir: "build",
    emptyOutDir: true,
    rollupOptions: { input: pages },
  },
});
