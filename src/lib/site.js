/* =========================
   Datos generales del sitio — edita aquí enlaces, fechas y contactos
========================= */

/** Ruta a un archivo de public/ respetando la carpeta de publicación */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const site = {
  nombre: "Escuela de Posgrado",
  universidad: "Universidad de Huánuco",
  portalPostulante: "https://portalpostulante.udh.edu.pe/posgrado/inscripcion",
  whatsappAsesor: "https://wa.me/message/FIMXSUMKAWMPH1",
  grupoWhatsapp: "https://chat.whatsapp.com/IcqxUftP5IV1LgiptTZ7pO?mode=gi_t",
  tasas: "http://udh.edu.pe/tasas.aspx",
  email: "epg@udh.edu.pe",
  telefono: { texto: "948 418 867", tel: "+51948418867" },
  horario: "Lunes a viernes de 8:00 a.m. – 1:00 p.m. y 4:00 p.m. – 7:00 p.m.",

  // Anuncio emergente de la página de inicio (se muestra una vez por sesión). null = desactivado
  anuncio: { imagen: "assets/img/admision-2026-2.webp", alt: "Examen de admisión virtual — Posgrado UDH" },
  brochure: "assets/pdf/brochure-admision-2026-1.pdf",
  examen: { etiqueta: "Examen de admisión", fecha: "08 de agosto" },
};
