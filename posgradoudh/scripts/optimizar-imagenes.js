/* =========================
   Convierte imágenes a WebP optimizado
   Uso: npm run optimizar-imagenes -- public/assets/img/foto.jpg [otra.png ...]
   Crea "foto.webp" al lado del original (ancho máximo 1920px).
   Después de revisar el resultado, borra el original y usa el .webp en el HTML.
========================= */
import sharp from "sharp";
import { statSync } from "node:fs";
import path from "node:path";

const MAX_WIDTH = 1920;
const QUALITY = 78;

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Indica al menos una imagen. Ej: npm run optimizar-imagenes -- public/assets/img/foto.jpg");
  process.exit(1);
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of files) {
  const out = path.join(path.dirname(file), path.parse(file).name + ".webp");
  await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  console.log(`✅ ${file} (${kb(statSync(file).size)}) → ${out} (${kb(statSync(out).size)})`);
}
