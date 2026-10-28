import { ArrowUpRight, MessageCircle } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import DocumentLibrary from "../components/DocumentLibrary.jsx";
import { AreaGrid, Modalidades } from "../components/Programs.jsx";
import { SectionHeading } from "../components/Reveal.jsx";
import { site } from "../lib/site.js";
import { usePageTitle } from "../lib/hooks.js";

const tipos = { maestrias: "Maestría", doctorados: "Doctorado", "segunda-especialidad": "Segunda especialidad" };

/** Maestrías, Doctorados y Segunda Especialidad */
export default function ProgramPage({ programa, planes }) {
  usePageTitle(programa.titulo);

  return (
    <>
      <PageHeader
        eyebrow={`Modalidad ${programa.modalidad.toLowerCase()}`}
        title={programa.titulo}
        image={programa.imagen}
        aside={
          <div className="w-full rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl lg:w-80">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Modalidades de ingreso</p>
            <Modalidades items={programa.ingreso} dark />
          </div>
        }
      >
        {programa.descripcion}
      </PageHeader>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Costos" title="Menciones y pensiones">
            Haz clic en un programa para ver el detalle de pensión, matrícula, horarios y contactos.
          </SectionHeading>
          <div className="mt-12">
            <AreaGrid programa={programa} tipo={tipos[programa.id]} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.portalPostulante} target="_blank" rel="noopener" className="btn-gold">
              Inscríbete ahora <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={site.whatsappAsesor} target="_blank" rel="noopener" className="btn-outline">
              <MessageCircle className="h-4 w-4" /> Hablar con un asesor
            </a>
            <a href={site.tasas} target="_blank" rel="noopener" className="btn-outline">
              Ver tasas de pensiones
            </a>
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-sand/50">
        <div className="container">
          <SectionHeading eyebrow="Repositorio" title="Planes de estudio y malla curricular">
            Consulta o descarga el plan de estudios de cada programa.
          </SectionHeading>
          <div className="mt-12">
            <DocumentLibrary documentos={planes} />
          </div>
        </div>
      </section>
    </>
  );
}
