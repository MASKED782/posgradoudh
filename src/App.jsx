import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import Home from "./pages/Home.jsx";
import ProgramPage from "./pages/ProgramPage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import Admision from "./pages/Admision.jsx";
import Contacto from "./pages/Contacto.jsx";
import NotFound from "./pages/NotFound.jsx";
import { doctorados, maestrias, segundaEspecialidad } from "./data/programas.js";
import {
  documentosGenerales,
  planesDoctorados,
  planesMaestrias,
  planesSegunda,
  preguntasFrecuentes,
  requisitos,
} from "./data/documentos.js";

// Direcciones del sitio anterior (también se redirigen en el .htaccess)
const rutasAntiguas = {
  "maestrias.html": "/maestrias",
  "doctorados.html": "/doctorados",
  "segunda_especialidad.html": "/segunda-especialidad",
  "requisitos.html": "/requisitos",
  "documentos.html": "/documentos",
  "faq.html": "/preguntas-frecuentes",
  "admision.html": "/admision",
  "contacto.html": "/contacto",
};

/* Al cambiar de página: arriba del todo, o a la sección indicada en el #hash */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Navbar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/maestrias" element={<ProgramPage programa={maestrias} planes={planesMaestrias} />} />
          <Route path="/doctorados" element={<ProgramPage programa={doctorados} planes={planesDoctorados} />} />
          <Route
            path="/segunda-especialidad"
            element={<ProgramPage programa={segundaEspecialidad} planes={planesSegunda} />}
          />
          <Route
            path="/requisitos"
            element={
              <LibraryPage
                eyebrow="Postulación"
                titulo="Requisitos"
                descripcion="Revisa los documentos que necesitas según el programa al que postulas. Súbelos en PDF desde el Portal del Postulante."
                documentos={requisitos}
              />
            }
          />
          <Route
            path="/documentos"
            element={
              <LibraryPage
                eyebrow="Repositorio"
                titulo="Documentos"
                descripcion="Reglamentos, calendario académico, vacantes y temario del examen de admisión."
                documentos={documentosGenerales}
              />
            }
          />
          <Route
            path="/preguntas-frecuentes"
            element={
              <LibraryPage
                eyebrow="Ayuda"
                titulo="Preguntas frecuentes"
                descripcion="Preguntas frecuentes sobre el proceso de admisión a maestrías, doctorados y segunda especialidad."
                documentos={preguntasFrecuentes}
              />
            }
          />
          <Route path="/admision" element={<Admision />} />
          <Route path="/contacto" element={<Contacto />} />
          {Object.entries(rutasAntiguas).map(([antigua, nueva]) => (
            <Route key={antigua} path={`/${antigua}`} element={<Navigate to={nueva} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  );
}
