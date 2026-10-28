import {
  BadgeCheck,
  FileBadge,
  FlaskConical,
  Globe2,
  GraduationCap,
  Lightbulb,
  Network,
  RefreshCw,
} from "lucide-react";

export const beneficios = [
  { icono: BadgeCheck, titulo: "Grado académico reconocido por la SUNEDU", texto: "Programas respaldados por reconocimiento oficial y valor académico para tu desarrollo profesional." },
  { icono: FileBadge, titulo: "Certificación modular", texto: "Certificaciones progresivas que fortalecen tu CV incluso antes de culminar el programa." },
  { icono: Network, titulo: "Jornadas de networking", texto: "Participa en eventos con referentes nacionales e internacionales y amplía tus oportunidades." },
  { icono: FlaskConical, titulo: "Laboratorios de innovación", texto: "Espacios y recursos orientados a la experimentación, la tecnología y la innovación aplicada." },
  { icono: Globe2, titulo: "Seminarios internacionales", texto: "Aprende con experiencias globales, tendencias actuales y enfoques académicos de alcance internacional." },
  { icono: GraduationCap, titulo: "Docentes especialistas", texto: "Profesionales con experiencia académica y práctica que conectan la teoría con la realidad profesional." },
  { icono: RefreshCw, titulo: "Programas actualizados", texto: "Planes de estudio alineados con las demandas del entorno profesional y las nuevas tendencias." },
  { icono: Lightbulb, titulo: "Investigación aplicada", texto: "Formación orientada al mundo real, con enfoque práctico y soluciones para contextos actuales." },
];

/* Pasos del proceso de admisión */
export const pasosAdmision = [
  {
    id: "informate",
    titulo: "Infórmate",
    resumen: "Elige tu programa y modalidad de ingreso.",
    items: [
      "Define el programa a estudiar: maestría, doctorado o segunda especialidad.",
      "Identifica la modalidad de ingreso (admisión general, traslado, profesionales, otros).",
      "Ten listos todos los requisitos para postular en formato PDF.",
    ],
  },
  {
    id: "inscribete",
    titulo: "Inscríbete",
    resumen: "Regístrate en el Portal del Postulante.",
    items: [
      "Ten a la mano un correo electrónico, de preferencia Gmail.",
      "Completa tu inscripción en el Portal del Postulante.",
      "Recibirás en tu correo la cuenta de acceso al Portal del Postulante – Posgrado UDH.",
    ],
    accion: "portal",
  },
  {
    id: "portal",
    titulo: "Sube tus requisitos",
    resumen: "Adjunta tus documentos y espera la validación.",
    items: [
      "Ingresa al correo de bienvenida UDH (revisa también la bandeja de spam). Si no lo encuentras, comunícate con tu asesor de admisión.",
      "Adjunta los requisitos de tu modalidad de ingreso en formato PDF.",
      "Adjunta el compromiso de honor en PDF de presentar los requisitos en condiciones de originalidad.",
      "Espera la validación del asesor de admisión y, si hay observaciones, subsánalas.",
      "Con los requisitos validados se generará tu código único de pago.",
    ],
    enlaces: [
      { texto: "Ver requisitos", to: "/requisitos" },
      { texto: "Ver asesores", to: "/contacto" },
    ],
  },
  {
    id: "pago",
    titulo: "Realiza el pago",
    resumen: "Paga en BBVA o BCP con tu código de postulante.",
    items: [
      "Paga en el BBVA o en el BCP por web, aplicación móvil o agentes autorizados, desde el día hábil siguiente a la generación de tu código.",
      "Una vez notificado en el Portal del Postulante tienes un plazo de 48 horas para realizar el pago.",
      "Con el pago realizado quedas correctamente inscrito.",
    ],
  },
  {
    id: "identidad",
    titulo: "Registro facial",
    resumen: "Registra tu rostro (obligatorio).",
    items: [
      "La UDH emplea herramientas tecnológicas para verificar la autenticidad de los postulantes durante el examen. El plagio, el fraude y la suplantación de identidad están sujetos a sanción legal o penal.",
      "Desde el día hábil siguiente al pago podrás registrar tu rostro en el sistema de reconocimiento facial.",
      "Es responsabilidad del postulante verificar que cumple con los requerimientos técnicos para el examen.",
      "Registra tu rostro desde tu Portal del Postulante; ahí encontrarás un videotutorial.",
    ],
    imagen: "assets/img/Reconocimiento-facial.jpg",
  },
  {
    id: "resultados",
    titulo: "Resultados",
    resumen: "Publicación oficial según cronograma.",
    items: ["Los resultados se publican oficialmente según el cronograma de admisión."],
  },
];

/* Asesores y oficinas */
export const contactos = [
  { id: "derecho", titulo: "Doctorado en Derecho", area: "Unidad de Posgrado", detalle: "Maestrías: Derecho Procesal, Derecho Civil y Comercial, Derecho del Trabajo y Seguridad Social", telefonos: ["941 932 865"] },
  { id: "penal", titulo: "Derecho Penal", area: "Unidad de Posgrado", telefonos: ["929 487 055"] },
  { id: "salud", titulo: "Doctorado en Ciencias de la Salud", area: "Unidad de Posgrado", detalle: "Maestrías: Salud Pública y Docencia Universitaria, Gerencia en Servicios de Salud, Odontoestomatología", telefonos: ["952 075 987", "985 279 704"] },
  { id: "educacion", titulo: "Doctorado en Ciencias de la Educación", area: "Unidad de Posgrado", detalle: "Maestrías: Docencia en Educación Superior e Investigación, Docencia y Gerencia Educativa, Psicología Educativa", telefonos: ["952 070 191"] },
  { id: "empresariales", titulo: "Ciencias Empresariales", area: "Unidad de Posgrado", detalle: "Maestrías: Gestión Pública, Auditoría y Tributación", telefonos: ["946 042 178"] },
  { id: "ingenieria", titulo: "Ingeniería", area: "Unidad de Posgrado", detalle: "Maestrías: Gestión Ambiental y Desarrollo Sostenible, Gerencia en Sistemas y Tecnologías de Información", telefonos: ["962 810 627"] },
  { id: "tramites", titulo: "Trámites para optar el grado", area: "Grado de Maestro / Doctor", telefonos: ["952 072 724"] },
  { id: "central", titulo: "Oficina Central de Admisión", area: "Proceso de inscripción", telefonos: ["952 071 466"] },
];

export const telHref = (numero) => `tel:+51${numero.replace(/\D/g, "")}`;
