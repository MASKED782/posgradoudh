/* =========================
   PDFs del sitio (archivos en public/assets/pdf)
========================= */

const pdf = (archivo) => `assets/pdf/${archivo}`;

export const planesMaestrias = [
  ["Gerencia en Sistemas y Tecnologías de Información", "maestrias/gerencia_sistemas_tecnologias_informacion.pdf", "Ingeniería"],
  ["Gestión Ambiental y Desarrollo Sostenible", "maestrias/gestion_ambiental_desarrollo_sostenible.pdf", "Ingeniería"],
  ["Gestión Pública", "maestrias/gestion_publica.pdf", "Ciencias Administrativas"],
  ["Auditoría y Tributación", "maestrias/auditoria_tributacion.pdf", "Ciencias Administrativas"],
  ["Docencia y Gerencia Educativa", "maestrias/docencia_gerencia_educativa.pdf", "Ciencias de la Educación"],
  ["Psicología Educativa", "maestrias/psicologia_educativa.pdf", "Ciencias de la Educación"],
  ["Salud Pública y Docencia Universitaria", "maestrias/salud_publica_docencia_universitaria.pdf", "Ciencias de la Salud"],
  ["Odontoestomatología", "maestrias/odontoestomatologia.pdf", "Ciencias de la Salud"],
  ["Gerencia en Servicios de Salud", "maestrias/gerencia_servicios_salud.pdf", "Ciencias de la Salud"],
  ["Derecho Civil y Comercial", "maestrias/derecho_civil.pdf", "Derecho y Ciencias Políticas"],
  ["Derecho Penal", "maestrias/derecho_penal.pdf", "Derecho y Ciencias Políticas"],
  ["Derecho Procesal", "maestrias/derecho_procesal.pdf", "Derecho y Ciencias Políticas"],
].map(([titulo, archivo, grupo]) => ({ titulo: `Maestría en ${titulo}`, url: pdf(archivo), grupo }));

export const planesDoctorados = [
  ["Doctorado en Ciencias de la Educación", "doctorados/doctorado_ciencias_educacion.pdf"],
  ["Doctorado en Ciencias de la Salud", "doctorados/doctorado_ciencias_salud.pdf"],
  ["Doctorado en Derecho", "doctorados/doctorado_derecho.pdf"],
].map(([titulo, archivo]) => ({ titulo, url: pdf(archivo), grupo: "Planes de estudio" }));

export const planesSegunda = [
  ["Alto Riesgo Obstétrico", "segunda_especialidad/alto_riesgo_obstetrico.pdf"],
  ["Ortodoncia y Ortopedia Maxilar", "segunda_especialidad/ortodoncia_ortopedia_maxilar.pdf"],
  ["Monitoreo Fetal y Ecografía Obstétrica", "segunda_especialidad/monitoreo_fetal.pdf"],
].map(([titulo, archivo]) => ({ titulo: `Segunda Especialidad en ${titulo}`, url: pdf(archivo), grupo: "Planes de estudio" }));

export const requisitos = [
  ["Maestrías", "requisitos/requisitos_maestrias.pdf"],
  ["Doctorados", "requisitos/requisitos_doctorado.pdf"],
  ["Segunda Especialidad", "requisitos/requisitossegundaespecialidad.pdf"],
].map(([titulo, archivo]) => ({ titulo: `Requisitos — ${titulo}`, url: pdf(archivo), grupo: "Requisitos de postulación" }));

export const documentosGenerales = [
  ["Reglamento de Admisión", "reglamento-admision.pdf", "Reglamentos"],
  ["Reglamento General de Estudios", "reglamento-general-estudios.pdf", "Reglamentos"],
  ["Reglamento General de Grados de Maestría y Doctorado", "reglamento-grados.pdf", "Reglamentos"],
  ["Reglamento de Estudios — Segunda Especialidad", "reglamento-segunda.pdf", "Reglamentos"],
  ["Calendario Académico", "calendario-academico.pdf", "Admisión"],
  ["Temario para el examen de admisión", "temario.pdf", "Admisión"],
  ["Vacantes — Maestrías", "vacantes-maestrias.pdf", "Vacantes"],
  ["Vacantes — Doctorados", "vacantes-doctorados.pdf", "Vacantes"],
  ["Vacantes — Segunda Especialidad", "vacantes-segunda.pdf", "Vacantes"],
].map(([titulo, archivo, grupo]) => ({ titulo, url: pdf(archivo), grupo }));

export const preguntasFrecuentes = [
  { titulo: "Preguntas frecuentes — Maestrías y Doctorados", url: pdf("faq/faq_maestria_doctorado.pdf"), grupo: "Preguntas frecuentes" },
];
