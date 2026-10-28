/* =========================
   Punto de entrada común a todas las páginas
========================= */
import {
  createIcons,
  BadgeCheck,
  FileBadge,
  FlaskConical,
  Globe2,
  GraduationCap,
  Lightbulb,
  Mail,
  MessageCircle,
  Network,
  RefreshCw,
  Smartphone,
  Users,
} from "lucide";
import { initApp } from "./app.js";
import { initPdfViewer } from "./pdf-viewer.js";

// Solo se empaquetan los íconos que usa el sitio. Si agregas data-lucide="otro-icono", impórtalo aquí.
createIcons({
  icons: {
    BadgeCheck,
    FileBadge,
    FlaskConical,
    Globe2,
    GraduationCap,
    Lightbulb,
    Mail,
    MessageCircle,
    Network,
    RefreshCw,
    Smartphone,
    Users,
  },
});

initApp();
initPdfViewer();
