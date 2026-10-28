import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Carpeta donde se publicará el sitio. Por defecto la raíz del dominio ("/").
// Para una subcarpeta: BASE_PATH=/posgrado/ npm run build
const base = process.env.BASE_PATH || "/";

// Páginas del sitio anterior (.html) → nuevas rutas. Mantiene funcionando los enlaces antiguos.
const legacyRoutes = {
  "maestrias.html": "maestrias",
  "doctorados.html": "doctorados",
  "segunda_especialidad.html": "segunda-especialidad",
  "requisitos.html": "requisitos",
  "documentos.html": "documentos",
  "faq.html": "preguntas-frecuentes",
  "admision.html": "admision",
  "contacto.html": "contacto",
};

/* =========================
   Genera dist/.htaccess para Apache (cPanel):
   - redirige las URLs antiguas .html
   - envía todas las rutas a index.html (React Router)
   - caché y compresión
========================= */
function htaccess() {
  const redirects = Object.entries(legacyRoutes)
    .map(([from, to]) => `RewriteRule ^${from.replace(".", "\\.")}$ ${base}${to} [R=301,L]`)
    .join("\n");

  const source = `# Generado automáticamente por vite.config.js — no editar en el servidor
Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase ${base}

# Enlaces del sitio anterior
${redirects}

# Rutas de la aplicación → index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . ${base}index.html [L]
</IfModule>

<IfModule mod_mime.c>
  AddType image/webp .webp
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript text/javascript image/svg+xml application/json
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  # JS/CSS compilados llevan hash en el nombre: caché de 1 año
  <FilesMatch "\\.(js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|png|jpe?g|svg)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
`;

  return {
    name: "udh-htaccess",
    apply: "build",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: ".htaccess", source });
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), htaccess()],
  build: {
    outDir: "dist",
    assetsDir: "build",
    emptyOutDir: true,
  },
});
