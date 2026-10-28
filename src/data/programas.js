/* =========================
   Oferta académica: menciones, costos y modalidades de ingreso
========================= */

const notaMaestrias = [
  "La matrícula se paga al iniciar cada semestre académico (02 veces al año).",
  "Duración de los estudios: 01 año, a excepción de las maestrías en Derecho.",
];

export const maestrias = {
  id: "maestrias",
  titulo: "Maestrías",
  modalidad: "A distancia / Presencial",
  descripcion:
    "Especialízate en tu campo profesional con programas orientados a la gestión, la investigación y la toma de decisiones.",
  imagen: "assets/img/fondom2.webp",
  ingreso: [
    ["Examen de admisión general", "S/ 150.00"],
    ["Traslado interno", "S/ 250.00"],
    ["Traslado externo", "S/ 350.00"],
    ["Segunda maestría", "S/ 150.00"],
  ],
  areas: [
    {
      nombre: "Ingeniería",
      menciones: [
        { nombre: "Gerencia en Sistemas y Tecnologías de Información", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Gestión Ambiental y Desarrollo Sostenible", pension: "S/ 401.12", matricula: "S/ 157.50" },
      ],
      notas: notaMaestrias,
    },
    {
      nombre: "Ciencias Administrativas",
      menciones: [
        { nombre: "Gestión Pública", pension: "S/ 467.96", matricula: "S/ 183.75" },
        { nombre: "Auditoría y Tributación", pension: "S/ 401.12", matricula: "S/ 157.50" },
      ],
      notas: notaMaestrias,
    },
    {
      nombre: "Ciencias de la Educación",
      menciones: [
        { nombre: "Docencia en Educación Superior e Investigación", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Docencia y Gerencia Educativa", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Psicología Educativa", pension: "S/ 401.12", matricula: "S/ 157.50" },
      ],
      notas: notaMaestrias,
    },
    {
      nombre: "Ciencias de la Salud",
      menciones: [
        { nombre: "Salud Pública y Docencia Universitaria", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Odontoestomatología", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Gerencia en Servicios de Salud", pension: "S/ 401.12", matricula: "S/ 157.50" },
      ],
      notas: notaMaestrias,
    },
    {
      nombre: "Derecho y Ciencias Políticas",
      menciones: [
        { nombre: "Derecho Penal", pension: "S/ 467.96", matricula: "S/ 183.75" },
        { nombre: "Derecho Procesal", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Derecho Civil y Comercial", pension: "S/ 401.12", matricula: "S/ 157.50" },
        { nombre: "Derecho del Trabajo y Seguridad Social", pension: "S/ 401.12", matricula: "S/ 157.50" },
      ],
      notas: notaMaestrias,
    },
  ],
};

const horariosDoctorado = (manana, tarde, domingo) => [
  "Clases presenciales",
  "Duración: 06 semestres",
  `Sábados (mañana): ${manana}`,
  `Sábados (tarde): ${tarde}`,
  `Domingos: ${domingo}`,
];

export const doctorados = {
  id: "doctorados",
  titulo: "Doctorados",
  modalidad: "Presencial",
  descripcion:
    "Formación doctoral para liderar la investigación, generar conocimiento y aportar soluciones a tu disciplina.",
  imagen: "assets/img/fondodoc.webp",
  ingreso: [
    ["Examen de admisión general", "S/ 200.00"],
    ["Traslado interno", "S/ 250.00"],
    ["Traslado externo", "S/ 350.00"],
    ["Segundo doctorado", "S/ 200.00"],
  ],
  areas: [
    {
      nombre: "Ciencias de la Educación",
      menciones: [{ nombre: "Doctorado en Ciencias de la Educación", pension: "S/ 534.83", matricula: "S/ 210.00" }],
      detalles: horariosDoctorado("8:00 a.m. – 12:30 p.m.", "4:15 p.m. – 7:15 p.m.", "8:00 a.m. – 12:30 p.m."),
      contactos: [
        "Unidad de Posgrado en Ciencias de la Educación – 952 070 191",
        "posgrado.educacion@udh.edu.pe",
        "Soporte informático – 952 072 178",
        "computo@udh.edu.pe",
      ],
    },
    {
      nombre: "Ciencias de la Salud",
      menciones: [{ nombre: "Doctorado en Ciencias de la Salud", pension: "S/ 534.83", matricula: "S/ 210.00" }],
      detalles: horariosDoctorado("8:00 a.m. – 1:00 p.m.", "3:00 p.m. – 7:00 p.m.", "8:00 a.m. – 2:00 p.m."),
      contactos: [
        "Coordinación Unidad de Posgrado en Ciencias de la Salud – 985 279 704",
        "Secretaría – 952 075 987",
        "Soporte informático – 962 656 510",
      ],
    },
    {
      nombre: "Derecho",
      menciones: [{ nombre: "Doctorado en Derecho", pension: "S/ 534.83", matricula: "S/ 210.00" }],
      contactos: ["Unidad de Posgrado – 941 932 865"],
    },
  ],
};

const requisitosSE = [
  "Fotocopia ampliada del DNI",
  "Fotocopia del título (registrado en SUNEDU)",
  "Certificado original de estudios universitarios",
  "Currículum vitae detallado y documentado (copias)",
  "Inscripción S/ 200.00",
];

export const segundaEspecialidad = {
  id: "segunda-especialidad",
  titulo: "Segunda Especialidad",
  modalidad: "Presencial / Semipresencial",
  descripcion:
    "Profundiza tu práctica profesional en áreas clínicas de alta demanda con docentes especialistas.",
  imagen: "assets/img/fondose.webp",
  ingreso: [
    ["Examen de admisión general", "S/ 200.00"],
    ["Traslado externo", "S/ 350.00"],
  ],
  areas: [
    {
      nombre: "Alto Riesgo Obstétrico",
      menciones: [{ nombre: "Alto Riesgo Obstétrico", pension: "S/ 401.12", matricula: "S/ 157.50" }],
      requisitos: requisitosSE,
      detalles: [
        "Clases presenciales",
        "Duración: 03 semestres (ciclos de 04 meses)",
        "Sábado de 8:00 a.m. – 1:00 p.m. y 3:00 p.m. – 7:00 p.m.",
        "Domingo de 8:00 a.m. – 2:00 p.m.",
      ],
      contactos: ["Coordinación – 985 279 704", "Secretaría – 952 075 987", "Soporte informático – 962 656 510"],
    },
    {
      nombre: "Ortodoncia y Ortopedia Maxilar",
      menciones: [{ nombre: "Ortodoncia y Ortopedia Maxilar", pension: "S/ 1,337.06", matricula: "S/ 525.00" }],
      requisitos: requisitosSE,
      detalles: [
        "Duración: 36 meses (03 años)",
        "Clases teóricas virtuales dos veces por semana desde las 7:00 p.m. (según el curso)",
        "Prácticas presenciales un fin de semana al mes: viernes (tarde), sábado (todo el día) y domingo (medio día)",
      ],
      contactos: ["Coordinación – 985 003 399", "Secretaría – 952 075 987"],
    },
    {
      nombre: "Monitoreo Fetal y Ecografía Obstétrica",
      menciones: [],
      proximamente: true,
    },
  ],
};

export const diplomados = {
  id: "diplomados",
  titulo: "Diplomados",
  modalidad: "Formación continua",
  descripcion:
    "Programas orientados al fortalecimiento profesional y al desarrollo de competencias aplicadas.",
  imagen: "assets/img/fondodip.webp",
  programas: ["Diplomado en Gestión Estratégica de Proyectos de Desarrollo Social"],
};

export const oferta = [maestrias, doctorados, segundaEspecialidad];

export const totalMenciones = (programa) =>
  programa.areas.reduce((n, a) => n + Math.max(a.menciones.length, 1), 0);

/** Menor pensión mensual de un área, para mostrar "desde S/ ..." */
export const pensionDesde = (area) => {
  const valores = area.menciones.map((m) => parseFloat(m.pension.replace(/[^\d.]/g, "")));
  if (!valores.length) return null;
  const min = Math.min(...valores);
  return area.menciones[valores.indexOf(min)].pension;
};
