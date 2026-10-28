# Posgrado UDH

Sitio web de la Escuela de Posgrado de la Universidad de Huánuco: diplomados, maestrías, doctorados y segunda especialidad.

Hecho con **HTML + [Tailwind CSS](https://tailwindcss.com) + JavaScript**, compilado con **[Vite](https://vite.dev)**. Las animaciones usan [GSAP](https://gsap.com) y los íconos [Lucide](https://lucide.dev).

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior (incluye `npm`)

## Uso

```bash
npm install        # solo la primera vez
npm run dev        # servidor local con recarga automática → http://localhost:5173
npm run build      # genera la carpeta dist/ lista para publicar
npm run preview    # revisa localmente la versión compilada de dist/
```

## Estructura

```
*.html                  Páginas del sitio (index, maestrías, doctorados, ...)
components/             navbar.html y footer.html (se insertan en cada página al compilar)
public/assets/css/app.css Estilos propios (se copian tal cual, mismo orden que antes)
assets/css/tailwind.css Tailwind (configuración en tailwind.config.js)
assets/js/main.js       Entrada común: íconos + app.js + visor de PDF
assets/js/app.js        Navbar, menú móvil, modales y carruseles
assets/js/pdf-viewer.js Visor de PDF de las páginas de documentos
assets/js/home.js       Animaciones de la página de inicio
public/assets/img       Imágenes (se copian tal cual)
public/assets/pdf       PDFs (se copian tal cual)
public/.htaccess        Caché y compresión para Apache/cPanel
scripts/                Herramientas (optimizar imágenes)
```

Para referenciar una imagen o PDF desde el HTML usa la ruta sin `public/`, por ejemplo `assets/img/fondo1.webp`.

## Agregar imágenes nuevas

Las fotos de cámara o los PNG grandes pesan varios MB. Antes de subirlas, conviértelas a WebP:

```bash
npm run optimizar-imagenes -- public/assets/img/mi-foto.jpg
```

Se crea `mi-foto.webp` (máx. 1920 px de ancho). Usa ese archivo en el HTML y borra el original.

## Publicar en cPanel

1. Ejecuta `npm run build`.
2. Entra a cPanel → **Administrador de archivos** → `public_html` (o la subcarpeta del sitio).
3. Sube **el contenido** de la carpeta `dist/`, no la carpeta en sí. Lo más rápido es comprimir el contenido de `dist/` en un `.zip`, subirlo y usar **Extraer**.
4. Activa "Mostrar archivos ocultos" en el Administrador de archivos y verifica que `.htaccess` se haya subido.

Al actualizar, borra antes la carpeta `build/` del servidor: los nombres de los JS/CSS cambian en cada compilación.

> El sitio usa rutas relativas, así que funciona tanto en la raíz del dominio como en una subcarpeta.
