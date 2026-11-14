# Posgrado UDH

Sitio web de la Escuela de Posgrado de la Universidad de Huánuco: maestrías, doctorados, segunda especialidad y diplomados.

Hecho con **[React](https://react.dev)** + **[Vite](https://vite.dev)** + **[Tailwind CSS](https://tailwindcss.com)**, con animaciones de [Framer Motion](https://motion.dev) e íconos [Lucide](https://lucide.dev).

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior (incluye `npm`)

## Uso

```bash
npm install        # solo la primera vez
npm run dev        # servidor local con recarga automática → http://localhost:5173
npm run build      # genera la carpeta dist/ lista para publicar
npm run preview    # revisa localmente la versión compilada de dist/
```

## Dónde editar el contenido

No hace falta tocar el diseño para actualizar información:

| Qué quieres cambiar | Archivo |
| --- | --- |
| Enlaces (portal, WhatsApp, tasas), correo, teléfono, horario, fecha del examen, anuncio emergente, brochure | `src/lib/site.js` |
| Menciones, pensiones, matrículas, modalidades de ingreso, horarios | `src/data/programas.js` |
| PDFs de planes de estudio, requisitos, reglamentos, vacantes, FAQ | `src/data/documentos.js` |
| Ventajas, pasos de admisión, asesores y teléfonos | `src/data/institucional.js` |

Los archivos (imágenes y PDFs) van en `public/assets/img` y `public/assets/pdf`. En los datos se escriben sin `public/`, por ejemplo `assets/pdf/temario.pdf`. Usa nombres sin tildes ni espacios.

Para desactivar el anuncio emergente, pon `anuncio: null` en `src/lib/site.js`.

## Estructura

```
src/
  main.jsx            Punto de entrada
  App.jsx             Rutas de las páginas
  index.css           Estilos base y botones
  components/         Navbar, Footer, Modal, visor de PDFs, tarjetas de programas
  pages/              Inicio, Maestrías/Doctorados/Segunda Especialidad, Admisión, Contacto, bibliotecas de PDFs
  data/               Contenido del sitio (ver tabla de arriba)
  lib/                Datos generales y utilidades
public/assets/        Imágenes y PDFs (se copian tal cual)
scripts/              Herramientas para optimizar imágenes y PDFs
tailwind.config.js    Colores y tipografías de la marca
```

## Agregar imágenes nuevas

Las fotos de cámara o los PNG grandes pesan varios MB. Conviértelas a WebP antes de usarlas:

```bash
npm run optimizar-imagenes -- public/assets/img/mi-foto.jpg
```

Se crea `mi-foto.webp` (máx. 1920 px de ancho). Usa ese archivo y borra el original.

## Agregar PDFs nuevos

Antes de subir un PDF, redúcele el peso (recomprime sus imágenes; el texto no cambia):

```bash
npm run optimizar-pdfs -- public/assets/pdf/nuevo.pdf
```

También acepta una carpeta: `npm run optimizar-pdfs -- public/assets/pdf`. Solo reemplaza el archivo si queda más liviano.

## Publicar en cPanel

1. Ejecuta `npm run build`.
2. Comprime **el contenido** de `dist/` (no la carpeta en sí, y sin olvidar `.htaccess`).
   - **Primera vez**: todo `dist/` (~37 MB).
   - **Actualizaciones**: si no cambiaste PDFs, deja fuera `assets/pdf` (~1 MB).
3. En cPanel abre el **Administrador de archivos**, entra a `public_html`, sube el zip y usa **Extraer**.
4. Activa "Mostrar archivos ocultos" y verifica que se subió `.htaccess`. Es imprescindible: hace que funcionen las rutas como `/maestrias` y redirige los enlaces antiguos (`maestrias.html`, etc.).

Al actualizar, borra antes la carpeta `build/` del servidor (los nombres de los JS/CSS cambian en cada compilación).

No comprimas la carpeta del proyecto completa: incluye `node_modules` y el código fuente, pesa cientos de MB y no funciona en cPanel.

**Si el sitio va en una subcarpeta** (por ejemplo `udh.edu.pe/posgrado/`), compila indicando la carpeta:

```bash
BASE_PATH=/posgrado/ npm run build
```

En Windows (PowerShell): `$env:BASE_PATH="/posgrado/"; npm run build`

## Guardar cambios en GitHub (GitHub Desktop)

1. Abre GitHub Desktop: verás los archivos modificados en la pestaña **Changes**.
2. Escribe un resumen abajo a la izquierda y pulsa **Commit to &lt;rama&gt;**.
3. Pulsa **Push origin** (o **Publish branch** la primera vez que subes una rama).
4. Si trabajas en otra rama, para pasar los cambios a `main` pulsa **Create Pull Request**, revísalo en GitHub y haz **Merge**. GitHub muestra `main` por defecto.
