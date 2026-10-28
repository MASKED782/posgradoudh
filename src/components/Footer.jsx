import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, Phone, Users, Clock } from "lucide-react";
import { asset, site } from "../lib/site.js";

const columnas = [
  {
    titulo: "Oferta académica",
    links: [
      ["Maestrías", "/maestrias"],
      ["Doctorados", "/doctorados"],
      ["Segunda Especialidad", "/segunda-especialidad"],
      ["Diplomados", "/#diplomados"],
    ],
  },
  {
    titulo: "Postulantes",
    links: [
      ["Proceso de admisión", "/admision"],
      ["Requisitos", "/requisitos"],
      ["Documentos", "/documentos"],
      ["Preguntas frecuentes", "/preguntas-frecuentes"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="pointer-events-none absolute inset-0 bg-grain [background-size:22px_22px]" />
      <div className="container relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <img src={asset("assets/img/logoposgradoblanco.png")} alt="Escuela de Posgrado UDH" className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              Formación especializada con enfoque aplicado. Conoce nuestra oferta académica, resuelve tus dudas y postula en línea.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                [Mail, `mailto:${site.email}`, "Correo"],
                [MessageCircle, site.whatsappAsesor, "WhatsApp"],
                [Users, site.grupoWhatsapp, "Grupo oficial de WhatsApp"],
              ].map(([Icon, href, label]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {columnas.map((c) => (
            <div key={c.titulo} className="lg:col-span-2">
              <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">{c.titulo}</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="transition hover:text-gold">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="transition hover:text-gold">{site.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-gold" />
                <a href={`tel:${site.telefono.tel}`} className="transition hover:text-gold">{site.telefono.texto}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="h-5 w-5 shrink-0 text-gold" />
                <span>{site.horario}</span>
              </li>
              <li>
                <Link to="/contacto" className="inline-flex items-center gap-1 font-semibold text-white transition hover:text-gold">
                  Ver todos los asesores <ArrowUpRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pb-24 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:pb-6 sm:pr-24">
          <p>© {new Date().getFullYear()} {site.universidad} — {site.nombre}.</p>
          <a href={site.tasas} target="_blank" rel="noopener" className="transition hover:text-gold">
            Tasas y pensiones
          </a>
        </div>
      </div>
    </footer>
  );
}
