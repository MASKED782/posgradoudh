import { Clock, Mail, MessageCircle, Phone, Users } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { contactos, telHref } from "../data/institucional.js";
import { site } from "../lib/site.js";
import { usePageTitle } from "../lib/hooks.js";

export default function Contacto() {
  usePageTitle("Contacto");

  return (
    <>
      <PageHeader
        eyebrow="Asesores de admisión"
        title="Contacto"
        aside={
          <div className="flex items-start gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl lg:w-80">
            <Clock className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Horario de atención</p>
              <p className="mt-1 text-white/90">{site.horario}</p>
            </div>
          </div>
        }
      >
        Comunícate con la unidad de posgrado de tu programa. Te ayudamos con tu postulación, requisitos y trámites.
      </PageHeader>

      <section className="py-14 sm:py-20">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [MessageCircle, "WhatsApp", "Escríbenos ahora", site.whatsappAsesor],
              [Mail, "Correo electrónico", site.email, `mailto:${site.email}`],
              [Users, "Grupo oficial", "Únete al grupo de información", site.grupoWhatsapp],
            ].map(([Icon, titulo, texto, href], i) => (
              <Reveal key={titulo} delay={i * 0.06}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  className="group flex items-center gap-4 rounded-2xl bg-ink p-6 text-white transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-ink">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-sm text-white/60">{titulo}</span>
                    <span className="block font-semibold">{texto}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {contactos.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 0.06}>
                <article id={c.id} className="card flex h-full scroll-mt-28 flex-col p-6">
                  <p className="eyebrow text-teal-dark">{c.area}</p>
                  <h2 className="mt-2 font-sans text-lg font-semibold leading-snug">{c.titulo}</h2>
                  {c.detalle && <p className="mt-3 text-sm leading-relaxed text-jet/65">{c.detalle}</p>}
                  <div className="mt-auto space-y-2 pt-6">
                    {c.telefonos.map((t) => (
                      <a
                        key={t}
                        href={telHref(t)}
                        className="flex items-center justify-between rounded-xl border border-line px-4 py-3 font-semibold text-ink transition hover:border-gold hover:bg-gold/10"
                      >
                        <span className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-teal-dark" /> {t}
                        </span>
                        <span className="text-xs font-medium text-jet/50">Llamar</span>
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
